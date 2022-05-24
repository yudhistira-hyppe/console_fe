import React, {useEffect, useState} from 'react';
import CmtCard from '../../../../@coremat/CmtCard';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import {fakeDb} from '../../../FakeDb/fake-db';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {getTodayDate, getYesterdayDate} from '../../../../@jumbo/utils/dateHelper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import {Button, FormControl, Grid, Select, InputLabel, MenuItem, TablePagination} from "@material-ui/core";
import {PageHeader} from "../../../../@jumbo/components/PageComponents";
import TextField from "@material-ui/core/TextField";
import IntlMessages from "../../../../@jumbo/utils/IntlMessages";
import ContentTable from "./ContentTable";
import Pagination from '@material-ui/lab/Pagination';

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
    titleRoot: {
        letterSpacing: 0.15,
    },
    scrollbarRoot: {
        height: 340,
    },
    badgeRoot: {
        color: theme.palette.common.white,
        borderRadius: 30,
        fontSize: 12,
        padding: '2px 10px',
        display: 'inline-block',
    },
    buttonContainer: {
        width: '30%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    boxFiled:{
        height: '36px !important',
        fontFamily: 'Lato',
        fontSize: '14px'
    }
}));

const ContentList = () => {
    const {contentList} = fakeDb;
    const numberPerPage = 5;
    const [nPage, setnPage] = useState(0);
    const [tableData, setTableData] = useState(contentList);
    const [page, setPage] = useState(1);
    const classes = useStyles();

    useEffect(() => {
        var quotient = Math.floor(contentList.length / numberPerPage);
        var remainder = contentList.length % numberPerPage;
        if(remainder > 0) quotient++;
        setnPage(quotient);
        setTableData(contentList.slice((page - 1) * numberPerPage, page * numberPerPage));
    }, [contentList]);

    const handleChange = (event, value) => {
        setTableData(contentList.slice((value - 1) * numberPerPage, value * numberPerPage));
        setPage(value);
    };

    return (
        <div>
            <PageHeader heading={'Content'}/>
            <div className='flex flex-row w-full -mt-5'>
                <div className='flex flex-row col-8 align-items-center'>
                    <TextField size={"small"} className='mr-2'
                        label={'Kontent di post'}
                        placeholder={'Kontent di post'}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField size={"small"} className='mr-2'
                        label={'Konten Ownership'}
                        placeholder={'Konten Ownership'}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField size={"small"} className='mr-2'
                        label={'Konten Monetisasi'}
                        placeholder={'Konten Monetisasi'}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField size={"small"} className='mr-2'
                        label={'Konten di Beli'}
                        placeholder={'Konten di Beli'}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField size={"small"} className='mr-2'
                        label={'Archived'}
                        placeholder={'Archived'}
                        margin="normal"
                        variant="outlined"
                    />
                </div>
                <div className='flex flex-row-reverse col-4 align-items-center'>
                    <FormControl size={"small"} className='mr-2 mt-2' variant={"outlined"} fullWidth>
                        <InputLabel id="fitur-select-label">Semua Fitur</InputLabel>
                        <Select
                            labelId="fitur-select-label"
                            id="fitur-simple-select"
                            label="Semua Fitur"
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl size={"small"} className='mr-2 mt-2' variant={"outlined"} fullWidth>
                        <InputLabel id="content-select-label">Kontent di post</InputLabel>
                        <Select
                            labelId="content-select-label"
                            id="fitur-simple-select"
                            label="Kontent di post"
                        >
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
                        <ContentTable tableData={tableData}/>
                    </div>
                </CmtCardContent>
            </CmtCard>
            <div className='mt-6 flex flex-row justify-content-center'>
                <Pagination page={page} count={nPage} onChange={handleChange}/>
            </div>
        </div>
    );
};

export default ContentList;
