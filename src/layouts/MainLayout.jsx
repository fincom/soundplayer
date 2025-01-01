import React from 'react';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from '@react-hook/media-query';
import Header from '../components/Header';
import MobileNavigation from '../components/MobileNavigation';

const MainLayout = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="min-h-screen bg-itunes-bg font-sf">
      {!isMobile && <Header />}
      <div className={`flex flex-col ${isMobile ? 'h-[calc(100vh-4rem)]' : 'h-screen'}`}>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      {isMobile && <MobileNavigation />}
    </div>
  );
};

export default MainLayout;
