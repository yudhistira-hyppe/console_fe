import Box from "@material-ui/core/Box";
import CmtProgressBar from "../../../../../@coremat/CmtProgressBar";
import React from "react";
import ContentDataCard from "../ContentDataCard";

const RegionViews = ({}) =>{
    const value = 100;
    const label = 'Indonesia';
    const color = '#AB22AF';
    return(
        <ContentDataCard title={'Recently Region Viewers'} contentType={'HyppeVid'}  content={<Box width={1} mb={{xs: 3, sm: 6}}>
            <CmtProgressBar
                label={<Box mb={-1}>{label}</Box>}
                labelPos="top-left"
                value={value}
                renderValue={(value) => {
                    return `${value}%`;
                }}
                containedColor={color}
                thickness={7}
                onlyContained
            />
        </Box>}/>
    )
}

export default RegionViews;
