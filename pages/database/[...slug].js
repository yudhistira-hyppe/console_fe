import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';
import { useAuth } from 'authentication';

const DatabaseComponent = dynamic(() => import('modules/Pages/console/database'), {
  loading: () => <PageLoader />,
});

const validDatabaseTab = ['account', 'content', 'music', 'effect', 'sticker'];

const DatabaseDynamicPage = () => {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();
  const { slug } = router.query;
  const [databaseProps, setDatabaseProps] = useState({});

  useEffect(() => {
    if (!isLoading) {
      if (slug) {
        if (authUser) {
          if (slug.length > 2 || !validDatabaseTab.includes(slug[0])) {
            router.replace('/database/account');
            return;
          }
          setDatabaseProps({ tab: slug[0], detailId: slug[1] });
        } else {
          router.push({ pathname: '/signin', query: { redirect: router.asPath } });
          return;
        }
      }
    }
  }, [slug, isLoading]);

  return (
    <SecureConsolePage>
      <DatabaseComponent tab={databaseProps.tab} detailId={databaseProps.detailId} />
    </SecureConsolePage>
  );
};

export default DatabaseDynamicPage;
