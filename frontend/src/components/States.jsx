import React from 'react';

export const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-header">
      <div className="skeleton-icon"></div>
      <div className="skeleton-badge"></div>
    </div>
    <div className="skeleton-title"></div>
    <div className="skeleton-footer">
      <div className="skeleton-text"></div>
      <div className="skeleton-text short"></div>
    </div>
  </div>
);

export const SkeletonDetail = () => (
  <div className="skeleton-detail">
    <div className="skeleton-back"></div>
    <div className="skeleton-meta-top">
      <div className="skeleton-badge"></div>
      <div className="skeleton-badge"></div>
    </div>
    <div className="skeleton-title-large"></div>
    <div className="skeleton-meta-bottom">
      <div className="skeleton-meta-item"></div>
      <div className="skeleton-meta-item"></div>
      <div className="skeleton-meta-item"></div>
    </div>
    <div className="skeleton-content-block"></div>
    <div className="skeleton-content-block"></div>
    <div className="skeleton-content-block"></div>
  </div>
);

export const EmptyState = ({ message, icon: Icon }) => (
  <div className="empty-state">
    {Icon && <Icon size={48} className="empty-icon" />}
    <p>{message}</p>
  </div>
);
