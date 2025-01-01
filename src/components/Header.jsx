import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();

  return (
    <nav className="bg-itunes-button p-4 hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-lg hover:text-itunes-accent transition-colors duration-200"
          >
            {t('navigation.player')}
          </Link>
          <Link 
            to="/history" 
            className="text-lg hover:text-itunes-accent transition-colors duration-200"
          >
            {t('navigation.history')}
          </Link>
        </div>
        <Link 
          to="/settings" 
          className="text-lg hover:text-itunes-accent transition-colors duration-200"
        >
          {t('navigation.settings')}
        </Link>
      </div>
    </nav>
  );
};

export default Header;
