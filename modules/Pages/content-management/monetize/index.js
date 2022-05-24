import React, {useState} from "react";
import {PageHeader} from "../../../../@jumbo/components/PageComponents";
import {FormControl, Grid, InputLabel, MenuItem, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CmtCard from "../../../../@coremat/CmtCard";
import CmtCardContent from "../../../../@coremat/CmtCard/CmtCardContent";
import DetailsCard from "../details/DetailsCard";
import PerfectScrollbar from "react-perfect-scrollbar";
import MonetizeList from "./MonetizeList/MonetizeList";
import {fakeDb} from "../../../FakeDb/fake-db";
import MonetizeTabs from "./MonetizeTabs";

const useStyles = makeStyles((theme) => ({
    scrollbarRoot: {
        height: 320,
        '& .CmtList-EmptyResult': {
            backgroundColor: 'transparent',
            border: '0 none',
        },
    },
}))

const Montetize = ({}) => {
    const {contentList} = fakeDb;
    const classes = useStyles();
    const [tabValue, setTabValue] = useState("monetize_content");
    const onChangeTab = (value) => {
        setTabValue(value);
    };
    return (
        <div>
            <PageHeader heading={'Monetisasi'}
                        children={<div className='flex flex-row-reverse col-4 align-items-center'>
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
                        </div>}/>
            <CmtCard>
                <CmtCardContent>
                    <MonetizeTabs tabValue={tabValue} onChangeTab={onChangeTab}/>
                    <PerfectScrollbar className={classes.scrollbarRoot}>
                        <MonetizeList tableData={contentList}></MonetizeList>
                    </PerfectScrollbar>
                </CmtCardContent>
            </CmtCard>
            <div className='mt-6 col-6 p-0'>
                <DetailsCard title={'Monetisasi Konten Terbaru'}
                             contentTitle={'Hari ini bersama keluarga tersayang liburan ke pa... '} likes={233}
                             comments={233} category={'Entertaint, Hobby'} ownership={'23EY82KD02L'} views={233}
                             date={'Jun 26, 2020'} contentType={'HyppeVid'}/>
            </div>
        </div>
    )
}

export default Montetize;
