import React from 'react';
import { Box, Button } from '@material-ui/core';
import CmtCard from '@coremat/CmtCard';
import CmtImage from '@coremat/CmtImage';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    '& .MuiBox-root': {
        marginBottom: 0
    },
    iconView: {
        width: 40,
        height: 40
    },
    desc: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.38)'
    }
}));

const VerificationCode = () => {
  const classes = useStyles();
  return (
    <CmtCard style={{height:'100%'}}>
      <CmtCardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box className={classes.iconView}>
                <CmtImage src={'/images/icons/warning.png'} alt="warning" />
            </Box>
            <Typography component="div" variant="h2">
                1234
            </Typography>
            <Typography component="div" variant="h5" className={classes.desc}>
                Kode Verifikasi ini berlaku selama 16 jam,<br/>
                dan akan hilang jika sudah berhasil digunakan
            </Typography>
            <Button
                color="primary"
                variant="contained">
                Kirim Ulang Kode
            </Button>
        </Box>
      </CmtCardContent>
    </CmtCard>
  );
};

export default VerificationCode;