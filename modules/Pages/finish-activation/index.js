import CmtCard from '@coremat/CmtCard';
import GridContainer from '@jumbo/components/GridContainer';
import { Box, Button, Grid, Typography } from '@material-ui/core';

const FinishActivation = () => {
  return (
    <>
      <CmtCard style={{ minHeight: '500px' }}>
        <center>
          <img src="./images/active-premium.png" width="300" style={{ display: 'block' }} />
          <Typography component="div" variant="h1" style={{ margin: '10px 0 ' }}>
            Selesaikan Aktivasi Anda
          </Typography>
          <Typography component="div" variant="h5" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
            Selangkah lagi untuk mengaktifkan premium Anda, silakan klik tombol konfirmasi
          </Typography>
          <Button
            variant="outlined"
            style={{
              background: 'rgb(170, 34, 175)',
              color: '#FFFFFF',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '5px',
              marginTop: '10px',
            }}>
            KONFIRMASI
          </Button>
        </center>
      </CmtCard>
    </>
  );
};
export default FinishActivation;
