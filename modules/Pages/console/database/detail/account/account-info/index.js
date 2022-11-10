import PropTypes from 'prop-types';
import { Card, Stack, SvgIcon } from '@mui/material';
import { Box, Typography } from '@material-ui/core';
import { AccountCircle, DateRange, Email, HowToReg } from '@material-ui/icons';
import { formatRoles } from 'helpers/stringHelper';
import moment from 'moment';
import useStyles from './index.style';

const AccountInfoComponent = (props) => {
  const classes = useStyles();
  const { createdAt, fullName, email, roles } = props;

  const formattedCreatedAt = () => {
    const formattedDate = moment(createdAt).format('DD/MM/YYYY - HH:mm');
    return `${formattedDate} WIB`;
  };

  return (
    <Card sx={{ height: 'fit-content' }}>
      <Stack padding="24px" spacing={3}>
        <Stack direction="row" spacing={3.75}>
          <SvgIcon
            sx={{ fontSize: '40px', padding: '8px', backgroundColor: '#EAEAEA', color: '#767676', borderRadius: '4px' }}>
            <Email />
          </SvgIcon>
          <Box>
            <Box fontSize={12} color="text.secondary">
              Email
            </Box>
            <Typography className={classes.accountInfoContent}>{email}</Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={3.75}>
          <SvgIcon
            sx={{ fontSize: '40px', padding: '8px', backgroundColor: '#EAEAEA', color: '#767676', borderRadius: '4px' }}>
            <DateRange />
          </SvgIcon>
          <Stack>
            <Box fontSize={12} color="text.secondary">
              Waktu Pendaftaran
            </Box>
            <Typography className={classes.accountInfoContent}>{formattedCreatedAt()}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={3.75}>
          <SvgIcon
            sx={{ fontSize: '40px', padding: '8px', backgroundColor: '#EAEAEA', color: '#767676', borderRadius: '4px' }}>
            <HowToReg />
          </SvgIcon>
          <Stack>
            <Box fontSize={12} color="text.secondary">
              Status
            </Box>
            <Typography className={classes.accountInfoContent}>{formatRoles(roles)}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={3.75}>
          <SvgIcon
            sx={{ fontSize: '40px', padding: '8px', backgroundColor: '#EAEAEA', color: '#767676', borderRadius: '4px' }}>
            <AccountCircle />
          </SvgIcon>
          <Stack>
            <Box fontSize={12} color="text.secondary">
              Nama Sebenarnya
            </Box>
            <Typography className={classes.accountInfoContent}>{fullName}</Typography>
          </Stack>
        </Stack>
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
