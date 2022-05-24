import React from "react";
import CmtCardHeader from "../../../../../@coremat/CmtCard/CmtCardHeader";
import CmtCardContent from "../../../../../@coremat/CmtCard/CmtCardContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Grid} from "@material-ui/core";
import {fakeDb} from "../../../../FakeDb/fake-db";
import CmtCard from "../../../../../@coremat/CmtCard";

const useStyles = makeStyles((theme) => ({
    font: {
        fontSize: 14,
        fontFamily: 'Lato',
        color: 'grey'
    },
    info: {
        color: 'black'
    }
}));

const CampaignInfo = ({campaignInfo}) => {
    const classes = useStyles();
    return (
        <CmtCard>
            <CmtCardHeader title={'Detail Campaign'}
                           subTitle={<div className='mt-3'>
                               <div className={classes.font}>Ad Name : <span
                                   className={classes.info}>{campaignInfo.Name}</span></div>
                               <div className={classes.font}>Type : <span
                                   className={classes.info}>{campaignInfo.Type}</span></div>
                               <div className={classes.font}>Schedule
                                   : <span
                                       className={classes.info}>{campaignInfo.StartDate} - {campaignInfo.EndDate}</span>
                               </div>
                               <div className={classes.font}>Budget : <span
                                   className={classes.info}>{campaignInfo.Budget}</span></div>
                               <div className={classes.font}>Traffic : <span
                                   className={classes.info}>{campaignInfo.Trafic}</span></div>
                           </div>}
            >
            </CmtCardHeader>
        </CmtCard>
    )
};

export default CampaignInfo;
