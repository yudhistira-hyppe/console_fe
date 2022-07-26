import CmtCard from '@coremat/CmtCard';
import GridContainer from '@jumbo/components/GridContainer';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { useUpgradeUserMutation } from 'api/user/auth';
import { useRouter } from 'next/router';
import { useAuth } from 'authentication';

const VerificationEmail = () => {
  const { authUser } = useAuth();
  const router = useRouter();
  const [upgradeUser, { isSuccess }] = useUpgradeUserMutation();

  const resendEmail = (e) => {
    e.preventDefault();
    upgradeUser({ email: authUser.user.email, roles: 'ROLE_PREMIUM', status: 'ON_PROGRESS' });
  };

  return (
    <>
      <CmtCard style={{ minHeight: '500px' }}>
        <center style={{ marginTop: '7%' }}>
          <img src="./images/kotak.png" width="100" height="100" style={{ display: 'block' }} />
          <Typography component="div" variant="h1" style={{ margin: '25px' }}>
            Verifikasi Email Anda
          </Typography>
          <Typography component="div" variant="h5" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
            Kami telah mengirimkan tautan verifikasi ke freeman27@getnada.com. <br />
            Silakan periksa kotak masuk Anda dan klik tautan untuk memverifikasi email Anda <br />
          </Typography>
          <Typography variant="h4" style={{ margin: '20px' }}>
            Belum menerima email?{' '}
            <a href="/verification-email" style={{ color: 'blue' }} onClick={resendEmail}>
              Kirim Ulang Email
            </a>
          </Typography>
          <Button
            variant="outlined"
            style={{
              background: 'rgb(170, 34, 175)',
              color: '#FFFFFF',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '5px',
            }}
            onClick={() => router.push('/finish-activation')}>
            Kembali
          </Button>
        </center>
      </CmtCard>
    </>
  );
};
export default VerificationEmail;
