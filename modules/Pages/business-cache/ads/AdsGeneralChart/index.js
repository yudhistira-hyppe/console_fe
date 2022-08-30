import React, {useState} from "react";
import CmtCardHeader from "../../../../@coremat/CmtCard/CmtCardHeader";
import {Box, Grid} from "@material-ui/core";
import clsx from "clsx";
import CmtCard from "../../../../@coremat/CmtCard";
import makeStyles from "@material-ui/core/styles/makeStyles";
import GridContainer from "../../../../@jumbo/components/GridContainer";
import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import {getTodayDate, getYesterdayDate} from "../../../../@jumbo/utils/dateHelper";
import CmtCardContent from "../../../../@coremat/CmtCard/CmtCardContent";

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
    dot: {
        height: 8,
        width: 8,
        borderRadius: '50%',
        backgroundColor: '#AB22AF',
    },
    dotPrimary: {
        backgroundColor: '#6C166F',
    },
    textCapitalize: {
        textTransform: 'capitalize',
    },
    titleRoot: {
        letterSpacing: 0.15,
    },
    badgeRoot: {
        color: theme.palette.common.white,
        borderRadius: 30,
        fontSize: 12,
        padding: '2px 10px',
        display: 'inline-block',
    },
}));

const AdsGeneralChart = ({enableCampaigns, pauseCampaign, chartData}) => {
    const classes = useStyles();
    const [menu, setMenu] = useState('Today');
    const filterTableData = (event) => {
    };
    return (
        <CmtCard>
            <CmtCardHeader
                title="Trends"
                titleProps={{
                    variant: 'h2',
                    component: 'div',
                    className: classes.titleRoot,
                }}
                actionsPos="top-corner"
                actions={actions}
                actionHandler={filterTableData}>
                <Box className={classes.badgeRoot} component="span" bgcolor="#FFDE99">
                    {menu}
                </Box>
            </CmtCardHeader>
            <CmtCardContent>
                <GridContainer>
                    <Grid item lg={6} md={6}>
                        <div>{enableCampaigns} Enabled Campaigns & {pauseCampaign} paused Campaigns</div>
                    </Grid>
                    <Grid item lg={6} md={6} mt={2}>
                        <Grid container justifyContent={"flex-end"}>
                            <Box display="flex" alignItems="center">
                                <Box component="span" display="flex" alignItems="center" mr={4}>
                                    <Box component="span" className={clsx(classes.dot, classes.dotPrimary)} mr={1}/>
                                    <Box component="span" fontSize={12} className={classes.textCapitalize}>
                                        CPV
                                    </Box>
                                </Box>
                                <Box component="span" display="flex" alignItems="center">
                                    <Box component="span" className={classes.dot} mr={1}/>
                                    <Box component="span" fontSize={12} className={classes.textCapitalize}>
                                        CTV
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </GridContainer>
            </CmtCardContent>
            <ResponsiveContainer width={'100%'} height={500}>
                <LineChart data={chartData} margin={{top: 5, right: 30, left: 5, bottom: 5}}>
                    <XAxis dataKey='year'/>
                    <YAxis/>
                    <Tooltip/>
                    <Line type='monotone' dataKey="cpv" strokeWidth={2} stroke="#AB22AF"/>
                    <Line type='monotone' dataKey="cta" strokeWidth={2} stroke="#6C166F"/>
                </LineChart>
            </ResponsiveContainer>
        </CmtCard>
    )
}
export default AdsGeneralChart;
