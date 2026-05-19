// src/pages/Dashboard.jsx
import { Users, UserCheck, Calendar, Award, DollarSign, TrendingUp } from 'lucide-react';

export default function Dashboard() {
    return (
        <div className="space-y-6">
            {/* Welcome Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Welcome back, Hemant 👋</h1>
                <p className="text-gray-600 mt-1">Here's what's happening in your school today</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Total Students</p>
                            <p className="text-4xl font-bold text-gray-800 mt-2">1,248</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                            <Users size={28} />
                        </div>
                    </div>
                    <p className="text-green-600 text-sm mt-4 flex items-center gap-1">
                        <TrendingUp size={16} /> +12% from last month
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Total Teachers</p>
                            <p className="text-4xl font-bold text-gray-800 mt-2">87</p>
                        </div>
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                            <UserCheck size={28} />
                        </div>
                    </div>
                    <p className="text-green-600 text-sm mt-4">94% attendance today</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Today's Attendance</p>
                            <p className="text-4xl font-bold text-gray-800 mt-2">89%</p>
                        </div>
                        <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                            <Calendar size={28} />
                        </div>
                    </div>
                    <p className="text-red-600 text-sm mt-4">142 students absent</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Fees Collected</p>
                            <p className="text-4xl font-bold text-gray-800 mt-2">₹8.4L</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                            <DollarSign size={28} />
                        </div>
                    </div>
                    <p className="text-green-600 text-sm mt-4">68% of this month</p>
                </div>
            </div>

            {/* Recent Activity & Quick Links */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Recent Admissions */}
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">Recent Admissions</h2>
                    <div className="space-y-4">
                        {["Aarav Sharma - Class 10A", "Priya Verma - Class 8B", "Rohan Patel - Class 12C"].map((item, i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                                <p>{item}</p>
                                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">Today</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Exams */}
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">Upcoming Exams</h2>
                    <div className="space-y-4">
                        {[
                            "Mid-Term Exam - Class 9 to 12",
                            "Unit Test - Science & Maths",
                            "Final Practical Exam"
                        ].map((exam, i) => (
                            <div key={i} className="flex items-center gap-3 py-2">
                                <Award className="text-orange-500" />
                                <div>
                                    <p className="font-medium">{exam}</p>
                                    <p className="text-sm text-gray-500">In 3 days</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}