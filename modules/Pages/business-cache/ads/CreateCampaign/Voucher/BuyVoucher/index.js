import React, {useState} from 'react';
import PageHeader from "../../../../../../@jumbo/components/PageComponents/PageHeader";
import CmtCard from "../../../../../../@coremat/CmtCard";
import CmtCardContent from "../../../../../../@coremat/CmtCard/CmtCardContent";
import {Button, FormControl, Input} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import {makeStyles} from "@material-ui/core/styles";
import {Add, Remove} from "@material-ui/icons";
import NumberPlusMinus from "../../../../../Components/CommonComponent/NumberPlusMinus";
import {fakeDb} from "../../../../../FakeDb/fake-db";
import numberWithCommas from "../../../../../Components/CommonComponent/NumberWithCommas/NumberWithCommas";


const useStyles = makeStyles((theme) => ({
    voucherLabel: {
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: '16px',
        lineHeight: '16px',
        color: '#151B26'
    },
    infoLabel: {
        fontFamily: 'Lato',
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0.25px',
        color: '#666666',
    }
}));

const BuyVoucher = ({}) => {
    const classes = useStyles();
    const [number, setNumber] = useState(0);
    return (
        <div>
            <PageHeader heading={'Buy Ad Voucher'}/>
            <CmtCard>
                <CmtCardContent>
                    {fakeDb.voucherList.map((value,index) => <Voucher key={index} voucherName={value.voucherName} isCheck={value.isCheck} many={value.many} onCheck={event => value.isCheck = event} price={value.price} voucherInfo={value.voucherInfo} onCounterChange={event => value.many = event}/>)}
                    <div className='mt-6'>
                        <div className={classes.voucherLabel}>
                            About Ad Voucher
                        </div>
                        <div className='mt-2'>
                            <div className={classes.infoLabel}>
                                Hyppe appointed and verified Oase as an exclusive partner to distribute its ads
                                electronic voucher. Currently, Hyppe only receives payment via electronic vouchers
                                through exclusive partnership
                            </div>
                        </div>
                    </div>
                </CmtCardContent>
            </CmtCard>
            <div id={'payment'} className='mt-6'>
                <CmtCard>
                    <CmtCardContent>
                        <div className='pb-4'>
                            <div className={classes.voucherLabel}>
                                Payment
                            </div>
                            <div className='mt-7'>
                                <div className='pb-4 pt-4 flex flex-row align-content-center justify-content-between border-top-1'
                                     style={{borderColor: 'rgba(0, 0, 0, 0.161741)'}}>
                                <span className={classes.infoLabel}>
                                    Voucher 1000 show
                                </span>
                                    <span className={classes.infoLabel}>
                                    Rp.3000000
                                </span>
                                </div>
                                <div className='pb-4 pt-4 flex flex-row align-content-center justify-content-between border-top-1'
                                     style={{borderColor: 'rgba(0, 0, 0, 0.161741)'}}>
                                <span className={classes.voucherLabel}>
                                    Total
                                </span>
                                    <span className={classes.voucherLabel}>
                                    Rp.3000000
                                </span>
                                </div>
                            </div>
                        </div>
                    </CmtCardContent>
                </CmtCard>
            </div>
        </div>
    )
};

const Voucher = ({voucherName, voucherInfo, price, many, isCheck, onCheck, onCounterChange}) =>{
    const classes = useStyles();
    return(
        <div className='flex flex-row border-1 mb-4 p-3' style={{borderRadius: '5px', borderColor:'#E0E0E0'}}>
            <div className='-mt-2'>
                <Checkbox onChange={onCheck} value={isCheck}/>
            </div>
            <div className='w-full ml-3'>
                <div className='flex flex-row justify-content-between'>
                    <div className={classes.voucherLabel}>
                        {voucherName}
                    </div>
                    <div className={classes.voucherLabel}>
                        Rp {numberWithCommas(price)}
                    </div>
                </div>
                <div className='mt-2'>
                    <div className={classes.infoLabel}>
                        {voucherInfo}
                    </div>
                </div>
                <div className='w-full flex flex-row-reverse'>
                    <NumberPlusMinus counter={0} onChange={onCounterChange}/>
                </div>
            </div>
        </div>
    )
}

export default BuyVoucher;
