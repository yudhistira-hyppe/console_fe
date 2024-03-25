import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Divider, Grid, ImageList, ImageListItem, Stack, SvgIcon, Tab } from '@mui/material';
import { Box, Typography } from '@material-ui/core';
import { AccountBalance, Cake, CheckCircle, LocationCity, LocationOn, PhoneIphone, Place, Wc } from '@material-ui/icons';
import useStyles from './index.style';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { useAuth } from 'authentication';
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
import ScrollBar from 'react-perfect-scrollbar';

const UserBankInfoComponent = ({ accountDetail }) => {
  const classes = useStyles();
  const { authUser } = useAuth();
  const [tab, setTab] = useState('1');
  const [viewer, setViewer] = useState('');
  const [userBankAccounts] = useState(accountDetail?.userbankaccounts);

  const getImage = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    const endpoint = mediaEndpoint?.split('_');

    return `${STREAM_URL}${endpoint?.[0]}${authToken}`;
  };

  const blurNumberCard = (item) => {
    const number = item?.split('');
    let blurredNumber = [];

    number?.map((n, idx) => {
      if (idx < number?.length - (number?.length - 2)) {
        blurredNumber.push(n);
      } else {
        blurredNumber.push('*');
      }
    });

    return blurredNumber.join('');
  };

  const blurUsername = (item) => {
    const name = item?.split('');
    let blurredName = [];

    name?.map((n, idx) => {
      if (idx < name.length - (name.length - 2)) {
        blurredName.push(n);
      } else {
        blurredName.push('*');
      }
    });

    return blurredName.join('');
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
          <Tab className={classes.tab} label="Daftar Rekening Bank" value="1" />
          <Tab className={classes.tab} label="Daftar Dokumen" value="2" />
        </TabList>
        <Divider />
        <TabPanel value="1" style={{ padding: 0 }}>
          <ScrollBar style={{ maxHeight: 260, padding: '36px 24px', overflow: 'hidden' }}>
            {userBankAccounts?.length >= 1 ? (
              <Grid container rowSpacing={6} columnSpacing={3}>
                {userBankAccounts?.map((bankAccount) => (
                  <Grid key={bankAccount.id} item xs={12} sm={6}>
                    <Stack direction="row" alignItems="center" gap={2}>
                      <img
                        src={bankAccount?.bankIcon || ''}
                        alt=""
                        loading="lazy"
                        style={{
                          width: 80,
                          height: 56,
                          border: '1px solid #737373',
                          borderRadius: 8,
                          objectFit: 'cover',
                          objectPosition: 'center',
                        }}
                      />

                      <Stack direction="column" gap="6px">
                        <Typography style={{ fontSize: 13, fontWeight: 900, color: '#3F3F3F' }}>
                          PT. {bankAccount?.bankname?.replace('Bank ', '')}
                        </Typography>
                        <Typography style={{ fontSize: 12, color: '#737373' }}>
                          {blurNumberCard(bankAccount?.noRek)} -{' '}
                          {blurUsername(
                            bankAccount?.nama?.length >= 7 ? bankAccount?.nama?.split(' ')?.[0] : bankAccount?.nama,
                          )}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Stack direction="row" alignItems="center" justifyContent="center" height={188}>
                <Typography>Kamu belum memiliki rekening bank yang tersimpan</Typography>
              </Stack>
            )}
          </ScrollBar>
        </TabPanel>

        <TabPanel value="2" style={{ padding: '36px 24px' }}>
          <Stack direction="column" gap="24px">
            <Typography style={{ fontWeight: 'bold' }}>
              Dokumen Permohonan ({[]?.filter((item) => item !== null)?.length})
            </Typography>

            <ScrollBar style={{ height: 140 }}>
              <Stack direction="row" id="images">
                {[]?.filter((item) => item !== null)?.length >= 1 ? (
                  <ImageList sx={{ width: '100%' }} cols={3} gap="12px" rowHeight={140}>
                    {[]
                      ?.filter((item) => item !== null)
                      ?.map((item, key) => (
                        <ImageListItem key={key} onClick={handleView} style={{ cursor: 'pointer' }}>
                          <img
                            src={getImage(item)}
                            srcSet={getImage(item)}
                            alt="Lampiran Dokumen Bank"
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
                ) : (
                  <Stack width="100%" height={140}>
                    <Typography>Tidak ada dokumen yang dilampirkan</Typography>
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

UserBankInfoComponent.propTypes = {
  accountDetail: PropTypes.object,
};

export default UserBankInfoComponent;
