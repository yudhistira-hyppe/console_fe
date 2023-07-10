import React from 'react';
import { Avatar, Card, CircularProgress, Stack, Typography } from '@mui/material';
import { Info } from '@material-ui/icons';
import Link from 'next/link';

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

  console.log(dataChart());

  return (
    <Card style={{ padding: 24, height: '100%' }}>
      <Stack direction="column">
        <Stack direction="row" alignItems="center" gap="6px">
          <Typography style={{ color: '#3F3F3F', fontSize: 20, fontWeight: 'bold', opacity: 0.6, fontFamily: 'Lato' }}>
            {title}
          </Typography>
          <Info style={{ color: 'rgba(0, 0, 0, 0.38)', fontSize: 18 }} />
        </Stack>
        <Stack direction="row" gap="8px" mt={3}>
          <Typography style={{ width: 85, fontSize: 14, fontWeight: 'bold', fontFamily: 'Lato' }}>Peringkat</Typography>
          <Typography style={{ fontSize: 14, fontWeight: 'bold', fontFamily: 'Lato' }}>{description}</Typography>
        </Stack>
        <Stack direction="column" mt={3} height={image ? 232 : 152} gap="8px">
          {loading ? (
            <Stack direction="column" alignItems="center" justifyContent="center" height={image ? 232 : 152} spacing={2}>
              <CircularProgress color="secondary" />
              <Typography style={{ fontWeight: 'bold', color: '#737373', fontFamily: 'Lato' }}>loading data...</Typography>
            </Stack>
          ) : (
            dataChart()?.map((item, key) => (
              <Stack key={key} direction="row" alignItems="center" gap="8px">
                <Typography
                  style={{ width: '100%', maxWidth: 85, fontWeight: 'bold', color: '#00000099', fontFamily: 'Lato' }}>
                  {key + 1}
                </Typography>
                <Stack direction="row" alignItems="center" gap="12px" width="100%">
                  {image && (
                    <Avatar
                      src={item?._id?.apsaraThumnailUrl}
                      variant="rounded"
                      style={{ width: '100%', maxWidth: 40, height: 40 }}
                    />
                  )}
                  {card !== 'musik' ? (
                    <Typography style={{ fontSize: 14, color: '#00000099', fontFamily: 'Lato' }}>
                      {card === 'artis' && (item?._id?.artistName || '-')}
                      {card === 'genre' && (item?._id?.name || '-')}
                      {card === 'tema' && (item?._id?.name || '-')}
                      {card === 'mood' && (item?._id?.name || '-')}
                    </Typography>
                  ) : (
                    <Link href="#">
                      <Typography
                        sx={{
                          fontSize: 14,
                          color: '#00000099',
                          fontFamily: 'Lato',
                          '&:hover': {
                            color: '#AB22AF',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                          },
                        }}>
                        {item?._id?.musicTitle || '-'}
                      </Typography>
                    </Link>
                  )}
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
