import { useUpgradeUserMutation } from 'api/user/auth';
import { useAuth } from 'authentication';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const LinkVerification = () => {
  const { authUser } = useAuth();
  const router = useRouter();
  const [upgradeUser, { isSuccess }] = useUpgradeUserMutation();

  useEffect(() => {
    upgradeUser({ email: authUser.email, roles: 'ROLE_PREMIUM', status: 'FINISH' }).then((res) => {
      if (res?.data?.status_user === 'FINISH') {
        localStorage.removeItem('user');

        setTimeout(() => {
          router.push('/');
        }, '1500');
      }
    });
  }, []);
  return <div></div>;
};

export default LinkVerification;
