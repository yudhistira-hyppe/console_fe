import { alpha, makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, Card, CardContent, Typography } from '@material-ui/core';
import CmtCardHeader from '../../../@coremat/CmtCard/CmtCardHeader';
import CmtCard from '@coremat/CmtCard';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import clsx from 'clsx';
import LinkIcon from '@material-ui/icons/Link';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import blue from '@material-ui/core/colors/blue';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import CalenderIcon from 'public/images/icons/calenderIcon';

const useStyles = makeStyles((theme) => ({
  iconView: {
    backgroundColor: alpha(blue['500'], 0.1),
    color: blue['500'],
    padding: 8,
    borderRadius: 4,
    '& .MuiSvgIcon-root': {
      display: 'block',
    },
    '&.web': {
      backgroundColor: alpha(theme.palette.warning.main, 0.1),
      color: theme.palette.warning.main,
    },
    '&.phone': {
      backgroundColor: alpha(theme.palette.success.main, 0.15),
      color: theme.palette.success.dark,
    },
  },
  wordAddress: {
    wordBreak: 'break-all',
    cursor: 'pointer',
  },
}));

const Contact = ({ dataUser }) => {
  const classes = useStyles();

  return (
    <>
      <CmtCard>
        <CmtCardHeader title="Kontak" />
        <CmtCardContent>
          <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 6 }}>
            <Box className={classes.iconView}>
              <MailOutlineIcon style={{ width: '25px' }} />
            </Box>
            <Box ml={5}>
              <Box component="span" fontSize={12} color="text.secondary">
                Email
              </Box>
              <Box component="p" className={classes.wordAddress} fontSize={16}>
                {/* <Box component="a" href={`mailto:email`}> */}
                {dataUser?.data[0]?.email}
                {/* </Box> */}
              </Box>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 6 }}>
            <Box className={clsx(classes.iconView, 'web')}>
              <CalenderIcon style={{ width: '25px' }} />
            </Box>
            <Box ml={5}>
              <Box component="span" fontSize={12} color="text.secondary">
                Waktu Pendaftaran
              </Box>
              <Box component="p" className={classes.wordAddress} fontSize={16}>
                {/* <Box component="a" href="web"> */}
                {dataUser?.data[0]?.createdAt}
                {/* </Box> */}
              </Box>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Box className={clsx(classes.iconView, 'phone')}>
              <LocalPhoneIcon />
            </Box>
            <Box ml={5}>
              <Box component="span" fontSize={12} color="text.secondary">
                Status
              </Box>
              <Box component="p" className={classes.wordAddress} fontSize={16} color="text.primary">
                {dataUser?.data[0]?.roles.includes('ROLE_USER') ? 'Basic' : 'Premium'}
              </Box>
            </Box>
          </Box>
        </CmtCardContent>
      </CmtCard>
    </>
  );
};

export default Contact;

// Contact.prototype = {
//   userDetail: PropTypes.object.isRequired,
// };
