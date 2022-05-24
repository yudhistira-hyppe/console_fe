import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CmtCard from "../../../../../@coremat/CmtCard";
import CmtCardContent from "../../../../../@coremat/CmtCard/CmtCardContent";
import {TrendingDown, TrendingUp} from "@material-ui/icons";
import numberWithCommas from "../../../../Components/CommonComponent/NumberWithCommas/NumberWithCommas";
import Stats from "./Stats";

const Statistics = ({}) => {
    return(
        <CmtCard className='h-full'>
            <CmtCardContent className='h-full'>
                <div className='h-full flex flex-row justify-content-between align-items-center'>
                    <Stats number={40642} subTitle={'Total dilihat'} isNumber={true} isIncreased={true} precentage={23}/>
                    <Stats number={1180} subTitle={'Total Disukai'} isNumber={true} isIncreased={false} precentage={1.58}/>
                    <Stats number={570} subTitle={'Total Dibagikan'} isNumber={true} isIncreased={false} precentage={1.58}/>
                </div>
            </CmtCardContent>
        </CmtCard>
    )
}

export default Statistics;
