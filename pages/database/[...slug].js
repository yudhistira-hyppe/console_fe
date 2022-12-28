import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';
import { useAuth } from 'authentication';

const DatabaseComponent = dynamic(() => import('modules/Pages/console/database'), {
  loading: () => <PageLoader />,
});

const validDatabaseTab = ['account', 'content', 'media'];

const DatabaseDynamicPage = () => {
  const { authUser } = useAuth();
  const router = useRouter();
  const { slug } = router.query;
  const [databaseProps, setDatabaseProps] = useState({});

  useEffect(() => {
    const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

    if (access.map((item) => item?.nameModule).includes('database_account')) {
      router.replace('/database/account');
    } else if (access.map((item) => item?.nameModule).includes('database_content')) {
      router.replace('/database/content');
    } else if (access.map((item) => item?.nameModule).includes('database_media')) {
      router.replace('/database/media');
    } else {
      router.replace('/');
    }
  }, []);

  useEffect(() => {
    if (slug) {
      if (slug.length > 2 || !validDatabaseTab.includes(slug[0])) {
        router.replace('/database/account');
        return;
      }
      if (!authUser?.user) {
        router.push({ pathname: '/signin', query: { redirect: router.asPath } });
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
