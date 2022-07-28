import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../../../@jumbo/components/PageComponents';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
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
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { auth } from 'helpers/firebaseHelper';
import { Pagination, Stack } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  scrollbarRoot: {
    height: 320,
    '& .CmtList-EmptyResult': {
      backgroundColor: 'transparent',
      border: '0 none',
    },
  },
  btnRoot: {
    backgroundColor: theme.palette.lightBtn.bgColor,
    color: theme.palette.lightBtn.textColor,
    fontWeight: theme.typography.fontWeightBold,
    letterSpacing: 1.25,
    padding: '3px 10px',
    '&:hover, &:focus': {
      backgroundColor: alpha(theme.palette.lightBtn.bgColor, 0.8),
      color: theme.palette.lightBtn.textColor,
    },
  },
}));

const Montetize = ({}) => {
  const { contentList } = fakeDb;
  const { authUser } = useAuth();
  const classes = useStyles();
  const [tabValue, setTabValue] = useState('monetize_content');
  const [page, setPage] = useState(1);
  const [typePost, setTypePost] = useState('all');
  const [limit, setLimit] = useState(1);
  const [skip, setSkip] = useState(0);
  const [payloadContent, setPayloadContent] = useState({
    email: authUser?.email,
    buy: false,
    monetize: true,
    lastmonetize: false,
    startdate: filterByDate,
    enddate: filterByDate,
    skip: skip,
    limit: limit,
  });
  console.log('limit:', limit);
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
            skip: skip,
            limit: limit,
          });
        }
        if (typePost === 'all') {
          setPayloadContent({
            email: authUser?.user?.email,
            buy: false,
            monetize: true,
            lastmonetize: false,
            startdate: filterByDate,
            enddate: filterByDate,
            skip: skip,
            limit: limit,
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
            skip: skip,
            limit: limit,
          });
        }

        if (typePost === 'all') {
          console.log('masuk type post ===');
          setPayloadContent({
            email: authUser?.user?.email,
            buy: true,
            monetize: false,
            lastmonetize: false,
            startdate: filterByDate,
            enddate: filterByDate,
            skip: skip,
            limit: limit,
          });
          return payloadContent;
        }
      default:
        console.log('masuk default');
    }
  }, [tabValue, typePost, filterByDate, skip, page]);

  const convertDate = (str) => {
    let date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    const res = [date.getFullYear(), mnth, day].join('-');
    setFilterByDate(res);
  };

  const handleChangeTypePost = (event) => {
    setTypePost(event.target.value);
  };

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const { data: contentMonetize } = useUserContentMonetizeQuery(payloadContent);

  // this is fix request, doesnt need to do anything here
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

  const handlePagination = (e, value) => {
    setSkip(value);
    setPage(value);
  };

  return (
    <>
      <PageHeader heading={'Monetisasi'} />
      <Grid container direction="row" justifyContent="flex-end" alignItems="flex-start">
        <Stack direction="row" justifyContent="flex-end" alignItems="flex-start" spacing={2}>
          <FormControl size={'small'} fullWidth>
            <InputLabel id="demo-simple-select-label">Tipe Konten</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={typePost}
              label="tipe_konten"
              onChange={handleChangeTypePost}>
              <MenuItem value={'all'}>All</MenuItem>
              <MenuItem value={'story'}>Story</MenuItem>
              <MenuItem value={'vid'}>Vid</MenuItem>
              <MenuItem value={'diary'}>Diary</MenuItem>
              <MenuItem value={'pict'}>Pict</MenuItem>
            </Select>
          </FormControl>
          <FormControl size={'small'} fullWidth>
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
          </FormControl>
        </Stack>
      </Grid>
      {/* // -------- */}

      <div style={{ margin: '0.7rem 0 ' }}>
        <CmtCard>
          <CmtCardContent>
            <MonetizeTabs tabValue={tabValue} onChangeTab={onChangeTab} />
            <PerfectScrollbar className={classes.scrollbarRoot}>
              <MonetizeList tableData={contentMonetize?.data}></MonetizeList>
            </PerfectScrollbar>
          </CmtCardContent>
        </CmtCard>
        <div className="mt-6 flex flex-row justify-content-center">
          <Pagination page={page} onChange={handlePagination} count={3} />
        </div>
      </div>

      <Grid xs={12} sm={6} md={6} lg={6} style={{ marginTop: '5%' }}>
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
      </Grid>
    </>
  );
};

export default Montetize;
