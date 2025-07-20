import React from 'react';
import { ChevronUp } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ 
  categories = [], 
  tags = [], 
  activeCategory, 
  setActiveCategory, 
  activeTag, 
  setActiveTag,
  activeTab,
  setActiveTab 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleFilterClick = (action) => {
    action();
    // If we're not on the home page, navigate back to it so the results are visible
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col gap-6 py-8 pr-6 border-r border-gray-100 dark:border-gray-800 h-[calc(100vh-64px)] overflow-y-auto bg-white dark:bg-[#1a1b1e]">
      <div className="flex flex-col gap-1">
        <button 
          onClick={() => handleFilterClick(() => setActiveTab('recent'))}
          className={`flex items-center text-left px-4 py-2.5 rounded-full font-medium text-sm w-full transition-colors ${
            activeTab === 'recent' 
              ? 'bg-primary/10 text-primary dark:text-white' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
          }`}
        >
          Recent materials
        </button>
        <button 
          onClick={() => handleFilterClick(() => setActiveTab('favorites'))}
          className={`flex items-center text-left px-4 py-2.5 rounded-full font-medium text-sm w-full transition-colors ${
            activeTab === 'favorites' 
              ? 'bg-primary/10 text-primary dark:text-white' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
          }`}
        >
          Favorites
        </button>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-200">
          Categories
          <ChevronUp size={16} className="text-gray-400" />
        </div>
        <div className="flex flex-col mt-2 pl-4">
          <button 
            onClick={() => handleFilterClick(() => setActiveCategory('all'))}
            className={`flex items-center gap-3 px-4 py-2 text-sm text-left rounded-lg transition-colors ${
              activeCategory === 'all' 
                ? 'text-gray-900 dark:text-white font-medium bg-gray-50 dark:bg-gray-800/50' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></span>
            All
          </button>
          {categories.map((cat, i) => {
            const colors = ['bg-blue-400', 'bg-purple-400', 'bg-red-400', 'bg-green-400', 'bg-primary'];
            const colorClass = colors[i % colors.length];
            return (
              <button 
                key={cat._id}
                onClick={() => handleFilterClick(() => setActiveCategory(cat.title))}
                className={`flex items-center gap-3 px-4 py-2 text-sm text-left rounded-lg transition-colors ${
                  activeCategory === cat.title 
                    ? 'text-gray-900 dark:text-white font-medium bg-gray-50 dark:bg-gray-800/50' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${colorClass}`}></span>
                {cat.title}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-200">
          My tags
          <ChevronUp size={16} className="text-gray-400" />
        </div>
        <div className="flex flex-col mt-2 pl-4">
          {tags.map(tag => (
            <button 
              key={tag._id}
              onClick={() => handleFilterClick(() => setActiveTag(activeTag === tag.title ? null : tag.title))}
              className={`flex items-center px-4 py-1.5 text-sm text-left rounded-lg transition-colors ${
                activeTag === tag.title 
                  ? 'text-gray-900 dark:text-white font-medium' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              #{tag.title}
            </button>
          ))}
          {(!tags || tags.length === 0) && (
            <div className="px-4 py-1.5 text-sm text-gray-400">No tags available</div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
