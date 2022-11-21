import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const DatabaseComponent = dynamic(() => import('modules/Pages/console/database'), {
  loading: () => <PageLoader />,
});

const validDatabaseTab = ['account', 'content', 'media'];

const DatabaseDynamicPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [databaseProps, setDatabaseProps] = useState({});

  useEffect(() => {
    if (slug) {
      if (slug.length > 2 || !validDatabaseTab.includes(slug[0])) {
        router.replace('/database/account');
        return;
      }
      setDatabaseProps({ tab: slug[0], detailId: slug[1] });
    }
  }, [slug]);

  return (
    <SecureConsolePage>
      <DatabaseComponent tab={databaseProps.tab} detailId={databaseProps.detailId} />
    </SecureConsolePage>
  );
};

export default DatabaseDynamicPage;
