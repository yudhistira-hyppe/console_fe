import { Typography } from '@material-ui/core';
import { Chip, Divider, Stack } from '@mui/material';
import React from 'react';
import ScrollBar from 'react-perfect-scrollbar';

const NotifItem = () => {
  return (
    <ScrollBar style={{ height: 572, display: 'flex', marginTop: 16 }}>
      <Stack direction="column" gap={2} style={{ width: '100%', paddingRight: 16 }}>
        {['done', 'upcoming', 'ongoing', 'upcoming', 'upcoming', 'upcoming'].map((item, key) => (
          <>
            <Stack direction="column" gap={1}>
              <Stack direction="row" alignItems="center" style={{ width: '100%' }}>
                <Chip
                  label={
                    <Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#00000099' }}>Akan Datang</Typography>
                  }
                  style={{ width: 'fit-content', borderRadius: 6 }}
                />
                <Typography style={{ color: '#00000061', fontSize: 12, marginLeft: 16 }}>
                  <b>24</b> jam sebelum
                </Typography>
                {item === 'done' && (
                  <Chip
                    label={<Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#00000099' }}>Selesai</Typography>}
                    sx={{ width: 'fit-content', marginLeft: 'auto', height: 'fit-content', span: { padding: '4px 10px' } }}
                  />
                )}
                {item === 'upcoming' && (
                  <Chip
                    label={
                      <Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#FF8C00D9' }}>Akan Datang</Typography>
                    }
                    sx={{
                      width: 'fit-content',
                      marginLeft: 'auto',
                      height: 'fit-content',
                      backgroundColor: '#FF8C0026',
                      span: { padding: '4px 10px' },
                    }}
                  />
                )}
                {item === 'ongoing' && (
                  <Chip
                    label={
                      <Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#71A500D9' }}>
                        Sedang Berjalan
                      </Typography>
                    }
                    sx={{
                      width: 'fit-content',
                      marginLeft: 'auto',
                      height: 'fit-content',
                      backgroundColor: '#71A5001A',
                      span: { padding: '4px 10px' },
                    }}
                  />
                )}
              </Stack>
              <Stack direction="column">
                <Typography style={{ fontWeight: 'bold', color: '#3F3F3F' }}>Hi Hyppers!</Typography>
                <Typography style={{ color: '#00000099', fontSize: 14 }}>
                  Bersiap-siaplah karena Hyppers of The Week Challenge akan segera dimulai dalam 24 jam!
                </Typography>
              </Stack>
            </Stack>
            <Divider flexItem />
          </>
        ))}
      </Stack>
    </ScrollBar>
  );
};

export default NotifItem;
