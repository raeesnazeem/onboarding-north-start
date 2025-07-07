import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Book } from 'lucide-react';
import { client } from '../sanityClient';

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

  if (loading) {
    return <div className="loading">Loading guides...</div>;
  }

  return (
    <div className="wiki-list-page">
      <header className="wiki-header">
        <h1>Onboarding Guides</h1>
        <p>Find the information you need to get started.</p>
      </header>

      <div className="wiki-controls">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search guides..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-filter">
          <Filter size={18} className="filter-icon" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat.title}>{cat.title}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="guides-grid">
        {filteredGuides.length > 0 ? (
          filteredGuides.map(guide => (
            <Link key={guide._id} to={`/wiki/${guide.slug}`} className="guide-card">
              <div className="guide-card-header">
                <Book size={24} className="guide-icon" />
                <span className={`difficulty-badge ${guide.difficulty}`}>
                  {guide.difficulty}
                </span>
              </div>
              <h3>{guide.title}</h3>
              <div className="guide-card-footer">
                <span className="guide-category">{guide.category || 'Uncategorized'}</span>
                <span className="guide-author">By {guide.author?.name || 'Unknown'}</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="no-results">
            No guides found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default WikiList;
