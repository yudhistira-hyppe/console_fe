import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';
import { useAuth } from 'authentication';

const ChallengeComponent = dynamic(() => import('modules/Pages/console/challenge'), {
  loading: () => <PageLoader />,
});

const validDatabaseTab = ['main', 'other', 'draft'];

const ChallengeDynamicPage = () => {
  const { authUser } = useAuth();
  const router = useRouter();
  const { slug } = router.query;
  const [challengeProps, setChallengeProps] = useState({});

  useEffect(() => {
    if (slug) {
      if (slug.length > 2 || !validDatabaseTab.includes(slug[0])) {
        router.replace('/challenge/main');
        return;
      }
      if (!authUser?.user) {
        router.push({ pathname: '/signin', query: { redirect: router.asPath } });
        return;
      }
      setChallengeProps({ tab: slug[0], detailId: slug[1] });
    }
  }, [slug]);

  return (
    <SecureConsolePage>
      <ChallengeComponent tab={challengeProps.tab} detailId={challengeProps.detailId} />
    </SecureConsolePage>
  );
};

export default ChallengeDynamicPage;
