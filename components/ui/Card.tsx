
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-[--card-background] border border-[--card-border] rounded-xl shadow-sm ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({ children, className = '' }) => {
    return <div className={`p-6 border-b border-[--card-border] ${className}`}>{children}</div>;
};

export const CardContent: React.FC<CardProps> = ({ children, className = '' }) => {
    return <div className={`p-6 ${className}`}>{children}</div>;
};

export const CardTitle: React.FC<CardProps & { as?: 'h1' | 'h2' | 'h3' | 'h4' }> = ({ children, as: Component = 'h3', className = '' }) => {
    return <Component className={`text-xl font-semibold text-[--text-title] ${className}`}>{children}</Component>;
}

export const CardDescription: React.FC<CardProps> = ({ children, className = '' }) => {
    return <p className={`text-sm text-[--text-secondary] mt-1 ${className}`}>{children}</p>;
}
