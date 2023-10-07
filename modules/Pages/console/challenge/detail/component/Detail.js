import { Typography } from '@material-ui/core';
import { Card, Chip, Divider, Stack } from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const DetailChallengeComponent = ({ detail }) => {
  const [gender, setGender] = useState([]);
  const [age, setAge] = useState([]);

  useEffect(() => {
    if (detail?.peserta?.[0]?.jenisKelamin?.[0]['LAKI-LAKI'] === 'YES') {
      setGender((prevVal) => {
        return [...prevVal, 'Laki-Laki'];
      });
    }
    if (detail?.peserta?.[0]?.jenisKelamin?.[0]['PEREMPUAN'] === 'YES') {
      setGender((prevVal) => {
        return [...prevVal, 'Perempuan'];
      });
    }
    if (detail?.peserta?.[0]?.jenisKelamin?.[0]['OTHER'] === 'YES') {
      setGender((prevVal) => {
        return [...prevVal, 'Lainnya'];
      });
    }
    if (detail?.peserta?.[0]?.rentangUmur?.[0]['<14'] === 'YES') {
      setAge((prevVal) => {
        return [...prevVal, '< 14'];
      });
    }
    if (detail?.peserta?.[0]?.rentangUmur?.[0]['14-28'] === 'YES') {
      setAge((prevVal) => {
        return [...prevVal, '14-28 Tahun'];
      });
    }
    if (detail?.peserta?.[0]?.rentangUmur?.[0]['29-43'] === 'YES') {
      setAge((prevVal) => {
        return [...prevVal, '29-43 tahun'];
      });
    }
    if (detail?.peserta?.[0]?.rentangUmur?.[0]['44<'] === 'YES') {
      setAge((prevVal) => {
        return [...prevVal, '> 44'];
      });
    }
    if (detail?.peserta?.[0]?.rentangUmur?.[0]['LAINNYA'] === 'YES') {
      setAge((prevVal) => {
        return [...prevVal, 'Lainnya'];
      });
    }
  }, []);

  return (
    <Card sx={{ p: 3, height: 'auto' }}>
      <Stack direction="column" gap={2}>
        <Stack direction="column" gap={1}>
          <Stack direction="row" alignItems="center" gap={2}>
            <Typography style={{ fontSize: 24, fontWeight: 'bold', fontSize: 24 }}>{detail?.nameChallenge}</Typography>
            {detail?.statusChallenge === 'PUBLISH' && detail?.statuscurrentChallenge === 'SELESAI' && (
              <Chip
                label={<Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#00000099' }}>Selesai</Typography>}
                sx={{ width: 'fit-content', height: 'fit-content', span: { padding: '4px 10px' } }}
              />
            )}
            {detail?.statusChallenge === 'PUBLISH' && detail?.statuscurrentChallenge === 'AKAN DATANG' && (
              <Chip
                label={<Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#FF8C00D9' }}>Akan Datang</Typography>}
                sx={{
                  width: 'fit-content',
                  height: 'fit-content',
                  backgroundColor: '#FF8C0026',
                  span: { padding: '4px 10px' },
                }}
              />
            )}
            {detail?.statusChallenge === 'PUBLISH' && detail?.statuscurrentChallenge === 'SEDANG BERJALAN' && (
              <Chip
                label={
                  <Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#71A500D9' }}>Sedang Berjalan</Typography>
                }
                sx={{
                  width: 'fit-content',
                  height: 'fit-content',
                  backgroundColor: '#71A5001A',
                  span: { padding: '4px 10px' },
                }}
              />
            )}
          </Stack>
          <Typography style={{ fontSize: 14 }}>
            {detail?.objectChallenge === 'KONTEN' ? 'Konten' : 'Akun'} | {detail?.durasi * detail?.jumlahSiklusdurasi || 0}{' '}
            Hari{' '}
            {detail?.startChallenge &&
              `(${dayjs(detail?.startChallenge).format('DD/MM/YYYY')} - ${dayjs(detail?.endChallenge).format(
                'DD/MM/YYYY',
              )}) - 
            ${dayjs(detail?.startTime).format('HH:mm')} WIB`}
          </Typography>
          <Typography style={{ fontSize: 14 }}>{detail?.description}</Typography>
          <Chip
            label={
              <Typography style={{ fontSize: 14, fontWeight: 'bold', fontSize: 14, color: '#00000099' }}>
                {detail?.peserta?.[0]?.caraGabung === 'SEMUA PENGGUNA' && 'Semua Pengguna'}
                {detail?.peserta?.[0]?.caraGabung === 'DENGAN UNDANGAN' && 'Dengan Undangan'}
              </Typography>
            }
            style={{ width: 'fit-content', borderRadius: 6, marginTop: 8 }}
          />
        </Stack>

        <Divider flexItem />

        <Stack direction="column" gap="12px">
          <Stack direction="row" gap={1}>
            <Typography style={{ color: '#00000061', width: 150, fontSize: 14 }}>Leaderboard Cycle:</Typography>
            <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
              {detail?.durasi || 0} Hari
            </Typography>
          </Stack>
          <Stack direction="row" gap={1}>
            <Typography style={{ color: '#00000061', width: 150, fontSize: 14 }}>Cycle Frequency:</Typography>
            <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
              {detail?.jumlahSiklusdurasi || 0}
            </Typography>
          </Stack>
          <Stack direction="row" gap={1}>
            <Typography style={{ color: '#00000061', width: 150, fontSize: 14 }}>Status Pengguna:</Typography>
            <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
              {detail?.tampilStatusPengguna ? 'Ditampilkan' : 'Tidak Ditampilkan'}
            </Typography>
          </Stack>
          <Stack direction="row" gap={1}>
            <Typography style={{ color: '#00000061', width: 150, fontSize: 14 }}>Hastag:</Typography>
            <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
              {detail?.metrik?.[0]?.Interaksi
                ? detail?.metrik?.[0]?.InteraksiKonten?.[0]?.tagar || '-'
                : detail?.metrik?.[0]?.AktivitasAkun?.tagar || '-'}
            </Typography>
          </Stack>
          <Stack direction="row" gap={1}>
            <Typography style={{ color: '#00000061', width: 150, fontSize: 14 }}>Metrik:</Typography>
            <Stack direction="column" gap={1}>
              {detail?.objectChallenge === 'AKUN' && detail?.metrik?.[0]?.Aktivitas && (
                <>
                  <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>Aktivitas Akun</Typography>
                  <Typography style={{ color: '#00000061', fontWeight: 'bold', fontSize: 14 }}>
                    Referal: {detail?.metrik?.[0]?.AktivitasAkun?.[0]?.Referal || 0}
                  </Typography>
                  <Typography style={{ color: '#00000061', fontWeight: 'bold', fontSize: 14 }}>
                    Mengikuti: {detail?.metrik?.[0]?.AktivitasAkun?.[0]?.Ikuti || 0}
                  </Typography>
                </>
              )}
              {detail?.objectChallenge === 'AKUN' && detail?.metrik?.[0]?.Interaksi && (
                <>
                  <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>Interaksi Konten</Typography>
                  <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>Buat</Typography>
                  <Typography style={{ color: '#00000061', fontWeight: 'bold', fontSize: 14 }}>
                    HyppeVid: {detail?.metrik?.[0]?.InteraksiKonten?.[0]?.buatKonten?.[0]?.HyppeVid || 0}
                  </Typography>
                  <Typography style={{ color: '#00000061', fontWeight: 'bold', fontSize: 14 }}>
                    HyppePic: {detail?.metrik?.[0]?.InteraksiKonten?.[0]?.buatKonten?.[0]?.HyppePic || 0}
                  </Typography>
                  <Typography style={{ color: '#00000061', fontWeight: 'bold', fontSize: 14 }}>
                    HyppeDiary: {detail?.metrik?.[0]?.InteraksiKonten?.[0]?.buatKonten?.[0]?.HyppeDiary || 0}
                  </Typography>
                  <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>Suka</Typography>
                  <Typography style={{ color: '#00000061', fontWeight: 'bold', fontSize: 14 }}>
                    HyppeVid: {detail?.metrik?.[0]?.InteraksiKonten?.[0]?.suka?.[0]?.HyppeVid || 0}
                  </Typography>
                  <Typography style={{ color: '#00000061', fontWeight: 'bold', fontSize: 14 }}>
                    HyppePic: {detail?.metrik?.[0]?.InteraksiKonten?.[0]?.suka?.[0]?.HyppePic || 0}
                  </Typography>
                  <Typography style={{ color: '#00000061', fontWeight: 'bold', fontSize: 14 }}>
                    HyppeDiary: {detail?.metrik?.[0]?.InteraksiKonten?.[0]?.suka?.[0]?.HyppeDiary || 0}
                  </Typography>
                  <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>Tonton</Typography>
                  <Typography style={{ color: '#00000061', fontWeight: 'bold', fontSize: 14 }}>
                    HyppeVid: {detail?.metrik?.[0]?.InteraksiKonten?.[0]?.tonton?.[0]?.HyppeVid || 0}
                  </Typography>
                  <Typography style={{ color: '#00000061', fontWeight: 'bold', fontSize: 14 }}>
                    HyppeDiary: {detail?.metrik?.[0]?.InteraksiKonten?.[0]?.tonton?.[0]?.HyppeDiary || 0}
                  </Typography>
                </>
              )}
              {detail?.objectChallenge === 'KONTEN' && (
                <>
                  <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>Tonton</Typography>
                  <Typography style={{ color: '#00000061', fontWeight: 'bold', fontSize: 14 }}>
                    HyppeVid: {detail?.metrik?.[0]?.InteraksiKonten?.[0]?.tonton?.[0]?.HyppeVid || 0}
                  </Typography>
                  <Typography style={{ color: '#00000061', fontWeight: 'bold', fontSize: 14 }}>
                    HyppeDiary: {detail?.metrik?.[0]?.InteraksiKonten?.[0]?.tonton?.[0]?.HyppeDiary || 0}
                  </Typography>
                  <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>Suka</Typography>
                  <Typography style={{ color: '#00000061', fontWeight: 'bold', fontSize: 14 }}>
                    HyppeVid: {detail?.metrik?.[0]?.InteraksiKonten?.[0]?.suka?.[0]?.HyppeVid || 0}
                  </Typography>
                  <Typography style={{ color: '#00000061', fontWeight: 'bold', fontSize: 14 }}>
                    HyppePic: {detail?.metrik?.[0]?.InteraksiKonten?.[0]?.suka?.[0]?.HyppePic || 0}
                  </Typography>
                  <Typography style={{ color: '#00000061', fontWeight: 'bold', fontSize: 14 }}>
                    HyppeDiary: {detail?.metrik?.[0]?.InteraksiKonten?.[0]?.suka?.[0]?.HyppeDiary || 0}
                  </Typography>
                </>
              )}
            </Stack>
          </Stack>
          <Stack direction="row" gap={1}>
            <Typography style={{ color: '#00000061', width: 150, fontSize: 14 }}>Notifikasi:</Typography>
            <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
              Banner, Pop-Up & Notifikasi Push
            </Typography>
          </Stack>
          <Stack direction="row" gap={1}>
            <Typography style={{ color: '#00000061', width: 150, fontSize: 14 }}>Tipe Akun:</Typography>
            <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
              {detail?.peserta?.[0]?.tipeAkunTerverikasi === 'YES' && 'KYC'}
              {detail?.peserta?.[0]?.tipeAkunTerverikasi === 'NO' && 'Non E-KYC'}
              {detail?.peserta?.[0]?.tipeAkunTerverikasi === 'ALL' && 'KYC & Non E-KYC'}
            </Typography>
          </Stack>
          <Stack direction="row" gap={1}>
            <Typography style={{ color: '#00000061', width: 150, fontSize: 14 }}>Jenis Kelamin:</Typography>
            <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
              {gender?.join(' & ') || '-'}
            </Typography>
          </Stack>
          <Stack direction="row" gap={1}>
            <Typography style={{ color: '#00000061', width: 150, fontSize: 14 }}>Usia:</Typography>
            <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
              {age?.join(', ') || '-'}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default DetailChallengeComponent;
