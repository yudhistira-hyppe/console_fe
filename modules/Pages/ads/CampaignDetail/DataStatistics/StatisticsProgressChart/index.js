import React from "react";
import CmtCard from "../../../../../../@coremat/CmtCard";
import CmtCardHeader from "../../../../../../@coremat/CmtCard/CmtCardHeader";
import {Box} from "@material-ui/core";
import CmtProgressBar from "../../../../../../@coremat/CmtProgressBar";
import CmtCardContent from "../../../../../../@coremat/CmtCard/CmtCardContent";

const StatisticsProgressChart = ({data}) =>{
    const {title, label, value, color}  = data;
    return(
        <CmtCard>
            <CmtCardHeader title={title}/>
            <CmtCardContent>
                <Box width={1} mb={{xs: 3, sm: 6}}>
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
                </Box>
            </CmtCardContent>
        </CmtCard>
    );
}

export default StatisticsProgressChart;
