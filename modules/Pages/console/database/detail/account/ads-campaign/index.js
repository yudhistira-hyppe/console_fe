import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useStyles from './index.style';
import { Card, Divider, Stack, Box, CircularProgress, Button } from '@mui/material';
import { Typography } from '@material-ui/core';
import CmtSearch from '@coremat/CmtSearch';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import { useUserAdListQuery } from 'api/console/monetize/ad';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import { LoadingButton } from '@mui/lab';
import { debounce } from 'lodash';

const AdsCampaign = (props) => {
  const { email } = props;
  const classes = useStyles();
  const [adsCampaign, setAdsCampaign] = useState([]);
  const [payload, setPayload] = useState({
    startdate: moment().subtract(90, 'day').format('YYYY-MM-DD'),
    enddate: moment().format('YYYY-MM-DD'),
    email: email,
    search: '',
    page: 0,
    limit: 10,
  });
  const [loadingButton, setLoadingButton] = useState(false);
  const { data: userAds, isFetching: loadingAds } = useUserAdListQuery(payload);

  useEffect(() => {
    if (!loadingAds) {
      setAdsCampaign((prev) => {
        if (payload.page >= 1) {
          return [...prev, userAds?.data];
        } else {
          return prev;
        }
      });
    }
  }, [userAds, loadingAds]);

  const onSearchInputBlur = debounce((value) => {
    setPayload((prevState) => ({
      ...prevState,
      search: value,
      page: 0,
    }));
  }, 500);

  const onErrorPostImage = (error) => {
    error.target.src = '/images/icons/img-empty.svg';
  };

  return (
    <Card>
      <Stack direction="row" alignItems="center" justifyContent="space-between" padding={3}>
        <Typography variant="h4">Iklan</Typography>
        <CmtSearch
          onlyIcon
          border={false}
          placeholder="Cari nama iklan"
          onChange={(e) => onSearchInputBlur(e.target.value)}
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
                    <Typography style={{ fontSize: 12, color: '#00000061' }}>
                      Tanggal Mulai <span style={{ color: 'black' }}>{moment(item?.liveAt).format('DD/MM/YYYY')}</span>
                    </Typography>
                  </Box>
                </Stack>
                <Stack gap={0.5} ml="auto" alignItems="flex-end">
                  <Box fontSize={12} lineHeight="16px">
                    <Typography style={{ fontSize: 12, color: '#00000061' }}>
                      Rencana Tayang <span style={{ color: 'black' }}>{numberWithCommas(item?.tayang || 0)}</span>
                    </Typography>
                  </Box>
                  <Box fontSize={12} lineHeight="16px">
                    <Typography style={{ fontSize: 12, color: '#00000061' }}>
                      Penempatan <span style={{ color: 'black' }}>{item?.nameType}</span>
                    </Typography>
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

          {!loadingAds && adsCampaign?.length < userAds?.totalsearch && (
            <LoadingButton
              loading={loadingButton}
              variant="contained"
              color="secondary"
              onClick={() =>
                setPayload((prev) => {
                  return { ...prev, page: payload.page + 1 };
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
