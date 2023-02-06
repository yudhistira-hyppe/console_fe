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
          <GridContainer>
            {access.map((item) => item?.nameModule).includes('boost_statistic') && (
              <Grid item xs={12} sm={4}>
                <ChartPost
                  totalPost={analyticBoost?.data?.totalpost}
                  persenJangkauan={analyticBoost?.data?.persenjangkauan}
                  chartData={[
                    {
                      value: Number(analyticBoost?.data?.persenjangkauan),
                    },
                    {
                      value: Number(analyticBoost?.data?.persentotalpost),
                    },
                  ]}
                />
              </Grid>
            )}
            {access.map((item) => item?.nameModule).includes('boost_engagement') && (
              <Grid item xs={12} sm={8}>
                <TopBoosted data={analyticBoost?.data?.post} loading={loadingAnalytic} />
              </Grid>
            )}
            {access.map((item) => item?.nameModule).includes('boost_table') && (
              <Grid item xs={12}>
                <TableList />
              </Grid>
            )}
          </GridContainer>
        )}
      </PageContainer>
    </>
  );
};

export default BoostCenter;
