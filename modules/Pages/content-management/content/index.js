import React from "react";
import PageHeader from "../../../../@jumbo/components/PageComponents/PageHeader";
import ContentDataCard from "./ContentDataCard";
import GridContainer from "../../../../@jumbo/components/GridContainer";
import {Grid} from "@material-ui/core";
import RegionViews from "./RegionViews";

const Content = ({}) =>{
    return(
        <div>
            <PageHeader heading={'Content Management'}/>
            <GridContainer>
                <Grid item md={4}>
                    <ContentDataCard title={'Popular Konten'} contentTitle={'Hari ini bersama keluarga tersayang liburan ke pa... '} likes={233} views={233} date={'Jun 26, 2020'} contentType={'HyppeVid'}/>
                </Grid>
                <Grid item md={4}>
                    <ContentDataCard title={'Latest Monetize Content'} contentTitle={'Hari ini bersama keluarga tersayang liburan ke pa... '} likes={233} views={233} date={'Jun 26, 2020'} contentType={'HyppeVid'}/>
                </Grid>
                <Grid item md={4}>
                    <ContentDataCard title={'Content Traffic'} contentTitle={'Hari ini bersama keluarga tersayang liburan ke pa... '} likes={233} views={233} date={'Jun 26, 2020'} contentType={'HyppeVid'}/>
                </Grid>
                <Grid item md={4}>
                    <ContentDataCard title={'Most Likes'} contentTitle={'Hari ini bersama keluarga tersayang liburan ke pa... '} likes={233} views={233} date={'Jun 26, 2020'} contentType={'HyppeVid'}/>
                </Grid>
                <Grid item md={4}>
                    <ContentDataCard title={'Latest Ownership Content'} contentTitle={'Hari ini bersama keluarga tersayang liburan ke pa... '} likes={233} views={233} date={'Jun 26, 2020'} contentType={'HyppeVid'}/>
                </Grid>
                <Grid item md={4}>
                    <RegionViews/>
                </Grid>
                <Grid item md={4}>
                    <ContentDataCard title={'Most Share'} contentTitle={'Hari ini bersama keluarga tersayang liburan ke pa... '} likes={233} views={233} date={'Jun 26, 2020'} contentType={'HyppeVid'}/>
                </Grid>
                <Grid item md={4}>
                    <ContentDataCard title={'Latest Posted Content'} contentTitle={'Hari ini bersama keluarga tersayang liburan ke pa... '} likes={233} views={233} date={'Jun 26, 2020'} contentType={'HyppeVid'}/>
                </Grid>
                <Grid item md={4}>
                    <ContentDataCard title={'Moderate Content'} contentTitle={'Hari ini bersama keluarga tersayang liburan ke pa... '} likes={233} views={233} date={'Jun 26, 2020'} contentType={'HyppeVid'}/>
                </Grid>
            </GridContainer>
        </div>
    )
}
export default Content;
