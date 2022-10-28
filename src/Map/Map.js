import React, { useRef, useState, useEffect } from "react"
import "./Map.css";
import MapContext from "./MapContext";
import OlMap from "ol/Map";
import OlView from "ol/View";
import * as olProj from "ol/proj";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ActiveLayerDisplay from '../Layer-Displays/ActiveLayerDisplay'
import AvailableLayerDisplay from "../Layer-Displays/AvailableLayerDisplay";
import AddWMTSLayer from '../Layers/AddWMTSLayer'
import config from '../Config/config'
import { availableLayersArray } from '../Config/availableLayers'

const Map = () => {
    const mapRef = useRef();
    const [map, setMap] = useState(null);

    // layerData represents the openLayers objects that are needed to remove/add layers
    const [layerData, setLayerData] = useState([]);

    // for adding layers from child components that are not present on the map
    const [layerToAdd, setLayerToAdd] = useState();

    // array of preselected layers
    const [availableLayers, setAvailableLayers] = useState(availableLayersArray);

    const projection = config.projections.geographic;

    // componentDidMount
    useEffect(() => {
        const view = new OlView({
            maxResolution: projection.resolutions[0],
            projection: olProj.get(projection.crs),
            center: projection.startCenter,
            zoom: projection.startZoom,
            maxZoom: projection.numZoomLevels,
            extent: projection.maxExtent,
            constrainOnlyCenter: true
        })
        let options = {
            view: view,
            layers: [],
            controls: [],
            overlays: [],
            renderer: ["canvas"],
        };

        let mapObj = new OlMap(options);
        mapObj.setTarget(mapRef.current);
        setMap(mapObj);

        //componentWillUnmount
        return () => mapObj.setTarget(undefined);
    }, []);

    // get all of the current layers from the openlayers map object and set to state
    useEffect(() => {
        if (!map) return;
        const currentLayers = map.getLayers();
        setLayerData(currentLayers.array_);
    }, [map]);

    return (
        <MapContext.Provider value={{ map, availableLayers, setAvailableLayers, layerData, setLayerData, layerToAdd, setLayerToAdd }}>
            <div ref={mapRef} className="ol-map">
                {availableLayers && availableLayers.map((layer) => {
                    if (layer.active) return (
                        <AddWMTSLayer layer={layer.data} key={layer.name} />
                    )
                })}
                {layerToAdd ?
                    (<AddWMTSLayer layer={layerToAdd} />)
                    : null}
            </div>
            <div className="d-flex justify-content-center mx-auto">
                <span className="text-primary mb-3">Add layers from the Available Layers column. Remove layers and toggle visibility in the Active Layers column. Drag and drop to reorder layers.</span>
            </div>
            <div className="d-flex mx-auto">
                <div className="w-50">
                    <AvailableLayerDisplay />
                </div>
                <div className="w-50">
                    <DndProvider backend={HTML5Backend}>
                        <ActiveLayerDisplay />
                    </DndProvider>
                </div>
            </div>
        </MapContext.Provider>
    );
};

export default Map;