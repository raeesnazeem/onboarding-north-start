import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Book, Inbox } from 'lucide-react';
import { client } from '../sanityClient';
import { SkeletonCard, EmptyState } from '../components/States';

const WikiList = () => {
  const [guides, setGuides] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [guidesData, categoriesData] = await Promise.all([
          client.fetch(`*[_type == "guide"]{
            _id,
            title,
            "slug": slug.current,
            difficulty,
            "category": category->title,
            author->{name}
          }`),
          client.fetch(`*[_type == "category"]{
            _id,
            title
          }`)
        ]);
        setGuides(guidesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data from Sanity:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400';
      case 'advanced': return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-10 text-center sm:text-left">
        <h1 className="text-4xl font-bold mb-3 text-text-light dark:text-white tracking-tight">Onboarding Guides</h1>
        <p className="text-lg text-text-muted-light dark:text-text-muted-dark">Find the information you need to get started.</p>
      </header>

      <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full">
        <div className="relative flex-grow">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark" />
          <input
            type="text"
            placeholder="Search guides..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
          />
        </div>

        <div className="relative min-w-[200px]">
          <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-12 pr-10 py-3 appearance-none bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer transition-shadow"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat.title}>{cat.title}</option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted-light dark:text-text-muted-dark"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
        ) : filteredGuides.length > 0 ? (
          filteredGuides.map(guide => (
            <Link 
              key={guide._id} 
              to={`/wiki/${guide.slug}`} 
              className="flex flex-col h-full bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Book size={20} />
                </div>
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${getDifficultyColor(guide.difficulty)}`}>
                  {guide.difficulty}
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-4 flex-grow text-text-light dark:text-text-dark leading-tight group-hover:text-primary transition-colors">
                {guide.title}
              </h3>
              
              <div className="flex justify-between items-center pt-4 border-t border-border-light dark:border-border-dark text-sm text-text-muted-light dark:text-text-muted-dark">
                <span className="font-medium bg-border-light dark:bg-border-dark px-2 py-1 rounded">
                  {guide.category || 'Uncategorized'}
                </span>
                <span>{guide.author?.name || 'Unknown'}</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full">
            <EmptyState 
              message="No guides found matching your criteria." 
              icon={Inbox} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WikiList;
