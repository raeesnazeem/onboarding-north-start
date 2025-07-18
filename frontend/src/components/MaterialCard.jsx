import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MoreVertical } from 'lucide-react';

const MaterialCard = ({ guide, viewMode = 'grid' }) => {
  // Map standard colors to pastel variants matching the design
  const getBgColor = (colorStr) => {
    switch(colorStr?.toLowerCase()) {
      case 'blue': return 'bg-[#e5f6fd] dark:bg-blue-900/20';
      case 'purple': return 'bg-[#f4e8ff] dark:bg-purple-900/20';
      case 'red': return 'bg-[#fee8e7] dark:bg-red-900/20';
      case 'green': return 'bg-[#e2fbed] dark:bg-green-900/20';
      case 'yellow': return 'bg-[#fef4d8] dark:bg-yellow-900/20';
      default: return 'bg-[#f8f9fa] dark:bg-gray-800/50';
    }
  };

  const getTagColor = (colorStr) => {
    switch(colorStr?.toLowerCase()) {
      case 'blue': return 'bg-blue-500 text-white';
      case 'purple': return 'bg-purple-500 text-white';
      case 'red': return 'bg-red-500 text-white';
      case 'green': return 'bg-green-500 text-white';
      case 'yellow': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const bgClass = getBgColor(guide.cardColor || 'blue');
  const primaryTagClass = getTagColor(guide.cardColor || 'blue');

  if (viewMode === 'list') {
    return (
      <div className={`relative flex items-center p-4 rounded-xl transition-all hover:shadow-md ${bgClass}`}>
        <Link to={`/wiki/${guide.slug}`} className="flex-grow flex items-center gap-6 group overflow-hidden">
          <div className="flex-shrink-0 w-24 hidden sm:block">
            <time className="text-xs font-semibold text-gray-500 dark:text-gray-400 block" dateTime={guide.createdAt}>
              {new Date(guide.createdAt).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
              }).replace(/\//g, '.')}
            </time>
          </div>

          <div className="flex-grow min-w-0">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate group-hover:text-yellow-600 transition-colors">
              {guide.title}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 truncate mt-1">
              {guide.excerpt || 'No description available.'}
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            {guide.category && (
              <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${primaryTagClass}`}>
                {guide.category}
              </span>
            )}
            {guide.tags?.slice(0, 2).map((tag, i) => (
              <span key={i} className="px-2.5 py-0.5 text-[10px] font-medium rounded-full bg-white/60 dark:bg-black/20 text-gray-600 dark:text-gray-400">
                #{tag.title}
              </span>
            ))}
          </div>
        </Link>

        <div className="flex items-center gap-2 ml-4 flex-shrink-0">
          <button className="text-gray-400 hover:text-yellow-500 transition-colors p-1">
            <Star size={16} className={guide.isFavorite ? 'fill-yellow-500 text-yellow-500' : ''} />
          </button>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col p-6 rounded-2xl transition-transform hover:-translate-y-1 ${bgClass}`}>
      <Link to={`/wiki/${guide.slug}`} className="flex-grow flex flex-col group">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight mb-3 group-hover:underline decoration-2 underline-offset-2">
          {guide.title}
        </h3>
        
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
          <time dateTime={guide.createdAt}>
            {new Date(guide.createdAt).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit'
            }).replace(/\//g, '.')}
          </time>
          {guide.author && (
            <>
              <span>•</span>
              <span>{guide.author.name}</span>
            </>
          )}
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6 line-clamp-3">
          {guide.excerpt || 'No excerpt available for this material.'}
        </p>

        <div className="flex items-center gap-2 mt-auto flex-wrap">
          {guide.category && (
            <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${primaryTagClass}`}>
              {guide.category}
            </span>
          )}
          {guide.tags?.map((tag, i) => (
            <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-white/60 dark:bg-black/20 text-gray-700 dark:text-gray-300">
              #{tag.title}
            </span>
          ))}
        </div>
      </Link>

      <div className="absolute bottom-6 right-6 flex items-center gap-3">
        <button className="text-gray-400 hover:text-yellow-500 transition-colors">
          <Star size={18} className={guide.isFavorite ? 'fill-yellow-500 text-yellow-500' : ''} />
        </button>
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
          <MoreVertical size={18} />
        </button>
      </div>
    </div>
  );
};

export default MaterialCard;
