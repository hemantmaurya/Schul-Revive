// src/pages/Admissions/Enquiry.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, Edit2 } from 'lucide-react';
import Modal from '../../components/common/Modal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function AdmissionEnquiry() {
    const [enquiries, setEnquiries] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEnquiry, setEditingEnquiry] = useState(null);
    const [formData, setFormData] = useState({
        studentName: '', parentName: '', email: '', phone: '',
        classInterested: '', previousSchool: '', message: ''
    });

    const fetchEnquiries = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}/api/enquiries`, {
                params: {
                    page,
                    limit: 10,
                    search: searchTerm,
                    status: statusFilter
                }
            });
            setEnquiries(res.data.data || []);
            setTotalPages(res.data.pagination?.totalPages || 1);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnquiries();
    }, [page, searchTerm, statusFilter]);

    const openModal = (enq = null) => {
        if (enq) {
            setEditingEnquiry(enq);
            setFormData(enq);
        } else {
            setEditingEnquiry(null);
            setFormData({ studentName: '', parentName: '', email: '', phone: '', classInterested: '', previousSchool: '', message: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingEnquiry) {
                await axios.put(`${API_URL}/api/enquiries/${editingEnquiry.id}`, formData);
            } else {
                await axios.post(`${API_URL}/api/enquiries`, formData);
            }
            fetchEnquiries();
            setIsModalOpen(false);
        } catch (err) {
            alert("Failed to save. Make sure backend is running.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Admission Enquiries</h1>
                <button onClick={() => openModal()} className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2">
                    <Plus size={20} /> New Enquiry
                </button>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                        className="w-full pl-12 pr-4 py-3 border rounded-xl"
                    />
                </div>

                <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="px-4 py-3 border rounded-xl">
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Confirmed">Confirmed</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-4 text-left">Student Name</th>
                        <th className="px-6 py-4 text-left">Parent</th>
                        <th className="px-6 py-4 text-left">Contact</th>
                        <th className="px-6 py-4 text-left">Class</th>
                        <th className="px-6 py-4 text-left">Status</th>
                        <th className="px-6 py-4 text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {enquiries.map(enq => (
                        <tr key={enq.id} className="border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium">{enq.studentName}</td>
                            <td className="px-6 py-4">{enq.parentName}</td>
                            <td className="px-6 py-4">
                                <div>{enq.email}</div>
                                <div className="text-sm text-gray-500">{enq.phone}</div>
                            </td>
                            <td className="px-6 py-4">{enq.classInterested}</td>
                            <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${enq.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                    {enq.status}
                  </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <button onClick={() => openModal(enq)} className="text-blue-600 hover:text-blue-800"><Edit2 size={18} /></button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl">
                <p>Page {page} of {totalPages}</p>
                <div className="flex gap-3">
                    <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1} className="px-5 py-2 border rounded-xl disabled:opacity-50">Previous</button>
                    <button onClick={() => setPage(p => p + 1)} disabled={page >= totalPages} className="px-5 py-2 border rounded-xl disabled:opacity-50">Next</button>
                </div>
            </div>

            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingEnquiry ? "Edit Enquiry" : "New Admission Enquiry"}>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Student Name" value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} className="px-4 py-3 border rounded-xl" />
                        <input type="text" placeholder="Parent Name" value={formData.parentName} onChange={e => setFormData({...formData, parentName: e.target.value})} className="px-4 py-3 border rounded-xl" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="px-4 py-3 border rounded-xl" />
                        <input type="tel" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="px-4 py-3 border rounded-xl" />
                    </div>

                    <input type="text" placeholder="Class Interested" value={formData.classInterested} onChange={e => setFormData({...formData, classInterested: e.target.value})} className="w-full px-4 py-3 border rounded-xl" />

                    <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700">
                        {editingEnquiry ? "Update Enquiry" : "Submit Enquiry"}
                    </button>
                </form>
            </Modal>
        </div>
    );
}