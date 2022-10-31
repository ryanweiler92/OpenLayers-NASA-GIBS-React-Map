import React, { useRef, useState, useEffect } from "react"
import "./Map.css";
import MapContext from "./MapContext";
import OlMap from "ol/Map";
import OlView from "ol/View";
import * as olProj from "ol/proj";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ActiveLayersDisplay from '../Layer-Displays/ActiveLayersDisplay'
import AvailableLayersDisplay from "../Layer-Displays/AvailableLayersDisplay";
import AddLayer from "../Layers/AddLayer";
import DateSelector from '../Date/DateSelector';
import config from '../Config/config';
import { availableLayersArray } from '../Config/availableLayers';

const Map = () => {
    const mapRef = useRef();
    const [map, setMap] = useState(null);

    // layerData represents the openLayers objects that are needed to remove/add layers
    const [layerData, setLayerData] = useState([]);

    // array of preselected layers
    const [availableLayers, setAvailableLayers] = useState(availableLayersArray);

    const [orderedLayers, setOrderedLayers] = useState();

    const getThreeWeeksAgo = () => {
        const dateOffset = (24 * 60 * 60 * 1000) * 21;
        const myDate = new Date();
        myDate.setTime(myDate.getTime() - dateOffset);
        return myDate;
    }

    const threeWeeksAgo = getThreeWeeksAgo();

    const [startDate, setStartDate] = useState(threeWeeksAgo);

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
        <MapContext.Provider value={{
            map,
            availableLayers,
            setAvailableLayers,
            layerData,
            setLayerData,
            startDate,
            setStartDate,
            orderedLayers,
            setOrderedLayers,
        }}>
            <div ref={mapRef} className="ol-map">
                {availableLayers && availableLayers.map((layer) => {
                    if (layer.active) return (
                        <AddLayer layer={layer.data} key={layer.name} />
                    )
                })}
            </div>
            <div className="d-flex mx-auto">
                <DateSelector />
            </div>
            <div className="d-flex mx-auto">
                <div className="w-50">
                    <AvailableLayersDisplay />
                </div>
                <div className="w-50">
                    <DndProvider backend={HTML5Backend}>
                        <ActiveLayersDisplay />
                    </DndProvider>
                </div>
            </div>
        </MapContext.Provider>
    );
};

export default Map;