import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import OlTileGridWMTS from "ol/tilegrid/WMTS";
import OlSourceWMTS from "ol/source/WMTS";
import OlLayerTile from "ol/layer/Tile";
import config from '../Config/config'
import {
    calcExtentsFromLimits,
    toISOStringSeconds,
    roundTimeOneMinute,
} from '../Selectors/Selectors';

const AddWMTSLayer = ({ layer }) => {
    const { map, startDate } = useContext(MapContext);

    useEffect(() => {
    if(!map) return;

    const {
        id, format, matrixIds, matrixSet = layer.projections.geographic.matrixSet, matrixSetLimits, style, 
      } = layer;

    const configSource = config.sources['GIBS:geographic'];
    const configMatrixSet = configSource.matrixSets[matrixSet];
    const layerDate = startDate;
    const { tileMatrices, resolutions, tileSize } = configMatrixSet;
    const day = 0;
    const selected = config.projections.geographic;
    const { origin, extent } = calcExtentsFromLimits(configMatrixSet, matrixSetLimits, day, selected);
    const sizes = !tileMatrices ? [] : tileMatrices.map(({ matrixWidth, matrixHeight }) => [matrixWidth, matrixHeight]);

    const tileGridOptions = {
        origin: origin,
        extent: extent,
        sizes,
        resolutions,
        matrixIds: matrixIds || resolutions.map((set, index) => index),
        tileSize: tileSize[0],
      };

      const urlParameters = `?TIME=${toISOStringSeconds(roundTimeOneMinute(layerDate))}`;
      const sourceURL = layer.sourceOverride || configSource.url;
      const sourceOptions = {
        url: sourceURL + urlParameters,
        layer: id,
        cacheSize: 4096,
        crossOrigin: 'anonymous',
        format,
        transition: 0,
        matrixSet: configMatrixSet.id,
        tileGrid: new OlTileGridWMTS(tileGridOptions),
        wrapX: false,
        style: typeof style === 'undefined' ? 'default' : style,
      };

      const tileSource = new OlSourceWMTS(sourceOptions);

      const layerTile = new OlLayerTile({
        extent: extent,
        preload: 0,
        source: tileSource,
        className: id,
      });

      map.addLayer(layerTile);

      // componentWillUnmount
      return () => {
        if (map) {
            map.removeLayer(layerTile)
        }
      }
    
    }, [map, startDate]);

    return null;
};

export default AddWMTSLayer;