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
    <Card sx={{ p: 3 }}>
      <Stack direction="row" spacing={3}>
        <Avatar
          src={details?.media ? details?.media?.CoverURL : getImage(details?._id)}
          style={{
            width: 300,
            height: 230,
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

        <Stack direction="column" width="100%">
          <Stack direction="column" gap="12px">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>{details?.name || ''}</Typography>
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

            <Stack direction="row" style={{ backgroundColor: '#E8E8E8', borderRadius: 6, padding: '8px 16px' }}>
              <Typography style={{ fontSize: 12 }}>{details?.remark || ''}</Typography>
            </Stack>

            <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>{details?.description || ''}</Typography>
          </Stack>

          <Divider flexItem style={{ margin: '16px 0' }} />

          <Stack direction="column" gap="8px">
            <Stack direction="row" gap={1}>
              <Typography style={{ color: '#00000061', width: 120, fontSize: 14 }}>ID Iklan:</Typography>
              <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
                {details?.campaignId || details?.adsIdNumber || '-'}
              </Typography>
            </Stack>
            <Stack direction="row" gap={1}>
              <Typography style={{ color: '#00000061', width: 120, fontSize: 14 }}>Tipe Iklan:</Typography>
              <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
                {details?.typeAdsIDName || ''}
              </Typography>
            </Stack>
            <Stack direction="row" gap={1}>
              <Typography style={{ color: '#00000061', width: 120, fontSize: 14 }}>Tanggal Iklan:</Typography>
              <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
                {dayjs(details?.liveAt).format('DD/MM/YYYY')} - {dayjs(details?.liveEnd).format('DD/MM/YYYY')}
              </Typography>
            </Stack>
            <Stack direction="row" gap={1}>
              <Typography style={{ color: '#00000061', width: 120, fontSize: 14 }}>URL Link:</Typography>
              <a href={details?.urlLink || ''} target="_blank" noopener noreferrer style={{ color: '#AB22AF' }}>
                {details?.urlLink || ''}
              </a>
            </Stack>
            <Stack direction="row" gap={1}>
              <Typography style={{ color: '#00000061', width: 120, fontSize: 14 }}>Plan Tayang:</Typography>
              <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
                {details?.tayang || ''} Tayangan
              </Typography>
            </Stack>
            <Stack direction="row" gap={1}>
              <Typography style={{ color: '#00000061', width: 120, fontSize: 14 }}>Biaya:</Typography>
              <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
                {details?.credit || ''} Kredit
              </Typography>
            </Stack>
            <Stack direction="row" gap={1}>
              <Typography style={{ color: '#00000061', width: 120, fontSize: 14 }}>Jadwal:</Typography>
              <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>{checkDayAds()}</Typography>
            </Stack>
            <Stack direction="row" gap={1}>
              <Typography style={{ color: '#00000061', width: 120, fontSize: 14 }}>Tujuan:</Typography>
              <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
                {details?.objectivitasIdNameId || ''}
              </Typography>
            </Stack>
            <Stack direction="row" gap={1}>
              <Typography style={{ color: '#00000061', width: 120, fontSize: 14 }}>Frekuensi:</Typography>
              <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
                {details?.audiensFrekuensi || ''}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default CardContent;
