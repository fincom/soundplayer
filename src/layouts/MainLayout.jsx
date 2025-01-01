import React from 'react';
import { useMediaQuery } from '@react-hook/media-query';

const MainLayout = ({ children }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="min-h-screen bg-itunes-bg font-sf">
      {isMobile ? (
        <div className="flex flex-col h-screen">
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      ) : (
        <div className="flex">
          <main className="flex-1">
            {children}
          </main>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
