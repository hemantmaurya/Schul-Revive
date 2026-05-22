// src/components/layout/DashboardLayout.jsx
import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function DashboardLayout({ children, title = "Dashboard" }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header
                    sidebarOpen={sidebarOpen}
                    toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    title={title}
                />

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
                    {children}
                </main>

                <Footer />
            </div>
        </div>
    );
}