import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostDetail from './PostDetail';
import PostList from './PostList';
import Collapse from '@material-ui/core/Collapse';
import { getListPosts } from 'redux/actions/postActions';

const AdsListing = () => {
  const dispatch = useDispatch();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categoryData, setCategoryData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [tabValue, setTabValue] = useState('');
  const [isLoadMore, setLoadMore] = useState(false);
  const contentStore = useSelector((state) => state.contentsReducer);

  useEffect(() => {
    loadPostData();
  }, [tabValue, page, isLoadMore]);

  const handlePageChange = () => {
    setPage(page + 1);
    setLoadMore(true);
    loadPostData();
  };

  const onChangeTab = (value) => {
    setSearchText('');
    setPage(0);
    setLoadMore(false);
    setTabValue(value);
    loadPostData();
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const loadPostData = () => {
    dispatch(getListPosts({page,rowsPerPage,isLoadMore,search: '', postType: 'advertise'}));
  }

  const getFilteredData = () => {
    if (searchText) {
      return categoryData.filter((item) => item.title.toLowerCase().includes(searchText.toLowerCase()));
    } else return categoryData;
  };

  const handlePropertyClick = (property) => {
    console.log(property);
    setSelectedProperty(property)
  };

  const showPropertyList = () => setSelectedProperty(null);

  //const data = getFilteredData();

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
