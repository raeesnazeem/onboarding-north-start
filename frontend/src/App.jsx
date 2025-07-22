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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        // First try to fetch current user info from Sanity API
        let currentUser = null;
        try {
          // Attempt to get the currently logged-in user from Sanity
          // This works if the browser has a valid session for the Sanity project
          const sanityUser = await client.users.getMe();
          if (sanityUser) {
            currentUser = {
              name: sanityUser.name || sanityUser.displayName,
              imageUrl: sanityUser.profileImage || sanityUser.imageUrl
            };
          }
        } catch {
          // Fallback: Fetch the first author document as a proxy for the "current user"
          // We look for "Mohammed Raees Nazeem" specifically if it exists as per previous queries
          const authorData = await client.fetch(`*[_type == "author" && (name match "Raees" || _id == "author-raees")][0]{ 
            name, 
            "imageUrl": image.asset->url 
          } || *[_type == "author"][0]{ 
            name, 
            "imageUrl": image.asset->url 
          }`);
          
          if (authorData) {
            currentUser = authorData;
          }
        }

        const [cats, tgs] = await Promise.all([
          client.fetch(`*[_type == "category"]{ _id, title }`),
          client.fetch(`*[_type == "tag"]{ _id, title }`)
        ]);

        setCategories(cats);
        setTags(tgs);
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("⚠️ Could not connect to Sanity. Please check your CORS settings at sanity.io/manage.");
      }
    };
    fetchSidebarData();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white dark:bg-[#121212] font-sans">
        {error && (
          <div className="bg-red-500 text-white p-2 text-center text-xs font-bold animate-pulse">
            {error}
          </div>
        )}
        <TopNav searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user} />
        
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
