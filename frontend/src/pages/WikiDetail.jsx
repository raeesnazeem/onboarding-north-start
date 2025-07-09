import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, BookOpen, AlertCircle } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { client, urlFor } from '../sanityClient';
import { SkeletonDetail, EmptyState } from '../components/States';

const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-8">
          <img
            src={urlFor(value).width(800).fit('max').auto('format').url()}
            alt={value.alt || ' '}
            className="rounded-lg shadow-md"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-500 mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }) => {
      return (
        <div className="code-block my-6">
          <div className="code-header">
            <span>{value.language || 'code'}</span>
          </div>
          <pre data-language={value.language}>
            <code>{value.code}</code>
          </pre>
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel} className="text-blue-500 hover:underline">
          {children}
        </a>
      );
    },
  },
};

const WikiDetail = () => {
  const { slug } = useParams();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "guide" && slug.current == $slug][0]{
            title,
            content,
            difficulty,
            createdAt,
            author->{
              name,
              image,
              bio
            },
            category->{
              title
            }
          }`,
          { slug }
        );
        setGuide(data);
      } catch (error) {
        console.error('Error fetching guide:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuide();
  }, [slug]);

  if (loading) return <SkeletonDetail />;
  
  if (!guide) return (
    <div className="guide-detail">
      <Link to="/wiki" className="back-link">
        <ArrowLeft size={18} /> Back to guides
      </Link>
      <EmptyState 
        message="Guide not found. It may have been moved or deleted." 
        icon={AlertCircle} 
      />
    </div>
  );

  return (
    <article className="guide-detail">
      <Link to="/wiki" className="back-link">
        <ArrowLeft size={18} /> Back to guides
      </Link>

      <header className="guide-header">
        <div className="guide-meta-top">
          <span className={`difficulty-badge ${guide.difficulty}`}>
            {guide.difficulty}
          </span>
          <span className="guide-category-detail">{guide.category?.title}</span>
        </div>
        
        <h1>{guide.title}</h1>

        <div className="guide-meta-bottom">
          <div className="meta-item">
            <User size={16} />
            <span>{guide.author?.name}</span>
          </div>
          <div className="meta-item">
            <Calendar size={16} />
            <span>{new Date(guide.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="meta-item">
            <BookOpen size={16} />
            <span>5 min read</span>
          </div>
        </div>
      </header>

      <div className="guide-content">
        <PortableText value={guide.content} components={ptComponents} />
      </div>

      <footer className="guide-footer">
        {guide.author && (
          <div className="author-card">
            {guide.author.image && (
              <img 
                src={urlFor(guide.author.image).width(100).height(100).url()} 
                alt={guide.author.name} 
              />
            )}
            <div className="author-info">
              <h4>Written by {guide.author.name}</h4>
              <p>{guide.author.bio}</p>
            </div>
          </div>
        )}
      </footer>
    </article>
  );
};

export default WikiDetail;
