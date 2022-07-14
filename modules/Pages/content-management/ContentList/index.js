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
  },
}));

const ContentList = () => {
  const { contentList } = fakeDb;
  const router = useRouter();
  const numberPerPage = 5;
  const [nPage, setnPage] = useState(0);
  const [tableData, setTableData] = useState(contentList);
  const [page, setPage] = useState(1);
  const classes = useStyles();
  // const [query, setQuery] = useState(['post']);
  // const [key, setKey] = useState('');
  // console.log('key:', key);

  // const [payload, setPayload] = useState({
  //   email: 'freeman27@getnada.com',
  //   ownership: false,
  //   monetesisasi: false,
  //   archived: false,
  //   buy: false,
  //   // ini untuk filter
  //   // startdate: '2022-01-11',
  //   // enddate: '2022-01-11',
  //   // postType: 'diary',
  //   skip: 0,
  //   limit: 10,
  // });

  const [btnLooping, setBtnLooping] = useState([
    {
      name: 'tes1',
      id: '1',
    },
    {
      name: 'tes2',
      id: '2',
    },
    {
      name: 'tes3',
      id: '3',
    },
    {
      name: 'tes4',
      id: '4',
    },
    {
      name: 'tes5',
      id: '5',
    },
  ]);

  const [state, setState] = useState(['tes1']);
  console.log('state:', state);

  // const aish = ['tes2', 'tes3', 'tes4', 'tes5'];

  const clickedButton = (name) => {
    if (name === 'tes1') return setState(['tes1']);

    if (name !== 'tes1') {
      if (state.includes('tes1')) {
        setState((prev) => {
          const removeTes1 = prev.filter((e) => e !== 'tes1');
          console.log('removeTes1:', removeTes1);
          return [...removeTes1];
        });
      }
      setState((prev) => [...prev, name]);
    }

    if (state.includes(name)) {
      setState((prev) => {
        const findAndRemoveMatchValue = prev.filter((e) => e !== name);
        return [...findAndRemoveMatchValue];
      });
    }
  };

  useEffect(() => {
    var quotient = Math.floor(contentList.length / numberPerPage);
    var remainder = contentList.length % numberPerPage;
    if (remainder > 0) quotient++;
    setnPage(quotient);
    setTableData(contentList.slice((page - 1) * numberPerPage, page * numberPerPage));
  }, [contentList]);

  const handleChange = (event, value) => {
    setTableData(contentList.slice((value - 1) * numberPerPage, value * numberPerPage));
    setPage(value);
  };

  return (
    <div>
      {/* <PageHeader heading={'Content'} /> */}
      <div className="flex flex-row w-full mt-3">
        <div className="flex flex-row col-8 align-items-center">
          <Stack direction="row" spacing={1}>
            {btnLooping?.map((btn) => {
              return (
                <Button
                  name={`${btn.name}`}
                  variant="outlined"
                  size="small"
                  className={classes.btnFilter}
                  style={
                    state.includes(btn.name)
                      ? { backgroundColor: ' rgba(171, 34, 175, 0.12)', color: 'rgba(171, 34, 175, 1)' }
                      : null
                  }
                  onClick={() => clickedButton(btn.name)}>
                  {btn.name}
                </Button>
              );
            })}
          </Stack>
        </div>

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
            <InputLabel id="content-select-label"> Waktu Post</InputLabel>
            <Select labelId="content-select-label" id="fitur-simple-select" label="di post">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <CmtCard>
        <CmtCardContent className={classes.cardContentRoot}>
          <div>
            <ContentTable tableData={tableData} />
          </div>
        </CmtCardContent>
      </CmtCard>
      <div className="mt-6 flex flex-row justify-content-center">
        <Pagination page={page} count={nPage} onChange={handleChange} />
      </div>
    </div>
  );
};

export default ContentList;
