import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import OlTileGridWMTS from "ol/tilegrid/WMTS";
import OlSourceWMTS from "ol/source/WMTS";
import OlLayerTile from "ol/layer/Tile";

const AddWMTSLayer = ({layerName, format}) => {
    const { map } = useContext(MapContext);

    useEffect(() => {
        if(!map) return;

        const tileGrid = new OlTileGridWMTS({
            origin: [-180, 90],
            extent: [-180, -90, 180, 90],
            sizes: [
              [2, 1],
              [3, 2],
              [5, 3],
              [10, 5],
              [20, 10],
              [40, 20],
              [80, 40],
              [160, 80],
              [320, 160],
              [640, 320],
              [1280, 640],
              [2560, 1280],
              [5120, 2560]
            ],
            resolutions: [
              0.5625,
              0.28125,
              0.140625,
              0.0703125,
              0.03515625,
              0.017578125,
              0.0087890625,
              0.00439453125,
              0.002197265625,
              0.0010986328125,
              0.00054931640625,
              0.000274658203125,
              0.0001373291015625
            ],
            matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            tileSize: 512
          });

          const tileSource = new OlSourceWMTS({
            url: "https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?TIME=2022-09-07T00:00:00Z",
            layer: layerName,
            cacheSize: 4096,
            crossOrigin: "anonymous",
            format: format,
            transition: 0,
            matrixSet: "250m",
            tileGrid,
            style: "default"
          });

          const layerTile = new OlLayerTile({
            extent: [-180, -90, 180, 90],
            className: layerName,
            source: tileSource,
            zIndex: 0,
          });

          map.addLayer(layerTile)

          // componentWillUnmount
          return () => {
            if (map) {
                map.removeLayer(layerTile)
            }
          }
    }, [map])

    return null;
};

export default AddWMTSLayer;