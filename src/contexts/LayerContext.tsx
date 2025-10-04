import React, { createContext, useContext, useState, useCallback } from 'react';
import { ImageryLayer } from 'cesium';

interface Layer {
  id: string;
  name: string;
  visible: boolean;
  opacity: number;
  type: 'base' | 'overlay';
  url?: string;
  layer?: ImageryLayer;
}

interface LayerContextType {
  layers: Layer[];
  activeBaseLayer: string | null;
  addLayer: (layer: Omit<Layer, 'layer' | 'visible' | 'opacity'>) => void;
  removeLayer: (id: string) => void;
  toggleLayerVisibility: (id: string) => void;
  setLayerOpacity: (id: string, opacity: number) => void;
  setActiveBaseLayer: (id: string) => void;
}

const LayerContext = createContext<LayerContextType | undefined>(undefined);

// Default Mars layers
const DEFAULT_LAYERS: Layer[] = [
  {
    id: 'mars-viking',
    name: 'Viking MDIM 2.1',
    visible: true,
    opacity: 1,
    type: 'base',
    url: 'https://astro.arc.nasa.gov/maps/mars/1.0.0/mars_viking_mdim21_global_mola_90npd_200m/{z}/{x}/{-y}.jpg',
  },
  {
    id: 'mars-hirise',
    name: 'HiRISE',
    visible: false,
    opacity: 1,
    type: 'overlay',
    url: 'https://hirise-pds.lpl.arizona.edu/TILES/DTM/.../{z}/{x}/{y}.png',
  },
  {
    id: 'mars-mola',
    name: 'MOLA Topography',
    visible: true,
    opacity: 0.7,
    type: 'overlay',
    url: 'https://planetarymaps.usgs.gov/tiles/mars/mola128_200m_90s_90n_cyl/{z}/{x}/{-y}.png',
  },
];

export const LayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [layers, setLayers] = useState<Layer[]>(DEFAULT_LAYERS);
  const [activeBaseLayer, setActiveBaseLayer] = useState<string | null>('mars-viking');

  const addLayer = useCallback((layer: Omit<Layer, 'layer' | 'visible' | 'opacity'>) => {
    setLayers(prevLayers => [
      ...prevLayers,
      {
        ...layer,
        visible: true,
        opacity: 1,
      },
    ]);
  }, []);

  const removeLayer = useCallback((id: string) => {
    setLayers(prevLayers => prevLayers.filter(layer => layer.id !== id));
  }, []);

  const toggleLayerVisibility = useCallback((id: string) => {
    setLayers(prevLayers =>
      prevLayers.map(layer =>
        layer.id === id ? { ...layer, visible: !layer.visible } : layer
      )
    );
  }, []);

  const setLayerOpacity = useCallback((id: string, opacity: number) => {
    setLayers(prevLayers =>
      prevLayers.map(layer =>
        layer.id === id ? { ...layer, opacity } : layer
      )
    );
  }, []);

  const handleSetActiveBaseLayer = useCallback((id: string) => {
    setActiveBaseLayer(id);
    // Make sure only one base layer is visible at a time
    setLayers(prevLayers =>
      prevLayers.map(layer => ({
        ...layer,
        visible: layer.type === 'overlay' ? layer.visible : layer.id === id,
      }))
    );
  }, []);

  return (
    <LayerContext.Provider
      value={{
        layers,
        activeBaseLayer,
        addLayer,
        removeLayer,
        toggleLayerVisibility,
        setLayerOpacity,
        setActiveBaseLayer: handleSetActiveBaseLayer,
      }}
    >
      {children}
    </LayerContext.Provider>
  );
};

export const useLayers = (): LayerContextType => {
  const context = useContext(LayerContext);
  if (context === undefined) {
    throw new Error('useLayers must be used within a LayerProvider');
  }
  return context;
};
