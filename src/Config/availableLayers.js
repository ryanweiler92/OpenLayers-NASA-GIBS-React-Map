import config from '../Config/config'

const configLayers = config.layers;

export const availableLayersArray = [
    {
        id: 0,
        name: "VIIRS_SNPP_CorrectedReflectance_TrueColor",
        title: configLayers.VIIRS_SNPP_CorrectedReflectance_TrueColor.title,
        active: true,
        visible: true,
        data: configLayers.VIIRS_SNPP_CorrectedReflectance_TrueColor,
    },
    {   
        id: 1,
        name: "Coastlines_15m",
        title: configLayers.Coastlines_15m.title,
        active: true,
        visible: true,
        data: configLayers.Coastlines_15m,
    },
    {
        id: 2,
        name: "MODIS_Terra_L3_Land_Surface_Temp_Daily_Day_TES",
        title: configLayers.MODIS_Terra_L3_Land_Surface_Temp_Daily_Day_TES.title,
        active: false,
        visible: true,
        data: configLayers.MODIS_Terra_L3_Land_Surface_Temp_Daily_Day_TES,
    },
    {
        id: 3,
        name: "MODIS_Aqua_L3_SST_Thermal_4km_Day_Daily",
        title: configLayers.MODIS_Aqua_L3_SST_Thermal_4km_Day_Daily.title,
        active: false,
        visible: true,
        data: configLayers.MODIS_Aqua_L3_SST_Thermal_4km_Day_Daily,
    },
    {
        id: 4,
        name: "IMERG_Precipitation_Rate",
        title: configLayers.IMERG_Precipitation_Rate.title,
        active: false,
        visible: true,
        data: configLayers.IMERG_Precipitation_Rate,
    },
    {
        id: 5,
        name: "NDH_Flood_Mortality_Risks_Distribution_2000",
        title: configLayers.NDH_Flood_Mortality_Risks_Distribution_2000.title,
        active: false,
        visible: true,
        data: configLayers.NDH_Flood_Mortality_Risks_Distribution_2000,
    },
    {
        id: 6,
        name: "AIRS_Precipitation_Day",
        title: configLayers.AIRS_Precipitation_Day.title,
        active: false,
        visible: true,
        data: configLayers.AIRS_Precipitation_Day,
    },
    // {
    //     id: 7,
    //     name: "MODIS_Aqua_Thermal_Anomalies_Day",
    //     title: configLayers.MODIS_Aqua_Thermal_Anomalies_Day.title,
    //     active: false,
    //     visible: true,
    //     data: configLayers.MODIS_Aqua_Thermal_Anomalies_Day,
    // }
]