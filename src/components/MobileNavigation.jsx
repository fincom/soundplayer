import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PlayCircle, Clock, Settings } from 'lucide-react';

const MobileNavigation = () => {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 w-full bg-itunes-bg border-t border-gray-700">
      <div className="flex justify-around items-center h-16">
        <Link
          to="/"
          className="flex flex-col items-center"
          aria-current={location.pathname === '/' ? 'page' : undefined}
        >
          <PlayCircle
            size={24}
            className={location.pathname === '/' ? 'text-itunes-accent' : 'text-gray-300'}
          />
          <span className={`text-xs mt-1 ${
            location.pathname === '/' ? 'text-itunes-accent' : 'text-gray-300'
          }`}>
            Lecteur
          </span>
        </Link>

        <Link
          to="/history"
          className="flex flex-col items-center"
          aria-current={location.pathname === '/history' ? 'page' : undefined}
        >
          <Clock
            size={24}
            className={location.pathname === '/history' ? 'text-itunes-accent' : 'text-gray-300'}
          />
          <span className={`text-xs mt-1 ${
            location.pathname === '/history' ? 'text-itunes-accent' : 'text-gray-300'
          }`}>
            Historique
          </span>
        </Link>

        <Link
          to="/settings"
          className="flex flex-col items-center"
          aria-current={location.pathname === '/settings' ? 'page' : undefined}
        >
          <Settings
            size={24}
            className={location.pathname === '/settings' ? 'text-itunes-accent' : 'text-gray-300'}
          />
          <span className={`text-xs mt-1 ${
            location.pathname === '/settings' ? 'text-itunes-accent' : 'text-gray-300'
          }`}>
            Paramètres
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default MobileNavigation;
