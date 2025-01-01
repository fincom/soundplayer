import React from 'react';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from '@react-hook/media-query';
import Header from '../components/Header';

const MainLayout = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="min-h-screen bg-itunes-bg font-sf">
      <Header />
      {isMobile ? (
        <div className="flex flex-col h-[calc(100vh-4rem)]">
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      ) : (
        <div className="flex">
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
