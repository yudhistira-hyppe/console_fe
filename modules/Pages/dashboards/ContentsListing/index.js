/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
//import { propertiesList } from '../../../../@fake-db';
import PropertyDetail from './PropertyDetail';
import PropertiesList from './PropertiesList';
import Collapse from '@material-ui/core/Collapse';

//Redux
import { useAuth } from '../../../../authentication';
import { useDispatch, useSelector } from 'react-redux';
// import { getContents } from '../../../../redux/actions/Contents';
import { useDebounce } from '../../../../@jumbo/utils/commonHelper';
import {
  useUserContentsAllQuery,
  useUserContentsLatestQuery,
  useUserContentsPopularQuery,
  useUserContentsMonetizeQuery,
} from 'api/user/content';

// -----
import { Box, Button } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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

const ContentsListing = () => {
  const { authUser } = useAuth();
  const { contents } = useSelector(({ contentsReducer }) => contentsReducer);
  const [contentsFetched, setContentsFetched] = useState(false);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedContent, setSelectedContent] = useState(null);
  console.log('selectedContent:', selectedContent);

  //const [page, setPage] = useState(1);
  const [categoryData, setCategoryData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [tabValue, setTabValue] = useState('');

  const [showContent, setShowContent] = useState([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [limitContentAll, setLimitContentAll] = useState(10);
  const [limitContentLatest, setLimitContentLatest] = useState(10);
  const [limitContentPopular, setLimitContentPopular] = useState(10);
  const [limitContentMonetize, setLimitContentMonetize] = useState(10);
  // const [limit, setLimit] = useState(10);

  const [skip, setSkip] = useState(0);
  // console.log('limit:', limit);

  // change here for payload data

  // mas dedy said let it work properly and refactor it later
  const bodyPayloadContentAll = {
    email: authUser.email,
    limit: limitContentAll,
    skip: skip,
  };

  const bodyPayloadContentPopular = {
    email: authUser.email,
    limit: limitContentPopular,
    skip: skip,
  };

  const bodyPayloadContentLatest = {
    email: authUser.email,
    limit: limitContentLatest,
    skip: skip,
  };

  const bodyPayloadContentMonetize = {
    email: authUser.email,
    limit: limitContentMonetize,
    skip: skip,
  };

  const { data: contentAll } = useUserContentsAllQuery(bodyPayloadContentAll);
  const { data: contentLatest } = useUserContentsLatestQuery(bodyPayloadContentLatest);
  const { data: contentPopular } = useUserContentsPopularQuery(bodyPayloadContentPopular);
  const { data: contentMonetize } = useUserContentsMonetizeQuery(bodyPayloadContentMonetize);

  console.log('showContent:', showContent);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(
  //     getContents(authUser, filterOptions, debouncedSearchTerm, () => {
  //       setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
  //       setContentsFetched(true);
  //     }),
  //   );
  // }, [dispatch, filterOptions, debouncedSearchTerm]);

  useEffect(() => {
    setShowContent(contentAll?.data);
  }, [contentAll]);

  // const handlePageChange = () => {
  //   setRowsPerPage(5);
  //   setPage(page + 1);
  // };

  const contentChange = (nameTab) => {
    switch (nameTab) {
      case 'latest':
        console.log('latest');
        setShowContent(contentLatest?.data);
        break;

      case 'popular':
        console.log('popularr');
        setShowContent(contentPopular?.data);
        break;
      case 'monetize':
        console.log('monetize');
        setShowContent(contentMonetize?.data);
        break;
      default:
        console.log('default');
        setShowContent(contentAll?.data);
        break;
    }
  };

  const onChangeTab = (value) => {
    setTabValue(value);
    contentChange(value);

    setSearchText('');
    setPage(0);
    setRowsPerPage(page * 5);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleContentClick = (content) => setSelectedContent(content);
  const showContentList = () => setSelectedContent(null);

  // dont remove this

  /*useEffect(() => {
    setCategoryData(
      tabValue
        ? propertiesList.filter((item) => item.category === tabValue).slice(0, page * 5)
        : propertiesList.slice(0, page * 5),
    );
  }, [tabValue, page]);

  const handlePageChange = () => {
    setPage(page + 1);
  };

  const onChangeTab = (value) => {
    setSearchText('');
    setPage(1);
    setTabValue(value);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const getFilteredData = () => {
    if (searchText) {
      return categoryData.filter((item) => item.title.toLowerCase().includes(searchText.toLowerCase()));
    } else return categoryData;
  };

  const handlePropertyClick = (property) => setSelectedProperty(property);

  const showPropertyList = () => setSelectedProperty(null);

  const data = getFilteredData();*/

  // code below is for refactoring. next termin we running out of time (deadline almost here),
  // mas dedy said let it work properly and refactor it later

  const LoadMore = () => {
    const classes = useStyles();

    switch (tabValue) {
      case 'latest':
        setShowContent(contentLatest?.data);
        // return ( <LoadMoreComponent clicked={() => setLimitContentAll(limitContentAll + 10)} />)
        return (
          <Box p={6} textAlign="center">
            <Button
              className={classes.btnRoot}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              onClick={() => setLimitContentLatest(limitContentLatest + 10)}>
              Load More
            </Button>
          </Box>
        );
      case 'popular':
        setShowContent(contentPopular?.data);
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        return (
          <Box p={6} textAlign="center">
            <Button
              className={classes.btnRoot}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              onClick={() => setLimitContentPopular(limitContentPopular + 10)}>
              Load More
            </Button>
          </Box>
        );
      case 'monetize':
        return (
          <Box p={6} textAlign="center">
            <Button
              className={classes.btnRoot}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              onClick={() => setLimitContentMonetize(limitContentMonetize + 10)}>
              Load More
            </Button>
          </Box>
        );
      default:
        setShowContent(contentAll?.data);
        return (
          <Box p={6} textAlign="center">
            <Button
              className={classes.btnRoot}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              onClick={() => setLimitContentAll(limitContentAll + 10)}>
              Load More
            </Button>
          </Box>
        );
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      // return <div onClick={() => setLimitContentAll(limitContentAll + 10)}>all</div>;
    }
  };

  // i had try this but got limited looping react

  const LoadMoreComponent = ({ clicked }) => {
    console.log('clicked:', clicked);
    console.log('props:');
    const classes = useStyles();

    return (
      <Box p={6} textAlign="center">
        <Button
          className={classes.btnRoot}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          onClick={clicked}>
          Load More
        </Button>
      </Box>
    );
  };

  return (
    <React.Fragment>
      <Collapse in={selectedContent} timeout="auto" unmountOnExit>
        {selectedContent && (
          <PropertyDetail selectedContent={selectedContent} authUser={authUser} showContentList={showContentList} />
        )}
      </Collapse>

      <Collapse in={!selectedContent} timeout="auto" unmountOnExit>
        <PropertiesList
          onPropertyClick={handleContentClick}
          tabValue={tabValue}
          onChangeTab={onChangeTab}
          data={showContent}
          searchText={searchText}
          handleSearchTextChange={handleSearchTextChange}
          // handlePageChange={handlePageChange}
          handleLoadMore={<LoadMore />}
        />
      </Collapse>
      {/*{selectedProperty ? (
        <PropertyDetail selectedProperty={selectedProperty} showPropertyList={showPropertyList} />
      ) : (
        <PropertiesList
          onPropertyClick={handlePropertyClick}
          tabValue={tabValue}
          onChangeTab={onChangeTab}
          data={data}
          searchText={searchText}
          handleSearchTextChange={handleSearchTextChange}
          handlePageChange={handlePageChange}
        />
      )}*/}
    </React.Fragment>
  );
};

export default ContentsListing;
