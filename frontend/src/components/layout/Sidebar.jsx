// src/components/layout/Sidebar.jsx
import { useState } from 'react';
import {
    Home, Users, UserCheck, School, BookOpen, Calendar,
    Award, DollarSign, BarChart3, Settings, ChevronDown, ChevronRight
} from 'lucide-react';

const menuData = [
    {
        title: "Main Menu",
        items: [
            { icon: Home, label: "Dashboard", path: "/" },
        ]
    },
    {
        title: "Management",
        items: [
            { icon: Users, label: "Students", path: "/students", submenu: ["Student List", "Add Student"] },
            { icon: UserCheck, label: "Teachers", path: "/teachers", submenu: ["Teacher List", "Add Teacher"] },
            { icon: School, label: "Classes", path: "/classes" },
            { icon: BookOpen, label: "Subjects", path: "/subjects" },
            { icon: Calendar, label: "Attendance", path: "/attendance" },
            { icon: Award, label: "Exams & Results", path: "/exams" },
            { icon: DollarSign, label: "Fees Management", path: "/fees" },
        ]
    },
    {
        title: "Others",
        items: [
            { icon: BarChart3, label: "Reports", path: "/reports" },
            { icon: Settings, label: "Settings", path: "/settings" },
        ]
    }
];

export default function Sidebar({ isOpen, toggle }) {
    const [activePath, setActivePath] = useState("/");
    const [openSubmenu, setOpenSubmenu] = useState({});

    const toggleSubmenu = (label) => {
        setOpenSubmenu(prev => ({
            ...prev,
            [label]: !prev[label]
        }));
    };

    return (
        <div className={`bg-white border-r border-gray-200 h-screen transition-all duration-300 flex-shrink-0 overflow-y-auto shadow-sm
      ${isOpen ? 'w-72' : 'w-20'}`}>

            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b bg-gray-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                        <School size={28} className="text-white" />
                    </div>
                    {isOpen && <span className="text-2xl font-bold text-gray-800">SchulRevive</span>}
                </div>
            </div>

            <div className="p-4">
                {menuData.map((section, idx) => (
                    <div key={idx} className="mb-6">
                        {isOpen && (
                            <div className="text-xs uppercase font-semibold text-gray-500 px-4 mb-3 tracking-widest">
                                {section.title}
                            </div>
                        )}

                        <ul className="space-y-1">
                            {section.items.map((item, i) => {
                                const Icon = item.icon;
                                const isActive = activePath === item.path;
                                const hasSubmenu = item.submenu && item.submenu.length > 0;
                                const isOpenSub = openSubmenu[item.label];

                                return (
                                    <li key={i}>
                                        <a
                                            href={item.path}
                                            onClick={(e) => {
                                                if (hasSubmenu) {
                                                    e.preventDefault();
                                                    toggleSubmenu(item.label);
                                                } else {
                                                    setActivePath(item.path);
                                                }
                                            }}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] transition-all group
                        ${isActive
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            <Icon size={22} className={isActive ? "text-white" : ""} />
                                            {isOpen && <span className="font-medium flex-1">{item.label}</span>}

                                            {isOpen && hasSubmenu && (
                                                <span className="ml-auto">
                          {isOpenSub ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                        </span>
                                            )}
                                        </a>

                                        {/* Submenu */}
                                        {isOpen && hasSubmenu && isOpenSub && (
                                            <ul className="ml-10 mt-1 space-y-1 border-l border-gray-200 pl-4">
                                                {item.submenu.map((sub, si) => (
                                                    <li key={si}>
                                                        <a href="#" className="block py-2 text-sm text-gray-600 hover:text-blue-600">
                                                            {sub}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}