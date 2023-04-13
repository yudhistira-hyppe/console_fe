import React from 'react';
import Head from 'next/head';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import GridContainer from '@jumbo/components/GridContainer';
import { Grid } from '@mui/material';
import ChartPost from './chart-post';
import TopBoosted from './top-boosted';
import TableList from './TableList';
import Cookies from 'js-cookie';
import { useGetAnalyticBoostQuery } from 'api/console/boost';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';

const BoostCenter = () => {
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  const { data: analyticBoost, isLoading: loadingAnalytic } = useGetAnalyticBoostQuery();

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Boost Center</title>
      </Head>
      <PageContainer>
        {loadingAnalytic ? (
          <PageLoader />
        ) : (
          <Grid container spacing={6}>
            {access.map((item) => item?.nameModule).includes('boost_statistic') && (
              <Grid item xs={4} style={{ width: '100%' }}>
                <ChartPost
                  totalPost={analyticBoost?.data?.totalpost}
                  persenJangkauan={analyticBoost?.data?.persenjangkauan}
                  chartData={[
                    {
                      name: 'Jangkauan',
                      value: Number(analyticBoost?.data?.persenjangkauan),
                      color: '#AB22AF',
                    },
                    {
                      name: 'Boost Post',
                      value: Number(analyticBoost?.data?.persentotalpost),
                      color: '#23036A',
                    },
                  ]}
                />
              </Grid>
            )}
            {access.map((item) => item?.nameModule).includes('boost_engagement') && (
              <Grid item xs={8} style={{ width: '100%' }}>
                <TopBoosted data={analyticBoost?.data?.post} loading={loadingAnalytic} />
              </Grid>
            )}
            {access.map((item) => item?.nameModule).includes('boost_table') && (
              <Grid item xs={12} style={{ width: '100%' }}>
                <TableList />
              </Grid>
            )}
          </Grid>
        )}
      </PageContainer>
    </>
  );
};

export default BoostCenter;
