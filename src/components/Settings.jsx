import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useMediaQuery } from '@react-hook/media-query';

const Settings = () => {
  const { isDark, setIsDark } = useTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="container mx-auto px-4 py-8">
      {!isMobile && <h1 className="text-3xl font-bold text-itunes-text mb-8">Paramètres</h1>}
      
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gray-800 bg-opacity-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <span className="text-lg text-itunes-text">Thème sombre</span>
            <span className="text-sm text-gray-400">
              {isDark ? 'Activé' : 'Désactivé'}
            </span>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
              ${isDark ? 'bg-itunes-accent' : 'bg-gray-600'}`}
            role="switch"
            aria-checked={isDark}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                ${isDark ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
        </div>

        <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg">
          <label className="text-lg text-itunes-text block mb-2">
            Vitesse de lecture par défaut
          </label>
          <select 
            className="w-full p-2 bg-gray-700 rounded text-white border border-gray-600 focus:border-itunes-accent focus:ring-1 focus:ring-itunes-accent outline-none"
            defaultValue="1"
          >
            <option value="0.5">0.5x</option>
            <option value="0.75">0.75x</option>
            <option value="1">1x (Normal)</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-800 bg-opacity-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <span className="text-lg text-itunes-text">Notifications</span>
            <span className="text-sm text-gray-400">Bientôt disponible</span>
          </div>
          <button
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600 cursor-not-allowed opacity-50"
            disabled
          >
            <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
