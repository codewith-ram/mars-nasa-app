import React, { useEffect, useRef } from 'react';
import { useMap } from '../../contexts/MapContext';
import { useLayers } from '../../contexts/LayerContext';

const MapView: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { initViewer, viewer } = useMap();
  const { layers } = useLayers();

  // Initialize the map when the component mounts
  useEffect(() => {
    if (mapRef.current && !viewer) {
      // The viewer will be initialized in the MapProvider
      initViewer(mapRef.current);
    }
  }, [initViewer, viewer]);

  // Update layers when they change
  useEffect(() => {
    if (!viewer) return;

    // Remove all existing layers except the default ones
    const existingLayers = viewer.imageryLayers;
    for (let i = existingLayers.length - 1; i >= 0; i--) {
      if (!existingLayers.get(i).isBaseLayer()) {
        existingLayers.remove(existingLayers.get(i));
      }
    }

    // Add visible layers
    layers.forEach(layer => {
      if (layer.visible && layer.url) {
        const imageryProvider = new Cesium.UrlTemplateImageryProvider({
          url: layer.url,
          minimumLevel: 0,
          maximumLevel: 10,
          credit: `NASA/${layer.name}`,
        });

        const newLayer = viewer.imageryLayers.addImageryProvider(imageryProvider, 0);
        newLayer.alpha = layer.opacity;
        newLayer.show = layer.visible;
      }
    });
  }, [viewer, layers]);

  return (
    <div 
      ref={mapRef} 
      className="absolute top-0 left-0 w-full h-full"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default MapView;
