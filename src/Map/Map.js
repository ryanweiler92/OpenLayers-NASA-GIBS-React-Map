import React, { useRef, useState, useEffect } from "react"
import "./Map.css";
import MapContext from "./MapContext";
import OlMap from "ol/Map";
import OlView from "ol/View";
import * as olProj from "ol/proj";
import ActiveLayerDisplay from './ActiveLayerDisplay'
import AvailableLayerDisplay from "./AvailableLayerDisplay";
import AddWMTSLayer from '../Layers/AddWMTSLayer'
import config from '../Config/config'
import Button from 'react-bootstrap/Button';

const Map = () => {
    const mapRef = useRef();
    const [map, setMap] = useState(null);

    // layerData represents the openLayers objects that are needed to remove/add layers
    const [layerData, setLayerData] = useState([]);

    // for adding layers from child components
    const [layerToAdd, setLayerToAdd] = useState();

    const configLayers = config.layers;

    const availableLayersArray = [
        {
            id: 0,
            name: "VIIRS_SNPP_CorrectedReflectance_TrueColor",
            active: true,
            visible: true,
            data: configLayers.VIIRS_SNPP_CorrectedReflectance_TrueColor
        },
        {   
            id: 1,
            name: "Coastlines_15m",
            active: true,
            visible: true,
            data: configLayers.Coastlines_15m
        },
    ]

    // object of preselected layers
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
        if(!map) return;
        const currentLayers = map.getLayers();
        setLayerData(currentLayers.array_)
        }, [map]);

    return (
        <MapContext.Provider value={{ map, availableLayers, setAvailableLayers, layerData, layerToAdd, setLayerToAdd }}>
            <div ref={mapRef} className="ol-map">
                {availableLayers && availableLayers.map((layer) => {
                 if(layer.active) return (
                        <AddWMTSLayer layer={layer.data} key={layer.name}/>
                    )
                })}
                {layerToAdd ?
                    (<AddWMTSLayer layer={layerToAdd} />)
                    : null}
            </div>
                <div className="d-flex mx-auto">
                    <div className="w-50">
                        <AvailableLayerDisplay />
                    </div>
                    <div className="w-50">
                        <ActiveLayerDisplay />
                    </div>
                </div>
        </MapContext.Provider>
    );
};

export default Map;