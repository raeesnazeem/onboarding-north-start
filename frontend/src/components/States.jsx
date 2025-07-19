import React from 'react';

export const SkeletonCard = () => (
  <div className="flex flex-col h-full bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-2xl p-6 gap-4">
    <div className="flex justify-between items-start">
      <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-800 shimmer-effect"></div>
      <div className="w-20 h-6 rounded-full bg-gray-200 dark:bg-gray-800 shimmer-effect"></div>
    </div>
    <div className="w-3/4 h-6 bg-gray-200 dark:bg-gray-800 rounded mt-2 shimmer-effect"></div>
    <div className="flex justify-between items-center pt-4 border-t border-border-light dark:border-border-dark mt-auto">
      <div className="w-1/3 h-5 bg-gray-200 dark:bg-gray-800 rounded shimmer-effect"></div>
      <div className="w-1/4 h-5 bg-gray-200 dark:bg-gray-800 rounded shimmer-effect"></div>
    </div>
  </div>
);

export const SkeletonDetail = () => (
  <div className="max-w-3xl mx-auto py-12">
    <div className="w-32 h-5 bg-gray-200 dark:bg-gray-800 rounded mb-8 shimmer-effect"></div>
    
    <div className="mb-12 pb-8 border-b border-border-light dark:border-border-dark">
      <div className="flex gap-3 mb-6">
        <div className="w-24 h-7 bg-gray-200 dark:bg-gray-800 rounded-full shimmer-effect"></div>
        <div className="w-32 h-7 bg-gray-200 dark:bg-gray-800 rounded-full shimmer-effect"></div>
      </div>
      
      <div className="w-full h-12 bg-gray-200 dark:bg-gray-800 rounded-lg mb-8 shimmer-effect"></div>
      
      <div className="flex gap-6">
        <div className="w-24 h-5 bg-gray-200 dark:bg-gray-800 rounded shimmer-effect"></div>
        <div className="w-32 h-5 bg-gray-200 dark:bg-gray-800 rounded shimmer-effect"></div>
        <div className="w-24 h-5 bg-gray-200 dark:bg-gray-800 rounded shimmer-effect"></div>
      </div>
    </div>

    <div className="space-y-4">
      <div className="w-full h-4 bg-gray-200 dark:bg-gray-800 rounded shimmer-effect"></div>
      <div className="w-[90%] h-4 bg-gray-200 dark:bg-gray-800 rounded shimmer-effect"></div>
      <div className="w-[95%] h-4 bg-gray-200 dark:bg-gray-800 rounded shimmer-effect"></div>
      <div className="w-[80%] h-4 bg-gray-200 dark:bg-gray-800 rounded shimmer-effect"></div>
    </div>
  </div>
);

export const EmptyState = ({ message, icon: Icon }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-20 px-4 text-center">
    {Icon && (
      <div className="w-20 h-20 mb-6 rounded-full bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark flex items-center justify-center text-text-muted-light dark:text-text-muted-dark opacity-50">
        <Icon size={40} />
      </div>
    )}
    <h3 className="text-xl font-medium text-text-light dark:text-white mb-2">No results found</h3>
    <p className="text-text-muted-light dark:text-text-muted-dark max-w-md mb-8">
      {message}
    </p>
    <a 
      href="http://localhost:3333/structure/guide" 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-xl font-bold transition-all hover:-translate-y-0.5 shadow-lg shadow-yellow-400/20"
    >
      Create your first material
    </a>
  </div>
);
