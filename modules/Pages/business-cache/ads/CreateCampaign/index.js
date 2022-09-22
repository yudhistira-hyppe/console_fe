import React from 'react';
import PageContainer from "../../../../@jumbo/components/PageComponents/layouts/PageContainer";
import {Button, Grid} from "@material-ui/core";
import CampaignBasicInfo from "./CampaignBasicInfo";
import Demographics from "./Demographics";
import BudgetAndSchedule from "./BudgetAndSchedule";
import Traffic from "./Traffic";
import AdsStepper from "./AdsStepper";
import {PageHeader} from "../../../../@jumbo/components/PageComponents";
import Content from "./Content";
import useStyles from "./style";
import TransSummary from "./TransSummary";
import ChoseVoucherDialog from "./Voucher/ChoseVoucherDialog";
import {useDispatch, useSelector} from "react-redux";
import {decreaseSteps, increaseSteps} from "../../../../redux/actions/Campaign";
import {ENUM_STEPS} from "../../../../redux/reducers/Campaign";
import {useRouter} from "next/router";

const CreateCampaign = ({}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {campaign} = useSelector(({campaignReducer}) => campaignReducer);
    const router = useRouter();
    return (
        <div>
            <Grid container direction={"row"} className='justify-content-between'>
                <Grid item md={4} lg={4} sm={6} xs={6}>
                    <PageHeader heading={'Create New Campaign'}/>
                </Grid>
                <Grid item md={8} lg={8} sm={6} xs={6}>
                    <AdsStepper/>
                </Grid>
            </Grid>
            {campaign == ENUM_STEPS.SET &&
            <div>
                <div className='mt-6'>
                    <CampaignBasicInfo/>
                </div>
                <div className='mt-6'>
                    <Demographics/>
                </div>
                <div className='mt-6'>
                    <BudgetAndSchedule/>
                </div>
                <div className='mt-6'>
                    <Traffic/>
                </div>
            </div>}
            {campaign == ENUM_STEPS.CREATE &&
            <div className='mt-6'>
                <Content/>
            </div>}
            {campaign == ENUM_STEPS.PAYMENT &&
            <div className='mt-6'>
                <TransSummary/>
            </div>
            }
            <div className={classes.stepBtnContainer}>
                <Grid container direction={"row"} justifyContent={"space-between"}>
                    <Grid item md={8}>
                        <Button variant="contained">CLOSE</Button>
                    </Grid>
                    <Grid item md={4}>
                        <Grid container direction={"row-reverse"}>
                            {campaign != ENUM_STEPS.PAYMENT && <Button className='ml-3' onClick={() => dispatch(increaseSteps())} variant="contained"
                                    color="primary">
                                NEXT
                            </Button>
                            }
                            {campaign == ENUM_STEPS.PAYMENT && <Button className='ml-3' onClick={() => router.push('/ads/paymentSuccess')} variant="contained"
                                                                       color="primary">
                                PROCEED TO PAYMENT
                            </Button>
                            }
                            <Button disabled={campaign == ENUM_STEPS.SET}
                                    onClick={() => dispatch(decreaseSteps())} variant="outlined" color="primary">
                                BACK
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
};

export default CreateCampaign;
