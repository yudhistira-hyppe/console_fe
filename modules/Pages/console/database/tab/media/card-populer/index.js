import React from 'react';
import { Avatar, Card, Stack } from '@mui/material';
import { Typography } from '@material-ui/core';
import { Info } from '@material-ui/icons';

const CardPopular = (props) => {
  const { image = false, title, description } = props;

  const getImage = (item) => {
    if (item?.apsara && item?.apsaraId) {
      if (item?.media?.ImageInfo) {
        return item?.media?.ImageInfo?.[0]?.URL;
      } else {
        return item?.media?.VideoList?.[0]?.CoverURL;
      }
    } else {
      return '/images/dashboard/content_image.png';
    }
  };

  return (
    <Card style={{ padding: 24 }}>
      <Stack direction="column">
        <Stack direction="row" alignItems="center" gap="6px">
          <Typography style={{ color: '#3F3F3F', fontSize: 20, fontWeight: 'bold', opacity: 0.6 }}>{title}</Typography>
          <Info style={{ color: 'rgba(0, 0, 0, 0.38)', fontSize: 18 }} />
        </Stack>
        <Stack direction="row" gap="8px" mt={3}>
          <Typography style={{ width: 85, fontSize: 14, fontWeight: 'bold' }}>Peringkat</Typography>
          <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>{description}</Typography>
        </Stack>
        <Stack direction="column" mt={3} gap="8px">
          {[{}, {}, {}, {}, {}].map((item, key) => (
            <Stack key={key} direction="row" alignItems="center" gap="8px">
              <Typography style={{ width: 85, fontWeight: 'bold', color: '#00000099' }}>{key + 1}</Typography>
              <Stack direction="row" alignItems="center" gap="12px">
                {image && <Avatar src={getImage()} variant="rounded" style={{ width: '100%', maxWidth: 40, height: 40 }} />}
                <Typography style={{ fontSize: 14, color: '#00000099' }}>All We Know</Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
};

export default CardPopular;
