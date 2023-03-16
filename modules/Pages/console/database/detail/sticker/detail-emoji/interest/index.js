import React from 'react';
import { Chip, Stack } from '@mui/material';
import { Typography } from '@material-ui/core';
import { Box } from '@mui/system';

const Interest = (props) => {
  const { data } = props;

  return (
    <Stack direction="column" height="100%" gap="24px">
      <Typography
        style={{
          fontWeight: 'bold',
          borderBottom: '1px solid #0000001F',
          paddingBottom: 14,
          fontSize: 18,
          position: 'relative',
        }}>
        Minat Penonton
        <Box style={{ height: 4, width: 40, backgroundColor: '#AB22AF', position: 'absolute', bottom: 0 }} />
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap="12px" height="100%">
        {data?.length >= 1 ? (
          data?.map((item, key) => (
            <Chip
              key={key}
              label="Kesehatan"
              size="small"
              style={{
                backgroundColor: 'white',
                borderRadius: 4,
                boxShadow:
                  '0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2)',
                height: 25,
                fontFamily: 'Lato',
                fontSize: 12,
                fontWeight: 'bold',
                color: '#00000099',
              }}
            />
          ))
        ) : (
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            gap="20px"
            textAlign="center"
            height="100%"
            padding="24px"
            width="100%">
            <img src="/images/icon-media-empty.png" style={{ width: 60, height: 60 }} />
            <Typography style={{ color: '#666666' }}>Emoji belum memiliki data Minat Penonton</Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Interest;
