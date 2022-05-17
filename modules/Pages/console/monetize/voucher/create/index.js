import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { useRouter } from 'next/router';
import { Box, Button, Checkbox, Grid, MenuItem, TextField, Typography } from '@material-ui/core';
import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import GridContainer from '@jumbo/components/GridContainer';
import { KeyboardDatePicker } from '@material-ui/pickers';

import { postCreateVoucher } from 'redux/actions/monetizeAction';
import { fromatDateObject } from 'helpers/stringHelper';

const breadcrumbs = [
    { label: 'Home', link: '/console' },
    { label: 'Monetize', link: '/console/monetize' },
    { label: 'Campaign Voucher', link: '/console/monetize/voucher' },
    { label: 'Create Voucher', isActive: true },
  ];

const useRowStyles = makeStyles({
    formRoot: {
        width: '100%',
        '& .MuiTextField-root': {
            width: '100%'
        },
    },
    selectBox: {
        padding: '0px!important',
        '& .MuiCheckbox-root:not(:first-child)': {
            marginLeft: 40
        }
    },
    selectBoxGroupTitle: {
        padding: '20px 12px 0 12px!important'
    },
    resultVoucherLists: {
        borderTop: '1px solid #ccc',
        borderBottom: '1px solid #ccc',
        textAlign: 'center',
        '& .MuiTypography-h5': {
            padding: 12
        }
    },
    btnSecondary: {
        marginLeft: 8
    }
});

const penayangan = [
    {
        'label': '1.000',
        'value': '1000'
    },
    {
        'label': '10.000',
        'value': '10000'
    },
    {
        'label': '100.000',
        'value': '100000'
    },
    {
        'label': '1000.000',
        'value': '1000000'
    }
]

