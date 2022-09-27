import React from 'react';
import { Grid } from '@material-ui/core';
import PageContainer from "../../../@jumbo/components/PageComponents/layouts/PageContainer";
import GridContainer from "../../../@jumbo/components/GridContainer";
import AdsGeneralChart from "./AdsGeneralChart";
import { fakeDb } from '../../FakeDb/fake-db';
import CampaignList from "./CampaignList";
import CampaignDetail from "./CampaignDetail";

const Ads = () =>{
    return(
        <PageContainer heading={'Ads Center'}>
            <GridContainer>
                <Grid item lg={12} md={12} xs={12}>
                    <AdsGeneralChart enableCampaigns={fakeDb.adsTrends.enableCampaign} pauseCampaign={fakeDb.adsTrends.pauseCampaign} chartData={fakeDb.adsTrends.data}/>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                    <CampaignList/>
                </Grid>
            </GridContainer>
        </PageContainer>
    )
}

export default Ads;
