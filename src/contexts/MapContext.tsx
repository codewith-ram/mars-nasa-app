import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Viewer } from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

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
      terrainProvider: new Cesium.createWorldTerrain(),
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
    newViewer.scene.backgroundColor = Cesium.Color.BLACK;

    // Add Mars base layer
    const marsImagery = new Cesium.UrlTemplateImageryProvider({
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
        destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
        orientation: {
          heading: Cesium.Math.toRadians(0),
          pitch: Cesium.Math.toRadians(-90),
          roll: 0.0,
        },
      });
    }
  };

  useEffect(() => {
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
