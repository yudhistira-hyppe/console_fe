/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import PageHeader from '../../../../@jumbo/components/PageComponents/PageHeader';
import ContentDataCard from './ContentDataCard';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import { Grid } from '@material-ui/core';
import RegionViews from './RegionViews';
import { useUserContentsManagementQuery } from 'api/user/content/management';
import { useAuth } from 'authentication';

const Content = ({}) => {
  const { authUser, isLoadingUser } = useAuth();
  const [mainData,setMainData] = useState([])
  console.log('mainData:', Object.keys(mainData))


  const { data: contentManagement } = useUserContentsManagementQuery(authUser.email);

const val = Object?.values(contentManagement?.data || {})

  useEffect(() => {
    for (let i = 0; i < val.length; i ++) {
      const temp = val[i]
      const a = [temp].map((el) => el)
      setMainData(a[0])
  }
  },[contentManagement])

  // mau ngakalin sejauh apa tetep aja ribet ada kata yang 'recentlyregion' && 'latestpost'

//   const titleFirstStrToUpperCase = (str) => {
//     const firstStr = str?.charAt(0).toUpperCase() + str?.slice(1);
//     return firstStr
// }

  return (  
    <div>
      <PageHeader heading={'Content Management'} />
      <GridContainer>
        <Grid item md={4}>
          <ContentDataCard
            title={'Popular'}
            contentTitle={mainData?.popular?.description}
            likes={mainData?.popular?.likes}
            views={mainData?.popular?.views}
            date={'Jun 26, 2020'}
            contentType={`Hyppe ${mainData?.popular?.postType}`}
          />
        </Grid>
        <Grid item md={4}>
          <ContentDataCard
            title={'Mostlikes'}
            contentTitle={mainData?.mostlikes?.description}
            likes={mainData?.mostlikes?.likes}
            views={mainData?.mostlikes?.views}
            date={'Jun 26, 2020'}
            contentType={`Hyppe ${mainData?.mostlikes?.postType}`}
          />
        </Grid>
        <Grid item md={4}>
          <ContentDataCard
            title={'Mostshares'}
            contentTitle={mainData?.mostshares?.description}
            likes={mainData?.mostshares?.likes}
            views={mainData?.mostshares?.views}
            date={'Jun 26, 2020'}
            contentType={`Hyppe ${mainData?.mostshares?.postType}`}
          />
        </Grid>
        <Grid item md={4}>
          <ContentDataCard
            title={'Latest Post'}
            contentTitle={mainData?.latestpost?.description}
            likes={mainData?.latestpost?.likes}
            views={mainData?.latestpost?.views}
            date={'Jun 26, 2020'}
            contentType={`Hyppe ${mainData?.latestpost?.postType}`}
          />
        </Grid>
        <Grid item md={4}>
          <ContentDataCard
            title={'Recently Region'}
            contentTitle={mainData?.recentlyregion?.description}
            likes={mainData?.recentlyregion?.likes}
            views={mainData?.recentlyregion?.views}
            date={'Jun 26, 2020'}
            contentType={`Hyppe ${mainData?.recentlyregion?.postType}`}
          />
        </Grid>
        <Grid item md={4}>
          <ContentDataCard
            title={'Traffic'}
            contentTitle={mainData?.traffic?.description}
            likes={mainData?.traffic?.likes}
            views={mainData?.traffic?.views}
            date={'Jun 26, 2020'}
            contentType={`Hyppe ${mainData?.traffic?.postType}`}
          />
        </Grid>
        <Grid item md={4}>
          <ContentDataCard
            title={'Moderate'}
            contentTitle={mainData?.moderate?.description}
            likes={mainData?.moderate?.likes}
            views={mainData?.moderate?.views}
            date={'Jun 26, 2020'}
            contentType={`Hyppe ${mainData?.moderate?.postType}`}
          />
        </Grid>
        
      </GridContainer>
    </div>
  );
};
export default Content;
