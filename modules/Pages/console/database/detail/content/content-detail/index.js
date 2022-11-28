import React from 'react';
import { Avatar, Card, Chip, Stack, Typography } from '@mui/material';
import { useStyles } from './index.style';
import moment from 'moment';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';

const ContentDetail = (props) => {
  const { data } = props;
  const { authUser } = useAuth();
  const classes = useStyles();

  const getMediaUri = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;

    return `${STREAM_URL}${mediaEndpoint}${authToken}`;
  };

  const getImage = (item) => {
    if (item?.apsara && item?.apsaraId) {
      if (item?.media?.ImageInfo) {
        return item?.media?.ImageInfo?.[0]?.URL;
      } else {
        return item?.media?.VideoList?.[0]?.CoverURL;
      }
    } else if (item?.mediaEndpoint) {
      return getMediaUri(item?.mediaEndpoint);
    } else {
      return '/images/dashboard/content_image.png';
    }
  };

  return (
    <Card style={{ padding: 24 }}>
      <Stack direction="row" gap="24px">
        <Avatar src={getImage()} variant="rounded" style={{ width: '100%', maxWidth: 80, height: 80 }} />
        <Stack direction="column" gap="8px">
          <Chip label={`HyppePic`} size="small" className={classes.chipStyle} />
          <Typography className={classes.label}>
            Pembuat: <span style={{ color: '#AB22AF', fontWeight: 'bold' }}>@joko</span>
          </Typography>
          <Typography className={classes.label}>
            Nama File: <span style={{ color: '#000000DE' }}>Pemandangan wokowkwod adasda.jpg</span>
          </Typography>
          <Typography className={classes.label}>
            Resolusi: <span style={{ color: '#000000DE' }}>720p</span>
          </Typography>
          <Typography className={classes.label}>
            Durasi: <span style={{ color: '#000000DE' }}>-</span>
          </Typography>
          <Typography className={classes.label}>
            Waktu Diunggah: <span style={{ color: '#000000DE' }}>{moment().format('DD/MM/YY-HH:mm')} WIB</span>
          </Typography>
          <Typography className={classes.label}>
            Ukuran File: <span style={{ color: '#000000DE' }}>5 MB</span>
          </Typography>
          <Typography className={classes.label}>
            ID Post: <span style={{ color: '#000000DE' }}>36R38DHF37C</span>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ContentDetail;
