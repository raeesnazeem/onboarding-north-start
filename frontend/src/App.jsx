import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { client } from './sanityClient'
import TopNav from './components/TopNav'
import Sidebar from './components/Sidebar'
import WikiList from './pages/WikiList'
import WikiDetail from './pages/WikiDetail'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTag, setActiveTag] = useState(null);
  const [activeTab, setActiveTab] = useState('recent'); // 'recent' or 'favorites'
  
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        const [cats, tgs] = await Promise.all([
          client.fetch(`*[_type == "category"]{ _id, title }`),
          client.fetch(`*[_type == "tag"]{ _id, title }`)
        ]);
        setCategories(cats);
        setTags(tgs);
      } catch (error) {
        console.error("Failed to fetch sidebar data:", error);
        setError("⚠️ Could not connect to Sanity. Please check your CORS settings at sanity.io/manage.");
      }
    };
    fetchSidebarData();
  }, []);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="flex flex-col min-h-screen bg-white dark:bg-[#121212] font-sans">
        {error && (
          <div className="bg-red-500 text-white p-2 text-center text-xs font-bold animate-pulse">
            {error}
          </div>
        )}
        <TopNav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <div className="flex flex-1 overflow-hidden h-[calc(100vh-64px)]">
          <Sidebar 
            categories={categories}
            tags={tags}
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory}
            activeTag={activeTag}
            setActiveTag={setActiveTag}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          
          <main className="flex-1 overflow-y-auto bg-white dark:bg-[#121212] p-8">
            <div className="max-w-[1200px] mx-auto">
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <WikiList 
                      searchTerm={searchTerm} 
                      activeCategory={activeCategory} 
                      activeTag={activeTag} 
                      activeTab={activeTab}
                    />
                  } 
                />
                <Route path="/wiki/:slug" element={<WikiDetail />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
