import React from 'react';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from '@react-hook/media-query';
import Header from '../components/Header';
import MobileNavigation from '../components/MobileNavigation';

const MainLayout = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="min-h-screen bg-itunes-bg font-sf">
      <Header showTitle={!isMobile} />
      <div className={`flex flex-col ${isMobile ? 'h-[calc(100vh-8rem)]' : 'h-[calc(100vh-4rem)]'}`}>
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
      {isMobile && <MobileNavigation />}
    </div>
  );
};

export default MainLayout;
