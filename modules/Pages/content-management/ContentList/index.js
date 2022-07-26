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
  },
  btnFilter: {
    fontSize: '10px',
    color: 'rgba(0, 0, 0, 0.38)',
    border: '1px solid rgba(0, 0, 0, 0.12)',
  },
}));

const ContentList = () => {
  // const { contentList } = fakeDb;
  // const [count, setCount] = useState(20); // for example we have 20 records
  // const [size, setSize] = useState(10); // there are 7 records on each page

  // // number of pages
  // const [countPages, setCountPages] = useState(Math.ceil(count / size));

  //show records on page 1:
  // const [page, setPage] = useState(1); // display 1nd setPage

  // const from = (page - 1) * size;
  // const to = Math.min(from + size - 1, count);

  // console.log(`we have ${count} records, ${size} per page`);
  // console.log('number of pages', countPages);
  // console.log(`on page ${page} records from ${from} to ${to}`);

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
  console.log('page:', page);
  console.log('skip:', skip);
  console.log('limit:', limit);

  const getSkipAndLimit = (e, value) => {
    setLimit(value * 10);
    setSkip(value * 10 - 10);
    setPage(value);
  };

  useEffect(() => {
    setCountPages(Math.ceil(contentGroup?.totalFilter / 10));
  });
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
      setLimit(10);
      setSkip(0);
      setPayloads({
        ...payloads,
        postType: typePost,
      });
    }

    if (!typePost) {
      setLimit(10);
      setSkip(0);
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
      setLimit(10);
      setSkip(0);
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
  }, [keyBtn, typePost, filterByDate, skip, limit]);

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
    <div>
      {/* <PageHeader heading={'Content'} /> */}
      <div className="flex flex-row w-full mt-3">
        <div className="flex flex-row col-8 align-items-center">
          <Stack direction="row" spacing={1}>
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
        </div>

        <div className="flex flex-row col-4 align-items-center">
          <FormControl size={'small'} className="mr-2" variant={'outlined'} fullWidth>
            <InputLabel id="demo-simple-select-label">Tipe Konten</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={typePost}
              label="tipe_konten"
              onChange={handleChangeTypePost}>
              {/* waiting for be to get payload all */}
              <MenuItem value={'all'}>All</MenuItem>
              <MenuItem value={'story'}>Story</MenuItem>
              <MenuItem value={'vid'}>Vid</MenuItem>
              <MenuItem value={'diary'}>Diary</MenuItem>
              <MenuItem value={'pict'}>Pict</MenuItem>
            </Select>
          </FormControl>
          <FormControl size={'small'} className="mr-2" variant={'outlined'} fullWidth>
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
        </div>
      </div>
      <CmtCard>
        <CmtCardContent className={classes.cardContentRoot}>
          <div>
            <ContentTable tableData={contentGroup?.data} />
          </div>
        </CmtCardContent>
      </CmtCard>
      <div className="mt-6 flex flex-row justify-content-center">
        <Pagination page={page} onChange={getSkipAndLimit} count={countPages} />
      </div>
    </div>
  );
};

export default ContentList;
