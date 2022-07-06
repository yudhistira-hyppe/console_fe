import { Grid, Typography, Button } from '@material-ui/core';
import CmtImage from '@coremat/CmtImage';
import { useRouter } from 'next/router';

const OrganizationBasic = () => {
  const router = useRouter();

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Typography style={{ fontWeight: 'bold' }}>Active Premium</Typography>
        <div style={{ color: 'rgba(0, 0, 0, 0.38)', marginTop: '5px' }}>
          Ubah akun Anda menjadi akun premium untuk dapat membuat dan mengelola organisasi Anda
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
          onClick={() => router.push('/premium-activation')}>
          ACTIVATE
        </Button>
      </Grid>
      <Grid item xs={4}>
        <CmtImage src={'/images/kotak.png'} />
      </Grid>
    </Grid>
  );
};

export default OrganizationBasic;
