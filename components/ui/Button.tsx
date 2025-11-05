
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--primary] disabled:opacity-50 disabled:pointer-events-none px-4 py-2';

  const variantClasses = {
    primary: 'bg-[--primary] text-[--text-on-primary] hover:bg-[--primary-focus]',
    secondary: 'bg-[--background-secondary] text-[--text-primary] hover:bg-[--accent]/20 border border-[--card-border]',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
