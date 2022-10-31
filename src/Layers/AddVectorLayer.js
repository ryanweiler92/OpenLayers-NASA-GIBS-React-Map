import { useContext, useEffect } from "react";
import lodashEach from 'lodash/each';
import lodashGet from 'lodash/get';
import MapContext from "../Map/MapContext";
import SourceVectorTile from 'ol/source/VectorTile';
import MVT from 'ol/format/MVT';
import OlTileGridTileGrid from 'ol/tilegrid/TileGrid';
import LayerVectorTile from 'ol/layer/VectorTile';
import OlLayerGroup from 'ol/layer/Group';
import VectorStyles from '../Config/VectorStyles';
import OLVectorLayer from "ol/layer/Vector";

import config from '../Config/config'
import { RIGHT_WING_EXTENT, CENTER_MAP_ORIGIN, createVectorUrl } from "../Selectors/Selectors"

const AddVectorLayer = ({ layer }) => {

    const { map, startDate } = useContext(MapContext);

    useEffect(() => {
        if (!map) return;
        console.log(layer)

        const addLayer = () => {
            let date = startDate;
            let gridExtent = [-180, -90, -110, 90];
            const day = 0;
            let matrixIds;
            let start = CENTER_MAP_ORIGIN;
            let layerExtent = RIGHT_WING_EXTENT;
            const selectedProj = config.projections.geographic;
            const source = config.sources['GIBS:geographic'];
            const projID = 'geographic'
            // gridExtent = selectedProj.maxExtent;
            // layerExtent = gridExtent;
            start = [selectedProj.maxExtent[0], selectedProj.maxExtent[3]];

            const matrixSet = source.matrixSets[layer.projections.geographic.matrixSet];

            if (typeof layer.matrixIds === 'undefined') {
                matrixIds = [];
                lodashEach(matrixSet.resolutions, (resolution, index) => {
                    matrixIds.push(index);
                });
            } else {
                matrixIds = layer.matrixIds;
            }

            const layerName = layer.id;
            const tileMatrixSet = matrixSet.id
            const urlParameters = createVectorUrl(date, layerName, tileMatrixSet);
            const wrapX = !!(day === 1 || day === -1);
            const breakPointLayerDef = layer.breakPointLayer;
            const breakPointResolution = lodashGet(layer, `breakPointLayer.projections.${projID}.resolutionBreakPoint`);
            const breakPointType = lodashGet(layer, 'breakPointLayer.breakPointType');
            const isMaxBreakPoint = breakPointType === 'max';
            const isMinBreakPoint = breakPointType === 'min';

            const tileSource = new SourceVectorTile({
                url: source.url + urlParameters,
                layer: layerName,
                day,
                format: new MVT(),
                matrixSet: tileMatrixSet,
                wrapX,
                projection: "EPSG:4326",
                tileGrid: new OlTileGridTileGrid({
                    extent: gridExtent,
                    resolutions: matrixSet.resolutions,
                    tileSize: matrixSet.tileSize,
                    origin: start,
                    sizes: matrixSet.tileMatrices,
                }),
            });

            const newLayer = new LayerVectorTile({
                extent: layerExtent,
                source: tileSource,
                renderMode: 'vector',
                preload: 0,
                ...isMaxBreakPoint && { maxResolution: breakPointResolution },
                ...isMinBreakPoint && { minResolution: breakPointResolution },
            });
            newLayer.wrap = day;
            newLayer.wv = layer.data;
            newLayer.isVector = true;
            newLayer.style = VectorStyles.Point;

            map.addLayer(newLayer);

            // componentWillUnmount
            return () => {
                if (map) {
                    map.removeLayer(newLayer)
                }
            }
        }
        addLayer();
    }, [map, startDate]);

    return null;
}

export default AddVectorLayer;