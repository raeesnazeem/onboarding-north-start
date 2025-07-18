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
        <figure className="my-10">
          <img
            src={urlFor(value).width(800).fit('max').auto('format').url()}
            alt={value.alt || ' '}
            className="rounded-xl shadow-lg border border-border-light dark:border-border-dark w-full object-cover"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-text-muted-light dark:text-text-muted-dark mt-3 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }) => {
      return (
        <div className="my-8 rounded-xl overflow-hidden border border-border-light dark:border-border-dark bg-[#0d1117] shadow-lg">
          <div className="flex items-center px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
            <span className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider">
              {value.language || 'code'}
            </span>
          </div>
          <pre data-language={value.language} className="p-4 overflow-x-auto text-sm font-mono text-[#e6edf3]">
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
        <a href={value.href} rel={rel} className="text-primary hover:text-primary-hover underline decoration-primary/30 underline-offset-2 transition-colors">
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
      const timer = setTimeout(() => setLoading(false), 5000);
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
        clearTimeout(timer);
        setLoading(false);
      }
    };

    fetchGuide();
  }, [slug]);

  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400';
      case 'advanced': return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400';
    }
  };

  if (loading) return <SkeletonDetail />;
  
  if (!guide) return (
    <div className="max-w-3xl mx-auto py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium mb-8 transition-colors">
        <ArrowLeft size={18} /> Back to materials
      </Link>
      <EmptyState 
        message="Material not found. It may have been moved or deleted." 
        icon={AlertCircle} 
      />
    </div>
  );

  return (
    <article className="max-w-3xl mx-auto pb-16">
      <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium mb-8 transition-colors">
        <ArrowLeft size={18} /> Back to materials
      </Link>

      <header className="mb-12 pb-8 border-b border-border-light dark:border-border-dark">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className={`px-3 py-1 text-sm font-semibold rounded-full capitalize ${getDifficultyColor(guide.difficulty)}`}>
            {guide.difficulty}
          </span>
          {guide.category && (
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark text-text-muted-light dark:text-text-muted-dark">
              {guide.category.title}
            </span>
          )}
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-extrabold text-text-light dark:text-white leading-tight tracking-tight mb-8">
          {guide.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-text-muted-light dark:text-text-muted-dark">
          {guide.author && (
            <div className="flex items-center gap-2">
              <User size={16} />
              <span className="font-medium">{guide.author.name}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <time dateTime={guide.createdAt}>
              {new Date(guide.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen size={16} />
            <span>5 min read</span>
          </div>
        </div>
      </header>

      <div className="prose-custom">
        <PortableText value={guide.content} components={ptComponents} />
      </div>

      {guide.author && (
        <footer className="mt-16 pt-10 border-t border-border-light dark:border-border-dark">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark p-8 rounded-2xl">
            {guide.author.image ? (
              <img 
                src={urlFor(guide.author.image).width(100).height(100).url()} 
                alt={guide.author.name} 
                className="w-20 h-20 rounded-full object-cover border-2 border-primary shadow-md"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center border-2 border-primary shadow-md">
                <User size={32} />
              </div>
            )}
            <div className="text-center sm:text-left">
              <h4 className="text-lg font-bold text-text-light dark:text-white mb-2">
                Written by {guide.author.name}
              </h4>
              <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                {guide.author.bio || 'A valued contributor to the onboarding wiki.'}
              </p>
            </div>
          </div>
        </footer>
      )}
    </article>
  );
};

export default WikiDetail;
