import React from 'react';
import { Typography } from '@material-ui/core';
import { Avatar, Card, Stack } from '@mui/material';
import ScrollBar from 'react-perfect-scrollbar';
import moment from 'moment';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  textTruncate: {
    fontSize: '14px !important',
    fontFamily: 'Lato !important',
    color: '#202020',
    width: 320,
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2,
    lineClamp: 2,
    overflow: 'hidden',
  },
}));

const Comment = ({ data }) => {
  const { authUser } = useAuth();
  const classes = useStyles();

  const getMediaUri = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user?.email}`;

    return `${STREAM_URL}/v5${mediaEndpoint}${authToken}`;
  };

  return (
    <Card style={{ padding: 24 }}>
      <Stack direction="column" gap="24px">
        <Stack direction="row" justifyContent="space-between">
          <Typography style={{ fontWeight: 'bold' }}>Komentar</Typography>
          <Typography style={{ fontSize: 14 }}>{data?.length} Komentar</Typography>
        </Stack>
        <ScrollBar style={{ height: 230, display: 'flex', flexDirection: 'column', gap: 16, paddingRight: 20 }}>
          {data?.length >= 1 ? (
            data?.map((item, key) => (
              <Stack direction="row" gap="16px" key={key}>
                <Avatar
                  src={getMediaUri(item?.avatar?.[0]?.mediaEndpoint)}
                  style={{ width: '100%', maxWidth: 56, height: 56 }}
                />
                <Stack direction="column" justifyContent="center" gap="4px" width="100%">
                  <Typography className={classes.textTruncate}>
                    <span style={{ fontWeight: 'bold' }}>{item?.sender || '-'}</span> mengomentari post ini:{' '}
                    {item?.txtMessages || '-'}
                  </Typography>
                  <Typography style={{ fontFamily: 'Lato', fontSize: 12, fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.38)' }}>
                    {moment(item?.createdAt).format('DD/MM/YYYY - HH:mm')} WIB
                  </Typography>
                </Stack>
              </Stack>
            ))
          ) : (
            <Stack direction="column" alignItems="center" justifyContent="center" height="100%">
              <Typography style={{ fontWeight: 'bold', color: '#737373' }}>Konten ini tidak memiliki komentar</Typography>
            </Stack>
          )}
        </ScrollBar>
      </Stack>
    </Card>
  );
};

export default Comment;
