import { Typography } from '@material-ui/core';
import { Avatar, Card, Chip, Divider, Stack } from '@mui/material';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import Link from 'next/link';
import ModalMedia from './modal/ModalMedia';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { useAuth } from 'authentication';

const CardContent = ({ details }) => {
  const [showModal, setShowModal] = useState(false);
  const { authUser } = useAuth();

  const checkDayAds = () => {
    let day = [];

    details?.dayAds &&
      Object.keys(details?.dayAds).map((item, key) => {
        if (details?.dayAds[item]) {
          day.push(item);
        }
      });

    return day?.length === 7 ? 'Setiap Hari' : day?.join(', ');
  };

  const getImage = (idAds) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;

    return `${STREAM_URL}/api/adsv2/ads/image/read/${idAds}${authToken}`;
  };

  return (
    <Card>
      <Stack direction="column">
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          style={{ padding: '24px 24px 18px', borderBottom: '2px solid #0000001F' }}>
          <Typography style={{ fontWeight: 'bold' }}>{details?.name || ''}</Typography>
          <Stack direction="row" width={100}>
            {details?.status === 'DRAFT' && (
              <Chip
                label="Draf"
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  fontFamily: 'Lato',
                  color: '#E6094BD9',
                  backgroundColor: '#E6094B1A',
                }}
              />
            )}
            {details?.status === 'ACTIVE' && (
              <Chip
                label="Aktif"
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  fontFamily: 'Lato',
                  color: '#71A500D9',
                  backgroundColor: '#71A5001A',
                }}
              />
            )}
            {details?.status === 'UNDER_REVIEW' && (
              <Chip
                label="Ditinjau"
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  fontFamily: 'Lato',
                  color: '#FF8C00D9',
                  backgroundColor: '#FF8C0026',
                }}
              />
            )}
            {details?.status === 'IN_ACTIVE' && (
              <Chip
                label="Tidak Aktif"
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  fontFamily: 'Lato',
                  color: '#676767D9',
                  backgroundColor: '#6767671A',
                }}
              />
            )}
          </Stack>
        </Stack>

        <Stack direction="column" p={3} gap={2}>
          <Stack direction="row" style={{ backgroundColor: '#FAFAFA', borderRadius: 6, padding: '8px 16px' }}>
            <Typography style={{ fontSize: 14 }}>{details?.remark || ''}</Typography>
          </Stack>

          <Stack direction="column" gap={1}>
            <Typography style={{ fontSize: 14, fontWeight: 700 }}>Pratinjau Iklan</Typography>
            <Avatar
              src={details?.media ? details?.media?.CoverURL : getImage(details?._id)}
              style={{
                width: 184,
                height: 184,
                cursor: 'pointer',
                border: '1px solid #DDDDDD',
                borderRadius: 8,
              }}
              variant="rounded"
              onClick={() => setShowModal(true)}
              alt="X"
            />

            {showModal && (
              <ModalMedia
                showModal={showModal}
                onClose={() => setShowModal(false)}
                contentType={details?.media ? 'video' : 'image'}
                idApsara={details?.media?.VideoId}
                urlImage={getImage(details?._id)}
              />
            )}
          </Stack>

          <Stack direction="column" gap="6px">
            <Typography style={{ fontSize: 14, fontWeight: 700 }}>Deskripsi</Typography>
            <Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#00000099' }}>
              {details?.description || '-'}
            </Typography>
          </Stack>
        </Stack>

        <Stack
          direction="column"
          gap="8px"
          mx={3}
          mb={3}
          style={{ backgroundColor: '#FAFAFA', borderRadius: 6, padding: '8px 12px' }}>
          <Stack direction="row" gap={1}>
            <Typography style={{ color: '#00000061', width: 120, fontSize: 14, fontWeight: 'bold' }}>ID Iklan:</Typography>
            <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
              {details?.campaignId || details?.adsIdNumber || '-'}
            </Typography>
          </Stack>
          <Stack direction="row" gap={1}>
            <Typography style={{ color: '#00000061', width: 120, fontSize: 14, fontWeight: 'bold' }}>Tipe Iklan:</Typography>
            <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
              {details?.typeAdsIDName || ''}
            </Typography>
          </Stack>
          <Stack direction="row" gap={1}>
            <Typography style={{ color: '#00000061', width: 120, fontSize: 14, fontWeight: 'bold' }}>
              Periode Tayang:
            </Typography>
            <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14, fontWeight: 'bold' }}>
              {dayjs(details?.liveAt).format('DD/MM/YYYY')} - {dayjs(details?.liveEnd).format('DD/MM/YYYY')}
            </Typography>
          </Stack>
          <Stack direction="row" gap={1}>
            <Typography style={{ color: '#00000061', width: 120, fontSize: 14, fontWeight: 'bold' }}>Link CTA:</Typography>
            <a href={details?.urlLink || ''} target="_blank" noopener noreferrer style={{ color: '#AB22AF' }}>
              {details?.urlLink || ''}
            </a>
          </Stack>
          <Stack direction="row" gap={1}>
            <Typography style={{ color: '#00000061', width: 120, fontSize: 14, fontWeight: 'bold' }}>
              Jumlah Tayang:
            </Typography>
            <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
              {details?.tayang || ''} Tayangan
            </Typography>
          </Stack>
          <Stack direction="row" gap={1}>
            <Typography style={{ color: '#00000061', width: 120, fontSize: 14, fontWeight: 'bold' }}>Biaya:</Typography>
            <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
              {details?.credit || ''} Kredit
            </Typography>
          </Stack>
          <Stack direction="row" gap={1}>
            <Typography style={{ color: '#00000061', width: 120, fontSize: 14, fontWeight: 'bold' }}>
              Jadwal Tayang:
            </Typography>
            <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>{checkDayAds()}</Typography>
          </Stack>
          <Stack direction="row" gap={1}>
            <Typography style={{ color: '#00000061', width: 120, fontSize: 14, fontWeight: 'bold' }}>
              Tujuan Iklan:
            </Typography>
            <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
              {details?.objectivitasIdNameId || ''}
            </Typography>
          </Stack>
          <Stack direction="row" gap={1}>
            <Typography style={{ color: '#00000061', width: 120, fontSize: 14, fontWeight: 'bold' }}>Frekuensi:</Typography>
            <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
              {details?.audiensFrekuensi || ''}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default CardContent;
