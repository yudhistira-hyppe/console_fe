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
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { auth } from 'helpers/firebaseHelper';

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
  const [typePost, setTypePost] = useState('');
  const [payloadContent, setPayloadContent] = useState(null);
  const [filterByDate, setFilterByDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    switch (tabValue) {
      case 'monetize_content':
        // why the code like this? be didnt handle empty value
        if (typePost) {
          setPayloadContent({
            email: authUser?.user?.email,
            buy: false,
            monetize: true,
            lastmonetize: false,
            startdate: filterByDate,
            enddate: filterByDate,
            postType: typePost,
            skip: 0,
            limit: 10,
          });
        }
        if (!typePost) {
          setPayloadContent({
            email: authUser?.user?.email,
            buy: false,
            monetize: true,
            lastmonetize: false,
            startdate: filterByDate,
            enddate: filterByDate,
            skip: 0,
            limit: 10,
          });
        }
        return payloadContent;
      case 'buy_content':
        // why the code like this? code didnt handle empty value
        if (typePost) {
          console.log('masuk type post');
          setPayloadContent({
            email: authUser?.user?.email,
            buy: true,
            monetize: false,
            lastmonetize: false,
            startdate: filterByDate,
            enddate: filterByDate,
            postType: typePost,
            skip: 0,
            limit: 10,
          });
        }

        if (typePost === '') {
          console.log('masuk type post ===');
          setPayloadContent({
            email: authUser?.user?.email,
            buy: true,
            monetize: false,
            lastmonetize: false,
            startdate: filterByDate,
            enddate: filterByDate,
            skip: 0,
            limit: 10,
          });
          return payloadContent;
        }
      default:
        console.log('masuk default');
    }
  }, [tabValue, typePost, filterByDate]);

  const convertDate = (str) => {
    let date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    const res = [date.getFullYear(), mnth, day].join('-');
    setFilterByDate(res);
  };

  const handleChange = (event) => {
    setTypePost(event.target.value);
  };

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const { data: contentMonetize } = useUserContentMonetizeQuery(payloadContent);

  const payloadLastContent = {
    email: authUser.user.email,
    buy: false,
    monetize: false,
    lastmonetize: true,
    skip: 0,
    limit: 10,
  };
  const { data: lastContentMonetize } = useUserContentMonetizeQuery(payloadLastContent);

  const formatDate = () => {
    return new Date(lastContentMonetize?.data[0]?.createdAt.split(' ')[0]).toLocaleString('en-us', {
      month: 'short',
      year: 'numeric',
      day: 'numeric',
    });
  };

  const getMediaUri = () => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    const mediaURI = '/thumb/' + lastContentMonetize?.data[0]?.postID;

    return `${STREAM_URL}${mediaURI}${authToken}`;
  };

  return (
    <div>
      <PageHeader
        heading={'Monetisasi'}
        children={
          <div className="flex flex-row col-5 align-items-center" style={{ marginTop: '2%' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Tipe Konten</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={typePost}
                label="tipe_konten"
                onChange={handleChange}>
                <MenuItem value={'story'}>Story</MenuItem>
                <MenuItem value={'vid'}>Vid</MenuItem>
                <MenuItem value={'diary'}>Diary</MenuItem>
                <MenuItem value={'pict'}>Pict</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                autoCompleted="off"
                size="small"
                label="Semua Waktu"
                value={filterByDate}
                onChange={(filterByDate) => {
                  convertDate(filterByDate);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
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
