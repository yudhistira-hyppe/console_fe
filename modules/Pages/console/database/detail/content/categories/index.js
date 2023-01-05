import React from 'react';
import { Chip, Stack } from '@mui/material';
import { Typography } from '@material-ui/core';
import { Box } from '@mui/system';

const Categories = (props) => {
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
        Kategori
        <Box style={{ height: 4, width: 40, backgroundColor: '#AB22AF', position: 'absolute', bottom: 0 }} />
      </Typography>
      {data?.length >= 1 ? (
        <Stack direction="row" flexWrap="wrap" gap="12px" height="100%">
          {data.map((item, key) => (
            <Chip
              key={key}
              label={item?.interestName || '-'}
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
          ))}
        </Stack>
      ) : (
        <Stack height="100%" alignItems="center" justifyContent="center">
          <Typography style={{ fontWeight: 'bold', color: '#666666', textAlign: 'center' }}>
            Konten ini tidak memiliki kategori yang dipilih
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default Categories;
