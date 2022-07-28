import React, { useEffect, useState, useRef } from 'react';
import CmtCard from '../../../../@coremat/CmtCard';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import { fakeDb } from '../../../FakeDb/fake-db';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { getTodayDate, getYesterdayDate } from '../../../../@jumbo/utils/dateHelper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import { Button, FormControl, Grid, Select, InputLabel, MenuItem, TablePagination } from '@material-ui/core';
import { PageHeader } from '../../../../@jumbo/components/PageComponents';
import TextField from '@material-ui/core/TextField';
import IntlMessages from '../../../../@jumbo/utils/IntlMessages';
import ContentTable from './ContentTable';
import Pagination from '@material-ui/lab/Pagination';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useUserContentsGroupQuery } from 'api/user/content/management';
import { useAuth } from 'authentication';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TableDataSpinner from 'components/common/loading/tableDataSpinner';

const actions = [
  {
    label: 'Today',
    value: getTodayDate(),
  },
  {
    label: 'Yesterday',
    value: getYesterdayDate(),
  },
  {
    label: 'This Week',
    value: 'this_week',
  },
];

const useStyles = makeStyles((theme) => ({
  cardContentRoot: {
    padding: '0 !important',
    minHeight: '50vh',
  },
  btnFilter: {
    fontSize: '10px',
    color: 'rgba(0, 0, 0, 0.38)',
    border: '1px solid rgba(0, 0, 0, 0.12)',
  },
}));

const ContentList = () => {
  const classes = useStyles();
  const { authUser } = useAuth();
  const router = useRouter();
  const [typePost, setTypePost] = useState('');
  const [keyBtn, setKeyBtn] = useState(['dipost']);
  // this keyBtn set today date
  const [filterByDate, setFilterByDate] = useState(new Date().toISOString().slice(0, 10));

  // ------------------------------------
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [countPages, setCountPages] = useState(Number);
  const [isLoadingPagination, setIsLoadingPagination] = useState(false);
  // const [mainData, setMainData] = useState();
  // console.log('mainData:', mainData);
  console.log('page:', page);
  console.log('skip:', skip);
  console.log('limit:', limit);

  const handlePagination = (e, value) => {
    setSkip(value * 10 - 10);
    setPage(value);
  };

  useEffect(() => {
    setCountPages(Math.ceil(contentGroup?.totalFilter / 10));
  });

  useEffect(() => {
    setLimit(10);
    setSkip(0);
  }, [typePost, filterByDate, keyBtn]);
  // ------------------------------------

  const [payloads, setPayloads] = useState({
    email: authUser.user.email,
    ownership: keyBtn.includes('ownership') ? true : false,
    monetesisasi: keyBtn.includes('dibeli') ? true : false,
    archived: keyBtn.includes('arsip') ? true : false,
    buy: keyBtn.includes('dijual') ? true : false,
    startdate: filterByDate,
    enddate: filterByDate,
    // postType: typePost,
    skip: skip,
    limit: limit,
  });

  const btnData = [
    {
      name: 'dipost',
      title: 'Konten Dipost',
    },
    {
      name: 'ownership',
      title: 'Konten Ownership',
    },
    {
      name: 'dijual',
      title: 'Konten Dijual',
    },
    {
      name: 'dibeli',
      title: 'Konten Dibeli',
    },
    {
      name: 'arsip',
      title: 'Story',
    },
  ];

  const clickedButton = (name) => {
    if (name === 'dipost') {
      setKeyBtn(['dipost']);
    }

    if (name !== 'dipost') {
      if (keyBtn.includes('dipost')) {
        setKeyBtn((prev) => {
          const removedipost = prev.filter((e) => e !== 'dipost');
          return [...removedipost];
        });
      }
      setKeyBtn((prev) => [...prev, name]);
    }

    if (keyBtn.includes(name)) {
      setKeyBtn((prev) => {
        const findAndRemoveMatchValue = prev.filter((e) => e !== name);
        return [...findAndRemoveMatchValue];
      });
    }
  };

  useEffect(() => {
    if (typePost) {
      setPayloads({
        ...payloads,
        postType: typePost,
      });
    }

    if (!typePost) {
      setPayloads({
        email: authUser.user.email,
        ownership: keyBtn.includes('ownership') ? true : false,
        monetesisasi: keyBtn.includes('dibeli') ? true : false,
        archived: keyBtn.includes('arsip') ? true : false,
        buy: keyBtn.includes('dijual') ? true : false,
        startdate: filterByDate,
        enddate: filterByDate,
        skip: skip,
        limit: limit,
      });
    }

    if (typePost === 'all') {
      setPayloads({
        email: authUser.user.email,
        ownership: keyBtn.includes('ownership') ? true : false,
        monetesisasi: keyBtn.includes('dibeli') ? true : false,
        archived: keyBtn.includes('arsip') ? true : false,
        buy: keyBtn.includes('dijual') ? true : false,
        startdate: filterByDate,
        enddate: filterByDate,
        // postType: typePost,
        skip: skip,
        limit: limit,
      });
    }

    if (keyBtn.length === 0 || keyBtn.length === 4) {
      setKeyBtn(['dipost']);
    }

    // this act like loading but still static
    const loadingPagination = setTimeout(() => {
      setIsLoadingPagination(true);
    }, '1000');
    if (loadingPagination) {
      setIsLoadingPagination(false);
    }
  }, [keyBtn, typePost, filterByDate, skip, limit, page]);

  const { data: contentGroup } = useUserContentsGroupQuery(payloads);

  const handleChangeTypePost = (event) => {
    setTypePost(event.target.value);
  };

  const convertDate = (str) => {
    let date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    const res = [date.getFullYear(), mnth, day].join('-');
    setFilterByDate(res);
  };

  return (
    <>
      <PageHeader heading={'Content'} />
      <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
        <Grid xs={6} md={8}>
          <Stack direction={{ xs: 'column', sm: 'row', md: 'row', lg: 'row' }} spacing={1}>
            {btnData?.map((btn) => {
              return (
                <Button
                  name={`${btn.name}`}
                  variant="outlined"
                  size="small"
                  className={classes.btnFilter}
                  style={
                    keyBtn.includes(btn.name)
                      ? { backgroundColor: ' rgba(171, 34, 175, 0.12)', color: 'rgba(171, 34, 175, 1)' }
                      : null
                  }
                  onClick={() => clickedButton(btn.name)}>
                  {btn.title}
                </Button>
              );
            })}
          </Stack>
        </Grid>
        {/* </div> */}

        <Grid xs={5} md={4}>
          <Stack direction={{ xs: 'column', sm: 'row', md: 'row', lg: 'row' }} spacing={2}>
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
      </Grid>

      {/* ------------  */}
      <div style={{ marginTop: '0.7rem' }}>
        <CmtCard>
          <CmtCardContent className={classes.cardContentRoot}>
            {/* // this act like loading but still static */}
            <div>
              {isLoadingPagination ? (
                <ContentTable tableData={contentGroup?.data} />
              ) : (
                <>
                  <TableDataSpinner />
                </>
              )}
            </div>
          </CmtCardContent>
        </CmtCard>
        <div className="mt-6 flex flex-row justify-content-center">
          <Pagination page={page} onChange={handlePagination} count={countPages} />
        </div>
      </div>
    </>
  );
};

export default ContentList;
