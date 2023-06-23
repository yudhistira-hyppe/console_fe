import React from 'react';
import { Button, Card } from '@material-ui/core';
import { Typography, Stack, Avatar, Chip } from '@mui/material';
import { ButtonDropdown } from '../';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import moment from 'moment';

const AdsContentDetailComponent = ({ status, setShowModal, showModal, buttonColor, detailAds }) => {
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];
  const { authUser } = useAuth();

  console.log(status);

  const getMediaUri = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;

    return `${STREAM_URL}${mediaEndpoint}${authToken}`;
  };

  const getImage = (item) => {
    if (item?.apsara || item?.apsaraId) {
      if (item?.media?.ImageInfo) {
        return item?.media?.ImageInfo?.[0]?.URL || new Error();
      } else {
        return item?.media?.VideoList?.[0]?.CoverURL || new Error();
      }
    } else if (item?.mediaEndpoint) {
      return getMediaUri(item?.mediaEndpoint?.replace('.jpg', '')?.replace('.jpeg', '')) || new Error();
    } else {
      return new Error();
    }
  };

  return (
    <Stack direction="column" gap={2}>
      <Card style={{ padding: '2em' }}>
        {status === 'Tinjau' ? (
          <ButtonDropdown
            status={status}
            setShowModal={setShowModal}
            showModal={showModal}
            buttonColor={buttonColor}
            disabled={!access.find((item) => item?.nameModule)?.acces?.updateAcces}
          />
        ) : status === 'Dijadwalkan' ? (
          detailAds?.isActive ? (
            <Button variant="container" disabled style={{ backgroundColor: buttonColor.background, color: '#fff' }}>
              {status}
            </Button>
          ) : (
            <Button variant="container" disabled style={{ backgroundColor: '#676767', color: '#fff' }}>
              Dinonaktifkan
            </Button>
          )
        ) : (
          <Button variant="container" disabled style={{ backgroundColor: buttonColor.background, color: '#fff' }}>
            {status}
          </Button>
        )}

        <div className="my-4">
          <Avatar
            src={getImage(detailAds)}
            variant="rounded"
            style={{ cursor: 'pointer', width: '100%', height: 280, border: '1px solid #eeeeee' }}
            onClick={() => {
              setShowModal({
                ...showModal,
                show: true,
                type: 'media',
              });
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Stack direction="row" spacing={1}>
            <Typography fontFamily={'Lato'} color="rgba(0, 0, 0, 0.38)">
              Judul:
            </Typography>

            <Typography fontFamily={'Lato'}>{detailAds?.name || '-'}</Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Typography fontFamily={'Lato'} color="rgba(0, 0, 0, 0.38)">
              Tipe Iklan:
            </Typography>

            <Typography fontFamily={'Lato'}>{detailAds?.nameType}</Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Typography fontFamily={'Lato'} color="rgba(0, 0, 0, 0.38)">
              Penempatan Iklan:
            </Typography>

            <Typography fontFamily={'Lato'}>
              {detailAds?.namePlace ? (
                <Chip
                  label={detailAds?.namePlace}
                  size="small"
                  style={{ padding: 2, borderRadius: 6, fontFamily: 'Normal', color: '#00000099', fontSize: 12 }}
                />
              ) : (
                'Popup saat masuk aplikasi'
              )}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Typography fontFamily={'Lato'} color="rgba(0, 0, 0, 0.38)">
              Demografis:
            </Typography>

            <Typography fontFamily={'Lato'} color="secondary" fontWeight="bold">
              <Stack direction="row" gap="8px">
                {detailAds?.listgender?.map((item, key) => (
                  <Chip
                    key={key}
                    label={item}
                    size="small"
                    style={{ padding: 2, borderRadius: 6, fontFamily: 'Normal', color: '#00000099', fontSize: 12 }}
                  />
                ))}
              </Stack>
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Typography fontFamily={'Lato'} color="rgba(0, 0, 0, 0.38)">
              Situs Link:
            </Typography>

            <a href={detailAds?.urlLink} target="_blank" rel="noreferrer">
              <Typography fontFamily={'Lato'} color="secondary" style={{ textDecoration: 'underline' }}>
                {detailAds?.urlLink}
              </Typography>
            </a>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Typography fontFamily={'Lato'} color="rgba(0, 0, 0, 0.38)">
              Tanggal Mulai Iklan:
            </Typography>

            <Typography fontFamily={'Lato'}>{moment(detailAds?.liveAt).format('DD/MM/YYYY')}</Typography>
          </Stack>
        </div>
      </Card>
    </Stack>
  );
};

export default AdsContentDetailComponent;
