import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {Grid} from "@material-ui/core";
import {Bar, BarChart, ResponsiveContainer, Tooltip, XAxis} from "recharts";
import CmtAdvCard from "../../../../../../@coremat/CmtAdvCard";
import CmtCardHeader from "../../../../../../@coremat/CmtCard/CmtCardHeader";
import CmtAdvCardContent from "../../../../../../@coremat/CmtAdvCard/CmtAdvCardContent";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    cardContentRoot: {
        '& .MuiGrid-container': {
            alignItems: 'center',
        },
    },
    cardContentTitle: {
        marginBottom: 4,
    },
    subTitleRoot: {
        fontSize: 12,
        marginBottom: 0,
        color: theme.palette.text.secondary,
    },
    tooltip: {
        position: 'relative',
        borderRadius: 6,
        padding: '4px 8px',
        backgroundColor: '#8d46ef',
        color: theme.palette.common.white,
    },
    badgeRoot: {
        padding: '5px 12px',
        borderRadius: 16,
        fontSize: 14,
        letterSpacing: 0.15,
        lineHeight: 1,
        backgroundColor: 'rgba(252, 202, 70, 0.2)',
        color: '#FFBC20'
    },
}));

const StackGraphChart = ({ stackGraphData }) => {
    const {xAxisKey, yKey1, yKey2, ykey1Label, ykey2Label, data} = stackGraphData;
    const classes = useStyles();

    return (
        <ResponsiveContainer width="100%" height={56}>
            <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Tooltip
                    labelStyle={{ color: 'black' }}
                    cursor={false}
                    content={(data) => {
                        return data.payload[0] ? (
                            <div className={classes.tooltip}>
                                <div>{ykey1Label} : {data.payload[0].payload[yKey1]}</div>
                                <div>{ykey2Label} : {data.payload[0].payload[yKey2]}</div>
                            </div>
                        ) : null;
                    }}
                />
                <XAxis dataKey={xAxisKey} hide />
                <Bar dataKey={yKey1} stackId="a" fill="#6200EE" barSize={6} />
                <Bar dataKey={yKey2} stackId="a" fill="#00B3A6" barSize={6} />
            </BarChart>
        </ResponsiveContainer>
    );
};

const StackBar = ({stackBarData}) => {
    const {title, barChartData, dataLabel1, dataLabel2, value1, value2} = stackBarData;
    const classes = useStyles();
    return (
        <CmtAdvCard>
            <CmtCardHeader
                titleProps={{
                    variant: 'h4',
                    component: 'div',
                }}
                title={title}
            >
                <div className={classes.badgeRoot} component="span" bgcolor="#FFDE99">
                    This Week
                </div>
            </CmtCardHeader>
            <CmtAdvCardContent
                className={classes.cardContentRoot}
                titleProps={{
                    variant: 'h1',
                    component: 'div',
                    className: classes.cardContentTitle,
                }}
                reverseDir>
                <Grid container direction={"row"} justifyContent={"space-between"}>
                    <Grid item md={6} lg={6}>
                        <div>
                            <div>{dataLabel1} <span style={{fontWeight: 'bold'}}>{value1}</span></div>
                            <div>{dataLabel2} <span style={{fontWeight: 'bold'}}>{value2}</span></div>
                        </div>
                    </Grid>
                    <Grid item md={6} lg={6}>
                        <StackGraphChart stackGraphData={barChartData}/>
                    </Grid>
                </Grid>
            </CmtAdvCardContent>
        </CmtAdvCard>
    );
};

export default StackBar;
