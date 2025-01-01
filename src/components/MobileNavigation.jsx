import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MobileNavigation = () => {
  const { t } = useTranslation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-itunes-button md:hidden">
      <div className="grid grid-cols-3 gap-1 p-2">
        <Link 
          to="/" 
          className="flex flex-col items-center justify-center p-2 hover:text-itunes-accent transition-colors duration-200"
        >
          <span className="text-sm">{t('navigation.player')}</span>
        </Link>
        <Link 
          to="/history" 
          className="flex flex-col items-center justify-center p-2 hover:text-itunes-accent transition-colors duration-200"
        >
          <span className="text-sm">{t('navigation.history')}</span>
        </Link>
        <Link 
          to="/settings" 
          className="flex flex-col items-center justify-center p-2 hover:text-itunes-accent transition-colors duration-200"
        >
          <span className="text-sm">{t('navigation.settings')}</span>
        </Link>
      </div>
    </nav>
  );
};

export default MobileNavigation;
