import React, {useState} from "react";
import CmtCard from "../../../../@coremat/CmtCard";
import CmtCardContent from "../../../../@coremat/CmtCard/CmtCardContent";
import Box from "@material-ui/core/Box";
import CmtCardHeader from "../../../../@coremat/CmtCard/CmtCardHeader";
import {getTodayDate, getYesterdayDate} from "../../../../@jumbo/utils/dateHelper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {FileCopy} from "@material-ui/icons";
import PerfectScrollbar from "react-perfect-scrollbar";
import {fakeDb} from "../../../FakeDb/fake-db";
import clsx from "clsx";

const actions = [
    {
        label: 'Semua Voucher',
        value: getTodayDate(),
    },
    {
        label: 'Yesterday',
        value: getYesterdayDate(),
    },
    {
        label: 'This Week',
        value: 'this_week',
    },
];

const useStyles = makeStyles((theme) => ({
    cardContentRoot: {
        padding: '0 !important',
    },
    titleRoot: {
        letterSpacing: 0.15,
    },
    scrollbarRoot: {
        height: 340,
    },
    badgeRoot: {
        color: theme.palette.common.white,
        borderRadius: 30,
        fontSize: 12,
        padding: '2px 10px',
        display: 'inline-block',
    },
    buttonContainer: {
        width: '30%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    voucherContainer: {
        margin: '0 10px 10px 10px',
        padding: '20px',
        height: '108px',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: 4,
    },
    voucherTitleLbl: {
        fontFamily: 'Lato',
        fontWeight: '700',
        fontSize: '16px',
        lineHeight: '16px',
        color: 'rgba(0, 0, 0, 0.87)'
    },
    voucherSubtitle: {
        fontFamily: 'Lato',
        fontWeight: '400',
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0.25px',
        color: 'rgba(0, 0, 0, 0.6)',
    },
    expLabelSize:{
        fontSize: '12px'
    }
}));

const Voucher = ({title, subTitle, expDate, voucherCode}) =>{
    const classes = useStyles();
    return(
        <div className={classes.voucherContainer}>
            <div className={classes.voucherTitleLbl}>
                {title}
            </div>
            <div className={clsx(classes.voucherSubtitle, 'mt-1')}>
                {subTitle}
            </div>
            <div className='mt-4 flex flex-row justify-content-between align-items-center'>
                <div className={clsx(classes.voucherSubtitle, classes.expLabelSize)}>
                    Tanggal Kadaluarsa : {expDate}
                </div>
                <div className={clsx(classes.voucherSubtitle, classes.expLabelSize)}>
                    {voucherCode} <span><FileCopy className={clsx(classes.voucherSubtitle, classes.expLabelSize)}/></span>
                </div>
            </div>
        </div>
    );
}

const MyVoucher = ({}) => {
    const [menu, setMenu] = useState('Semua Voucher');
    const {myVoucher} = fakeDb
    const classes = useStyles();
    return(
        <CmtCard>
            <CmtCardHeader
                className="pt-4"
                title={'Voucher Saya'}
                titleProps={{
                    variant: 'h4',
                    component: 'div',
                    className: classes.titleRoot,
                }}
                actions={actions}>
                <Box className={classes.badgeRoot} component="span" bgcolor="#FFDE99">
                    {menu}
                </Box>
            </CmtCardHeader>
            <CmtCardContent className={classes.cardContentRoot}>
                <PerfectScrollbar className={classes.scrollbarRoot}>
                    {myVoucher.map(value => <Voucher title={value.title} subTitle={value.subTitle} expDate={value.expDate} voucherCode={value.voucherCode}/>)}
                </PerfectScrollbar>
            </CmtCardContent>
        </CmtCard>
    )
}

export default MyVoucher;
