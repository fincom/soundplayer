import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="bg-itunes-bg border-b border-gray-700">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-itunes-text">
              SoundPlayer
            </Link>
            
            <div className="hidden md:flex space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium
                ${location.pathname === '/' 
                  ? 'text-itunes-accent' 
                  : 'text-gray-300 hover:text-white'}`}
              >
                Lecteur
              </Link>
              <Link
                to="/history"
                className={`px-3 py-2 rounded-md text-sm font-medium
                ${location.pathname === '/history' 
                  ? 'text-itunes-accent' 
                  : 'text-gray-300 hover:text-white'}`}
              >
                Historique
              </Link>
            </div>
          </div>
          
          <Link
            to="/settings"
            className={`px-3 py-2 rounded-md text-sm font-medium
            ${location.pathname === '/settings' 
              ? 'text-itunes-accent' 
              : 'text-gray-300 hover:text-white'}`}
          >
            Paramètres
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
