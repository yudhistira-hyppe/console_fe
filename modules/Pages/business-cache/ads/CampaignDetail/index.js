import React from "react";
import GridContainer from "../../../../@jumbo/components/GridContainer";
import {Grid} from "@material-ui/core";
import PropertyItem from "../../dashboards/ContentsListing/PropertiesList/PropertyItem";
import {useAuth} from "../../../../authentication";
import CampaignInfo from "./CampaignInfo";
import DataTrends from "./DataTrends";
import CmtCard from "../../../../@coremat/CmtCard";
import CmtCardHeader from "../../../../@coremat/CmtCard/CmtCardHeader";
import DataStatistics from "./DataStatistics";
import PageContainer from "../../../../@jumbo/components/PageComponents/layouts/PageContainer";
import { fakeDb} from "../../../FakeDb/fake-db";

const CampaignDetail = () => {
    const {authUser} = useAuth();
    return (
        <PageContainer heading={'Ads Center'}>
            <Grid container>
                <Grid item lg={12} md={12} xs={12}>
                    <Grid item lg={9} md={9} xs={12}>
                        <CmtCard className={{width: '100%'}}>
                            <CmtCardHeader></CmtCardHeader>
                        </CmtCard>
                    </Grid>
                    <Grid item lg={2} md={2} xs={12}>
                        <CampaignInfo campaignInfo={fakeDb.campaign[0]}/>
                    </Grid>
                    <Grid item lg={12} md={12}>
                        <DataTrends/>
                    </Grid>
                    <Grid item lg={12} md={12}>
                        <DataStatistics/>
                    </Grid>
                </Grid>
            </Grid>
        </PageContainer>
    )
};

export default CampaignDetail;
