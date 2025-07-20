import React from 'react';
import { Search, Bell, Plus, ChevronDown } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

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
    <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-[#1a1b1e] border-b border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-8 w-1/2">
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src="https://growth99.com/storage/2024/09/logo-growth99.svg" 
            alt="Growth99 Logo" 
            className="h-8 w-auto"
          />
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
             <span className="text-primary">inbase</span>
          </span>
        </Link>
        
        <div className="flex items-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
          <Link to="/" className="flex items-center gap-2 text-primary border-b-2 border-primary py-5">
            <span className="w-4 h-4 bg-primary/10 rounded flex items-center justify-center">
              <span className="w-2 h-2 bg-primary rounded-sm"></span>
            </span>
            Base
          </Link>
        </div>

        <div className="relative flex-1 max-w-md ml-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800/50 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-shadow text-gray-900 dark:text-white placeholder-gray-400"
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
        {/* We can keep a static profile icon just for the aesthetic of the reference image, but removed the fake dropdown arrow since it does nothing */}
        <div className="flex items-center gap-2 pl-4 border-l border-gray-100 dark:border-gray-800">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4" 
            alt="User avatar" 
            className="w-8 h-8 rounded-full bg-blue-100 border border-gray-200 dark:border-gray-700"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Workspace</span>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
