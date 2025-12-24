import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, UtensilsCrossed } from 'lucide-react';
import PosPage from './PosPage';
import BookingPage from './BookingPage';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const getLinkClass = (path: string): string => {
    const baseClass = "p-3 rounded-xl transition-all";
    return location.pathname === path 
      ? `${baseClass} bg-blue-600 text-white` 
      : `${baseClass} text-gray-400 hover:bg-gray-800 hover:text-white`;
  };

  return (
    <nav className="w-20 bg-gray-900 h-screen flex flex-col items-center py-6 gap-6 fixed left-0 top-0 z-50">
      <div className="p-2 bg-blue-600 rounded-lg mb-4">
        <UtensilsCrossed size={24} className="text-white" />
      </div>
      
      <Link to="/" className={getLinkClass('/')}>
        <CalendarDays size={24} />
      </Link>
      
      <Link to="/pos" className={getLinkClass('/pos')}>
        <LayoutDashboard size={24} />
      </Link>
    </nav>
  );
};

export default function App() {
  return (
    <Router>
      <div className="flex pl-20">
        <Navigation />
        <main className="flex-1 w-full min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<BookingPage />} />
            <Route path="/pos" element={<PosPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}