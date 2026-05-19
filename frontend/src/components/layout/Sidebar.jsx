// src/components/layout/Sidebar.jsx
import { useState } from 'react';
import {
    Home, Users, UserCheck, School, BookOpen, Calendar,
    Award, DollarSign, BarChart3, Settings, ChevronLeft
} from 'lucide-react';

const menuItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Users, label: "Students", path: "/students" },
    { icon: UserCheck, label: "Teachers", path: "/teachers" },
    { icon: School, label: "Classes", path: "/classes" },
    { icon: BookOpen, label: "Subjects", path: "/subjects" },
    { icon: Calendar, label: "Attendance", path: "/attendance" },
    { icon: Award, label: "Exams & Results", path: "/exams" },
    { icon: DollarSign, label: "Fees Management", path: "/fees" },
    { icon: BarChart3, label: "Reports", path: "/reports" },
    { icon: Settings, label: "Settings", path: "/settings" },
];

export default function Sidebar({ isOpen, toggle }) {
    const [active, setActive] = useState(window.location.pathname);

    return (
        <div className={`bg-white border-r border-gray-200 h-screen transition-all duration-300 flex-shrink-0 overflow-y-auto shadow-sm
      ${isOpen ? 'w-72' : 'w-20'}`}>

            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center">
                        <School size={28} className="text-white" />
                    </div>
                    {isOpen && <span className="text-2xl font-bold tracking-tight text-gray-800">SchulRevive</span>}
                </div>
            </div>

            {/* Navigation */}
            <nav className="p-4">
                <ul className="space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = active === item.path;

                        return (
                            <li key={item.path}>
                                <a
                                    href={item.path}
                                    onClick={() => setActive(item.path)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] transition-all
                    ${isActive
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <Icon size={22} />
                                    {isOpen && <span className="font-medium">{item.label}</span>}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}