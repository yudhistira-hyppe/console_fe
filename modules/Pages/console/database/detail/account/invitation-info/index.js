import { Typography } from '@material-ui/core';
import { GroupAdd, Link } from '@material-ui/icons';
import { Card, Stack } from '@mui/material';
import React from 'react';

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

const InvitationInfoComponent = ({}) => {
  return (
    <Card style={{ height: '100%', padding: '36px 24px' }}>
      <Stack direction="column" justifyContent="center" height="100%" spacing={3}>
        <ItemInfo icon={<GroupAdd style={{ fontSize: 28, color: '#767676' }} />} title="Diundang Oleh" value={`-`} />

        <ItemInfo icon={<Link style={{ fontSize: 28, color: '#767676' }} />} title="Link Referal" value={`-`} />
      </Stack>
    </Card>
  );
};

export default InvitationInfoComponent;
