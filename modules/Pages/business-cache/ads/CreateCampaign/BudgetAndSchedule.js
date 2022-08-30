import React from "react";
import CmtCardHeader from "../../../../@coremat/CmtCard/CmtCardHeader";
import CmtCardContent from "../../../../@coremat/CmtCard/CmtCardContent";
import {FormControl, InputLabel, OutlinedInput, Select, MenuItem, TextField,Grid} from "@material-ui/core";
import { KeyboardDatePicker } from '@material-ui/pickers';
import CmtCard from "../../../../@coremat/CmtCard";
import {TextFields} from "@material-ui/icons";
import useStyles from "./style";

const BudgetAndSchedule = ({}) =>{
    const classes = useStyles();
    return(
        <CmtCard>
            <CmtCardHeader title={'Budget & Schedule'} />
            <CmtCardContent>
                <Grid item md={6} lg={6} sm={12} xs={12}>
                    <Grid container direction={"column"}>
                        <div className={classes.inputTitle}>Budget</div>
                        <FormControl fullWidth variant="outlined" className='mt-6'>
                            <InputLabel id="package-label">Package</InputLabel>
                            <Select
                                labelId="package-label"
                                id="package"
                                label="Package"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>No Limit</MenuItem>
                                <MenuItem value={20}>Limit</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className='mt-6'>
                            <TextField fullWidth id="other" label="Other" variant="outlined" />
                        </FormControl>
                        <FormControl className='mt-6'>
                            <div className={classes.inputTitle}>
                                Schedule
                            </div>
                            <Grid container justifyContent='space-between'>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="start-date"
                                    label="Start Date"
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="end-date"
                                    label="End Date"
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </FormControl>
                    </Grid>
                </Grid>
            </CmtCardContent>
        </CmtCard>
    )
};

export default BudgetAndSchedule;
