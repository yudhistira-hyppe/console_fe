import React from 'react';
import { Chip, Stack } from '@mui/material';
import { Typography } from '@material-ui/core';
import { Box } from '@mui/system';

const Interest = ({ data }) => {
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
      <Stack direction="row" flexWrap="wrap" gap="12px">
        {data.length >= 1 ? (
          data?.map((item, key) => (
            <Chip
              key={key}
              label={item?.interestName}
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
          <Stack height={240} width="100%" alignItems="center" justifyContent="center">
            <Typography style={{ fontWeight: 'bold', color: '#737373' }}>Tidak ada data</Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Interest;
