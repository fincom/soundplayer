import React from 'react';
import { useMediaQuery } from '@react-hook/media-query';

const Settings = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="p-6">
      {!isMobile && <h2 className="text-2xl font-bold text-itunes-text mb-4">Paramètres</h2>}
      <div className="space-y-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-itunes-text mb-2">Thème</h3>
          <p className="text-gray-400">Options de thème à venir...</p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-itunes-text mb-2">Audio</h3>
          <p className="text-gray-400">Paramètres audio à venir...</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
