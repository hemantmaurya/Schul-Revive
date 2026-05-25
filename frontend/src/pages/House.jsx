import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Loader2, Palette } from 'lucide-react';

const API_URL = 'http://localhost:4000';

export default function House() {
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingHouse, setEditingHouse] = useState(null);

    const [formData, setFormData] = useState({
        houseName: '',
        houseColour: '#3b82f6'
    });

    // Fetch All Houses
    const fetchHouses = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}/api/houses`);
            setHouses(res.data.data || []);
        } catch (err) {
            console.error("Error fetching houses:", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchHouses();
    }, []);

    // Open Modal
    const openModal = (house = null) => {
        if (house) {
            setEditingHouse(house);
            setFormData({
                houseName: house.houseName || '',
                houseColour: house.houseColour || '#3b82f6'
            });
        } else {
            setEditingHouse(null);
            setFormData({ houseName: '', houseColour: '#3b82f6' });
        }
        setIsModalOpen(true);
    };

    // Submit (Add / Update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.houseName.trim()) {
            return alert("House Name is required!");
        }

        setSubmitting(true);
        try {
            if (editingHouse) {
                await axios.put(`${API_URL}/api/houses/${editingHouse.id}`, formData);
            } else {
                await axios.post(`${API_URL}/api/houses`, formData);
            }
            fetchHouses();
            setIsModalOpen(false);
        } catch (error) {
            alert(error.response?.data?.message || "Failed to save house");
        } finally {
            setSubmitting(false);
        }
    };

    // Delete House
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this house?")) {
            try {
                await axios.delete(`${API_URL}/api/houses/${id}`);
                fetchHouses();
            } catch (error) {
                alert("Failed to delete house");
            }
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">House Management</h1>
                <button
                    onClick={() => openModal()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
                >
                    <Plus size={20} /> Add New House
                </button>
            </div>

            {/* Houses Table */}
            <div className="bg-white rounded-2xl shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-4 text-left">Colour</th>
                        <th className="px-6 py-4 text-left">House Name</th>
                        <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="3" className="py-20 text-center">
                                <Loader2 className="animate-spin mx-auto" size={40} />
                            </td>
                        </tr>
                    ) : houses.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="py-20 text-center text-gray-500">
                                No houses added yet
                            </td>
                        </tr>
                    ) : (
                        houses.map((house) => (
                            <tr key={house.id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div
                                        className="w-12 h-12 rounded-xl border shadow"
                                        style={{ backgroundColor: house.houseColour }}
                                    />
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-800">
                                    {house.houseName}
                                </td>
                                <td className="px-6 py-4 text-center space-x-4">
                                    <button
                                        onClick={() => openModal(house)}
                                        className="text-blue-600 hover:text-blue-700"
                                    >
                                        <Edit2 size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(house.id)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-6">
                            {editingHouse ? "Edit House" : "Add New House"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-700 mb-2">House Name *</label>
                                <input
                                    type="text"
                                    value={formData.houseName}
                                    onChange={(e) => setFormData({ ...formData, houseName: e.target.value })}
                                    className="w-full px-4 py-3 border rounded-xl"
                                    placeholder="e.g. Red House"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">House Colour *</label>
                                <div className="flex gap-4">
                                    <input
                                        type="color"
                                        value={formData.houseColour}
                                        onChange={(e) => setFormData({ ...formData, houseColour: e.target.value })}
                                        className="w-20 h-12 border rounded-xl cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={formData.houseColour}
                                        onChange={(e) => setFormData({ ...formData, houseColour: e.target.value })}
                                        className="flex-1 px-4 py-3 border rounded-xl font-mono"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-3 border rounded-xl"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 disabled:opacity-70"
                                >
                                    {submitting ? "Saving..." : editingHouse ? "Update" : "Add House"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}