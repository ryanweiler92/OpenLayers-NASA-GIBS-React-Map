import React, { useState, useEffect, useContext } from "react"
import MapContext from "../Map/MapContext";
import DragDropDisplay from "./DragDropDisplay";

const ActiveLayerDisplay = () => {

    const { map, availableLayers, setAvailableLayers, layerData, } = useContext(MapContext);

    const [orderedLayers, setOrderedLayers] = useState();

    // checking the state of visibility property for switches
    const activeCheck = (layerID) => {
        if (availableLayers[layerID].visible) {
            return true
        } else {
            return false
        }
    }

    // toggling visibility from switches
    const toggleVisibility = (layerName, layerID) => {
        map.getLayers().forEach((layer) => {
            if (layer.className_ === layerName) {
                const isVisible = layer.get('visible')
                layer.setVisible(!isVisible)
            }
        });
        const isVisible = availableLayers[layerID].visible;
        const availableLayersCopy = [...availableLayers];
        availableLayersCopy[layerID].visible = !isVisible;
        setAvailableLayers(availableLayersCopy);
    }

    const removeLayer = (layerName, layerID) => {
        layerData.forEach((layer) => {
            if (layer.className_ === layerName) {
                map.removeLayer(layer)
            }
        });
        const availableLayersCopy = [...availableLayers];
        availableLayersCopy[layerID].visible = true;
        availableLayersCopy[layerID].active = false;
        setAvailableLayers(availableLayersCopy);
    }

    // ordering the layers in the display
    useEffect(() => {
        if (!map) return;

        const createOrder = () => {
            let mapOrderedLayers = [];
            const orderedLayersObj = map.getLayers();
            const orderedLayersArr = orderedLayersObj.array_;

            orderedLayersArr.forEach((layer) => {
                mapOrderedLayers.push(layer.className_);
            });

            let tempOrderedLayers = [];

            mapOrderedLayers.map((layer) => {
                availableLayers.forEach(layerObj => {
                    if (layerObj.name === layer) {
                        tempOrderedLayers.push(layerObj);
                    }
                });
            });
            setOrderedLayers(tempOrderedLayers);
        }
        createOrder();
    }, [map, availableLayers]);

    useEffect(() => {
        if (!map) return;

        const updateMapLayersOnReorder = () => {
            const layerCopy = [...layerData]

            layerData.slice().forEach((layer) => {
                map.removeLayer(layer)
            });

            orderedLayers.map((layer) => {
                layerCopy.forEach((layerObj) => {
                    if (layer.name === layerObj.className_) {
                        map.addLayer(layerObj);
                    }
                });
            });
        }
        updateMapLayersOnReorder();
    }, [orderedLayers]);

    return (
        <div className="px-3">
            <div className="d-flex justify-content-center">
                <DragDropDisplay
                    orderedLayers={orderedLayers}
                    setOrderedLayers={setOrderedLayers}
                    toggleVisibility={toggleVisibility}
                    removeLayer={removeLayer}
                    activeCheck={activeCheck}
                />
            </div>
        </div>
    );
};

export default ActiveLayerDisplay;
