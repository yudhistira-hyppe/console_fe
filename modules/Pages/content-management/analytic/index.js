import React from "react";
import CmtCard from "../../../../@coremat/CmtCard";
import CmtCardContent from "../../../../@coremat/CmtCard/CmtCardContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";
import {KeyboardArrowDown, KeyboardArrowUp} from "@material-ui/icons";
import {PageHeader} from "../../../../@jumbo/components/PageComponents";
import GridContainer from "../../../../@jumbo/components/GridContainer";
import {Grid} from "@material-ui/core";
import DetailsCard from "../details/DetailsCard";
import FollowerChart from "./FollowerChart";
import BiographyStats from "../details/BiographyStats";
import {fakeDb} from "../../../FakeDb/fake-db";

const useStyles = makeStyles((theme) => ({
    titleLbl: {
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: '16px',
        lineHeight: '16px',
        color: '#000000'
    },
    dataLbl: {
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: '24px',
        lineHeight: '22px',
        color: 'rgba(0, 0, 0, 0.87)'
    },
    increaseLbl: {
        fontFamily: 'Lato',
        fontSize: '16px',
        lineHeight: '24px',
    },
    infoLbl: {
        fontFamily: 'Lato',
        fontSize: '12px',
        lineHeight: '24px',
        letterSpacing: '0.5px',
        color: 'rgba(0, 0, 0, 0.6)'
    }
}));


const DataAnalytics = ({title, count, increase, isUp}) =>{
    const classes = useStyles();
    return(
        <CmtCard className='h-full w-full'>
            <CmtCardContent className='h-full w-full'>
                <div className={classes.titleLbl}>
                    {title}
                </div>
                <div className='mt-6 flex flex-row'>
                    <div className={classes.dataLbl}>
                        {count}
                    </div>
                    <div className='flex flex-row' style={!isUp? {color: 'red'} : {color: '#8DCD03'} }>
                        <div className={clsx('ml-1', classes.increaseLbl)}>
                            {increase}%
                        </div>
                        <div className={clsx(classes.increaseLbl)}>
                            {isUp ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
                        </div>
                    </div>
                </div>
                <div className={clsx('mt-2', classes.infoLbl)}>
                    Minggu ini
                </div>
            </CmtCardContent>
        </CmtCard>
    )
};

const Analytic = ({}) => {
    return (
        <div>
            <PageHeader heading={'Analitik'}/>
            <GridContainer>
                <Grid item md={3}>
                    <DataAnalytics title={'Content Views'} count={4802} increase={2} isUp={true}/>
                </Grid>
                <Grid item md={3}>
                    <DataAnalytics title={'Profile Visit'} count={112} increase={2} isUp={true}/>
                </Grid>
                <Grid item md={3}>
                    <DataAnalytics title={'Likes'} count={1248} increase={2} isUp={false}/>
                </Grid>
                <Grid item md={3}>
                    <DataAnalytics title={'Share'} count={280} increase={2} isUp={true}/>
                </Grid>
                <Grid item md={6}>
                    <DetailsCard contentTitle={'Hari ini bersama keluarga tersayang liburan ke pa... '} likes={233} comments={233} category={'Entertaint, Hobby'} ownership={'23EY82KD02L'} views={233} date={'Jun 26, 2020'} contentType={'HyppeVid'}/>
                </Grid>
                <Grid item md={6}>
                    <FollowerChart/>
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
export default Analytic;
