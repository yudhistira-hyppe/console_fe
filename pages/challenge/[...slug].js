import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';
import { useAuth } from 'authentication';
import { Typography } from '@material-ui/core';
import CreateChallenge from 'modules/Pages/console/challenge/create';
import EditChallenge from 'modules/Pages/console/challenge/edit';
import DetailChallenge from 'modules/Pages/console/challenge/detail';
import { useGetJenisChallengeQuery } from 'api/console/utilitas/challenge';

const ChallengeComponent = dynamic(() => import('modules/Pages/console/challenge'), {
  loading: () => <PageLoader />,
});

let validDatabaseTab = ['draft', 'create', 'detail', 'edit'];

const ChallengeDynamicPage = () => {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();
  const { slug } = router.query;
  const [challengeProps, setChallengeProps] = useState({ tab: 'draft' });
  const { data: listJenis, isLoading: loadingJenis } = authUser ? useGetJenisChallengeQuery({ limit: 100, page: 0 }) : {};

  useEffect(() => {
    if (!isLoading) {
      if (slug) {
        if (authUser) {
          listJenis?.data?.map((item) => validDatabaseTab.push(item?.name));
          if (!loadingJenis) {
            if (slug.length > 3 || !validDatabaseTab.includes(slug[0])) {
              if (listJenis?.data?.length >= 1) {
                router.replace(listJenis?.data?.[0]?.name);
              } else {
                router.replace('draft');
              }
              return;
            }
            setChallengeProps({ tab: slug[0], detailId: slug[1] });
          }
        } else {
          router.push({ pathname: '/signin', query: { redirect: router.asPath } });
          return;
        }
      }
    }
  }, [slug, loadingJenis, isLoading]);

  return (
    <SecureConsolePage>
      {challengeProps.tab === 'create' ? (
        <CreateChallenge moreSlug={slug[1]} />
      ) : challengeProps.tab === 'edit' ? (
        <EditChallenge moreSlug={slug[2]} detailId={challengeProps.detailId} />
      ) : challengeProps.tab === 'detail' ? (
        <DetailChallenge detailId={challengeProps.detailId} />
      ) : (
        <ChallengeComponent tab={challengeProps.tab} jenis={listJenis?.data} />
      )}
    </SecureConsolePage>
  );
};

export default ChallengeDynamicPage;