const ConsoleVoucherCreateComponent = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const classes = useRowStyles();
  const { id } = router.query
  const [jumlahPenayangan, setJumlahPenayangan] = useState(0);
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [isUpperCase, setUpperCase] = useState(false);
  const [isLowerCase, setLowerCase] = useState(false);
  const [isNumber, setNumber] = useState(false);
  const [jumlahVoucher, setJumlahVoucher] = useState("");
  const [voucherLength, setVoucherLength] = useState("");
  const [awalanVoucher, setAwalanVoucher] = useState("");
  const [akhiranVoucher, setAkhiranVoucher] = useState("");
  const [errorJumlahVoucher, setErrorJumlahVoucher] = useState("");
  const [errorJumlahPenayangan, setErrorJumlahPenayangan] = useState("");
  const [errorVoucherLength, setErrorVoucherLength] = useState("");
  const {createdVoucherLists} = useSelector((state) => state.monetizeReducers);

  const submitForm = () => {

    setErrorJumlahVoucher("");
    setErrorJumlahPenayangan("");
    setErrorVoucherLength("");

    let errorCount = 0;
    if(jumlahVoucher == "" || jumlahVoucher == 0) {
        setErrorJumlahVoucher("Jumlah voucher harus diisi");
        errorCount++;
    }

    if(jumlahPenayangan == "" || jumlahPenayangan == 0) {
        setErrorJumlahPenayangan("Pilih jumlah penayangan");
        errorCount++;
    }

    if(voucherLength == "" || voucherLength == 0) {
        setErrorVoucherLength("Panjang voucher harus diisi");
        errorCount++;
    }

    if(errorCount == 0) {
        const postData = {
            "email": id,
            "voucher_count": jumlahVoucher,
            "impression": jumlahPenayangan,
            "code_length": voucherLength,
            "code_role": {
              "prefix": awalanVoucher,
              "suffix": akhiranVoucher,
              "uppercase": isUpperCase,
              "lowercase": isLowerCase,
              "number": isNumber
            },
            "start_date": fromatDateObject(startDate),
            "end_date": fromatDateObject(endDate)
          }
    
        console.log(postData);
        dispatch(postCreateVoucher(postData));
    }
  }

  console.log(createdVoucherLists)

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Create Voucher</title>
      </Head>
      <PageContainer heading="Create Voucher" breadcrumbs={breadcrumbs}>
        <CmtCard>
            <CmtCardHeader title="Create Voucher" />
            <CmtCardContent>
                <GridContainer>
                    <Grid item xs={12} lg={6}>
                        <Box className={classes.formRoot}>
                            <TextField 
                                error={errorJumlahVoucher != ""}
                                helperText={errorJumlahVoucher}
                                label="Jumlah Voucher" 
                                variant="outlined" 
                                type="number" 
                                value={jumlahVoucher} 
                                onChange={(e) => setJumlahVoucher(e.target.value)} 
                                />
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Box className={classes.formRoot}>
                            <TextField
                                error={errorJumlahPenayangan != ""}
                                helperText={errorJumlahPenayangan}
                                select
                                label="Jumlah Penayangan"
                                value={jumlahPenayangan}
                                onChange={(e) => setJumlahPenayangan(e.target.value)}
                                variant="outlined">
                                {penayangan.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <Typography component="div" variant="h5">
                            Total Penayangan: 0
                        </Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Box className={classes.formRoot}>
                            <TextField 
                                error={errorVoucherLength != ""}
                                helperText={errorVoucherLength}
                                label="Panjang Kode Voucher" 
                                variant="outlined" 
                                type="number" 
                                value={voucherLength} 
                                onChange={(e) => setVoucherLength(e.target.value)} 
                            />
                        </Box>
                    </Grid>
                    
                    <Grid item xs={12} lg={6}>&nbsp;</Grid>
                    <Grid item xs={12} lg={6}>
                        <KeyboardDatePicker
                                className={classes.formRoot}
                                disableToolbar
                                variant="inline"
                                format="DD/MM/yyyy"
                                margin="normal"
                                label="Start Date"
                                value={startDate}
                                onChange={(date) => setStartDate(date)}
                                KeyboardButtonProps={{
                                'aria-label': 'Change Date',
                                }}
                            />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <KeyboardDatePicker
                                className={classes.formRoot}
                                disableToolbar
                                variant="inline"
                                format="DD/MM/yyyy"
                                margin="normal"
                                label="Start Date"
                                value={endDate}
                                onChange={(date) => setEndDate(date)}
                                KeyboardButtonProps={{
                                'aria-label': 'Change Date',
                                }}
                            />
                    </Grid>
                    <Grid item xs={12} lg={12} className={classes.selectBoxGroupTitle}>
                        <Typography component="div" variant="h5">
                            Set Karakter
                        </Typography>
                    </Grid>
                    <Grid item xs={12} lg={12} className={classes.selectBox}>
                        <Checkbox checked={isUpperCase} onChange={(e) => setUpperCase(e.target.checked)} inputProps={{ 'aria-label': 'primary checkbox' }} /> Huruf Kapital
                        <Checkbox checked={isLowerCase} onChange={(e) => setLowerCase(e.target.checked)} inputProps={{ 'aria-label': 'primary checkbox' }} /> Huruf Kecil
                        <Checkbox checked={isNumber} onChange={(e) => setNumber(e.target.checked)} inputProps={{ 'aria-label': 'primary checkbox' }} /> Angka
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Box className={classes.formRoot}>
                            <TextField label="Awalan" variant="outlined" value={awalanVoucher} onChange={(e) => setAwalanVoucher(e.target.value)} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Box className={classes.formRoot}>
                            <TextField label="Akhiran" variant="outlined" value={akhiranVoucher} onChange={(e) => setAkhiranVoucher(e.target.value)} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={submitForm}>
                            Buat
                        </Button>
                    </Grid>
                    
                    {createdVoucherLists.length > 0 && 
                        <>
                            <Grid item xs={12} lg={12} className={classes.resultVoucherLists}>
                                    { createdVoucherLists.map((voucher) => 
                                        <Typography component="div" variant="h5">
                                            {voucher}
                                        </Typography>
                                    )}
                            </Grid>
                            <Grid item xs={12} lg={12}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={submitForm}>
                                    Salin Code
                                </Button>
                                <Button
                                    className={classes.btnSecondary} 
                                    color="secondary"
                                    variant="contained"
                                    onClick={submitForm}>
                                    Unduh CSV
                                </Button>
                            </Grid>
                        </>
                    } 
                </GridContainer>
            </CmtCardContent>
        </CmtCard>
      </PageContainer>
    </>
  )
}

export default ConsoleVoucherCreateComponent;