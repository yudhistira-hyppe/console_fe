import { useEffect } from 'react';
import { useUpgradeUserMutation } from 'api/user/auth';
// import { useAuth } from 'authentication';
import { useRouter } from 'next/router';

const LinkVerification = () => {
  // const { authUser } = useAuth();
  const router = useRouter();
  const [upgradeUser, { isSuccess }] = useUpgradeUserMutation();

  useEffect(() => {
    // router.push(`link-verification?key=${authUser.email}`);
    upgradeUser({ email: router.query.key, roles: 'ROLE_PREMIUM', status: 'FINISH' }).then((res) => {
      if (res.data.status_user === 'FINISH') {
        alert('akun anda sudah premium');
        router.push('/');
      } else {
        alert('gagal upgrade premium');
      }
    });
  }, []);
  return <div>Link LinkVerification</div>;
};

export default LinkVerification;
