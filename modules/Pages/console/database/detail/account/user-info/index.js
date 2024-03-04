import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Divider, Grid, ImageList, ImageListItem, Stack, SvgIcon, Tab } from '@mui/material';
import { Box, Typography } from '@material-ui/core';
import { AccountBalance, Cake, CheckCircle, LocationCity, LocationOn, PhoneIphone, Place, Wc } from '@material-ui/icons';
import { capitalizeEachWord, formatGender, maskCharacterExceptLastN } from 'helpers/stringHelper';
import moment from 'moment';
import useStyles from './index.style';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { useAuth } from 'authentication';
import ScrollBar from 'react-perfect-scrollbar';
import GridContainer from '@jumbo/components/GridContainer';
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
import dayjs from 'dayjs';

const ItemInfo = ({ icon, title, value }) => {
  return (
    <Stack direction="row" alignItems="center" gap={2}>
      <Stack
        alignItems="center"
        justifyContent="center"
        style={{ width: 54, height: 54, backgroundColor: '#EAEAEA', borderRadius: 8 }}>
        {icon}
      </Stack>
      <Stack direction="column">
        <Typography style={{ fontSize: 14, color: '#00000099' }}>{title}</Typography>
        <Typography
          style={{ fontSize: 16, whiteSpace: 'nowrap', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {value}
        </Typography>
      </Stack>
    </Stack>
  );
};

const UserInfoComponent = ({ accountDetail }) => {
  const classes = useStyles();
  const { authUser } = useAuth();
  const [tab, setTab] = useState('1');
  const [viewer, setViewer] = useState('');

  const getImage = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    const endpoint = mediaEndpoint?.split('_');

    return `${STREAM_URL}${endpoint?.[0]}${authToken}`;
  };

  useEffect(() => {
    if (tab === '2') {
      setViewer(new Viewer(document.getElementById('images')));
    }
  }, [tab]);

  const handleView = () => {
    return viewer.toggle();
  };

  return (
    <Card>
      <TabContext value={tab}>
        <TabList
          onChange={(event, val) => setTab(val)}
          variant={window.innerWidth < 500 ? 'scrollable' : 'standard'}
          scrollButtons
          textColor="secondary"
          indicatorColor="secondary"
          style={{ padding: '8px 24px 0' }}>
          <Tab className={classes.tab} label="Biodata" value="1" />
          <Tab className={classes.tab} label="Dokumen Verifikasi" value="2" />
        </TabList>
        <Divider />
        <TabPanel value="1" style={{ padding: '36px 24px 54px' }}>
          <Stack direction="column">
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <ItemInfo
                  icon={<Place style={{ fontSize: 36, color: '#767676' }} />}
                  title="Tempat Lahir"
                  value={accountDetail?.tempatLahir || '-'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ItemInfo
                  icon={<Cake style={{ fontSize: 36, color: '#767676' }} />}
                  title="Tanggal Lahir"
                  value={accountDetail?.dob ? dayjs(accountDetail.dob).format('DD/MM/YYYY') : '-'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ItemInfo
                  icon={<Wc style={{ fontSize: 36, color: '#767676' }} />}
                  title="Jenis Kelamin"
                  value={
                    accountDetail?.gender === 'FEMALE'
                      ? 'Perempuan'
                      : accountDetail?.gender === 'MALE'
                      ? 'Laki-laki'
                      : accountDetail?.gender === 'OTHER'
                      ? 'Lainnya'
                      : '-'
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ItemInfo
                  icon={<PhoneIphone style={{ fontSize: 36, color: '#767676' }} />}
                  title="Nomor Telepon"
                  value={accountDetail?.mobileNumber || '-'}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <ItemInfo
                  icon={<Place style={{ fontSize: 36, color: '#767676' }} />}
                  title="Lokasi"
                  value={`${accountDetail?.states || ''} ${accountDetail?.cities ? `,${accountDetail?.cities}` : ''}`}
                />
              </Grid>
            </Grid>
            {/* {userBankAccounts?.length >= 1 && (
              <Grid container>
                {userBankAccounts?.map((bankAccount) => (
                  <Grid key={bankAccount.id} item xs={12} sm={4}>
                    <Stack direction="row" spacing={2}>
                      <Box style={{ position: 'relative' }}>
                        <SvgIcon sx={{ fontSize: '36px', color: 'text.disabled' }}>
                          <AccountBalance />
                        </SvgIcon>
                        {bankAccount?.active && (
                          <CheckCircle
                            style={{ position: 'absolute', bottom: 20, right: -6, color: '#5D9405', fontSize: 20 }}
                          />
                        )}
                      </Box>
                      <Box>
                        <Typography className={classes.userInfoLabel} variant="caption">
                          Rekening Bank
                        </Typography>
                        <Box>
                          <Typography className={classes.userInfoContent} variant="h4">
                            {bankAccount?.bankname?.replace('Bank ', '')} {blurNumberCard(bankAccount?.noRek)}
                          </Typography>
                          <Typography className={classes.userInfoContent} variant="h4">
                            {blurUsername(bankAccount?.nama)}
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            )} */}
          </Stack>
        </TabPanel>

        <TabPanel value="2" style={{ padding: '36px 24px' }}>
          <Stack direction="column" gap="24px">
            <Typography style={{ fontWeight: 'bold' }}>
              Dokumen Permohonan ({accountDetail?.dokument?.filter((item) => item !== null)?.length})
            </Typography>

            <ScrollBar style={{ height: 228, paddingRight: 24 }}>
              <Stack direction="row" id="images">
                {accountDetail?.dokument?.filter((item) => item !== null)?.length >= 1 ? (
                  <ImageList sx={{ width: '100%' }} cols={4} gap="12px" rowHeight={228}>
                    {accountDetail?.dokument
                      ?.filter((item) => item !== null)
                      ?.map((item, key) => (
                        <ImageListItem key={key} onClick={handleView} style={{ cursor: 'pointer' }}>
                          <img
                            src={getImage(item)}
                            srcSet={getImage(item)}
                            alt="Lampiran Dokumen Verifikasi"
                            loading="lazy"
                            style={{
                              borderRadius: 8,
                              height: 120,
                              objectFit: 'cover',
                              objectPosition: 'center',
                              border: '1px solid #dddddd',
                            }}
                          />
                        </ImageListItem>
                      ))}
                  </ImageList>
                ) : (
                  <Stack width="100%" height={228}>
                    <Typography>User ini belum melakukan verifikasi</Typography>
                  </Stack>
                )}
              </Stack>
            </ScrollBar>
          </Stack>
        </TabPanel>
      </TabContext>
    </Card>
  );
};

UserInfoComponent.propTypes = {
  accountDetail: PropTypes.object,
};

export default UserInfoComponent;
