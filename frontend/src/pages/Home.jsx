import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Onboarding Wiki</h1>
      <p>Your guide to getting started and mastering our processes.</p>
      <Link to="/wiki" className="cta-button">
        Browse Guides <ArrowRight size={20} />
      </Link>
      
      <div className="features">
        <div className="feature-card">
          <BookOpen size={32} />
          <h3>Comprehensive Guides</h3>
          <p>Step-by-step instructions for everything you need.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
