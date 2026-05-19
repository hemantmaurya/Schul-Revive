// src/components/layout/Header.jsx
import { Menu, Bell, Search } from 'lucide-react';
import { useState } from 'react';

export default function Header({ sidebarOpen, toggleSidebar, title }) {
    const [showNotif, setShowNotif] = useState(false);

    return (
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 md:px-6 shadow-sm">
            <div className="flex items-center justify-between w-full">

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                    <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
                </div>

                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search students, teachers..."
                            className="pl-10 pr-4 py-2 w-72 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => setShowNotif(!showNotif)}
                            className="p-2 hover:bg-gray-100 rounded-lg relative"
                        >
                            <Bell size={22} />
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
                        </button>
                    </div>

                    {/* User Profile */}
                    <div className="flex items-center gap-3 cursor-pointer">
                        <div className="text-right hidden md:block">
                            <p className="font-medium text-gray-800">Hemant Maurya</p>
                            <p className="text-xs text-gray-500">Administrator</p>
                        </div>
                        <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            HM
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}