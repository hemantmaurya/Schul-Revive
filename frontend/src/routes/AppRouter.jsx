// src/routes/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProtectedRoute from '../components/layout/ProtectedRoute';

// Pages
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Students from '../pages/Students';
import Teachers from '../pages/Teachers';
import Classes from '../pages/Classes';
import Attendance from '../pages/Attendance';
import Exams from '../pages/Exams';
import Fees from '../pages/Fees';
import TestCRUD from '../pages/TestCRUD';
import House from '../pages/House';

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                {/* Public Route */}
                <Route path="/login" element={<Login />} />

                {/* All Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={
                        <DashboardLayout title="Dashboard">
                            <Dashboard />
                        </DashboardLayout>
                    } />

                    <Route path="/students" element={
                        <DashboardLayout title="Students">
                            <Students />
                        </DashboardLayout>
                    } />

                    <Route path="/teachers" element={
                        <DashboardLayout title="Teachers">
                            <Teachers />
                        </DashboardLayout>
                    } />

                    <Route path="/classes" element={
                        <DashboardLayout title="Classes & Sections">
                            <Classes />
                        </DashboardLayout>
                    } />

                    <Route path="/attendance" element={
                        <DashboardLayout title="Attendance">
                            <Attendance />
                        </DashboardLayout>
                    } />

                    <Route path="/exams" element={
                        <DashboardLayout title="Exams & Results">
                            <Exams />
                        </DashboardLayout>
                    } />

                    <Route path="/fees" element={
                        <DashboardLayout title="Fees Management">
                            <Fees />
                        </DashboardLayout>
                    } />

                    <Route path="/test-crud" element={
                        <DashboardLayout title="Test CRUD">
                            <TestCRUD />
                        </DashboardLayout>
                    } />
                </Route>
                <Route path="/house" element={
                    <DashboardLayout title="House CRUD">
                        <House />
                    </DashboardLayout>
                } />


                {/* Fallback Route */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}