import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MapProvider } from './contexts/MapContext';
import { LayerProvider } from './contexts/LayerContext';
import { TimeProvider } from './contexts/TimeContext';
import { AnnotationProvider } from './contexts/AnnotationContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import MapView from './components/map/MapView';
import LayerControls from './components/controls/LayerControls';
import TimeControls from './components/controls/TimeControls';
import AnnotationTools from './components/annotations/AnnotationTools';
import SearchBar from './components/search/SearchBar';
import './App.css';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  return (
    <Router>
      <MapProvider>
        <LayerProvider>
          <TimeProvider>
            <AnnotationProvider>
              <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}
                <Sidebar 
                  isOpen={sidebarOpen} 
                  onClose={() => setSidebarOpen(false)} 
                />

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* Navbar */}
                  <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

                  {/* Main Content Area */}
                  <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="relative h-full">
                      {/* Map View */}
                      <MapView />
                      
                      {/* Overlay Controls */}
                      <div className="absolute top-4 left-4 z-10 space-y-4">
                        <SearchBar />
                        <LayerControls />
                        <TimeControls />
                        <AnnotationTools 
                          selectedTool={selectedTool}
                          onToolSelect={setSelectedTool}
                        />
                      </div>
                    </div>
                  </main>
                </div>
              </div>
            </AnnotationProvider>
          </TimeProvider>
        </LayerProvider>
      </MapProvider>
    </Router>
  );
};

export default App;
