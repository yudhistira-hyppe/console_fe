import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsoleDatabaseAccountComponent = dynamic(() => import('modules/Pages/console/database'), {
  loading: () => <PageLoader />,
});

const validConsoleDatabaseTab = ['account', 'content'];

const ConsoleDatabaseAccountPage = () => {
  const router = useRouter();
  const [queryTab, setQueryTab] = useState('account');

  useEffect(() => {
    if (validConsoleDatabaseTab.includes(router.query.tab)) {
      setQueryTab(router.query.tab);
    } else {
      router.replace({ query: { tab: 'account' } });
    }
  }, [router.query.tab]);

  return (
    <SecureConsolePage>
      <ConsoleDatabaseAccountComponent queryTab={queryTab} />
    </SecureConsolePage>
  );
};

export default ConsoleDatabaseAccountPage;
