import React, { useRef } from "react"
import Form from 'react-bootstrap/Form';
import { useDrag, useDrop } from 'react-dnd'
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';

const OrderedLayers = (props) => {
    const {
        toggleVisibility,
        removeLayer,
        activeCheck,
        layer,
        index,
        moveLayerListItem,
    } = props;

    const [{ isDragging }, dragRef] = useDrag({
        type: 'item',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [spec, dropRef] = useDrop({
        accept: 'item',
        hover: (item, monitor) => {
            const dragIndex = item.index
            const hoverIndex = index
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return

            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

            moveLayerListItem(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    });

    const ref = useRef(null);
    const dragDropRef = dragRef(dropRef(ref));
    
    return (
        <ListGroup.Item ref={dragDropRef} className="d-flex justify-content-between align-items-center text-primary fw-bold border-primary bg-dark" key={layer.name}>
            <div>
                <span className="pe-2">
                    {(index + 1) + ":"}
                </span>
                {layer.title}
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
                        size="lg" />
                </Button>
            </div>
        </ListGroup.Item>
    );
}

export default OrderedLayers;