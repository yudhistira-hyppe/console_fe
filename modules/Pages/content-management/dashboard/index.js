// react
import { useState, useEffect } from 'react';

// template components
import GridContainer from '@jumbo/components/GridContainer';

// material ui
import { Grid, makeStyles } from '@material-ui/core';

// global components
import SpinnerLoading from 'components/common/loading/spinner';

// partials component
import ContentDataCard from '../ContentDataCard';
import RegionViews from '../RegionViews';

// request
import { useAuth } from 'authentication';
import { useUserContentsManagementQuery } from 'api/user/content/management';
import { STREAM_URL } from 'authentication/auth-provider/config';

const useStyles = makeStyles({
  root: {
    // background: 'linear-gradient(45deg, #9013FE 15%, #50E3C2 90%)',
    minWidth: '100%',
    minHeight: '50vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const ContentManagement = () => {
  const classes = useStyles();
  const { authUser } = useAuth();
  const [mainData, setMainData] = useState([]);

  const { data: contentManagement } = useUserContentsManagementQuery(authUser.user.email);

  const val = Object?.values(contentManagement?.data || {});

  useEffect(() => {
    for (let i = 0; i < val.length; i++) {
      const temp = val[i];
      const a = [temp].map((el) => el);
      setMainData(a[0]);
    }
    getMediaUri();
  }, [contentManagement]);

  const getMediaUri = (url) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
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
      {/* this component have a loading */}
      {/* got data from be like this, need to define it one by one */}
      {contentManagement?.data ? (
        <GridContainer>
          <Grid item md={4} xs={12}>
            <ContentDataCard
              image={
                mainData?.popular?.postID === undefined
                  ? '/images/content/content1.png'
                  : getMediaUri(mainData?.popular?.postID)
              }
              title={'Popular Konten'}
              contentTitle={mainData?.popular?.description}
              likes={mainData?.popular?.likes}
              views={mainData?.popular?.views}
              date={formatDate(mainData?.popular?.createdAt)}
              contentType={`Hyppe${mainData?.popular?.postType ? mainData?.popular?.postType : ''}`}
              postId={mainData?.popular?.postID}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <ContentDataCard
              image={
                mainData?.popular?.postID === undefined
                  ? '/images/content/content1.png'
                  : getMediaUri(mainData?.mostlikes?.postID)
              }
              title={'Most Likes'}
              contentTitle={mainData?.mostlikes?.description}
              likes={mainData?.mostlikes?.likes}
              views={mainData?.mostlikes?.views}
              date={formatDate(mainData?.mostlikes?.createdAt)}
              contentType={`Hyppe${mainData?.mostlikes?.postType ? mainData?.mostlikes?.postType : ''}`}
              postId={mainData?.mostlikes?.postID}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <ContentDataCard
              image={
                mainData?.mostshares?.postID === undefined
                  ? '/images/content/content1.png'
                  : getMediaUri(mainData?.mostshares?.postID)
              }
              title={'Most Share'}
              contentTitle={mainData?.mostshares?.description}
              likes={mainData?.mostshares?.likes}
              views={mainData?.mostshares?.views}
              date={formatDate(mainData?.mostshares?.createdAt)}
              contentType={`Hyppe${mainData?.mostshares?.postType ? mainData?.mostshares?.postType : ''}`}
              postId={mainData?.mostshares?.postID}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <ContentDataCard
              image={
                mainData?.latestpost?.postID === undefined
                  ? '/images/content/content1.png'
                  : getMediaUri(mainData?.latestpost?.postID)
              }
              title={'Latest Posted Content'}
              contentTitle={mainData?.latestpost?.description}
              likes={mainData?.latestpost?.likes}
              views={mainData?.latestpost?.views}
              date={formatDate(mainData?.latestpost?.createdAt)}
              contentType={`Hyppe${mainData?.latestpost?.postType ? mainData?.latestpost?.postType : ''}`}
              postId={mainData?.latestpost?.postID}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <ContentDataCard
              image={
                mainData?.traffic?.postID === undefined
                  ? '/images/content/content1.png'
                  : getMediaUri(mainData?.moderate?.postID)
              }
              title={'Moderate Content'}
              contentTitle={mainData?.moderate?.description}
              likes={mainData?.moderate?.likes}
              views={mainData?.moderate?.views}
              date={formatDate(mainData?.moderate?.createdAt)}
              contentType={`Hyppe${mainData?.moderate?.postType ? mainData?.moderate?.postType : ''}`}
              postId={mainData?.moderate?.postID}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <ContentDataCard
              image={
                mainData?.traffic?.postID === undefined
                  ? '/images/content/content1.png'
                  : getMediaUri(mainData?.traffic?.postID)
              }
              title={'Content Traffic'}
              contentTitle={mainData?.traffic?.description}
              likes={mainData?.traffic?.likes}
              views={mainData?.traffic?.views}
              date={formatDate(mainData?.traffic?.createdAt)}
              contentType={`Hyppe${mainData?.traffic?.postType ? mainData?.traffic?.postType : ''}`}
              postId={mainData?.traffic?.postID}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <RegionViews regions={mainData?.recentlyregion} />
          </Grid>
        </GridContainer>
      ) : (
        <Grid className={classes.root} spacing={0} alignItems="center" justify="center">
          <SpinnerLoading />
        </Grid>
      )}
    </>
  );
};

export default ContentManagement;
