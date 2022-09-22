import React from "react";
import StackBar from "./StackBar";
import {fakeDb} from "../../../../FakeDb/fake-db";
import {Grid} from "@material-ui/core";
import StatisticsProgressChart from "./StatisticsProgressChart";

const DataStatistics = ({}) =>{
    return(
        <Grid container direction={"row"} className='mt-3' spacing={2}>
            <Grid item lg={4} md={4}>
                <StackBar stackBarData={fakeDb.stackBar} />
            </Grid>
            <Grid item lg={4} md={4}>
                <StackBar stackBarData={fakeDb.stackBar} />
            </Grid>
            <Grid item lg={4} md={4}>
                <StatisticsProgressChart data={fakeDb.progressBar}/>
            </Grid>
        </Grid>
    )
};

export default DataStatistics;
