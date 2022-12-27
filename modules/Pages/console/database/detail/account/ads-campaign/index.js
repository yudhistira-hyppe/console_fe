import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useStyles from './index.style';
import { Card, Divider, Stack, Box, CircularProgress, Button } from '@mui/material';
import { Typography } from '@material-ui/core';
import CmtSearch from '@coremat/CmtSearch';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import { useLazyUserAdListQuery } from 'api/console/monetize/ad';

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
  const [fetchAdsCampaign] = useLazyUserAdListQuery();
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    getAdsCampaign();
  }, [payload.search]);

  const getAdsCampaign = () => {
    setIsFetching(true);
    fetchAdsCampaign(payload)
      .unwrap()
      .then((res) => {
        setPayload((prevState) => ({
          ...prevState,
          skip: payload.skip + 10,
        }));
        setAdsCampaign((prevState) => [...prevState, ...res.data]);
        setIsFetching(false);
        setShowLoadMoreBtn(res.data.length === payload.limit);
      })
      .catch(() => {
        setIsFetching(false);
      });
  };

  const onSearchInputBlur = (value) => {
    setPayload((prevState) => ({
      ...prevState,
      search: value,
      skip: 0,
    }));
    setAdsCampaign([]);
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
      <Stack padding="24px">
        <PerfectScrollbar>
          <Stack maxHeight={408} gap={2} alignItems="center">
            {adsCampaign.length > 0 &&
              adsCampaign.map((adCampaign) => (
                <Stack key={adCampaign._id} width="100%" direction={'row'} spacing={2}>
                  <img
                    className={classes.adCampaignImage}
                    src={adCampaign.media.VideoList[0].CoverURL}
                    alt={adCampaign.name}
                    onError={onErrorPostImage}
                  />
                  <Stack flex={1} gap={1}>
                    <Typography className={classes.adCampaignDescription}>{adCampaign.name}</Typography>
                    <Box fontSize={12} lineHeight="16px">
                      <Box component="span" color="text.disabled">
                        Tanggal Mulai
                      </Box>
                      {` ${moment(adCampaign.timestamp).locale('id').format('DD/MM/YYYY - HH:mm')}`}
                    </Box>
                  </Stack>
                  <Stack gap={0.5}>
                    <Box fontSize={12} lineHeight="16px">
                      <Box component="span" color="text.disabled">
                        Rencana Tayang
                      </Box>{' '}
                      -
                    </Box>
                    <Box fontSize={12} lineHeight="16px">
                      <Box component="span" color="text.disabled">
                        Penempatan
                      </Box>{' '}
                      -
                    </Box>
                  </Stack>
                </Stack>
              ))}
            {!isFetching && adsCampaign.length === 0 && (
              <Stack alignItems="center" justifyContent="center" gap="16px" height={500}>
                <img src="/images/icon-media-empty.png" alt="Icon Empty" style={{ width: 50, height: 50 }} />
                <Typography style={{ color: '#666666' }}>
                  {payload.search
                    ? `Kampanye iklan dengan kata kunci "${payload.search}" tidak ditemukan`
                    : 'Pengguna belum memiliki data apapun'}
                </Typography>
              </Stack>
            )}
            {!isFetching && showLoadMoreBtn && (
              <Button variant="contained" color="secondary" onClick={() => getAdsCampaign()}>
                Muat lebih banyak
              </Button>
            )}
            {isFetching && (
              <Stack alignItems="center">
                <CircularProgress color="secondary" />
              </Stack>
            )}
          </Stack>
        </PerfectScrollbar>
      </Stack>
    </Card>
  );
};

AdsCampaign.propTypes = {
  email: PropTypes.string,
};

export default AdsCampaign;
