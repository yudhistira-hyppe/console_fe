import React from 'react';

import { Tabs, Tab } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    tabsRoot: {
        position: 'relative',
        minHeight: 66,
        flex: 1,
        paddingRight: 10,
        [theme.breakpoints.up('md')]: {
            paddingLeft: 10,
        },
        '& .MuiTabs-flexContainer': {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                justifyContent: 'center',
            },
        },
        '& .MuiTab-root': {
            maxWidth: 'none',
            minWidth: 10,
            fontSize: 12,
            minHeight: 66,
            letterSpacing: 1.5,
            [theme.breakpoints.down('xs')]: {
                paddingLeft: 6,
                paddingRight: 6,
                fontSize: 10,
            },
        },
    },
}));

const MonetizeTabs = ({ tabValue, onChangeTab }) => {
    const classes = useStyles();

    return (
        <Tabs
            value={tabValue}
            onChange={(e, newValue) => onChangeTab(newValue)}
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable auto tabs example"
            className={classes.tabsRoot}>
            <Tab key={0} label="MONETISASI KONTEN" value="monetize_content" />
            <Tab key={1} label="PEMBELIAN KONTEN" value="buy_content" />
        </Tabs>
    );
};

export default MonetizeTabs;
