import { useContext, useEffect } from "react";
import AddWMTSLayer from "./AddWMTSLayer";
import MapContext from "../Map/MapContext";
import AddVectorLayer from "./AddVectorLayer";

const AddLayer = ({ layer }) => {
    const { map } = useContext(MapContext);

    useEffect(() => {
        if (!map) return;
    })

    return (
        <>
            {layer.type === 'wmts' ? <AddWMTSLayer layer={layer} /> : <AddVectorLayer layer={layer} />}
        </>
    );
}

export default AddLayer;