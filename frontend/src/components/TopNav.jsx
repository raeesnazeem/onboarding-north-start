import React from 'react';
import { Search, Bell, Plus, ChevronDown } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import profPic from '../assets/prof-pic.png';

const TopNav = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = (val) => {
    setSearchTerm(val);
    if (location.pathname !== '/' && val.trim() !== '') {
      navigate('/');
    }
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200">
      <div className="flex items-center gap-8 w-1/2">
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src="https://growth99.com/storage/2024/09/logo-growth99.svg" 
            alt="Growth99 Logo" 
            className="h-5 w-auto"
          />
          <span className="text-xl font-bold tracking-tight text-gray-900">
             <span className="text-primary">inbase</span>
          </span>
        </Link>
        
        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link to="/" className="flex items-center gap-2 text-primary border-b-2 border-primary py-5">
            <span className="w-4 h-4 bg-primary/10 rounded flex items-center justify-center">
              <span className="w-2 h-2 bg-primary rounded-sm"></span>
            </span>
            Base
          </Link>
        </div>

        <div className="relative flex-1 max-w-md ml-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <a 
          href="http://localhost:3333/structure/guide" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus size={16} /> Create
        </a>
        
        <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
          <img 
            src={profPic} 
            alt="Raees" 
            className="w-10 h-10 rounded-full object-cover border-2 border-primary shadow-sm"
          />
          <span className="text-sm font-bold text-gray-900">
            Raees
          </span>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
