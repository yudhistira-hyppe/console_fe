import React from "react";
import CmtCard from "../../../../@coremat/CmtCard";
import CmtCardContent from "../../../../@coremat/CmtCard/CmtCardContent";
import { makeStyles } from '@material-ui/core/styles';
import useStyles from "./style";
import {FormControl, FormHelperText, Grid, InputLabel, OutlinedInput, TextField} from "@material-ui/core";
import CmtCardHeader from "../../../../@coremat/CmtCard/CmtCardHeader";


const CampaignBasicInfo = ({}) => {
    const classes = useStyles();
    return (
        <CmtCard className={classes.width}>
            <CmtCardContent>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Grid container direction={"column"}>
                            <FormControl>
                                <div className={classes.inputTitle}>Campaign Name</div>
                                <TextField fullWidth id='campaign-name' variant='outlined' placeholder='Please Input Campaign Name'/>
                            </FormControl>
                            <FormControl className='mt-6'>
                                <div className={classes.inputTitle}>Ads Objective</div>
                                <TextField fullWidth id='ads-objective' variant={"outlined"} placeholder='Please Input Ads Objective' helperText="The traffic objective is designed to drive people to your website or app."/>
                            </FormControl>
                        </Grid>
                    </Grid>
            </CmtCardContent>
        </CmtCard>
    )
};

export default CampaignBasicInfo;
