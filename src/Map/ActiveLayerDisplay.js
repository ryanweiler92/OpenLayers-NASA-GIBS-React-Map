import React, { useRef, useState, useEffect, useContext } from "react"
import MapContext from "./MapContext";
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';

const ActiveLayerDisplay = () => {

    const { map, availableLayers, setAvailableLayers, layerData, setLayerToAdd } = useContext(MapContext);

    const activeCheck = (layerID) => {
        if(availableLayers[layerID].visible){
            return true
        } else {
            return false
        }
    };

    // when toggling switch we set state and show/hide layer
    const toggleVisibility = (layerName, layerID) => {
        map.getLayers().forEach((layer) => {
            if(layer.className_ === layerName){
                const isVisible = layer.get('visible')
                layer.setVisible(!isVisible)
            }
        });
        const isVisible = availableLayers[layerID].visible;
        const availableLayersCopy = [...availableLayers]; 
        availableLayersCopy[layerID].visible = !isVisible; 
        setAvailableLayers(availableLayersCopy);
    };

    const removeLayer = (layerName, layerID) => {
        layerData.forEach((layer) => {
            if(layer.className_ === layerName){
                map.removeLayer(layer)
            }
        });
        const availableLayersCopy = [...availableLayers];
        availableLayersCopy[layerID].visible = true;
        availableLayersCopy[layerID].active = false;
        setAvailableLayers(availableLayersCopy);
    }

    return (
        <div className="px-3">
            <div className="mx-auto">
                <h2 className="text-center text-primary">Active Layers</h2>
            </div>
            <ListGroup className="mx-auto mb-2">
                {availableLayers && availableLayers.map((layer) => {
                if(layer.active) return (
                        <ListGroup.Item className="d-flex justify-content-between align-items-center text-primary fw-bold border-primary bg-dark" key={layer.name}> 
                            <div>
                                {layer.name}
                            </div>
                            <div className="d-flex justify-content-between">
                                <Form.Check
                                type="switch"
                                id={layer.id}
                                checked={activeCheck(layer.id)}
                                onChange={(e) => toggleVisibility(layer.name, layer.id)}
                                /> 
                                <Button onClick={(e) => removeLayer(layer.name, layer.id)} size="sm">
                                    <FontAwesomeIcon 
                                    icon={faCircleMinus} 
                                    size="lg"/>
                                </Button>
                            </div>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
        </div>
    );
};

export default ActiveLayerDisplay;