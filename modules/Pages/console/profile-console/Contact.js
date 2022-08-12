import React from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
} from '@material-ui/core';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import CmtCard from '@coremat/CmtCard';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import clsx from 'clsx';
import LinkIcon from '@material-ui/icons/Link';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import blue from '@material-ui/core/colors/blue';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import CalenderIcon from 'public/images/icons/calenderIcon';
import { Select, Slide, Stack } from '@mui/material';
import Button from '@mui/material/Button';

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
  ubahJabatan: {
    color: 'rgb(170, 34, 175)',
    cursor: 'pointer',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Contact = ({ dataUser }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CmtCard style={{ minHeight: '55vh' }}>
        <CmtCardHeader title="Jabatan" />
        <CmtCardContent>
          <Typography variant="h3">Senior Pertukangan</Typography>
          <small onClick={handleClickOpen} className={classes.ubahJabatan}>
            Ubah
          </small>

          {/* dialog only show when open is true */}
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description">
            <DialogContent>
              <Box p={4}>
                <center>
                  <Typography id="modal-modal-title" variant="h3" component="div">
                    Ubah Jabatan
                  </Typography>
                </center>
                <Box mt={9} textAlign="center">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Age"
                      onChange={handleChange}>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} style={{ marginTop: '45px' }}>
                  <Button
                    style={{
                      // background: 'rgb(170, 34, 175)',
                      color: 'rgba(0, 0, 0, 0.6)',
                      border: 'none',
                      padding: '5px 10px',
                      marginTop: '10px',
                      fontWeight: 'bold',
                    }}
                    onClick={() => setOpen(false)}>
                    BATAL
                  </Button>
                  <Button
                    variant="outlined"
                    style={{
                      background: 'rgb(170, 34, 175)',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      marginTop: '10px',
                    }}>
                    KONFIRMASI
                  </Button>
                </Stack>
              </Box>
            </DialogContent>
          </Dialog>
          {/* dialog only show when open is true */}
        </CmtCardContent>

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
