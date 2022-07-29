// react
import React, { useEffect, useState } from 'react';

// partials component
import PropertyDetail from './PropertyDetail';
import PropertiesList from './PropertiesList';

// request
import { useAuth } from '../../../../authentication';
import {
  useUserContentsAllQuery,
  useUserContentsLatestQuery,
  useUserContentsPopularQuery,
  useUserContentsMonetizeQuery,
} from 'api/user/content';

// material UI
import { Box, Button } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';

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

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContent, setSelectedContent] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [tabValue, setTabValue] = useState('');
  const [showContent, setShowContent] = useState([]);
  const [limitContentAll, setLimitContentAll] = useState(10);
  const [limitContentLatest, setLimitContentLatest] = useState(10);
  const [limitContentPopular, setLimitContentPopular] = useState(10);
  const [limitContentMonetize, setLimitContentMonetize] = useState(10);
  const [skip, setSkip] = useState(0);

  const bodyPayloadContentAll = {
    email: authUser.user.email,
    limit: limitContentAll,
    skip: skip,
  };

  const bodyPayloadContentPopular = {
    email: authUser.user.email,
    limit: limitContentPopular,
    skip: skip,
  };

  const bodyPayloadContentLatest = {
    email: authUser.user.email,
    limit: limitContentLatest,
    skip: skip,
  };

  const bodyPayloadContentMonetize = {
    email: authUser.user.email,
    limit: limitContentMonetize,
    skip: skip,
  };

  // payload for each content
  const { data: contentAll } = useUserContentsAllQuery(bodyPayloadContentAll);
  const { data: contentLatest } = useUserContentsLatestQuery(bodyPayloadContentLatest);
  const { data: contentPopular } = useUserContentsPopularQuery(bodyPayloadContentPopular);
  const { data: contentMonetize } = useUserContentsMonetizeQuery(bodyPayloadContentMonetize);

  // default shown data
  useEffect(() => {
    setShowContent(contentAll?.data);
  }, [contentAll]);

  // tabs change data inside depends his nameTab
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
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleContentClick = (content) => setSelectedContent(content);
  const showContentList = () => setSelectedContent(null);

  const LoadMore = () => {
    switch (tabValue) {
      case 'latest':
        setShowContent(contentLatest?.data);
        return <LoadMoreComponent clicked={() => setLimitContentLatest(limitContentLatest + 10)} />;
      case 'popular':
        setShowContent(contentPopular?.data);
        return <LoadMoreComponent clicked={() => setLimitContentPopular(limitContentPopular + 10)} />;
      case 'monetize':
        return <LoadMoreComponent clicked={() => setLimitContentMonetize(limitContentMonetize + 10)} />;
      default:
        setShowContent(contentAll?.data);
        return <LoadMoreComponent clicked={() => setLimitContentAll(limitContentAll + 10)} />;
    }
  };

  const LoadMoreComponent = ({ clicked }) => {
    const classes = useStyles();
    return (
      <Box p={6} textAlign="center">
        <Button className={classes.btnRoot} onClick={clicked}>
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
          handleLoadMore={showContent?.length > 0 && <LoadMore />}
        />
      </Collapse>
    </React.Fragment>
  );
};

export default ContentsListing;
