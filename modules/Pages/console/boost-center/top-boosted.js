import React from 'react';
import { Typography } from '@material-ui/core';
import { Avatar, Card, CircularProgress, Stack, Tooltip as MuiTooltip } from '@mui/material';
import { Info } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';

const useStyles = makeStyles(() => ({
  textTruncate: {
    width: 160,
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2,
    lineClamp: 2,
    overflow: 'hidden',
  },
}));

const TopBoosted = (props) => {
  const { loading, data } = props;
  const classes = useStyles();
  const { authUser } = useAuth();

  const getMediaUri = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;

    return `${STREAM_URL}${mediaEndpoint}${authToken}`;
  };

  const getImage = (item) => {
    if (item?.apsara && item?.apsaraId) {
      if (item?.media?.ImageInfo) {
        return item?.media?.ImageInfo?.[0]?.URL || new Error();
      } else {
        return item?.media?.VideoList?.[0]?.CoverURL || new Error();
      }
    } else if (item?.mediaEndpoint) {
      return getMediaUri(item?.mediaEndpoint) || new Error();
    } else {
      return new Error();
    }
  };

  return (
    <Card style={{ padding: 28 }}>
      <Stack direction="column">
        <Stack direction="row" alignItems="center" gap="8px">
          <Typography style={{ color: '#3F3F3F', fontWeight: 900, fontSize: 20, opacity: 0.7, lineHeight: '1.1em' }}>
            5 Boost Post Jangkauan Terbanyak
          </Typography>
          <MuiTooltip title="ini tooltipnya">
            <Info style={{ color: '#3F3F3F', fontSize: 18, opacity: 0.7, marginTop: 2 }} />
          </MuiTooltip>
        </Stack>
        <Stack direction="row" gap="8px" mt={3}>
          <Typography style={{ width: 85, fontSize: 14, fontWeight: 'bold' }}>Peringkat</Typography>
          <Typography style={{ width: 250, fontSize: 14, fontWeight: 'bold' }}>Post</Typography>
          <Typography style={{ width: 180, fontSize: 14, fontWeight: 'bold' }}>ID Post</Typography>
          <Typography style={{ width: 150, fontSize: 14, fontWeight: 'bold' }}>Tipe Konten</Typography>
          <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>Jangkauan</Typography>
        </Stack>
        <Stack direction="column" mt={3} height={232} gap="8px">
          {loading ? (
            <Stack direction="column" alignItems="center" justifyContent="center" height={232} spacing={2}>
              <CircularProgress color="secondary" />
              <Typography style={{ fontWeight: 'bold', color: '#737373' }}>loading data...</Typography>
            </Stack>
          ) : (
            data?.map((item, key) => (
              <Stack key={key} direction="row" alignItems="center" gap="8px">
                <Typography style={{ width: 85, fontWeight: 'bold', color: '#00000099' }}>{key + 1}</Typography>
                <Stack direction="row" gap="12px" width={250}>
                  <Avatar src={getImage(item)} variant="rounded" style={{ width: '100%', maxWidth: 40, height: 40 }} />
                  <Typography variant="body1" className={classes.textTruncate} style={{ fontSize: 14, color: '#00000099' }}>
                    {item?.description || '-'}
                  </Typography>
                </Stack>
                <Typography
                  className={classes.textTruncate}
                  style={{
                    width: 160,
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#00000099',
                    marginRight: 20,
                    whiteSpace: 'nowrap',
                  }}>
                  {item?.postID || '-'}
                </Typography>
                <Typography style={{ width: 150, fontSize: 14, fontWeight: 'bold', color: '#00000099' }}>
                  {item?.postType || '-'}
                </Typography>
                <Typography style={{ fontWeight: 'bold', fontSize: 14, color: '#00000099' }}>
                  {numberWithCommas(item?.jangkauan)}
                </Typography>
              </Stack>
            ))
          )}
        </Stack>
      </Stack>
    </Card>
  );
};

export default TopBoosted;
