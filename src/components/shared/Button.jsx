import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, variant = 'primary', size = 'medium', className = '', ...props }) => {
  const baseStyles = 'rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 active:transform active:scale-95';
  
  const variants = {
    primary: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    secondary: 'bg-itunes-button hover:bg-itunes-hover text-itunes-text focus:ring-itunes-accent',
    outline: 'border-2 border-itunes-accent text-itunes-accent hover:bg-itunes-accent hover:text-white focus:ring-itunes-accent'
  };

  const sizes = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg'
  };

  return (
    <button
      {...props}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string
};

export default Button;
