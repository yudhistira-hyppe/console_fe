import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';
import { useAuth } from 'authentication';
import { Typography } from '@material-ui/core';

const AnnouncementComponent = dynamic(() => import('modules/Pages/console/announcement'), {
  loading: () => <PageLoader />,
});

let validDatabaseTab = ['notification', 'banner'];

const AnnouncementDynamicPage = () => {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();
  const { slug } = router.query;
  const [announcementProps, setAnnouncementProps] = useState({});

  useEffect(() => {
    if (!isLoading) {
      if (slug) {
        if (authUser) {
          if (slug.length > 3 || !validDatabaseTab.includes(slug[0])) {
            router.replace('/announcement/notification');
            return;
          }
          setAnnouncementProps({ tab: slug[0], view: slug[1], detailId: slug[2] });
        } else {
          router.push({ pathname: '/signin', query: { redirect: router.asPath } });
          return;
        }
      }
    }
  }, [slug, isLoading]);

  return (
    <SecureConsolePage>
      <AnnouncementComponent
        tab={announcementProps.tab}
        view={announcementProps.view}
        detailId={announcementProps.detailId}
      />
    </SecureConsolePage>
  );
};

export default AnnouncementDynamicPage;
