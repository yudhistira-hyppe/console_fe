import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Divider, Grid, ImageList, ImageListItem, Stack, SvgIcon, Tab } from '@mui/material';
import { Box, Typography } from '@material-ui/core';
import { AccountBalance, Cake, LocationCity, LocationOn, PhoneIphone, Wc } from '@material-ui/icons';
import { useGetBankAccountByUserEmailQuery } from 'api/user/user';
import { capitalizeEachWord, formatGender, maskCharacterExceptLastN } from 'helpers/stringHelper';
import moment from 'moment';
import useStyles from './index.style';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { useAuth } from 'authentication';
import ScrollBar from 'react-perfect-scrollbar';

const UserInfoComponent = (props) => {
  const classes = useStyles();
  const { authUser } = useAuth();
  const { accountDetail } = props;
  const [tab, setTab] = useState('1');
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

  const getImage = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;

    return `${STREAM_URL}/v4/${mediaEndpoint}${authToken}`;
  };

  return (
    <Card>
      <TabContext value={tab}>
        <Box padding="12px 12px 0">
          <TabList
            onChange={(event, val) => setTab(val)}
            variant={window.innerWidth < 500 ? 'scrollable' : 'standard'}
            scrollButtons
            textColor="secondary"
            indicatorColor="secondary">
            <Tab className={classes.tab} label="Informasi Pengguna Akun" value="1" />
            <Tab className={classes.tab} label="Dokumen Permohonan Akun Premium" value="2" />
          </TabList>
        </Box>
        <Divider />
        <TabPanel value="1" style={{ padding: 0 }}>
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
                      {'-'}
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
                      {accountDetail?.dob ? formattedDOB(accountDetail.dob) : '-'}
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
                    <Typography className={classes.userInfoContent} variant="h4">
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
        </TabPanel>
        <TabPanel value="2" style={{ padding: 0 }}>
          <ScrollBar style={{ maxHeight: 300 }}>
            <Stack direction="column" p="24px" gap="24px">
              <Stack direction="row">
                <ImageList sx={{ width: '100%' }} cols={4} gap="12px" rowHeight={140}>
                  {[{}, {}]?.map((item, key) => (
                    <ImageListItem key={key}>
                      <img
                        src={getImage(item)}
                        srcSet={getImage(item)}
                        alt="asd"
                        loading="lazy"
                        style={{
                          borderRadius: 8,
                          height: 140,
                          objectFit: 'cover',
                          objectPosition: 'center',
                          border: '1px solid #dddddd',
                        }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Stack>
            </Stack>
          </ScrollBar>
        </TabPanel>
      </TabContext>
    </Card>
  );
};

UserInfoComponent.propTypes = {
  accountDetail: PropTypes.object,
};

export default UserInfoComponent;
