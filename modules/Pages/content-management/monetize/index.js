import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../../../@jumbo/components/PageComponents';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CmtCard from '../../../../@coremat/CmtCard';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import DetailsCard from '../details/DetailsCard';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MonetizeList from './MonetizeList/MonetizeList';
import { fakeDb } from '../../../FakeDb/fake-db';
import MonetizeTabs from './MonetizeTabs';
import { useUserContentMonetizeQuery } from 'api/user/content/management';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';

const useStyles = makeStyles((theme) => ({
  scrollbarRoot: {
    height: 320,
    '& .CmtList-EmptyResult': {
      backgroundColor: 'transparent',
      border: '0 none',
    },
  },
}));

const Montetize = ({}) => {
  const { contentList } = fakeDb;
  const { authUser } = useAuth();
  const classes = useStyles();
  const [tabValue, setTabValue] = useState('monetize_content');
  console.log('tabValue:', tabValue);

  const [payload, setPayload] = useState();

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const payloadLastContent = {
    email: authUser.email,
    buy: false,
    monetize: false,
    lastmonetize: true,
    // postType: 'diary',
    skip: 0,
    limit: 10,
  };
  const { data: lastContentMonetize } = useUserContentMonetizeQuery(payloadLastContent);

  const { data: contentMonetize } = useUserContentMonetizeQuery(payload);
  console.log('contentMonetize:', contentMonetize);

  useEffect(() => {
    switch (tabValue) {
      case 'monetize_content':
        return setPayload({
          email: authUser.email,
          buy: false,
          monetize: true,
          lastmonetize: false,
          // postType: 'diary',
          skip: 0,
          limit: 10,
        });
      case 'buy_content':
        return setPayload({
          email: authUser.email,
          buy: true,
          monetize: false,
          lastmonetize: false,
          // postType: 'diary',
          skip: 0,
          limit: 10,
        });
      default:
        console.log(`masuk default`);
    }
  }, [tabValue]);

  const formatDate = () => {
    return new Date(lastContentMonetize?.data[0]?.createdAt.split(' ')[0]).toLocaleString('en-us', {
      month: 'short',
      year: 'numeric',
      day: 'numeric',
    });
  };

  const getMediaUri = () => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.email}`;
    const mediaURI = '/thumb/' + lastContentMonetize?.data[0]?.postID;

    return `${STREAM_URL}${mediaURI}${authToken}`;
  };

  return (
    <div>
      <PageHeader
        heading={'Monetisasi'}
        children={
          <div className="flex flex-row-reverse col-4 align-items-center">
            <FormControl size={'small'} className="mr-2 mt-2" variant={'outlined'} fullWidth>
              <InputLabel id="fitur-select-label">Semua Fitur</InputLabel>
              <Select labelId="fitur-select-label" id="fitur-simple-select" label="Semua Fitur">
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl size={'small'} className="mr-2 mt-2" variant={'outlined'} fullWidth>
              <InputLabel id="content-select-label">Kontent di post</InputLabel>
              <Select labelId="content-select-label" id="fitur-simple-select" label="Kontent di post">
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
        }
      />
      <CmtCard>
        <CmtCardContent>
          <MonetizeTabs tabValue={tabValue} onChangeTab={onChangeTab} />
          <PerfectScrollbar className={classes.scrollbarRoot}>
            <MonetizeList tableData={contentMonetize?.data}></MonetizeList>
          </PerfectScrollbar>
        </CmtCardContent>
      </CmtCard>
      <div className="mt-6 col-6 p-0">
        <DetailsCard
          title={lastContentMonetize?.data[0]?.title}
          contentTitle={lastContentMonetize?.data[0]?.description}
          likes={lastContentMonetize?.data[0]?.likes}
          comments={lastContentMonetize?.data[0]?.comments}
          category={lastContentMonetize?.data[0]?.postType}
          ownership={lastContentMonetize?.data[0]?._id}
          views={lastContentMonetize?.data[0]?.views}
          date={formatDate()}
          contentType={lastContentMonetize?.data[0]?.postType}
          image={getMediaUri()}
        />
      </div>
    </div>
  );
};

export default Montetize;
