import PropTypes from 'prop-types';
import { Box, Card, Stack, SvgIcon } from '@mui/material';
import { Typography } from '@material-ui/core';
import { AccountCircle, DateRange, DeveloperMode, Email, HowToReg, Link, Place, QueryBuilder } from '@material-ui/icons';
import dayjs from 'dayjs';

const ItemInfo = ({ icon, title, value }) => {
  return (
    <Stack direction="row" alignItems="center" gap={2}>
      <Stack
        alignItems="center"
        justifyContent="center"
        style={{ width: 48, height: 48, backgroundColor: '#EAEAEA', borderRadius: 8 }}>
        {icon}
      </Stack>
      <Stack direction="column">
        <Typography style={{ fontSize: 12, color: '#00000099' }}>{title}</Typography>
        <Typography style={{ fontSize: 14, whiteSpace: 'nowrap', width: 185, overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {value}
        </Typography>
      </Stack>
    </Stack>
  );
};

const AccountInfoComponent = ({ data }) => {
  return (
    <Card style={{ height: '100%', padding: '36px 24px' }}>
      <Stack direction="column" justifyContent="center" height="100%" spacing={3}>
        <ItemInfo
          icon={<Place style={{ fontSize: 28, color: '#767676' }} />}
          title="Lokasi Akses"
          value={`${data?.states}, ${data?.cities}`}
        />

        <ItemInfo icon={<DeveloperMode style={{ fontSize: 28, color: '#767676' }} />} title="Sistem Operasi" value={data?.loginSrc || '-'} />

        <ItemInfo
          icon={<QueryBuilder style={{ fontSize: 28, color: '#767676' }} />}
          title="Terdaftar"
          value={`${dayjs(data?.createdAt).format('DD/MM/YYYY - HH:mm')} WIB`}
        />

        <ItemInfo
          icon={<DateRange style={{ fontSize: 28, color: '#767676' }} />}
          title="Nama Pengguna"
          value={data?.username}
        />

        <ItemInfo
          icon={<QueryBuilder style={{ fontSize: 28, color: '#767676' }} />}
          title="Terverifikasi"
          value={`${dayjs(data?.createdAt).format('DD/MM/YYYY - HH:mm')} WIB`}
        />

        <ItemInfo icon={<Link style={{ fontSize: 28, color: '#767676' }} />} title="Nama Lengkap" value={data?.fullName} />
      </Stack>
    </Card>
  );
};

AccountInfoComponent.propTypes = {
  createdAt: PropTypes.string,
  fullName: PropTypes.string,
  email: PropTypes.string,
  roles: PropTypes.array,
};

export default AccountInfoComponent;
