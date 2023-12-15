import React from 'react';
import { Avatar, Card, CircularProgress, Stack } from '@mui/material';
import { Typography } from '@material-ui/core';
import { Info } from '@material-ui/icons';

const CardPopular = (props) => {
  const { image = false, title, description, card, data, loading } = props;

  const dataChart = () => {
    if (!loading) {
      if (data?.length >= 5) {
        return data;
      } else {
        let tempData = new Array(...data);

        for (let i = data?.length; i < 5; i++) {
          tempData.push({});
        }

        return tempData;
      }
    }
  };

  return (
    <Card style={{ padding: 24, height: '100%' }}>
      <Stack direction="column">
        <Stack direction="row" alignItems="center" gap="6px">
          <Typography style={{ color: '#3F3F3F', fontSize: 20, fontWeight: 'bold', opacity: 0.6 }}>{title}</Typography>
          <Info style={{ color: 'rgba(0, 0, 0, 0.38)', fontSize: 18 }} />
        </Stack>
        <Stack direction="row" gap="8px" mt={3}>
          <Typography style={{ width: 85, fontSize: 14, fontWeight: 'bold' }}>Peringkat</Typography>
          <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>{description}</Typography>
        </Stack>
        <Stack direction="column" mt={3} height={image ? 232 : 152} gap="8px">
          {loading ? (
            <Stack direction="column" alignItems="center" justifyContent="center" height={image ? 232 : 152} spacing={2}>
              <CircularProgress color="secondary" />
              <Typography style={{ fontWeight: 'bold', color: '#737373' }}>loading data...</Typography>
            </Stack>
          ) : (
            dataChart()?.map((item, key) => (
              <Stack key={key} direction="row" alignItems="center" gap="8px">
                <Typography style={{ width: '100%', maxWidth: 85, fontWeight: 'bold', color: '#00000099' }}>
                  {key + 1}
                </Typography>
                <Stack direction="row" alignItems="center" gap="12px" width="100%">
                  {image && (
                    <Avatar
                      src={item?.apsaraThumnailUrl || new Error()}
                      variant="rounded"
                      style={{ width: '100%', maxWidth: 40, height: 40 }}
                      alt="x"
                    />
                  )}
                  <Typography style={{ fontSize: 14, color: '#00000099' }}>
                    {card === 'aesthetic' && (item?._id?.artistName || '-')}
                    {card === 'special' && (item?._id?.musicTitle || '-')}
                  </Typography>
                </Stack>
              </Stack>
            ))
          )}
        </Stack>
      </Stack>
    </Card>
  );
};

export default CardPopular;
