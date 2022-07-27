import CmtCard from '@coremat/CmtCard';
import GridContainer from '@jumbo/components/GridContainer';
import { Box, Grid, Typography } from '@material-ui/core';
import { Button } from '@mui/material';
import { useUpgradeUserMutation } from 'api/user/auth';
import { useAuth } from 'authentication';
import { useRouter } from 'next/router';

const PremiumActivation = () => {
  const { authUser } = useAuth();
  const router = useRouter();
  const [upgradeUser, { isSuccess }] = useUpgradeUserMutation();

  const handleUpgradePremium = () => {
    upgradeUser({ email: authUser.user.email, roles: 'ROLE_PREMIUM', status: 'ON_PROGRESS' }).then((res) => {
      console.log('res:', res?.data?.status_user);
      if (res?.data?.status_user === 'ON_PROGRESS') {
        router.push('/verification-email');
      } else {
        alert('update role failed');
      }
    });
  };

  return (
    <>
      <CmtCard>
        <GridContainer style={{ minHeight: '500px' }}>
          <Grid
            item
            xs={12}
            md={6}
            xl={6}
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            // style={{ border: '1px solid black' }}
          >
            <div
              style={{
                width: '300px',
                height: '150px',
                // border: '1px solid black'
              }}>
              <Typography component="div" variant="h1">
                Aktifkan Premium
              </Typography>
              <Typography style={{ marginTop: '10px' }}>
                Ubah akun anda menjadi premium <br />
                agar bisa menggunakan Iklan Hyppe
              </Typography>

              <Button
                variant="outlined"
                style={{
                  background: 'rgb(170, 34, 175)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: '5px',
                  marginTop: '30px',
                }}
                onClick={handleUpgradePremium}>
                Aktifkan
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} md={6} xl={6} container direction="column" alignItems="center" justifyContent="center">
            <center>
              <img src="/images/active-premium.png" width="400" height="auto" />
            </center>
          </Grid>
        </GridContainer>
      </CmtCard>
    </>
  );
};

export default PremiumActivation;
