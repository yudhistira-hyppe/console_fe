import React from 'react';
import { Typography } from '@material-ui/core';
import { Avatar, Card, CircularProgress, Stack, Tooltip as MuiTooltip } from '@mui/material';
import { Info } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

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
  const { loading } = props;
  const classes = useStyles();

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
            [{}, {}, {}, {}, {}]?.map((item, key) => (
              <Stack key={key} direction="row" alignItems="center" gap="8px">
                <Typography style={{ width: 85, fontWeight: 'bold', color: '#00000099' }}>{key + 1}</Typography>
                <Stack direction="row" gap="12px" width={250}>
                  <Avatar
                    src="/images/dashboard/content_image.png"
                    variant="rounded"
                    style={{ width: '100%', maxWidth: 40, height: 40 }}
                  />
                  <Typography variant="body1" className={classes.textTruncate} style={{ fontSize: 14, color: '#00000099' }}>
                    aksdoak adasdas asdasd asdasdsad adasdsa sadasda sadasd
                  </Typography>
                </Stack>
                <Typography style={{ width: 180, fontSize: 14, fontWeight: 'bold', color: '#00000099' }}>
                  36R38DHF37C
                </Typography>
                <Typography style={{ width: 150, fontSize: 14, fontWeight: 'bold', color: '#00000099' }}>
                  HyppeVid
                </Typography>
                <Typography style={{ fontWeight: 'bold', fontSize: 14, color: '#00000099' }}>300</Typography>
              </Stack>
            ))
          )}
        </Stack>
      </Stack>
    </Card>
  );
};

export default TopBoosted;
