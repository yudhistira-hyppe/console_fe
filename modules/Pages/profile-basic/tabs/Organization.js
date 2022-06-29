import { Grid, Typography, Button } from '@material-ui/core';

const OrganizationBasic = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography>Active Premium</Typography>
          <div>Ubah akun Anda menjadi akun premium untuk dapat membuat dan mengelola organisasi Anda</div>
          <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
            ACTIVATE
          </Button>
        </Grid>
        <Grid item xs={4}>
          xs=4
        </Grid>
      </Grid>
    </>
  );
};

export default OrganizationBasic;
