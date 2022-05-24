import React from "react";
import useStyles from "../style";
import clsx from "clsx";
import CmtCard from "../../../../../@coremat/CmtCard";
import CmtCardContent from "../../../../../@coremat/CmtCard/CmtCardContent";
import {Button} from "@material-ui/core";
import {useRouter} from "next/router";

const PaymentSuccessful = ({}) =>{
    const classes = useStyles();
    const router = useRouter();
    return(
        <div className='m-auto'>
            <div id={'checkIcon'} className={clsx(classes.fitContent,'m-auto')}>
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="30" cy="30" r="27" stroke="#007A00" stroke-width="6"/>
                    <path d="M18.5108 29.6999L26.632 37.9536C27.0347 38.3629 27.6985 38.3498 28.0847 37.9249L42.4129 22.1631" stroke="#007A00" stroke-width="6" stroke-linecap="round"/>
                </svg>
            </div>
            <div className={clsx(classes.paymentSuccessLbl, classes.fitContent,'m-auto mt-6')}>
                Payment Successful
            </div>
            <div className={clsx(classes.summaryField,'mt-3 text-center')}>
                Congratulation! Your payment hass been received
            </div>
            <div className='mt-6' style={{width:'850px'}}>
                <CmtCard>
                    <CmtCardContent>
                        <div className={classes.inputTitle} style={{marginBottom:'20px'}}>
                            Transaction Summary
                        </div>
                        <div className={classes.summaryInfo}>
                            <div className={classes.summaryField}>
                                Total Show
                            </div>
                            <div className={classes.summaryData}>
                                1.000 Show
                            </div>
                        </div>
                        <div className={classes.summaryInfo}>
                            <div className={classes.summaryField}>
                                Payment Method
                            </div>
                            <div className={classes.summaryData}>
                                Hyppe Voucher
                            </div>
                        </div>
                        <div className={classes.summaryInfo}>
                            <div className={classes.summaryField}>
                                Order Date
                            </div>
                            <div className={classes.summaryData}>
                                01 Oct 21 - 28 Oct 21
                            </div>
                        </div>
                    </CmtCardContent>
                </CmtCard>
            </div>
            <div className={clsx(classes.bottomTitle,'mt-8 text-center')}>
                See your Ads details and progress
            </div>
            <div className={clsx(classes.fitContent,'m-auto mt-6 flex flex-row')}>
                <Button variant={"text"} className='min-w-0 p-0 mr-1' onClick={() => router.push('/premium')}>
                    BACK TO HOME
                </Button>
                <Button variant={"contained"} className='ml-1' color={"primary"} onClick={() => router.push('/ads')}>
                    GO TO ADS CENTER
                </Button>
            </div>
        </div>
    )
}
export default PaymentSuccessful;
