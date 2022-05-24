import React from "react";
import CmtCardContent from "../../../../@coremat/CmtCard/CmtCardContent";
import {FormControl, InputLabel, OutlinedInput, Select, MenuItem, Grid, TextField} from "@material-ui/core";
import CmtCard from "../../../../@coremat/CmtCard";
import CmtCardHeader from "../../../../@coremat/CmtCard/CmtCardHeader";
import useStyles from "./style";

const Demographics = ({}) => {
    const classes = useStyles();
    return (
        <CmtCard>
            <CmtCardContent>
                <Grid item md={6} lg={6} sm={12} xs={12}>
                    <Grid container direction={"column"}>
                        <FormControl>
                            <div className={classes.inputTitle}>Demographics</div>
                            <TextField fullWidth variant={"outlined"} value='Indonesia'/>
                        </FormControl>
                        <FormControl fullWidth variant="outlined" className='mt-6'>
                            <InputLabel id="gender-label">Age</InputLabel>
                            <Select
                                labelId="gender-label"
                                id="gender"
                                label="Age"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>All</MenuItem>
                                <MenuItem value={20}>Male</MenuItem>
                                <MenuItem value={30}>Female</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth variant="outlined" className='mt-6'>
                            <InputLabel id="interest-label">Interest</InputLabel>
                            <Select
                                labelId="interest-label"
                                id="interest"
                                label="Interest"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>All Interest</MenuItem>
                                <MenuItem value={20}>Binatang</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </CmtCardContent>
        </CmtCard>
    )
};

export default Demographics;
