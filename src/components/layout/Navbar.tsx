import React from 'react';
import { MenuIcon, GlobeAltIcon, SearchIcon, ClockIcon, LayersIcon, MapPinIcon } from '@heroicons/react/outline';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={onMenuClick}
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon className="block h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-shrink-0 flex items-center ml-4">
              <GlobeAltIcon className="h-8 w-8 text-red-500" />
              <h1 className="text-xl font-bold ml-2">Mars Explorer</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">
              <SearchIcon className="h-5 w-5 mr-1" />
              <span>Search</span>
            </button>
            <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">
              <LayersIcon className="h-5 w-5 mr-1" />
              <span>Layers</span>
            </button>
            <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">
              <ClockIcon className="h-5 w-5 mr-1" />
              <span>Timeline</span>
            </button>
            <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">
              <MapPinIcon className="h-5 w-5 mr-1" />
              <span>Markers</span>
            </button>
          </div>
          
          <div className="flex items-center">
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
