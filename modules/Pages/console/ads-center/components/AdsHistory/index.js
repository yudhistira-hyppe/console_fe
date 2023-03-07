import React from 'react';
import { Typography, Stack, Avatar, Card, CircularProgress } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import ScrollBar from 'react-perfect-scrollbar';
import { useGetLogDetailAdsQuery } from 'api/console/ads';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  cardRoot: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    height: '15%',
    padding: '2em 2em 0',
  },
  historyListContainer: {
    height: 200,
    overflowY: 'auto',
    padding: '1em 2em 0',
  },
  textPrimaryBold: {
    fontWeight: 'bold',
    color: '#AB22AF',
  },
}));

const AdsDetailComponent = ({ idAds }) => {
  const classes = useStyles();
  const { authUser } = useAuth();

  const { data: logDetail, isLoading: loadingLog } = useGetLogDetailAdsQuery(idAds);

  const getImage = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    const endpoint = mediaEndpoint?.split('_');

    return `${STREAM_URL}${endpoint?.[0]}${authToken}`;
  };

  const HistoryItem = ({ item }) => (
    <Stack direction="row" spacing={2} mb={2}>
      <Stack direction="column" justifyContent="center">
        <Avatar src={getImage(item?.profile?.mediaEndpoint)} />
      </Stack>

      <div>
        <Stack direction="row" alignItems="end" spacing={1}>
          <Typography fontFamily="Lato" variant="body1" fontWeight="bold">
            {item?.titlerow === 'pemohon' && 'Iklan Diajukan'}
            {item?.titlerow === 'adminapprove' && 'Iklan Dijadwalkan'}
            {item?.titlerow === 'lastpenonton' && 'Iklan Habis'}
          </Typography>
          <Typography fontFamily="Lato" color="rgba(0, 0, 0, 0.38)" fontSize={12}>
            {moment(item?.tempcreatedAt).format('DD/MM/YYYY - HH:mm')} WIB
          </Typography>
        </Stack>

        <Typography fontFamily="Lato" variant="caption">
          {item?.profile?.fullName && item?.titlerow !== 'lastpenonton' && (
            <span className={`${useStyles().textPrimaryBold} mr-1`} style={{ fontWeight: 'bold', fontFamily: 'Normal' }}>
              @{item.profile?.fullName}
            </span>
          )}
          {item?.titlerow === 'pemohon' && 'mengajukan permohonan pemasangan iklan dari Hyppe Business'}
          {item?.titlerow === 'adminapprove' && 'telah menyetujui untuk menjadwalankan iklan di Hyppe Business.'}
          {item?.titlerow === 'lastpenonton' && 'Kredit iklan telah habis digunakan dari sistem Hyppe Console'}
        </Typography>
      </div>
    </Stack>
  );

  return (
    <>
      <Card className={classes.cardRoot}>
        <div className={classes.cardHeader}>
          <Typography fontWeight="bold" fontFamily="Lato" variant="h6">
            Riwayat Iklan
          </Typography>
        </div>

        <Stack height="100%" direction="column" style={{ padding: '0 24px', margin: '24px 0' }}>
          <ScrollBar style={{ maxHeight: 260 }}>
            {loadingLog ? (
              <Stack direction="column" alignItems="center" justifyContent="center" height="100%" spacing={2}>
                <CircularProgress color="secondary" size={32} />
              </Stack>
            ) : (
              logDetail?.data?.map((item, key) => <HistoryItem item={item} key={key} />)
            )}
          </ScrollBar>
        </Stack>
      </Card>
    </>
  );
};

export default AdsDetailComponent;
