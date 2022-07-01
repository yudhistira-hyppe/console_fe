import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PostDetail from './PostDetail';
import PostList from './PostList';
import Collapse from '@material-ui/core/Collapse';

const AdsListing = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [page, setPage] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [tabValue, setTabValue] = useState('');
  const contentStore = useSelector((state) => state.contentsReducer);

  const handlePageChange = () => {
    setPage(page + 1);
  };

  const onChangeTab = (value) => {
    setSearchText('');
    setPage(0);
    setTabValue(value);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handlePropertyClick = (property) => {
    console.log(property);
    setSelectedProperty(property);
  };

  const showPropertyList = () => setSelectedProperty(null);

  return (
    <React.Fragment>
      <Collapse in={selectedProperty} timeout="auto" unmountOnExit>
        {selectedProperty && <PostDetail selectedContent={selectedProperty} showContentList={showPropertyList} />}
      </Collapse>

      <Collapse in={!selectedProperty} timeout="auto" unmountOnExit>
        <PostList
          onPropertyClick={handlePropertyClick}
          tabValue={tabValue}
          onChangeTab={onChangeTab}
          data={contentStore.contents}
          searchText={searchText}
          handleSearchTextChange={handleSearchTextChange}
          handlePageChange={handlePageChange}
        />
      </Collapse>
    </React.Fragment>
  );
};

export default AdsListing;
