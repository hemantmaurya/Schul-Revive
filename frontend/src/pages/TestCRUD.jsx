// src/pages/TestCRUD.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Upload, Search, Loader2 } from 'lucide-react';
import Modal from '../components/common/Modal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function TestCRUD() {
    const [tests, setTests] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTest, setEditingTest] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '', status: 'Active', priority: 1 });
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const fetchTests = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}/api/tests`, {
                params: { page, limit: 10, search }
            });
            setTests(res.data.data || []);
            setPagination(res.data.pagination || {});
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTests();
    }, [page, search]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const openModal = (test = null) => {
        if (test) {
            setEditingTest(test);
            setFormData({
                title: test.title,
                description: test.description || '',
                status: test.status,
                priority: test.priority
            });
            setPreview(test.image);
        } else {
            setEditingTest(null);
            setFormData({ title: '', description: '', status: 'Active', priority: 1 });
            setPreview(null);
            setImageFile(null);
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title?.trim()) return alert("Title is required!");

        setSubmitting(true);
        const data = new FormData();
        data.append('title', formData.title);
        if (formData.description) data.append('description', formData.description);
        data.append('status', formData.status);
        data.append('priority', formData.priority);
        if (imageFile) data.append('image', imageFile);

        try {
            if (editingTest) {
                await axios.put(`${API_URL}/api/tests/${editingTest.id}`, data);
            } else {
                await axios.post(`${API_URL}/api/tests`, data);
            }
            fetchTests();
            setIsModalOpen(false);
            alert(editingTest ? "✅ Updated successfully!" : "✅ Created successfully!");
        } catch (error) {
            alert(error.response?.data?.message || "Failed to save record");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this record?")) {
            await axios.delete(`${API_URL}/api/tests/${id}`);
            fetchTests();
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Test CRUD (Production Ready)</h1>
                <button onClick={() => openModal()} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2">
                    <Plus size={20} /> Add New Record
                </button>
            </div>

            <div className="relative max-w-md">
                <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    className="w-full pl-12 pr-4 py-3 border rounded-xl"
                />
            </div>

            <div className="bg-white rounded-2xl shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-4 text-left">Image</th>
                        <th className="px-6 py-4 text-left">Title</th>
                        <th className="px-6 py-4 text-left">Status</th>
                        <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tests.map(test => (
                        <tr key={test.id} className="border-b hover:bg-gray-50">
                            <td className="px-6 py-4">
                                {test.image && (
                                    <img
                                        src={`${API_URL}${test.image}`}
                                        alt={test.title}
                                        className="w-12 h-12 object-cover rounded-lg border"
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                )}
                            </td>
                            <td className="px-6 py-4 font-medium">{test.title}</td>
                            <td className="px-6 py-4">
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">{test.status}</span>
                            </td>
                            <td className="px-6 py-4 text-center space-x-4">
                                <button onClick={() => openModal(test)} className="text-blue-600 hover:text-blue-800">
                                    <Edit2 size={20} />
                                </button>
                                <button onClick={() => handleDelete(test.id)} className="text-red-600 hover:text-red-800">
                                    <Trash2 size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingTest ? "Edit Record" : "Add New Record"}>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex justify-center">
                        <div className="relative">
                            <img src={preview || "https://via.placeholder.com/150"} className="w-32 h-32 object-cover rounded-2xl" />
                            <label className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-2 rounded-full cursor-pointer">
                                <Upload size={20} />
                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                        </div>
                    </div>

                    <input type="text" required placeholder="Title *" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 border rounded-xl" />

                    <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-3 border rounded-xl h-24" />

                    <button type="submit" disabled={submitting} className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold">
                        {submitting ? "Saving..." : editingTest ? "Update Record" : "Create Record"}
                    </button>
                </form>
            </Modal>
        </div>
    );
}