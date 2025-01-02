import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Music2, History, Settings } from 'lucide-react';

const MobileNavigation = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const navItems = [
    {
      path: '/',
      label: t('navigation.player'),
      ariaLabel: t('navigation.player_aria'),
      icon: Music2
    },
    {
      path: '/history',
      label: t('navigation.history'),
      ariaLabel: t('navigation.history_aria'),
      icon: History
    },
    {
      path: '/settings',
      label: t('navigation.settings'),
      ariaLabel: t('navigation.settings_aria'),
      icon: Settings
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-itunes-button border-t border-itunes-border md:hidden" 
         aria-label={t('navigation.mobile_nav_aria')}>
      <div className="grid grid-cols-3 gap-1">
        {navItems.map(({ path, label, ariaLabel, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center py-3 px-2 transition-all duration-200
                ${isActive 
                  ? 'text-red-600' 
                  : 'text-itunes-secondary hover:text-itunes-text'}`}
              aria-label={ariaLabel}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon 
                className={`w-6 h-6 mb-1 transition-transform duration-200 
                  ${isActive ? 'scale-110' : 'scale-100'}`} 
              />
              <span className="text-xs font-medium truncate max-w-[80px] text-center">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavigation;
