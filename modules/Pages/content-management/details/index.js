import React, { useEffect } from 'react';
import PageHeader from '../../../../@jumbo/components/PageComponents/PageHeader';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import DetailsCard from './DetailsCard';
import ContentDataCard from '../ContentDataCard';
import { Grid } from '@material-ui/core';
import Statistics from './Statistics';
import Comments from './Comments';
import Discover from './Discover';
import BiographyStats from './BiographyStats';
import { fakeDb } from '../../../FakeDb/fake-db';
import { useAuth } from 'authentication';
import { useRouter } from 'next/router';
import { useUserContentTimeQuery, useUserContentDetailsQuery, useUserContentEventQuery } from 'api/user/content';
import SpinnerLoading from 'components/common/loading/spinner';
import { STREAM_URL } from 'authentication/auth-provider/config';

const Details = () => {
  const { authUser } = useAuth();
  const router = useRouter();

  const payload = {
    postID: router.query.postId,
  };

  const { data: contentEvent } = useUserContentEventQuery(payload);
  const getValue = Object.values(contentEvent?.data || {});

  const { data: contentTime } = useUserContentTimeQuery(payload);

  const { data: contentDetails } = useUserContentDetailsQuery(payload);

  const getMediaUri = () => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    const mediaURI = '/thumb/' + contentDetails?.data[0]?.postID;

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
    <div>
      <PageHeader heading={'Detail Content'} />
      <GridContainer>
        <Grid item md={6} xs={12}>
          <DetailsCard
            title={router.query.title === undefined ? '' : router.query.title}
            contentTitle={`${contentDetails?.data[0]?.description}`}
            likes={contentDetails?.data[0]?.likes}
            comments={contentDetails?.data[0]?.comments}
            category={`${contentDetails?.data[0]?.postType}`}
            ownership={`${router.query.postId}`}
            views={contentDetails?.data[0]?.views}
            date={`${formatDate(contentDetails?.data[0]?.createdAt)}`}
            contentType={`Hyppe${contentDetails?.data[0]?.postType}`}
            image={getMediaUri()}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Statistics data={contentDetails?.data[0]} />
        </Grid>
        <Grid item md={6} xs={12}>
          <Comments query={router.query.postId} />
        </Grid>
        <Grid item md={3} xs={12}>
          <Discover
            precentage={98}
            isNumber={true}
            number={1280}
            title={'Jangkauan'}
            subtitle={'Total Jangkauan'}
            isInceased={false}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <Discover
            isNumber={false}
            precentage={'2 jam'}
            number={`${contentTime?.hours}h ${contentTime?.minutes}m ${contentTime?.days}`}
            title={'Total Waktu Tayang'}
            subtitle={'Rata-Rata'}
          />
          {/* <Discover isNumber={false} precentage={'2 jam'} number={'120j 18m 14d'} title={'Total Waktu Tayang'} subtitle={'Rata-Rata'} /> */}
        </Grid>
        {contentEvent ? (
          <>
            <Grid item md={3} xs={12}>
              <BiographyStats title={'Jenis Kelamin Penonton'} dataChart={getValue[0]} />
            </Grid>
            <Grid item md={3} xs={12}>
              <BiographyStats title={'Negara Penonton'} dataChart={getValue[2]} />
            </Grid>
            <Grid item md={3} xs={12}>
              <BiographyStats title={'Rentang Umur Penonton'} dataChart={getValue[1]} />
            </Grid>
            <Grid item md={3} xs={12}>
              <BiographyStats title={fakeDb.viewsBiography.title} dataChart={fakeDb.viewsBiography.data} />
            </Grid>
          </>
        ) : (
          <div style={{ width: '100%', margin: '10% 0' }}>
            <SpinnerLoading />
          </div>
        )}
      </GridContainer>
    </div>
  );
};

export default Details;
