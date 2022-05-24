import React from "react";
import {fakeDb} from "../../../../FakeDb/fake-db";
import ToggleAnalyticsCard from "./ToggleAnalyticsCard";
import {Grid} from "@material-ui/core";
import CmtCard from "../../../../../@coremat/CmtCard";

const DataTrends=({})=>{
  return(
          <Grid container direction={"row"} className='mt-3' spacing={4}>
              <Grid item lg={3} md={3} sm={12}>
                  <ToggleAnalyticsCard data={fakeDb.reachTrends}/>
              </Grid>
              <Grid item lg={3} md={3} sm={12}>
                  <ToggleAnalyticsCard data={fakeDb.impressionTrends}/>
              </Grid>
              <Grid item lg={3} md={3} sm={12}>
                  <ToggleAnalyticsCard data={fakeDb.cpvTrends}/>
              </Grid>
              <Grid item lg={3} md={3} sm={12}>
                  <ToggleAnalyticsCard data={fakeDb.ctaTrends}/>
              </Grid>
          </Grid>
  )
};

export default DataTrends;
