import React, { useState, useEffect } from "react";
import axios from "axios";

const House = () => {
    const [houses, setHouses] = useState([]);
    const [formData, setFormData] = useState({
        houseName: "",
        houseColour: "#3b82f6",
    });

    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    // Fetch Houses
    const fetchHouses = async () => {
        try {
            const res = await axios.get("/api/houses");

            let data = [];
            if (res.data.data && Array.isArray(res.data.data)) {
                data = res.data.data;
            } else if (Array.isArray(res.data)) {
                data = res.data;
            }

            setHouses(data);
        } catch (error) {
            console.error("Error fetching houses:", error);
            setHouses([]);
        }
    };

    useEffect(() => {
        fetchHouses();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.houseName.trim()) return;

        setLoading(true);

        try {
            if (editingId) {
                await axios.put(`/api/houses/${editingId}`, formData);

                setMessage({
                    type: "success",
                    text: "House updated successfully!",
                });
            } else {
                await axios.post("/api/houses", formData);

                setMessage({
                    type: "success",
                    text: "House added successfully!",
                });
            }

            fetchHouses();
            resetForm();
        } catch (error) {
            setMessage({
                type: "error",
                text:
                    error.response?.data?.message ||
                    "Something went wrong!",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (house) => {
        setFormData({
            houseName: house.houseName,
            houseColour: house.houseColour,
        });

        setEditingId(house.id);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this house?")) {
            try {
                await axios.delete(`/api/houses/${id}`);

                setMessage({
                    type: "success",
                    text: "House deleted successfully!",
                });

                fetchHouses();
            } catch (error) {
                setMessage({
                    type: "error",
                    text: "Failed to delete house",
                });
            }
        }
    };

    const resetForm = () => {
        setFormData({
            houseName: "",
            houseColour: "#3b82f6",
        });

        setEditingId(null);
    };

    return (
        <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
                <div className="row align-items-center">
                    <div className="col">
                        <h3 className="page-title fw-bold">
                            {editingId ? "Edit House" : "Add House"}
                        </h3>

                        <ul className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="#">Library</a>
                            </li>

                            <li className="breadcrumb-item active">
                                Add House
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Form Card */}
            <div className="row">
                <div className="col-sm-12">
                    <div
                        className="card border-0 shadow-sm"
                        style={{ borderRadius: "14px" }}
                    >
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    {/* Title */}
                                    <div className="col-12 mb-4">
                                        <h5
                                            className="fw-bold"
                                            style={{ fontSize: "28px" }}
                                        >
                                            House Information
                                        </h5>
                                    </div>

                                    {/* House Name */}
                                    <div className="col-lg-6 col-md-6 mb-4">
                                        <label className="form-label fw-semibold">
                                            House Name{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>

                                        <input
                                            type="text"
                                            name="houseName"
                                            value={formData.houseName}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Enter House Name"
                                            required
                                            style={{
                                                height: "48px",
                                                borderRadius: "8px",
                                            }}
                                        />
                                    </div>

                                    {/* House Colour */}
                                    <div className="col-lg-6 col-md-6 mb-4">
                                        <label className="form-label fw-semibold">
                                            House Colour{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>

                                        <div className="d-flex align-items-center gap-3">
                                            <input
                                                type="color"
                                                name="houseColour"
                                                value={formData.houseColour}
                                                onChange={handleChange}
                                                style={{
                                                    width: "60px",
                                                    height: "48px",
                                                    border: "1px solid #ddd",
                                                    borderRadius: "8px",
                                                    cursor: "pointer",
                                                }}
                                            />

                                            <input
                                                type="text"
                                                name="houseColour"
                                                value={formData.houseColour}
                                                onChange={handleChange}
                                                className="form-control"
                                                style={{
                                                    height: "48px",
                                                    borderRadius: "8px",
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Alert Message */}
                                    {message.text && (
                                        <div className="col-12 mb-3">
                                            <div
                                                className={`alert ${
                                                    message.type === "success"
                                                        ? "alert-success"
                                                        : "alert-danger"
                                                }`}
                                            >
                                                {message.text}
                                            </div>
                                        </div>
                                    )}

                                    {/* Button */}
                                    <div className="col-12 mt-2">
                                        <button
                                            type="submit"
                                            className="btn btn-primary px-5"
                                            disabled={loading}
                                            style={{
                                                height: "45px",
                                                borderRadius: "10px",
                                                minWidth: "170px",
                                                fontWeight: "600",
                                                backgroundColor: "#4f6ef7",
                                                border: "none",
                                            }}
                                        >
                                            {loading
                                                ? "Processing..."
                                                : editingId
                                                    ? "Update House"
                                                    : "Submit"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="row mt-4">
                <div className="col-sm-12">
                    <div
                        className="card border-0 shadow-sm"
                        style={{ borderRadius: "14px" }}
                    >
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-4">
                                All Houses
                            </h5>

                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead>
                                    <tr>
                                        <th>House Name</th>
                                        <th>Colour</th>
                                        <th className="text-end">
                                            Actions
                                        </th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {houses.length > 0 ? (
                                        houses.map((house) => (
                                            <tr key={house.id}>
                                                <td className="fw-semibold">
                                                    {house.houseName}
                                                </td>

                                                <td>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <div
                                                            style={{
                                                                width: "28px",
                                                                height: "28px",
                                                                borderRadius:
                                                                    "6px",
                                                                backgroundColor:
                                                                house.houseColour,
                                                                border:
                                                                    "1px solid #ccc",
                                                            }}
                                                        />

                                                        <span>
                                                                {
                                                                    house.houseColour
                                                                }
                                                            </span>
                                                    </div>
                                                </td>

                                                <td className="text-end">
                                                    <button
                                                        className="btn btn-warning btn-sm me-2"
                                                        onClick={() =>
                                                            handleEdit(
                                                                house
                                                            )
                                                        }
                                                        style={{
                                                            borderRadius:
                                                                "6px",
                                                        }}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() =>
                                                            handleDelete(
                                                                house.id
                                                            )
                                                        }
                                                        style={{
                                                            borderRadius:
                                                                "6px",
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="3"
                                                className="text-center py-4"
                                            >
                                                No houses found
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default House;