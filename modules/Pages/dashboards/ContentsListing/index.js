import React, { useEffect, useState } from 'react';
//import { propertiesList } from '../../../../@fake-db';
import PropertyDetail from './PropertyDetail';
import PropertiesList from './PropertiesList';
import Collapse from '@material-ui/core/Collapse';

//Redux
import { useAuth } from '../../../../authentication';
import { useDispatch, useSelector } from 'react-redux';
import { getContents } from '../../../../redux/actions/Contents';
import { useDebounce } from '../../../../@jumbo/utils/commonHelper';

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

  //const [page, setPage] = useState(1);
  const [categoryData, setCategoryData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [tabValue, setTabValue] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getContents(authUser, filterOptions, debouncedSearchTerm, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        setContentsFetched(true);
      }),
    );
  }, [dispatch, filterOptions, debouncedSearchTerm]);

  const handlePageChange = () => {
    setRowsPerPage(5)
    setPage(page + 1);
  };

  const onChangeTab = (value) => {
    setSearchText('');
    setPage(0);
    setRowsPerPage(page * 5)
    setTabValue(value);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleContentClick = (content) => setSelectedContent(content);
  const showContentList = () => setSelectedContent(null);

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

  return (
    <React.Fragment>
      <Collapse in={selectedContent} timeout="auto" unmountOnExit>
        {selectedContent && <PropertyDetail selectedContent={selectedContent} authUser={authUser} showContentList={showContentList} />}
      </Collapse>

      <Collapse in={!selectedContent} timeout="auto" unmountOnExit>
        <PropertiesList
          onPropertyClick={handleContentClick}
          tabValue={tabValue}
          onChangeTab={onChangeTab}
          data={contents}
          searchText={searchText}
          handleSearchTextChange={handleSearchTextChange}
          handlePageChange={handlePageChange}
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
