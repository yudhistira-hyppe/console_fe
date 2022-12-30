import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useStyles from './index.style';
import { Card, Divider, Stack, Box, CircularProgress, Button } from '@mui/material';
import { Typography } from '@material-ui/core';
import CmtSearch from '@coremat/CmtSearch';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import { useLazyUserAdListQuery, useUserAdListQuery } from 'api/console/monetize/ad';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import { LoadingButton } from '@mui/lab';

const AdsCampaign = (props) => {
  const { email } = props;
  const classes = useStyles();
  const [adsCampaign, setAdsCampaign] = useState([]);
  const [payload, setPayload] = useState({
    email: email,
    search: '',
    skip: 0,
    limit: 10,
  });
  const [loadingButton, setLoadingButton] = useState(false);
  const { data: userAds, isFetching: loadingAds } = useUserAdListQuery(payload);

  useEffect(() => {
    setAdsCampaign((prev) => {
      return payload?.search !== '' ? userAds?.data : prev?.length >= 1 ? [...prev, ...userAds?.data] : userAds?.data;
    });
  }, [userAds]);

  const onSearchInputBlur = (value) => {
    value === '' && setAdsCampaign([]);
    setPayload((prevState) => ({
      ...prevState,
      search: value,
      skip: 0,
    }));
  };

  const onErrorPostImage = (error) => {
    error.target.src = '/images/icons/img-empty.svg';
  };

  return (
    <Card>
      <Stack direction="row" alignItems="center" justifyContent="space-between" padding={3}>
        <Typography variant="h4">Kampanye Iklan</Typography>
        <CmtSearch
          onlyIcon
          border={false}
          placeholder="Cari kampanye iklan"
          onBlur={(e) => onSearchInputBlur(e.target.value)}
        />
      </Stack>
      <Divider />
      <PerfectScrollbar style={{ maxHeight: 408, padding: 20 }}>
        <Stack minHeight={368} direction="column" gap="20px" alignItems="center">
          {loadingAds ? (
            <Stack height={368} alignItems="center" justifyContent="center" spacing={2}>
              <CircularProgress color="secondary" />
              <Typography style={{ fontWeight: 'bold' }}>Loading data...</Typography>
            </Stack>
          ) : adsCampaign?.length >= 1 ? (
            adsCampaign?.map((item) => (
              <Stack direction="row" key={item._id} width="100%">
                <img
                  className={classes.adCampaignImage}
                  src={item?.media?.VideoList[0].CoverURL || '/images/dashboard/content_image.png'}
                  alt={item?.name}
                />
                <Stack direction="column" justifyContent="space-between" gap={1} ml={2} my={1}>
                  <Typography className={classes.adCampaignDescription}>{item?.name}</Typography>
                  <Box fontSize={12} lineHeight="16px">
                    <Box component="span" color="text.disabled">
                      Tanggal Mulai
                    </Box>
                    {` ${moment(item?.timestamp).utc().format('DD/MM/YYYY - HH:mm')}`}
                  </Box>
                </Stack>
                <Stack gap={0.5} ml="auto">
                  <Box fontSize={12} lineHeight="16px">
                    <Box component="span" color="text.disabled">
                      Rencana Tayang:
                    </Box>{' '}
                    {numberWithCommas(item?.tayang || 0)} Kali
                  </Box>
                  <Box fontSize={12} lineHeight="16px">
                    <Box component="span" color="text.disabled">
                      Durasi:
                    </Box>{' '}
                    {Number(item?.duration).toFixed(0)} Detik
                  </Box>
                </Stack>
              </Stack>
            ))
          ) : (
            <Stack alignItems="center" justifyContent="center" gap="16px" height={368}>
              <img src="/images/icon-media-empty.png" alt="Icon Empty" style={{ width: 50, height: 50 }} />
              <Typography style={{ color: '#666666' }}>
                {payload.search
                  ? `Kampanye iklan dengan kata kunci "${payload.search}" tidak ditemukan`
                  : 'Pengguna belum memiliki data apapun'}
              </Typography>
            </Stack>
          )}

          {!loadingAds && userAds?.skip < userAds?.totalSearch - 10 && (
            <LoadingButton
              loading={loadingButton}
              variant="contained"
              color="secondary"
              onClick={() =>
                setPayload((prev) => {
                  return { ...prev, skip: payload?.skip + 10 };
                })
              }>
              Muat lebih banyak
            </LoadingButton>
          )}
        </Stack>
      </PerfectScrollbar>
    </Card>
  );
};

AdsCampaign.propTypes = {
  email: PropTypes.string,
};

export default AdsCampaign;
