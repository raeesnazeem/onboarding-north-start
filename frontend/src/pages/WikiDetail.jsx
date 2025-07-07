import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const WikiDetail = () => {
  const { slug } = useParams();

  return (
    <div className="wiki-detail">
      <Link to="/wiki" className="back-link">
        <ArrowLeft size={18} /> Back to list
      </Link>
      <article>
        <h1>Guide: {slug.replace(/-/g, ' ')}</h1>
        <div className="content-placeholder">
          <p>Content will be loaded from Sanity soon...</p>
        </div>
      </article>
    </div>
  );
};

export default WikiDetail;
