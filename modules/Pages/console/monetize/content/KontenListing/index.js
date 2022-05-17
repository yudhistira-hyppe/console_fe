import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import CmtSearch from '@coremat/CmtSearch';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import KontenLsitingTabs from './tabs';
import KontenListingTable from './lists';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { getListMonetizeContent } from 'redux/actions/monetizeAction';

const useStyles = makeStyles((theme) => ({
  headerRoot: {
    paddingBottom: 0,
    paddingTop: 0,
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      '&.Cmt-header-root': {
        flexDirection: 'column',
      },
      '& .Cmt-action-default-menu': {
        position: 'absolute',
        right: 24,
        top: 5,
      },
    },
  },
  cardContentRoot: {
    padding: '0 !important',
    borderTop: `solid 1px ${theme.palette.borderColor.main}`,
    marginTop: -1,
  },
  scrollbarRoot: {
    height: 590,
    '& .CmtList-EmptyResult': {
      backgroundColor: 'transparent',
      border: '0 none',
    },
  },
  searchAction: {
    position: 'relative',
    width: 38,
    height: 38,
  },
  searchActionBar: {
    position: 'absolute',
    right: 0,
    top: 2,
    zIndex: 1,
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
  titleRoot: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: 16,
    },
  },
  tabsRoot: {
      marginBottom: 20,
      '& .MuiTab-root': {
        textTransform: 'capitalize'
      }
  }
}));

const KontenListing = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const {contentData} = useSelector((state) => state.monetizeReducers)
  const [tabValue, setTabValue] = useState('');
  const [tabValueKonten, setTabValueKonten] = useState('sell');
  const [searchText, setSearchText] = useState('');

  const onChangeTab = (value) => {
    setTabValue(value);
  };

  const onChangeTabKonten = (value) => {
    setTabValueKonten(value);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    console.log("masuk fungsi ini")
    dispatch(getListMonetizeContent({
      page,
      rowsPerPage,
      category: tabValueKonten
    }))
  }, []);

  const tabKonten = [
      {
          "label": "Konten Dijual",
          "slug": "sell"
      },
      {
        "label": "Konten Dibeli",
        "slug": "buy"
    }
  ]

  return (
    <>
        <Tabs
            value={tabValueKonten}
            onChange={(e, newValue) => onChangeTabKonten(newValue)}
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable auto tabs example"
            className={classes.tabsRoot}>
                {tabKonten.map((tab, index) => {
                    return <Tab key={index} label={tab.label} value={tab.slug} />;
                })}
        </Tabs>
    
        <CmtCard>
            <CmtCardHeader
                className={classes.headerRoot}
                title={
                <Box display="flex" alignItems={{ md: 'center' }} flexDirection={{ xs: 'column', md: 'row' }}>
                    <Typography component="div" variant="h4" className={classes.titleRoot}>
                    Dijual
                    </Typography>
                    <KontenLsitingTabs tabValue={tabValue} onChangeTab={onChangeTab} />
                </Box>
                }
                actionsPos="top-corner">
                <Box className={classes.searchAction}>
                <Box className={classes.searchActionBar}>
                    <CmtSearch onlyIcon border={false} value={searchText} onChange={handleSearchTextChange} />
                </Box>
                </Box>
            </CmtCardHeader>
            <CmtCardContent className={classes.cardContentRoot}>
                <KontenListingTable data={contentData} page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
            </CmtCardContent>
        </CmtCard>
    </>
  );
};

export default KontenListing;
