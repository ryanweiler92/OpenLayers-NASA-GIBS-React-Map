import React, { useContext, useCallback } from "react"
import ListGroup from 'react-bootstrap/ListGroup';
import OrderedLayers from "./OrderedLayers";

const DragDropDisplay = (props) => {
    const { 
        orderedLayers, 
        setOrderedLayers, 
        toggleVisibility, 
        removeLayer, 
        activeCheck 
    } = props;

    const moveLayerListItem = useCallback(
        (dragIndex, hoverIndex) => {
            const dragItem = orderedLayers[dragIndex];
            const hoverItem = orderedLayers[hoverIndex];
            
            setOrderedLayers(orderedLayers => {
                const updatedLayers = [...orderedLayers]
                updatedLayers[dragIndex] = hoverItem;
                updatedLayers[hoverIndex] = dragItem;
                return updatedLayers;
            });
        }, [orderedLayers]);


    return (
        <div className="text-primary w-100">
            <div className="mx-auto">
                <h2 className="text-center text-primary">Active Layers</h2>
            </div>
            <ListGroup className="mx-auto mb-2">
                {orderedLayers && orderedLayers.map((layer, index) => {
                    return (
                        <OrderedLayers
                            key={layer.name}
                            layer={layer}
                            index={index}
                            moveLayerListItem={moveLayerListItem}
                            toggleVisibility={toggleVisibility}
                            removeLayer={removeLayer}
                            activeCheck={activeCheck}
                        />
                    )
                })}
            </ListGroup>
        </div>
    )
}

export default DragDropDisplay