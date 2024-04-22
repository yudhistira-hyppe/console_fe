import React from 'react';
import { Typography } from '@material-ui/core';
import { Avatar, Card, CircularProgress, Stack, Tooltip as MuiTooltip } from '@mui/material';
import { Info } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { useRouter } from 'next/router';
import clsx from 'clsx';

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
  const router = useRouter();

  const getMediaUri = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    const mediaUri = mediaEndpoint?.split('.');

    return `${STREAM_URL}${mediaUri[0]}${authToken}`;
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
          <Typography style={{ width: 200, fontSize: 14, fontWeight: 'bold' }}>Post</Typography>
          <Typography style={{ width: 270, fontSize: 14, fontWeight: 'bold' }}>ID Post</Typography>
          <Typography style={{ width: 100, fontSize: 14, fontWeight: 'bold' }}>Tipe Konten</Typography>
          <Typography style={{ width: 80, fontSize: 14, fontWeight: 'bold', textAlign: 'right' }}>Jangkauan</Typography>
        </Stack>
        <Stack direction="column" mt={3} gap="12px">
          {loading ? (
            <Stack direction="column" alignItems="center" justifyContent="center" height={258} spacing={2}>
              <CircularProgress color="secondary" size={26} />
            </Stack>
          ) : (
            data?.map((item, key) => (
              <Stack
                key={key}
                direction="row"
                alignItems="center"
                gap="8px"
                onClick={() => router.push({ pathname: `/boost-center/detail`, query: { _id: item?._id } })}
                sx={{
                  ':hover': {
                    cursor: 'pointer',
                    '& .title': {
                      color: '#AB22AF !important',
                      textDecoration: 'underline',
                    },
                  },
                }}>
                <Typography style={{ width: 85, fontWeight: 'bold', color: '#00000099' }}>{key + 1}</Typography>
                <Stack direction="row" alignItems="center" gap="12px" width={200}>
                  <Avatar src={getImage(item)} variant="rounded" style={{ width: '100%', width: 42, height: 42 }} />
                  <Typography
                    variant="body1"
                    className={clsx(classes.textTruncate, 'title')}
                    style={{ fontSize: 14, color: '#00000099', height: '100%' }}>
                    {item?.description || '-'}
                  </Typography>
                </Stack>
                <Typography
                  className={classes.textTruncate}
                  style={{
                    width: 250,
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#00000099',
                    marginRight: 20,
                    whiteSpace: 'nowrap',
                  }}
                  title={item?.postID || '-'}>
                  {item?.postID || '-'}
                </Typography>
                <Typography style={{ width: 100, fontSize: 14, fontWeight: 'bold', color: '#00000099' }}>
                  {item?.type || '-'}
                </Typography>
                <Typography style={{ width: 80, fontWeight: 'bold', fontSize: 14, color: '#00000099', textAlign: 'right' }}>
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
