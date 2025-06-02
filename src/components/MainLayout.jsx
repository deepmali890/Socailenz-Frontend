import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import LeftSideBar from './LeftSideBar';
import MobileMenu from './MobileMenu';


const MainLayout = () => {


  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="h-screen flex bg-black text-white overflow-hidden gap-4 " >
      
      {/* Sidebar */}
      <LeftSideBar/>
    

      {/* Main content with scroll */}
      <div className="flex-1 h-full overflow-y-auto p-4 md:ml-0 mb-16 md:mb-0  border-l border-neutral-800">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
              <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>

      {/* Mobile dock */}
   <MobileMenu/>
    </div>
  );
};

export default MainLayout;
