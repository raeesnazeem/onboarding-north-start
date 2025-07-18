import React, { useState, useEffect } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { client } from '../sanityClient';
import { SkeletonCard, EmptyState } from '../components/States';
import MaterialCard from '../components/MaterialCard';

const WikiList = ({ searchTerm, activeCategory, activeTag }) => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const data = await client.fetch(`*[_type == "guide"] | order(createdAt desc) {
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
        setGuides(data);
      } catch (error) {
        console.error('Error fetching guides:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (guide.excerpt && guide.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || guide.category === activeCategory;
    const matchesTag = !activeTag || (guide.tags && guide.tags.some(t => t.title === activeTag));
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Recent</h1>
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 rounded">
            <LayoutGrid size={20} />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <List size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
        ) : filteredGuides.length > 0 ? (
          filteredGuides.map(guide => (
            <MaterialCard key={guide._id} guide={guide} />
          ))
        ) : (
          <div className="col-span-full mt-10">
            <EmptyState 
              message="No materials found matching your criteria. Try adjusting your filters or search term." 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WikiList;
