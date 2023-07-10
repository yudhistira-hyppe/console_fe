import { Typography } from '@material-ui/core';
import { Chip, Divider, Stack } from '@mui/material';
import React from 'react';
import ScrollBar from 'react-perfect-scrollbar';

const NotifItem = ({ listData }) => {
  return (
    <ScrollBar style={{ height: 572, display: 'flex', marginTop: 16 }}>
      <Stack direction="column" gap={2} style={{ width: '100%', paddingRight: 16 }}>
        {listData?.akanDatang?.[0]?.include === 'YES' && (
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
                  <b>{listData?.akanDatang?.[0]?.aturWaktu?.toString()?.replace('-', '')}</b> jam sebelum
                </Typography>
                {listData?.akanDatang?.[0]?.statusNotifikasi === 'SELESAI' && (
                  <Chip
                    label={<Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#00000099' }}>Selesai</Typography>}
                    sx={{ width: 'fit-content', marginLeft: 'auto', height: 'fit-content', span: { padding: '4px 10px' } }}
                  />
                )}
                {listData?.akanDatang?.[0]?.statusNotifikasi === 'AKAN DATANG' && (
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
                {listData?.akanDatang?.[0]?.statusNotifikasi === 'SEDANG BERJALAN' && (
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
                <Typography style={{ fontWeight: 'bold', color: '#3F3F3F' }}>
                  {listData?.akanDatang?.[0]?.title || '-'}
                </Typography>
                <Typography style={{ color: '#00000099', fontSize: 14 }}>
                  {listData?.akanDatang?.[0]?.description || '-'}
                </Typography>
              </Stack>
            </Stack>
            <Divider flexItem />
          </>
        )}
        {listData?.challengeDimulai?.[0]?.include === 'YES' && (
          <>
            <Stack direction="column" gap={1}>
              <Stack direction="row" alignItems="center" style={{ width: '100%' }}>
                <Chip
                  label={
                    <Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#00000099' }}>
                      Challenge Dimulai
                    </Typography>
                  }
                  style={{ width: 'fit-content', borderRadius: 6 }}
                />
                <Typography style={{ color: '#00000061', fontSize: 12, marginLeft: 16 }}>
                  Sesuai dengan tanggal mulai
                </Typography>
                {listData?.challengeDimulai?.[0]?.statusNotifikasi === 'SELESAI' && (
                  <Chip
                    label={<Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#00000099' }}>Selesai</Typography>}
                    sx={{ width: 'fit-content', marginLeft: 'auto', height: 'fit-content', span: { padding: '4px 10px' } }}
                  />
                )}
                {listData?.challengeDimulai?.[0]?.statusNotifikasi === 'AKAN DATANG' && (
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
                {listData?.challengeDimulai?.[0]?.statusNotifikasi === 'SEDANG BERJALAN' && (
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
                <Typography style={{ fontWeight: 'bold', color: '#3F3F3F' }}>
                  {listData?.challengeDimulai?.[0]?.title || '-'}
                </Typography>
                <Typography style={{ color: '#00000099', fontSize: 14 }}>
                  {listData?.challengeDimulai?.[0]?.description || '-'}
                </Typography>
              </Stack>
            </Stack>
            <Divider flexItem />
          </>
        )}
        {listData?.updateLeaderboard?.[0]?.include === 'YES' && (
          <>
            <Stack direction="column" gap={1}>
              <Stack direction="row" alignItems="center" style={{ width: '100%' }}>
                <Chip
                  label={
                    <Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#00000099' }}>
                      Update Leaderboard
                    </Typography>
                  }
                  style={{ width: 'fit-content', borderRadius: 6 }}
                />
                <Typography style={{ color: '#00000061', fontSize: 12, marginLeft: 16 }}>
                  <b>{listData?.updateLeaderboard?.[0]?.aturWaktu?.length}</b> Kali /{' '}
                  {listData?.updateLeaderboard?.[0]?.aturWaktu?.map((item) => `${item} Jam`)?.join(', ')}
                </Typography>
                {listData?.updateLeaderboard?.[0]?.statusNotifikasi === 'SELESAI' && (
                  <Chip
                    label={<Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#00000099' }}>Selesai</Typography>}
                    sx={{ width: 'fit-content', marginLeft: 'auto', height: 'fit-content', span: { padding: '4px 10px' } }}
                  />
                )}
                {listData?.updateLeaderboard?.[0]?.statusNotifikasi === 'AKAN DATANG' && (
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
                {listData?.updateLeaderboard?.[0]?.statusNotifikasi === 'SEDANG BERJALAN' && (
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
                <Typography style={{ fontWeight: 'bold', color: '#3F3F3F' }}>
                  {listData?.updateLeaderboard?.[0]?.title || '-'}
                </Typography>
                <Typography style={{ color: '#00000099', fontSize: 14 }}>
                  {listData?.updateLeaderboard?.[0]?.description || '-'}
                </Typography>
              </Stack>
            </Stack>
            <Divider flexItem />
          </>
        )}
        {listData?.challengeAkanBerakhir?.[0]?.include === 'YES' && (
          <>
            <Stack direction="column" gap={1}>
              <Stack direction="row" alignItems="center" style={{ width: '100%' }}>
                <Chip
                  label={
                    <Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#00000099' }}>Akan Berakhir</Typography>
                  }
                  style={{ width: 'fit-content', borderRadius: 6 }}
                />
                <Typography style={{ color: '#00000061', fontSize: 12, marginLeft: 16 }}>
                  <b>{listData?.challengeAkanBerakhir?.[0]?.aturWaktu?.toString()?.replace('-', '')}</b> jam sebelum
                </Typography>
                {listData?.challengeAkanBerakhir?.[0]?.statusNotifikasi === 'SELESAI' && (
                  <Chip
                    label={<Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#00000099' }}>Selesai</Typography>}
                    sx={{ width: 'fit-content', marginLeft: 'auto', height: 'fit-content', span: { padding: '4px 10px' } }}
                  />
                )}
                {listData?.challengeAkanBerakhir?.[0]?.statusNotifikasi === 'AKAN DATANG' && (
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
                {listData?.challengeAkanBerakhir?.[0]?.statusNotifikasi === 'SEDANG BERJALAN' && (
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
                <Typography style={{ fontWeight: 'bold', color: '#3F3F3F' }}>
                  {listData?.challengeAkanBerakhir?.[0]?.title || '-'}
                </Typography>
                <Typography style={{ color: '#00000099', fontSize: 14 }}>
                  {listData?.challengeAkanBerakhir?.[0]?.description || '-'}
                </Typography>
              </Stack>
            </Stack>
            <Divider flexItem />
          </>
        )}
        {listData?.challengeBerakhir?.[0]?.include === 'YES' && (
          <>
            <Stack direction="column" gap={1}>
              <Stack direction="row" alignItems="center" style={{ width: '100%' }}>
                <Chip
                  label={
                    <Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#00000099' }}>
                      Challenge Berakhir
                    </Typography>
                  }
                  style={{ width: 'fit-content', borderRadius: 6 }}
                />
                <Typography style={{ color: '#00000061', fontSize: 12, marginLeft: 16 }}>
                  <b>{listData?.challengeBerakhir?.[0]?.aturWaktu?.toString()?.replace('-', '')}</b> jam setelah
                </Typography>
                {listData?.challengeBerakhir?.[0]?.statusNotifikasi === 'SELESAI' && (
                  <Chip
                    label={<Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#00000099' }}>Selesai</Typography>}
                    sx={{ width: 'fit-content', marginLeft: 'auto', height: 'fit-content', span: { padding: '4px 10px' } }}
                  />
                )}
                {listData?.challengeBerakhir?.[0]?.statusNotifikasi === 'AKAN DATANG' && (
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
                {listData?.challengeBerakhir?.[0]?.statusNotifikasi === 'SEDANG BERJALAN' && (
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
                <Typography style={{ fontWeight: 'bold', color: '#3F3F3F' }}>
                  {listData?.challengeBerakhir?.[0]?.title || '-'}
                </Typography>
                <Typography style={{ color: '#00000099', fontSize: 14 }}>
                  {listData?.challengeBerakhir?.[0]?.description || '-'}
                </Typography>
              </Stack>
            </Stack>
            <Divider flexItem />
          </>
        )}
        {listData?.untukPemenang?.[0]?.include === 'YES' && (
          <>
            <Stack direction="column" gap={1}>
              <Stack direction="row" alignItems="center" style={{ width: '100%' }}>
                <Chip
                  label={<Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#00000099' }}>Pemenang</Typography>}
                  style={{ width: 'fit-content', borderRadius: 6 }}
                />
                <Typography style={{ color: '#00000061', fontSize: 12, marginLeft: 16 }}>
                  <b>{listData?.untukPemenang?.[0]?.aturWaktu?.toString()?.replace('-', '')}</b> jam setelah
                </Typography>
                {listData?.untukPemenang?.[0]?.statusNotifikasi === 'SELESAI' && (
                  <Chip
                    label={<Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#00000099' }}>Selesai</Typography>}
                    sx={{ width: 'fit-content', marginLeft: 'auto', height: 'fit-content', span: { padding: '4px 10px' } }}
                  />
                )}
                {listData?.untukPemenang?.[0]?.statusNotifikasi === 'AKAN DATANG' && (
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
                {listData?.untukPemenang?.[0]?.statusNotifikasi === 'SEDANG BERJALAN' && (
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
                <Typography style={{ fontWeight: 'bold', color: '#3F3F3F' }}>
                  {listData?.untukPemenang?.[0]?.title || '-'}
                </Typography>
                <Typography style={{ color: '#00000099', fontSize: 14 }}>
                  {listData?.untukPemenang?.[0]?.description || '-'}
                </Typography>
              </Stack>
            </Stack>
            <Divider flexItem />
          </>
        )}
      </Stack>
    </ScrollBar>
  );
};

export default NotifItem;
