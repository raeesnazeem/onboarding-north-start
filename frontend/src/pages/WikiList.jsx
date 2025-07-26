import React, { useState, useEffect } from 'react';
import { LayoutGrid, List, ChevronDown, Star, Clock, Type } from 'lucide-react';
import { client } from '../sanityClient';
import { SkeletonCard, EmptyState } from '../components/States';
import MaterialCard from '../components/MaterialCard';

const WikiList = ({ searchTerm, activeCategory, activeTag, activeTab }) => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('date'); // 'date', 'name', 'starred'

  const fetchGuides = async () => {
    const timer = setTimeout(() => setLoading(false), 5000);

    try {
      const data = await client.fetch(`*[_type == "guide"] {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        difficulty,
        cardColor,
        createdAt,
        isFavorite,
        "category": category->title,
        "tags": tags[]->{title},
        author->{name}
      }`);
      setGuides(data || []);
    } catch (error) {
      console.error('Error fetching guides:', error);
    } finally {
      clearTimeout(timer);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  const handleOptimisticUpdate = (id, newFavoriteStatus) => {
    setGuides(prevGuides => prevGuides.map(guide => 
      guide._id === id ? { ...guide, isFavorite: newFavoriteStatus } : guide
    ));
  };

  const sortedGuides = [...guides].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortBy === 'name') {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === 'starred') {
      if (a.isFavorite === b.isFavorite) return new Date(b.createdAt) - new Date(a.createdAt);
      return a.isFavorite ? -1 : 1;
    }
    return 0;
  });

  const filteredGuides = sortedGuides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (guide.excerpt && guide.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || guide.category === activeCategory;
    const matchesTag = !activeTag || (guide.tags && guide.tags.some(t => t.title === activeTag));
    const matchesTab = activeTab === 'favorites' ? !!guide.isFavorite : true;
    
    return matchesSearch && matchesCategory && matchesTag && matchesTab;
  });

  // Debug log to help identify filter issues
  useEffect(() => {
    if (guides.length > 0) {
      console.log('WikiList State:', {
        totalGuides: guides.length,
        activeTab,
        favoritesCount: guides.filter(g => !!g.isFavorite).length,
        filteredCount: filteredGuides.length
      });
    }
  }, [guides, activeTab, filteredGuides.length]);

  const pageTitle = activeTab === 'favorites' ? 'Favorites' : 'Inbase Guides';

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{pageTitle}</h1>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-gray-50 dark:bg-gray-800/50 border-none rounded-lg pl-10 pr-10 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="starred">Sort by Starred</option>
            </select>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              {sortBy === 'date' && <Clock size={16} />}
              {sortBy === 'name' && <Type size={16} />}
              {sortBy === 'starred' && <Star size={16} />}
            </div>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>

          <div className="flex items-center bg-gray-50 dark:bg-gray-800/50 rounded-lg p-1">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-all ${
                viewMode === 'grid' 
                  ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' 
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
              }`}
              title="Grid View"
            >
              <LayoutGrid size={20} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-all ${
                viewMode === 'list' 
                  ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' 
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
              }`}
              title="List View"
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "flex flex-col gap-4"}>
        {loading ? (
          [...Array(4)].map((_, i) => <SkeletonCard key={i} viewMode={viewMode} />)
        ) : filteredGuides.length > 0 ? (
          filteredGuides.map(guide => (
            <MaterialCard 
              key={guide._id} 
              guide={guide} 
              viewMode={viewMode} 
              onUpdate={fetchGuides} 
              onOptimisticUpdate={handleOptimisticUpdate}
            />
          ))
        ) : (
          <div className="col-span-full mt-10">
            <EmptyState 
              message={`No ${activeTab === 'favorites' ? 'favorite ' : ''}materials found matching your criteria. Try adjusting your filters or search term.`} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WikiList;
