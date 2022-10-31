import React, { useContext } from "react"
import MapContext from "../Map/MapContext";
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';

const AvailableLayerDisplay = () => {
    const {availableLayers, setAvailableLayers } = useContext(MapContext);

    // add a layer that's not currently on the map
    const addLayer = (layerID) => {
        const availableLayersCopy = [...availableLayers];
        availableLayersCopy[layerID].visible = true;
        availableLayersCopy[layerID].active = true;
        setAvailableLayers(availableLayersCopy);
    }

    return (
        <div className="ml-3 px-3">
            <div className="mx-auto">
                <h2 className="text-center text-primary">Available Layers</h2>
            </div>
            <ListGroup className="mx-auto">
                {availableLayers && availableLayers.map((layer) => {
                    if(!layer.active) return (
                        <ListGroup.Item className="d-flex justify-content-between align-items-center text-primary border-primary bg-dark fw-bold" key={layer.name}>
                            {layer.title}
                            <Button size="sm" onClick={(e) => addLayer(layer.id)}>
                                <FontAwesomeIcon icon={faCirclePlus} size="lg"/>
                            </Button>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
        </div>
    );
}

export default AvailableLayerDisplay;