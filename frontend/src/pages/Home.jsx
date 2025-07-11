import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Compass, ShieldCheck } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] max-w-4xl mx-auto text-center px-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        Welcome to your new home base
      </div>

      <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 text-text-light dark:text-white">
        Your Journey Starts <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Here</span>
      </h1>
      
      <p className="text-xl sm:text-2xl text-text-muted-light dark:text-text-muted-dark mb-10 max-w-2xl">
        Master our processes, setup your environment, and get up to speed faster with our comprehensive onboarding wiki.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <Link 
          to="/wiki" 
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-primary/25"
        >
          Browse Guides <ArrowRight size={20} />
        </Link>
        <a 
          href="#features" 
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark font-semibold hover:bg-border-light dark:hover:bg-border-dark transition-colors duration-200"
        >
          Learn More
        </a>
      </div>
      
      <div id="features" className="grid sm:grid-cols-3 gap-6 w-full mt-12 pt-12 border-t border-border-light dark:border-border-dark text-left">
        <div className="p-6 rounded-2xl bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark hover:border-primary/50 transition-colors">
          <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
            <BookOpen size={24} />
          </div>
          <h3 className="text-lg font-bold mb-2">Comprehensive Guides</h3>
          <p className="text-text-muted-light dark:text-text-muted-dark text-sm">Step-by-step instructions for environment setup, code style, and deployment.</p>
        </div>
        
        <div className="p-6 rounded-2xl bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark hover:border-primary/50 transition-colors">
          <div className="w-12 h-12 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center mb-4">
            <Compass size={24} />
          </div>
          <h3 className="text-lg font-bold mb-2">Clear Navigation</h3>
          <p className="text-text-muted-light dark:text-text-muted-dark text-sm">Easily find what you need with categorized content and powerful search.</p>
        </div>

        <div className="p-6 rounded-2xl bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark hover:border-primary/50 transition-colors">
          <div className="w-12 h-12 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-lg font-bold mb-2">Always Up-to-date</h3>
          <p className="text-text-muted-light dark:text-text-muted-dark text-sm">Content is managed via Sanity CMS ensuring you always have the latest info.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
