import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import House from './pages/House.jsx';

function App() {
    return (
        <Router>
            <div className="flex h-screen bg-gray-50 overflow-hidden">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content Area */}
                <div className="flex-1 overflow-auto">
                    <Routes>
                        <Route path="/" element={
                            <div className="p-10">
                                <h1 className="text-4xl font-bold text-gray-800">Welcome to SchulRevive</h1>
                                <p className="text-gray-600 mt-2">Academic Management System</p>
                            </div>
                        } />

                        <Route path="/houses" element={<House />} />


                        {/* Baad mein aur routes add kar sakte hain */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;