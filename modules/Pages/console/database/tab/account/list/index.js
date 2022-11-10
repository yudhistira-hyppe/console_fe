import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Chip, Stack } from '@mui/material';
import DatabaseTabAccountListTableComponent from './table';
import { useGetAllUserQuery } from 'api/user/user';

const DatabaseTabAccountListComponent = (props) => {
  const { configFilters, filters, onDeleteFilters } = props;
  const [isFiltersChange, setIsFiltersChanges] = useState(true);
  const [filtersWithLabel, setFiltersWithLabel] = useState([]);
  const [payload, setPayload] = useState({ skip: 0, limit: 10 });
  const { data: userResults, isFetching } = useGetAllUserQuery({ ...payload });

  useEffect(() => {
    generateFiltersWithLabel(filters);
    // Wait 2s to generate payload
    let timer = setTimeout(() => generatePayload(filters), 2000);
    return () => clearTimeout(timer);
  }, [filters]);

  const generateFiltersWithLabel = (filters) => {
    let newFiltersWithLabel = [];
    Object.keys(filters).forEach((key) => {
      if (typeof filters[key] === 'object') {
        filters[key].map((value) => {
          const filter = configFilters[key].items.find((item) => item.value === value);
          newFiltersWithLabel = [...newFiltersWithLabel, { name: key, value: filter.value, label: filter.label }];
        });
      } else {
        if (filters[key] && key !== 'lastActive') {
          newFiltersWithLabel = [...newFiltersWithLabel, { name: key, value: filters[key], label: filters[key] }];
        }
        if (filters[key] && key === 'lastActive') {
          const filter = configFilters[key].items.find((item) => item.value === filters[key]);
          newFiltersWithLabel = [...newFiltersWithLabel, { name: key, value: filter.value, label: filter.label }];
        }
      }
    });
    setFiltersWithLabel(newFiltersWithLabel);
  };

  const generatePayload = (filters) => {
    let result = {};
    Object.keys(filters).forEach((key) => {
      let formatted = {};
      const value = filters[key];
      // Filter key
      if (value !== '' && Object.keys(value).length) {
        formatted[key] = value;
      }
      // Format last active
      if (key === 'lastActive') {
        const formattedLastActive = formatLastActiveFilter(value);
        formatted = formattedLastActive;
      }
      result = { ...result, ...formatted };
    });
    setPayload({ ...result, skip: 0, limit: 10 });
    setIsFiltersChanges(true);
  };

  const formatLastActiveFilter = (lastActive) => {
    const startDate = new Date();
    let result = {};
    switch (lastActive) {
      case 'ONE_HOUR_AGO': {
        const oneHourAgo = new Date(startDate).setHours(startDate.getHours() - 1);
        result = { startdate: startDate.toISOString(), enddate: new Date(oneHourAgo).toISOString() };
        break;
      }
      case 'ONE_DAY_AGO': {
        const oneDayAgo = new Date(startDate).setDate(startDate.getDate() - 1);
        result = { startdate: startDate.toISOString(), enddate: new Date(oneDayAgo).toISOString() };
        break;
      }
      case 'ONE_WEEK_AGO': {
        const oneWeekAgo = new Date(startDate).setDate(startDate.getDate() - 7);
        result = { startdate: startDate.toISOString(), enddate: new Date(oneWeekAgo).toISOString() };
        break;
      }
      case 'ONE_MONTH_AGO': {
        const oneMonthAgo = new Date(startDate).setMonth(startDate.getMonth() - 1);
        result = { startdate: startDate.toISOString(), enddate: new Date(oneMonthAgo).toISOString() };
        break;
      }
      default:
        break;
    }
    return result;
  };

  const onPagePayloadChange = (page) => {
    setPayload({
      ...payload,
      skip: (page - 1) * 10,
    });
    setIsFiltersChanges(false);
  };

  return (
    <Stack spacing={2} width="77%" height="fit-content">
      {filtersWithLabel.length > 0 ? (
        <Stack gap={1} direction="row" flexWrap="wrap">
          {filtersWithLabel.map((filter) => (
            <Chip key={`${filter.name}-${filter.label}`} label={filter.label} onDelete={() => onDeleteFilters(filter)} />
          ))}
        </Stack>
      ) : null}
      <DatabaseTabAccountListTableComponent
        userResults={userResults}
        isFetching={isFetching}
        isFiltersChange={isFiltersChange}
        onPagePayloadChange={onPagePayloadChange}
      />
    </Stack>
  );
};

DatabaseTabAccountListComponent.propTypes = {
  configFilters: PropTypes.object,
  filters: PropTypes.object,
  onDeleteFilters: PropTypes.func,
};

export default DatabaseTabAccountListComponent;
