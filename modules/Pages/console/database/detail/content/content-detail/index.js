import React, { useState } from 'react';
import { Avatar, Card, Chip, Stack, Typography } from '@mui/material';
import { useStyles } from './index.style';
import moment from 'moment';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import ModalMedia from 'modules/Pages/console/boost-center/Detail/modal/ModalMedia';

const ContentDetail = (props) => {
  const { data } = props;
  const [showModal, setShowModal] = useState(false);

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

  const getOriginalName = (item) => {
    if (item?.media?.ImageInfo) {
      return item?.media?.ImageInfo?.[0]?.Mezzanine?.OriginalFileName;
    } else if (item?.media?.VideoList) {
      return item?.media?.VideoList?.[0]?.Title;
    } else {
      return '-';
    }
  };

  const getDuration = (item) => {
    if (item?.media?.VideoList) {
      return item?.media?.VideoList?.[0]?.Duration?.toFixed(0) + ' detik';
    } else {
      return '-';
    }
  };

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  return (
    <Card style={{ padding: 24, height: '100%' }}>
      <Stack direction="row" gap="24px">
        <Avatar
          src={getImage(data)}
          variant="rounded"
          style={{
            width: '100%',
            maxWidth: 80,
            height: 80,
            cursor: 'pointer',
            border: '1px solid #DDDDDD',
            borderRadius: 8,
          }}
          onClick={() => setShowModal(true)}
          alt="X"
        />

        {showModal && (
          <ModalMedia
            showModal={showModal}
            onClose={() => setShowModal(false)}
            contentType={data?.type !== 'HyppePic' ? 'video' : 'image'}
            idApsara={data?.media?.VideoList?.[0]?.VideoId || ''}
            urlImage={getImage(data)}
          />
        )}

        <Stack direction="column" gap="8px">
          <Chip label={data?.type || 'Hyppe'} size="small" className={classes.chipStyle} />
          <Typography className={classes.label}>
            Pembuat: <span style={{ color: '#AB22AF', fontWeight: 'bold' }}>@{data?.username || '-'}</span>
          </Typography>
          <Typography className={classes.label}>
            Nama File:{' '}
            <span style={{ color: '#000000DE' }} title={getOriginalName(data)}>
              {getOriginalName(data)}
            </span>
          </Typography>
          <Typography className={classes.label}>
            Durasi: <span style={{ color: '#000000DE' }}>{getDuration(data)}</span>
          </Typography>
          <Typography className={classes.label}>
            Waktu Diunggah:{' '}
            <span style={{ color: '#000000DE' }}>
              {moment(data?.media?.ImageInfo?.[0]?.CreationTime).format('DD/MM/YYYY - HH:mm')} WIB
            </span>
          </Typography>
          <Typography className={classes.label}>
            Ukuran File:{' '}
            <span style={{ color: '#000000DE' }}>
              {data?.media?.ImageInfo
                ? formatBytes(data?.media?.ImageInfo?.[0]?.Mezzanine?.FileSize)
                : data?.media?.VideoList
                ? formatBytes(data?.media?.VideoList?.[0]?.Size)
                : '-'}
            </span>
          </Typography>
          <Typography className={classes.label}>
            ID Post: <span style={{ color: '#000000DE' }}>{data?._id || '-'}</span>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ContentDetail;
