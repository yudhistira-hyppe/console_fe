import React from 'react';
import { Avatar, Card, Chip, Stack } from '@mui/material';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';

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

const PostDetail = () => {
  const classes = useStyles();

  return (
    <Card style={{ padding: '28px 24px', height: '100%' }}>
      <Stack direction="row" gap="24px">
        <Avatar
          src="/images/dashboard/content_image.png"
          alt="Detail Post"
          variant="rounded"
          style={{ width: '100%', maxWidth: 120, height: 120 }}
        />
        <Stack direction="column">
          <Chip
            label={`HyppeVid`}
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
          <Typography style={{ fontSize: 14 }} className={classes.textTruncate}>
            Hari ini bersama keluarga tersayang liburan ke pantai indah kapuk ditemani dengan keluarga
          </Typography>
          <Typography style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.38)', fontWeight: 'bold' }}>
            Kategori: <span style={{ color: 'black' }}>Hiburan, Hobi</span>
          </Typography>
          <Typography style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.38)', fontWeight: 'bold', marginTop: 6 }}>
            Tanggal Post: <span style={{ color: 'black' }}>{moment().format('DD/MM/YYYY')}</span>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default PostDetail;
