/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import PageHeader from '../../../../@jumbo/components/PageComponents/PageHeader';
import ContentDataCard from './ContentDataCard';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import { Grid } from '@material-ui/core';
import RegionViews from './RegionViews';
import { useUserContentsManagementQuery } from 'api/user/content/management';
import { useAuth } from 'authentication';
import SpinnerLoading from 'components/common/spinner';
import { STREAM_URL } from 'authentication/auth-provider/config';

const Content = ({}) => {
  const { authUser, isLoadingUser } = useAuth();
  const [mainData, setMainData] = useState([]);
  console.log('mainData:', mainData);

  const { data: contentManagement } = useUserContentsManagementQuery(authUser.email);

  const val = Object?.values(contentManagement?.data || {});

  useEffect(() => {
    for (let i = 0; i < val.length; i++) {
      const temp = val[i];
      const a = [temp].map((el) => el);
      setMainData(a[0]);
    }
    getMediaUri();
  }, [contentManagement]);

  // {{MH_HOST_STREAM}}/thumb/fb96a169-70c9-4530-b9eb-6050863e2b41?x-auth-token={{MH_TOKEN}}&x-auth-user={{MH_HDR_USER}}
  const getMediaUri = (url) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.email}`;
    const mediaURI = '/thumb/' + url;

    return `${STREAM_URL}${mediaURI}${authToken}`;
  };

  const formatDate = (date) => {
    return new Date(date?.split(' ')[0]).toLocaleString('en-us', {
      month: 'short',
      year: 'numeric',
      day: 'numeric',
    });
  };

  return (
    <>
      {/* this component act like loading */}
      {contentManagement?.data ? <PageHeader heading={'Content Management'} /> : ''}

      {/* i put loading here  */}
      {contentManagement?.data ? (
        <GridContainer>
          <Grid item md={4}>
            <ContentDataCard
              image={getMediaUri(mainData?.popular?.postID)}
              title={'Popular Konten'}
              contentTitle={mainData?.popular?.description}
              likes={mainData?.popular?.likes}
              views={mainData?.popular?.views}
              date={formatDate(mainData?.popular?.createdAt)}
              contentType={`Hyppe${mainData?.popular?.postType}`}
              postId={mainData?.popular?.postID}
            />
          </Grid>
          <Grid item md={4}>
            <ContentDataCard
              image={getMediaUri(mainData?.mostlikes?.postID)}
              title={'Most Likes'}
              contentTitle={mainData?.mostlikes?.description}
              likes={mainData?.mostlikes?.likes}
              views={mainData?.mostlikes?.views}
              date={'Jun 26, 2020'}
              contentType={`Hyppe${mainData?.mostlikes?.postType}`}
              postId={mainData?.mostlikes?.postID}
            />
          </Grid>
          <Grid item md={4}>
            <ContentDataCard
              image={getMediaUri(mainData?.mostshares?.postID)}
              title={'Most Share'}
              contentTitle={mainData?.mostshares?.description}
              likes={mainData?.mostshares?.likes}
              views={mainData?.mostshares?.views}
              date={'Jun 26, 2020'}
              contentType={`Hyppe${mainData?.mostshares?.postType}`}
              postId={mainData?.mostshares?.postID}
            />
          </Grid>
          <Grid item md={4}>
            <ContentDataCard
              image={getMediaUri(mainData?.latestpost?.postID)}
              title={'Latest Posted Content'}
              contentTitle={mainData?.latestpost?.description}
              likes={mainData?.latestpost?.likes}
              views={mainData?.latestpost?.views}
              date={'Jun 26, 2020'}
              contentType={`Hyppe${mainData?.latestpost?.postType}`}
              postId={mainData?.latestpost?.postID}
            />
          </Grid>
          <Grid item md={4}>
            <RegionViews regions={mainData?.recentlyregion} />
          </Grid>
          <Grid item md={4}>
            <ContentDataCard
              image={getMediaUri(mainData?.traffic?.postID)}
              title={'Content Traffic'}
              contentTitle={mainData?.traffic?.description}
              likes={mainData?.traffic?.likes}
              views={mainData?.traffic?.views}
              date={'Jun 26, 2020'}
              contentType={`Hyppe${mainData?.traffic?.postType}`}
              postId={mainData?.traffic?.postID}
            />
          </Grid>
          <Grid item md={4}>
            <ContentDataCard
              image={getMediaUri(mainData?.moderate?.postID)}
              title={'Moderate Content'}
              contentTitle={mainData?.moderate?.description}
              likes={mainData?.moderate?.likes}
              views={mainData?.moderate?.views}
              date={'Jun 26, 2020'}
              contentType={`Hyppe${mainData?.moderate?.postType}`}
              postId={mainData?.moderate?.postID}
            />
          </Grid>
        </GridContainer>
      ) : (
        <SpinnerLoading style={{ margin: '17% 0 17% 0' }} />
      )}
    </>
  );
};
export default Content;
