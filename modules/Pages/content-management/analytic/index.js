import React from 'react';
import CmtCard from '../../../../@coremat/CmtCard';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { PageHeader } from '../../../../@jumbo/components/PageComponents';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import { Grid } from '@material-ui/core';
import DetailsCard from '../details/DetailsCard';
import FollowerChart from './FollowerChart';
import BiographyStats from '../details/BiographyStats';
import { fakeDb } from '../../../FakeDb/fake-db';
import { useUserContentsAnalyticQuery, useUserContentsFollowerQuery } from 'api/user/content/management';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import SpinnerLoading from 'components/common/loading/spinner';
import { useUserContentEventQuery } from 'api/user/content';

const useStyles = makeStyles((theme) => ({
  titleLbl: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '16px',
    color: '#000000',
  },
  dataLbl: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '22px',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  increaseLbl: {
    fontFamily: 'Lato',
    fontSize: '16px',
    lineHeight: '24px',
  },
  infoLbl: {
    fontFamily: 'Lato',
    fontSize: '12px',
    lineHeight: '24px',
    letterSpacing: '0.5px',
    color: 'rgba(0, 0, 0, 0.6)',
  },
}));

const DataAnalytics = ({ title, count, increase, isUp }) => {
  const classes = useStyles();
  return (
    <CmtCard className="h-full w-full">
      <CmtCardContent className="h-full w-full">
        <div className={classes.titleLbl}>{title}</div>
        <div className="mt-6 flex flex-row">
          <div className={classes.dataLbl}>{count}</div>
          {/* <div className="flex flex-row" style={!isUp ? { color: 'red' } : { color: '#8DCD03' }}>
            <div className={clsx('ml-1', classes.increaseLbl)}>{increase}%</div>
            <div className={clsx(classes.increaseLbl)}>{isUp ? <KeyboardArrowUp /> : <KeyboardArrowDown />}</div>
          </div> */}
        </div>
        <div className={clsx('mt-2', classes.infoLbl)}>Minggu ini</div>
      </CmtCardContent>
    </CmtCard>
  );
};

const Analytic = ({}) => {
  const { authUser } = useAuth();

  const { data: contentAnalytic } = useUserContentsAnalyticQuery(authUser.email);

  const payloadFollower = {
    email: authUser.email,
    year: new Date().getFullYear(),
  };
  const { data: contentFollowers } = useUserContentsFollowerQuery(payloadFollower);

  const formatDate = (date) => {
    return new Date(date?.split(' ')[0]).toLocaleString('en-us', {
      month: 'short',
      year: 'numeric',
      day: 'numeric',
    });
  };

  const getMediaUri = () => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.email}`;
    const mediaURI = '/thumb/' + contentAnalytic?.data[0]?._id;

    return `${STREAM_URL}${mediaURI}${authToken}`;
  };

  const payload = {
    postID: contentAnalytic?.data[0]?._id,
  };

  const { data: contentEvent } = useUserContentEventQuery(payload);
  const getValue = Object.values(contentEvent?.data || {});

  return (
    <div>
      <PageHeader heading={'Analitik'} />
      <GridContainer>
        <Grid item md={3}>
          <DataAnalytics title={`Content Views`} count={contentAnalytic?.data[0]?.insight?.views} />
        </Grid>
        <Grid item md={3}>
          <DataAnalytics title={'Profile Visit'} count={contentAnalytic?.data[0]?.visit} />
        </Grid>
        <Grid item md={3}>
          <DataAnalytics title={'Likes'} count={contentAnalytic?.data[0]?.insight?.likes} />
        </Grid>
        <Grid item md={3}>
          <DataAnalytics title={'Share'} count={contentAnalytic?.data[0]?.insight?.shares} />
        </Grid>
        <Grid item md={6}>
          <DetailsCard
            contentTitle={contentAnalytic?.data[0]?.description}
            likes={contentAnalytic?.data[0]?.likes}
            comments={contentAnalytic?.data[0]?.comments}
            category={contentAnalytic?.data[0]?.postType}
            ownership={contentAnalytic?.data[0]?._id}
            views={contentAnalytic?.data[0]?.views}
            date={formatDate(contentAnalytic?.data[0].createdAt)}
            contentType={contentAnalytic?.data[0]?.contentType}
            image={getMediaUri()}
          />
        </Grid>
        <Grid item md={6}>
          <FollowerChart contentFollowers={contentFollowers} />
        </Grid>

        {contentEvent ? (
          <>
            <Grid item md={3}>
              <BiographyStats title={'Jenis Kelamin Penonton'} dataChart={getValue[0]} />
            </Grid>
            <Grid item md={3}>
              <BiographyStats title={'Negara Penonton'} dataChart={getValue[2]} />
            </Grid>
            <Grid item md={3}>
              <BiographyStats title={'Rentang Umur Penonton'} dataChart={getValue[1]} />
            </Grid>
            <Grid item md={3}>
              <BiographyStats title={fakeDb.viewsBiography.title} dataChart={fakeDb.viewsBiography.data} />
            </Grid>
          </>
        ) : (
          <div style={{ width: '100%', margin: '10% 0' }}>
            <SpinnerLoading />
          </div>
        )}
        {/* <Grid item md={3}>
          <BiographyStats title={fakeDb.genderBiography.title} dataChart={fakeDb.genderBiography.data} />
        </Grid>
        <Grid item md={3}>
          <BiographyStats title={fakeDb.countryBiography.title} dataChart={fakeDb.countryBiography.data} />
        </Grid>
        <Grid item md={3}>
          <BiographyStats title={fakeDb.ageBiography.title} dataChart={fakeDb.ageBiography.data} />
        </Grid>
        <Grid item md={3}>
          <BiographyStats title={fakeDb.viewsBiography.title} dataChart={fakeDb.viewsBiography.data} />
        </Grid> */}
      </GridContainer>
    </div>
  );
};
export default Analytic;
