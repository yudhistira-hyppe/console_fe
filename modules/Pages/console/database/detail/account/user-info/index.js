import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Divider, Grid, Stack, SvgIcon } from '@mui/material';
import { Box, Typography } from '@material-ui/core';
import { AccountBalance, Cake, LocationCity, LocationOn, PhoneIphone, Wc } from '@material-ui/icons';
import { useGetBankAccountByUserEmailQuery } from 'api/user/user';
import { capitalizeEachWord, formatGender, maskCharacterExceptLastN } from 'helpers/stringHelper';
import moment from 'moment';
import useStyles from './index.style';

const UserInfoComponent = (props) => {
  const classes = useStyles();
  const { accountDetail } = props;
  const { data: userBankAccountsRes } = useGetBankAccountByUserEmailQuery(accountDetail.email);
  const [userBankAccounts, setUserBankAccounts] = useState([]);

  useEffect(() => {
    if (userBankAccountsRes) {
      const formattedBankAccounts = userBankAccountsRes.data.map((bankAccount) => {
        const bankName = bankAccount.bankname.replace(/bank\s/i, '');
        const accountNumber = maskCharacterExceptLastN(bankAccount.noRek, '*', 3);
        const accountName = maskCharacterExceptLastN(bankAccount.nama, '*', 2);
        return {
          id: bankAccount._id,
          detail: `${bankName} ${accountNumber}`,
          accountName: accountName,
        };
      });
      setUserBankAccounts(formattedBankAccounts);
    }
  }, [userBankAccountsRes]);

  const formattedLocation = (city, area, country) => {
    return (
      [city, area, country]
        .filter((item) => item)
        .map((item) => capitalizeEachWord(item))
        .join(', ') || '-'
    );
  };

  const formattedDOB = (dob) => {
    return moment(dob).format('DD/MM/YYYY');
  };

  return (
    <Card>
      <Box padding="24px">
        <Typography variant="h4">Informasi Pengguna Akun</Typography>
      </Box>
      <Divider />
      <Stack padding="36px 24px" rowGap={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Stack direction="row" spacing={2}>
              <SvgIcon sx={{ fontSize: '36px', color: 'text.disabled' }}>
                <LocationOn />
              </SvgIcon>
              <Box>
                <Typography className={classes.userInfoLabel} variant="caption">
                  Tempat Lahir
                </Typography>
                <Typography className={classes.userInfoContent} variant="h4">
                  -
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Stack direction="row" spacing={2}>
              <SvgIcon sx={{ fontSize: '36px', color: 'text.disabled' }}>
                <Cake />
              </SvgIcon>
              <Box>
                <Typography className={classes.userInfoLabel} variant="caption">
                  Tanggal Lahir
                </Typography>
                <Typography className={classes.userInfoContent} variant="h4">
                  {formattedDOB(accountDetail.dob)}
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Stack direction="row" spacing={2}>
              <SvgIcon sx={{ fontSize: '36px', color: 'text.disabled' }}>
                <Wc />
              </SvgIcon>
              <Box>
                <Typography className={classes.userInfoLabel} variant="caption">
                  Jenis Kelamin
                </Typography>
                <Typography className={classes.userInfoContent} variant="h4">
                  {accountDetail.gender ? formatGender(accountDetail.gender) : '-'}
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Stack direction="row" spacing={2}>
              <SvgIcon sx={{ fontSize: '36px', color: 'text.disabled' }}>
                <PhoneIphone />
              </SvgIcon>
              <Box>
                <Typography className={classes.userInfoLabel} variant="caption">
                  Nomor Telepon
                </Typography>
                <Typography className={classes.userInfoContent} variant="h4">
                  {accountDetail.mobileNumber || '-'}
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Stack direction="row" spacing={2}>
              <SvgIcon sx={{ fontSize: '36px', color: 'text.disabled' }}>
                <LocationCity />
              </SvgIcon>
              <Box>
                <Typography className={classes.userInfoLabel} variant="caption">
                  Lokasi
                </Typography>
                <Typography variant="h4">
                  {formattedLocation(accountDetail.city, accountDetail.area, accountDetail.country)}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
        {userBankAccounts.length > 0 && (
          <Grid container spacing={4}>
            {userBankAccounts.map((bankAccount) => (
              <Grid key={bankAccount.id} item xs={12} sm={4}>
                <Stack direction="row" spacing={2}>
                  <SvgIcon sx={{ fontSize: '36px', color: 'text.disabled' }}>
                    <AccountBalance />
                  </SvgIcon>
                  <Box>
                    <Typography className={classes.userInfoLabel} variant="caption">
                      Rekening Bank
                    </Typography>
                    <Box>
                      <Typography className={classes.userInfoContent} variant="h4">
                        {bankAccount.detail}
                      </Typography>
                      <Typography className={classes.userInfoContent} variant="h4">
                        {bankAccount.accountName}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
    </Card>
  );
};

UserInfoComponent.propTypes = {
  accountDetail: PropTypes.object,
};

export default UserInfoComponent;
