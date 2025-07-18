import React from 'react';
import { Search, Bell, Plus, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopNav = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-[#1a1b1e] border-b border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-8 w-1/2">
        <Link to="/" className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          inbase
        </Link>
        
        <div className="flex items-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
          <Link to="/" className="flex items-center gap-2 text-yellow-500 border-b-2 border-yellow-500 py-5">
            <span className="w-4 h-4 bg-yellow-100 rounded flex items-center justify-center">
              <span className="w-2 h-2 bg-yellow-500 rounded-sm"></span>
            </span>
            Base
          </Link>
          <button className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-white transition-colors">
            <span className="w-4 h-4 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </span>
            Team
          </button>
          <button className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-white transition-colors">
            <span className="w-4 h-4 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </span>
            Calendar
          </button>
        </div>

        <div className="relative flex-1 max-w-md ml-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800/50 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-shadow text-gray-900 dark:text-white placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
          Create <ChevronDown size={14} />
        </button>
        
        <button className="relative p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1a1b1e]"></span>
        </button>

        <div className="flex items-center gap-2 pl-4 border-l border-gray-100 dark:border-gray-800 cursor-pointer">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4" 
            alt="User avatar" 
            className="w-8 h-8 rounded-full bg-blue-100 border border-gray-200 dark:border-gray-700"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Techhouse</span>
          <ChevronDown size={14} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
};

export default TopNav;
