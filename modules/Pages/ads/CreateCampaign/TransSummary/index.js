import React from "react";
import useStyles from "../style";
import CmtCard from "../../../../../@coremat/CmtCard";
import CmtCardContent from "../../../../../@coremat/CmtCard/CmtCardContent";
import ChoseVoucherDialog from "../Voucher/ChoseVoucherDialog";
import clsx from "clsx";
import {Button} from "@material-ui/core";
import {useRouter} from "next/router";

const TransSummary = ({}) => {
    const classes = useStyles();
    const router = useRouter();
    return(
        <div>
            <CmtCard>
                <CmtCardContent>
                    <div className={classes.inputTitle} style={{marginBottom:'20px'}}>
                        Transaction Summary
                    </div>
                    <div className={classes.summaryInfo}>
                        <div className={classes.summaryField}>
                            Ad Name
                        </div>
                        <div className={classes.summaryData}>
                            IklanHype
                        </div>
                    </div>
                    <div className={classes.summaryInfo}>
                        <div className={classes.summaryField}>
                            Type
                        </div>
                        <div className={classes.summaryData}>
                            Content Ad
                        </div>
                    </div>
                    <div className={classes.summaryInfo}>
                        <div className={classes.summaryField}>
                            Schedule
                        </div>
                        <div className={classes.summaryData}>
                            01 Oct 21 - 28 Oct 21
                        </div>
                    </div>
                    <div className={classes.summaryInfo}>
                        <div className={classes.summaryField}>
                            Budget
                        </div>
                        <div className={classes.summaryData}>
                            Rp 1.500.000
                        </div>
                    </div>
                    <div className={classes.summaryInfo} style={{borderBottom:'1px solid rgba(0, 0, 0, 0.161741)'}}>
                        <div className={classes.summaryField}>
                            Trafic
                        </div>
                        <div className={classes.summaryData}>
                            Website
                        </div>
                    </div>
                    <div id={'totalShow'} className={classes.summaryInfo} style={{marginTop:'20px', borderTop:'none'}}>
                        <div className={classes.inputTitle}>
                            Total Show
                        </div>
                        <div className={classes.inputTitle}>
                            1000 show
                        </div>
                    </div>
                </CmtCardContent>
            </CmtCard>
            <CmtCard className='mt-4'>
                <CmtCardContent>
                    <div className={classes.inputTitle} style={{marginBottom:'20px'}}>
                        Payment
                    </div>
                    <div className={classes.summaryInfo}>
                        <div className={classes.summaryField}>
                            Hyppe Voucher
                        </div>
                        <ChoseVoucherDialog></ChoseVoucherDialog>
                    </div>
                    <div className={classes.summaryInfo}>
                        <div className={classes.summaryField}>
                            Don't have vouchers yet?
                        </div>
                        <Button variant='text' onClick={() => router.push('/voucher/buy')}
                                className='min-w-0 p-0'>
                            <div className={classes.labelLink}>Buy Voucher</div>
                        </Button>
                    </div>
                </CmtCardContent>
            </CmtCard>
        </div>
    )
};
export default TransSummary;
