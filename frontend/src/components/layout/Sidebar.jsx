// src/components/layout/Sidebar.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';

import {
    Home,
    Users,
    Trophy,
    School,
    BookOpen,
    Calendar,
    Award,
    DollarSign,
    BarChart3,
    Settings,
    Clock,
    ChevronDown,
    GraduationCap,
    ClipboardList,
    Bus,
    Building2,
    Library,
    MessageSquare,
    UserCog,
    Briefcase,
    Boxes,
    ShieldAlert,
    Phone,
    FileText,
    MonitorSmartphone,
    LayoutDashboard,
    NotebookPen,
} from 'lucide-react';

export default function Sidebar({ isOpen }) {

    const [openSubmenus, setOpenSubmenus] = useState({
        Dashboard: false,
        Admissions: false,
        "Student Management": false,
        "Academic Management": false,
        Timetable: false,
        Attendance: false,
        "Examination & Results": false,
        "Fees & Finance": false,
        "HR & Staff": false,
        LMS: false,
        Communication: false,
        Library: false,
        Transport: false,
        Hostel: false,
        "Inventory & Assets": false,
        "Events & Activities": false,
        Discipline: false,
        "Front Office": false,
        "Reports & Analytics": false,
        Settings: false,
        "Mobile App Controls": false,
        "College Specific": false,
    });

    const toggleSubmenu = (label) => {
        setOpenSubmenus((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };

    const menuItems = [
        {
            label: "Dashboard",
            icon: Home,
            submenu: [
                "Overview",
                "Analytics",
                "Notices",
                "Calendar",
                "Quick Actions",
                "Recent Activities",
                "KPIs",
                "Live Attendance",
                "Fee Summary",
            ],
        },
        {
            label: "Old Menu",
            icon: Home,
            submenu: [
                { name: "Students", path: "/students" },
                { name: "Teachers", path: "/teachers" },
                { name: "House/Add School Detail", path: "/house" },
                { name: "Classes", path: "/classes" },
                { name: "Subjects", path: "/subjects" },
                { name: "Attendance", path: "/attendance" },
                { name: "Exams & Results", path: "/exams" },
                { name: "Fees Management", path: "/fees" },
            ],
        },
        {
            label: "Admissions",
            icon: ClipboardList,
            submenu: [
                { name: "Admission Enquiry", path: "/admissions/enquiry" },
                { name: "Registration Form", path: "/" },
                { name: "Application Review", path: "/" },
                { name: "Document Verification", path: "/" },
                { name: "Merit List", path: "/" },
                { name: "Seat Allocation", path: "/" },
                { name: "Admission Confirmation", path: "/" },
                { name: "Student Onboarding", path: "/" },
                { name: "Entrance Exam", path: "/" },
                { name: "Waiting List", path: "/" },
            ],
        },

        {
            label: "Student Management",
            icon: Users,
            submenu: [
                { name: "Student List", path: "/admissions/enquiry" },
                // "Student List",
                // "Student Profile",
                // "Student ID Cards",
                // "Promote Students",
                // "Transfer Certificate",
                // "Student Documents",
                // "Student Attendance",
                // "Discipline Records",
                // "Medical Records",
                // "Alumni",
                //
                // "House Master",
                // "Assign Students to House",
                // "House Captains",
                // "House Points",
                // "House Competitions",
                // "House Attendance",
                // "Inter-House Results",
                //
                // "Sections",
                // "Batches",
                // "Clubs",
                // "Teams",
            ],
        },

        {
            label: "Academic Management",
            icon: GraduationCap,
            submenu: [
                { name: "Classes", path: "/admissions/enquiry" },
                "Sections",
                "Subjects",
                "Syllabus",
                "Lesson Plans",
                "Curriculum",
                "Academic Calendar",
                "Course Management",
                "Credits System",
                "Semester Management",
                "Program & Department",
            ],
        },

        {
            label: "Timetable",
            icon: Calendar,
            submenu: [
                "Class Timetable",
                "Teacher Timetable",
                "Exam Timetable",
                "Room Allocation",
                "Substitute Teacher",
                "Period Settings",
                "Bell Schedule",
            ],
        },

        {
            label: "Attendance",
            icon: Clock,
            submenu: [
                "Student Attendance",
                "Staff Attendance",
                "Biometric Sync",
                "QR Attendance",
                "Leave Attendance",
                "Reports",
                "Defaulters",
            ],
        },

        {
            label: "Examination & Results",
            icon: Award,
            submenu: [
                "Exam Types",
                "Exam Schedule",
                "Seating Plan",
                "Marks Entry",
                "Grade System",
                "Result Generation",
                "Report Cards",
                "Rank List",
                "GPA/CGPA",
                "Hall Tickets",
                "Transcript",
            ],
        },

        {
            label: "Fees & Finance",
            icon: DollarSign,
            submenu: [
                "Fee Structure",
                "Fee Collection",
                "Online Payments",
                "Scholarships",
                "Fine Management",
                "Refunds",
                "Expense Tracking",
                "Income Tracking",
                "Accounting",
                "Ledger",
                "GST",
                "Payroll",
                "Salary Slip",
            ],
        },

        {
            label: "HR & Staff",
            icon: UserCog,
            submenu: [
                "Staff Directory",
                "Recruitment",
                "Departments",
                "Designations",
                "Leave Management",
                "Payroll",
                "Performance Review",
                "Staff Attendance",
                "Contracts",
                "Staff ID Cards",
            ],
        },

        {
            label: "LMS",
            icon: BookOpen,
            submenu: [
                "Online Classes",
                "Study Material",
                "Homework",
                "Assignments",
                "Quizzes",
                "Recorded Lectures",
                "Discussion Forum",
                "Notes",
                "Downloads",
            ],
        },

        {
            label: "Communication",
            icon: MessageSquare,
            submenu: [
                "SMS",
                "Email",
                "Push Notifications",
                "WhatsApp Integration",
                "Circulars",
                "Announcements",
                "Parent Messaging",
                "Chat System",
                "Complaint Box",
            ],
        },

        {
            label: "Library",
            icon: Library,
            submenu: [
                "Books",
                "Categories",
                "Issue Books",
                "Return Books",
                "Fine Calculation",
                "Digital Library",
                "Barcode Management",
            ],
        },

        {
            label: "Transport",
            icon: Bus,
            submenu: [
                "Vehicles",
                "Routes",
                "Stops",
                "GPS Tracking",
                "Driver Management",
                "Transport Fees",
                "Student Allocation",
            ],
        },

        {
            label: "Hostel",
            icon: Building2,
            submenu: [
                "Hostel Buildings",
                "Rooms",
                "Bed Allocation",
                "Visitors",
                "Hostel Attendance",
                "Hostel Fees",
                "Mess Management",
            ],
        },

        {
            label: "Inventory & Assets",
            icon: Boxes,
            submenu: [
                "Inventory",
                "Stationery",
                "Asset Tracking",
                "Purchase Orders",
                "Vendors",
                "Stock Management",
                "Lab Equipment",
            ],
        },

        {
            label: "Events & Activities",
            icon: Trophy,
            submenu: [
                "Events",
                "Competitions",
                "Sports",
                "Clubs",
                "House Management",
                "Achievements",
                "Certificates",
                "Event Calendar",
            ],
        },

        {
            label: "Discipline",
            icon: ShieldAlert,
            submenu: [
                "Complaints",
                "Warnings",
                "Behaviour Tracking",
                "Suspensions",
                "Rewards",
                "House Points Integration",
            ],
        },

        {
            label: "Front Office",
            icon: Phone,
            submenu: [
                "Visitors",
                "Gate Pass",
                "Reception",
                "Courier Management",
                "Inquiry Desk",
                "Appointment Management",
            ],
        },

        {
            label: "Reports & Analytics",
            icon: BarChart3,
            submenu: [
                "Attendance Reports",
                "Fee Reports",
                "Academic Reports",
                "Staff Reports",
                "Custom Reports",
                "BI Dashboard",
                "Export Excel/PDF",
            ],
        },

        {
            label: "Settings",
            icon: Settings,
            submenu: [
                "School Settings",
                "Campus Settings",
                "Roles & Permissions",
                "User Management",
                "Workflow Automation",
                "Integrations",
                "API Keys",
                "Themes",
                "Backup & Restore",
            ],
        },

        {
            label: "Mobile App Controls",
            icon: MonitorSmartphone,
            submenu: [
                "App Notices",
                "Push Notifications",
                "Parent App",
                "Teacher App",
                "Student App",
                "App Permissions",
            ],
        },

        {
            label: "College Specific",
            icon: NotebookPen,
            submenu: [
                "Departments",
                "Programs",
                "Semesters",
                "Credits",
                "Internal Marks",
                "Research",
                "Placements",
                "Internship",
                "NAAC Reports",
                "Accreditation",
                "Faculty Workload",
                "Thesis Management",
            ],
        },
    ];

    return (
        <div className={`bg-white border-r border-gray-200 h-screen transition-all duration-300 flex-shrink-0 overflow-y-auto shadow-sm ${isOpen ? 'w-72' : 'w-20'
        }`}>

            {/* LOGO */}
            <div className="h-16 flex items-center px-6 border-b bg-gray-50 sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center">
                        <School size={28} className="text-white" />
                    </div>

                    {isOpen && (
                        <span className="text-2xl font-bold text-gray-800">
                            SchulRevive
                        </span>
                    )}
                </div>
            </div>

            {/* SIDEBAR MENU */}
            <nav className="p-4">

                {menuItems.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div key={index} className="mb-2">

                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleSubmenu(item.label);
                                }}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-700 transition"
                            >
                                <Icon size={22} />

                                {isOpen && (
                                    <>
                                        <span className="text-sm font-medium">
                                            {item.label}
                                        </span>

                                        <ChevronDown
                                            size={18}
                                            className={`ml-auto transition ${openSubmenus[item.label]
                                                ? 'rotate-180'
                                                : ''
                                            }`}
                                        />
                                    </>
                                )}
                            </a>

                            {/* SUBMENU */}
                            {isOpen && openSubmenus[item.label] && (
                                <ul className="ml-11 mt-1 space-y-1 border-l border-gray-200 pl-4">

                                    {item.submenu.map((subItem, subIndex) => (
                                        <li key={subIndex}>
                                            <Link
                                                to={subItem.path}
                                                className="block py-2 text-sm text-gray-600 hover:text-blue-600 transition"
                                            >
                                                {subItem.name}
                                            </Link>
                                        </li>
                                    ))}

                                </ul>
                            )}
                        </div>
                    );
                })}

            </nav>
        </div>
    );
}