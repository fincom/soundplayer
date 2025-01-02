import React from 'react';
import PropTypes from 'prop-types';

const createTypographyComponent = (element, defaultClassName) => {
  const Component = ({ children, className = '', ...props }) => {
    const Element = element;
    return (
      <Element
        {...props}
        className={`font-sf ${defaultClassName} ${className}`}
      >
        {children}
      </Element>
    );
  };

  Component.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
  };

  return Component;
};

const Typography = {
  h1: createTypographyComponent('h1', 'text-2xl font-bold tracking-tight text-itunes-text'),
  h2: createTypographyComponent('h2', 'text-xl font-semibold text-itunes-text'),
  h3: createTypographyComponent('h3', 'text-lg font-medium text-itunes-text'),
  body: createTypographyComponent('p', 'text-base text-itunes-text'),
  bodySmall: createTypographyComponent('p', 'text-sm text-itunes-secondary'),
  label: createTypographyComponent('span', 'text-sm font-medium text-itunes-text'),
  error: createTypographyComponent('p', 'text-sm text-red-500')
};

export default Typography;
