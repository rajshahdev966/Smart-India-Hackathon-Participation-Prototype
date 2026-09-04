/**
 * @file Card.jsx
 * @layer shared/ui
 * @description Flexible container card component with header, body, and footer slots.
 */

import React from 'react';

export const Card = ({ children, className = '', hoverable = false, ...props }) => {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden ${
        hoverable ? 'transition-all duration-200 hover:shadow-md hover:border-slate-300' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', title, subtitle, action }) => {
  return (
    <div className={`p-5 border-b border-slate-100 flex items-center justify-between ${className}`}>
      {title || subtitle ? (
        <div>
          {title && <h3 className="text-base font-semibold text-slate-900">{title}</h3>}
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      ) : (
        children
      )}
      {action && <div>{action}</div>}
    </div>
  );
};

export const CardBody = ({ children, className = '' }) => {
  return <div className={`p-5 ${className}`}>{children}</div>;
};

export const CardFooter = ({ children, className = '' }) => {
  return (
    <div className={`px-5 py-3.5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-end gap-3 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
