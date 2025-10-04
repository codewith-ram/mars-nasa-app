import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Viewer, createWorldTerrain, Color, Cartesian3, Math as CesiumMath, UrlTemplateImageryProvider } from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

// Declare Cesium as a global variable
declare global {
  interface Window {
    CESIUM_BASE_URL: string;
  }
}

interface MapContextType {
  viewer: Viewer | null;
  initViewer: (container: HTMLDivElement) => void;
  zoomToLocation: (longitude: number, latitude: number, height: number) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const viewerRef = useRef<Viewer | null>(null);

  const initViewer = (container: HTMLDivElement) => {
    if (viewerRef.current) return;

    const newViewer = new Viewer(container, {
      terrainProvider: createWorldTerrain(),
      baseLayerPicker: false,
      timeline: false,
      animation: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      homeButton: false,
      geocoder: false,
      scene3DOnly: true,
      selectionIndicator: false,
      infoBox: false,
    });

    // Configure the globe to show Mars
    newViewer.scene.globe.show = false;
    newViewer.scene.skyBox.show = false;
    newViewer.scene.backgroundColor = Color.BLACK;

    // Add Mars base layer
    const marsImagery = new UrlTemplateImageryProvider({
      url: 'https://astro.arc.nasa.gov/maps/mars/1.0.0/mars_viking_mdim21_global_mola_90npd_200m/{z}/{x}/{-y}.jpg',
      minimumLevel: 0,
      maximumLevel: 10,
      credit: 'NASA/MOLA Science Team',
    });

    newViewer.imageryLayers.addImageryProvider(marsImagery);

    viewerRef.current = newViewer;
    setViewer(newViewer);
  };

  const zoomToLocation = (longitude: number, latitude: number, height: number) => {
    if (viewerRef.current) {
      viewerRef.current.camera.flyTo({
        destination: Cartesian3.fromDegrees(longitude, latitude, height),
        orientation: {
          heading: CesiumMath.toRadians(0),
          pitch: CesiumMath.toRadians(-90),
          roll: 0.0,
        },
      });
    }
  };

  useEffect(() => {
    // Set the Cesium base URL
    window.CESIUM_BASE_URL = '/cesium/';
    
    // Cleanup function
    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
        setViewer(null);
      }
    };
  }, []);

  return (
    <MapContext.Provider value={{ viewer, initViewer, zoomToLocation }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = (): MapContextType => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
};
