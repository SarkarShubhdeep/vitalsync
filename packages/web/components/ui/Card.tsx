'use client';

import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const Card = ({ children, title, className = '', ...props }: CardProps) => {
  return (
    <div 
      className={`border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${className}`} 
      {...props}
    >
      {title && <h3 className="text-xl font-bold mb-4 border-b-2 border-black pb-2">{title}</h3>}
      {children}
    </div>
  );
};
