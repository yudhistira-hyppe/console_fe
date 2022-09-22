import React, {useState} from "react";
import useStyles from "../style";
import CmtCardContent from "../../../../../@coremat/CmtCard/CmtCardContent";
import {FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import CmtCard from "../../../../../@coremat/CmtCard";
import FileContent from "./FileContent";

const Content = ({}) =>{
    const [type, setType] = useState("contentAd");
    const [placement, setPlacement] = useState("preContent");
    const classes = useStyles();
    return(
        <div>
            <CmtCard>
                <CmtCardContent>
                    <Grid item md={6} lg={6} sm={12} xs={12}>
                        <Grid container direction={"column"}>
                            <div className={classes.inputTitle}>Type</div>
                            <FormControl fullWidth variant="outlined" className='mt-3'>
                                <Select value={type}>
                                    <MenuItem value={"contentAd"}>Content Ad</MenuItem>
                                    <MenuItem disabled>
                                        <div className={classes.selectLabel}>
                                            <span>Sponsored Ad</span>
                                            <span><i>Yang akan datang</i></span>
                                        </div>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <div className='mt-6'>
                                <div className={classes.inputTitle}>Placement</div>
                                <FormControl fullWidth variant={"outlined"}>
                                    <Select value={placement}>
                                        <MenuItem value={"preContent"}>Pre Content (Hyppevid)</MenuItem>
                                        <MenuItem disabled>
                                            <div className={classes.selectLabel}>
                                                <span>Mid Content</span>
                                                <span><i>Yang akan datang</i></span>
                                            </div>
                                        </MenuItem>
                                        <MenuItem disabled>
                                            <div className={classes.selectLabel}>
                                                <span>Post Content</span>
                                                <span><i>Yang akan datang</i></span>
                                            </div>
                                        </MenuItem>
                                    </Select>
                                    <FormHelperText>Iklan Anda akan muncul pada awal konten video</FormHelperText>
                                </FormControl>
                            </div>
                        </Grid>
                    </Grid>
                </CmtCardContent>
            </CmtCard>
            <div className='mt-6'>
                <FileContent/>
            </div>
        </div>
    )
}

export default Content;
