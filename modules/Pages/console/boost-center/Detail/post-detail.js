import React from 'react';
import { Avatar, Card, Chip, Stack } from '@mui/material';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { useAuth } from 'authentication';

const useStyles = makeStyles(() => ({
  textTruncate: {
    width: '100%',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 3,
    overflow: 'hidden',
    margin: '8px 0 18px',
  },
}));

const PostDetail = ({ data }) => {
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
    <Card style={{ padding: '28px 24px', height: '100%' }}>
      <Stack direction="row" gap="24px">
        <Avatar
          src={getImage(data)}
          alt="Detail Post"
          variant="rounded"
          style={{ width: '100%', maxWidth: 120, height: 120 }}
        />
        <Stack direction="column">
          <Chip
            label={data?.type}
            style={{
              borderRadius: 4,
              fontWeight: 900,
              width: 'fit-content',
              fontSize: 12,
              fontFamily: 'Lato',
              height: 25,
              color: '#737373',
            }}
          />
          <Typography style={{ fontSize: 14, height: 63 }} className={classes.textTruncate}>
            {data?.description || '-'}
          </Typography>
          <Typography style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.38)', fontWeight: 'bold' }}>
            Kategori: <span style={{ color: 'black' }}>{data?.kategori?.map((item) => item.interestName).join(', ')}</span>
          </Typography>
          <Typography style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.38)', fontWeight: 'bold', marginTop: 6 }}>
            Tanggal Post: <span style={{ color: 'black' }}>{moment(data?.createdAt).format('DD/MM/YYYY')}</span>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default PostDetail;
