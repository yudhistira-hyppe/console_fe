import React from "react";
import PageHeader from "../../../../@jumbo/components/PageComponents/PageHeader";
import GridContainer from "../../../../@jumbo/components/GridContainer";
import DetailsCard from "./DetailsCard";
import ContentDataCard from "../content/ContentDataCard";
import {Grid} from "@material-ui/core";
import Statistics from "./Statistics";
import Comments from "../../dashboards/Comments";
import Discover from "./Discover";
import BiographyStats from "./BiographyStats";
import {fakeDb} from "../../../FakeDb/fake-db";



const Details = ({}) => {
    return(
        <div>
            <PageHeader heading={'Detail Content'}/>
            <GridContainer>
                <Grid item md={6}>
                    <DetailsCard title={'Latest Monetize'} contentTitle={'Hari ini bersama keluarga tersayang liburan ke pa... '} likes={233} comments={233} category={'Entertaint, Hobby'} ownership={'23EY82KD02L'} views={233} date={'Jun 26, 2020'} contentType={'HyppeVid'}/>
                </Grid>
                <Grid item md={6}>
                    <Statistics/>
                </Grid>
                <Grid item md={6}>
                    <Comments/>
                </Grid>
                <Grid item md={3}>
                    <Discover precentage={98} isNumber={true} number={1280} title={'Jangkauan'} subtitle={'Total Jangkauan'} isInceased={false}/>
                </Grid>
                <Grid item md={3}>
                    <Discover isNumber={false} precentage={'2 jam'} number={'120j 18m 14d'} title={'Total Waktu Tayang'} subtitle={'Rata-Rata'}/>
                </Grid>
                <Grid item md={3}>
                    <BiographyStats title={fakeDb.genderBiography.title} dataChart={fakeDb.genderBiography.data}/>
                </Grid>
                <Grid item md={3}>
                    <BiographyStats title={fakeDb.countryBiography.title} dataChart={fakeDb.countryBiography.data}/>
                </Grid>
                <Grid item md={3}>
                    <BiographyStats title={fakeDb.ageBiography.title} dataChart={fakeDb.ageBiography.data}/>
                </Grid>
                <Grid item md={3}>
                    <BiographyStats title={fakeDb.viewsBiography.title} dataChart={fakeDb.viewsBiography.data}/>
                </Grid>
            </GridContainer>
        </div>
    )
}

export default Details;
