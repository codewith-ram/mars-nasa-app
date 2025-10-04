import React from 'react';
import { XIcon, MapIcon, ClockIcon, PhotoIcon, CubeIcon, DocumentTextIcon, CogIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out z-50 w-64 bg-gray-800 text-white`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
        <div className="flex items-center">
          <CubeIcon className="h-6 w-6 text-red-500" />
          <span className="ml-2 text-lg font-semibold">Mars Explorer</span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white focus:outline-none"
        >
          <XIcon className="h-6 w-6" />
        </button>
      </div>
      
      <nav className="mt-4">
        <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Navigation
        </div>
        
        <a
          href="#"
          className="flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <MapIcon className="mr-3 h-5 w-5 text-gray-400" />
          Map View
        </a>
        
        <a
          href="#"
          className="flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <ClockIcon className="mr-3 h-5 w-5 text-gray-400" />
          Timeline
        </a>
        
        <a
          href="#"
          className="flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <PhotoIcon className="mr-3 h-5 w-5 text-gray-400" />
          Gallery
        </a>
        
        <div className="border-t border-gray-700 my-2"></div>
        
        <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Tools
        </div>
        
        <a
          href="#"
          className="flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <CubeIcon className="mr-3 h-5 w-5 text-gray-400" />
          3D Terrain
        </a>
        
        <a
          href="#"
          className="flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <DocumentTextIcon className="mr-3 h-5 w-5 text-gray-400" />
          Annotations
        </a>
        
        <div className="border-t border-gray-700 my-2"></div>
        
        <a
          href="#"
          className="flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <CogIcon className="mr-3 h-5 w-5 text-gray-400" />
          Settings
        </a>
        
        <a
          href="#"
          className="flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <QuestionMarkCircleIcon className="mr-3 h-5 w-5 text-gray-400" />
          Help & Feedback
        </a>
      </nav>
      
      <div className="absolute bottom-0 w-full p-4 bg-gray-800 border-t border-gray-700">
        <div className="text-xs text-gray-400">
          <p>Mars Explorer v1.0.0</p>
          <p>Data provided by NASA</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
