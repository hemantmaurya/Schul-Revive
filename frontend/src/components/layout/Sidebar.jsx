import { Home, Users, BookOpen, Building2, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Departments', icon: Building2, path: '/departments' },
    { name: 'Courses', icon: BookOpen, path: '/courses' },
    { name: 'Classes', icon: Users, path: '/classes' },
    { name: 'Add House', icon: Plus, path: '/houses/add' },
];

const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
            <div className="p-6 border-b">
                <h1 className="text-2xl font-bold text-blue-600">SchulRevive</h1>
            </div>

            <div className="flex-1 p-4">
                <nav className="space-y-1">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${isActive
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;