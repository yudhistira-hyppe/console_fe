import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import DatabaseAccountFilterComponent from './filter';
import DatabaseAccountListComponent from './list';
import { useGetAllInterestQuery } from 'api/utils';

const defaultFilters = {
  username: {
    label: 'Cari Nama Akun',
    type: 'field',
    placeholder: 'Cari',
  },
  roles: {
    label: 'Jenis',
    type: 'checkbox-group',
    items: [
      {
        value: 'ROLE_USER',
        label: 'Basic',
      },
      {
        value: 'ROLE_PREMIUM',
        label: 'Premium',
      },
    ],
  },
  gender: {
    label: 'Jenis Kelamin',
    type: 'checkbox-group',
    items: [
      {
        value: 'FEMALE',
        label: 'Perempuan',
      },
      {
        value: 'MALE',
        label: 'Laki-laki',
      },
    ],
  },
  age: {
    label: 'Rentang Umur',
    type: 'radio-group',
    items: [
      {
        value: '',
        label: 'Semua Umur',
      },
      {
        value: '<15',
        label: '<15',
      },
      {
        value: '15-25',
        label: '15-25',
      },
      {
        value: '26-35',
        label: '26-35',
      },
      {
        value: '36-50',
        label: '36-50',
      },
      {
        value: '>50',
        label: '>50',
      },
    ],
  },
  interest: {},
  lastActive: {
    label: 'Terakhir Aktif',
    type: 'radio-group',
    items: [
      {
        value: '',
        label: 'Semua',
      },
      {
        value: 'ONE_HOUR_AGO',
        label: '1 Jam Lalu',
      },
      {
        value: 'ONE_DAY_AGO',
        label: '1 Hari Lalu',
      },
      {
        value: 'ONE_WEEK_AGO',
        label: '1 Minggu Lalu',
      },
      {
        value: 'ONE_MONTH_AGO',
        label: '1 Bulan Lalu',
      },
    ],
  },
};

const DatabaseAccountComponent = () => {
  const [configFilters, setConfigFilters] = useState(defaultFilters);
  const [filters, setFilters] = useState({});
  const { data: interests } = useGetAllInterestQuery({
    langIso: 'id',
    pageNumber: 0,
    pageRow: 20,
  });

  useEffect(() => {
    if (interests) {
      setConfigFilters({
        ...configFilters,
        ['interest']: {
          label: 'Minat',
          type: 'checkbox-group',
          items: interests.data.map((interest) => ({ value: interest.interestName, label: interest.interestName })),
        },
      });
    }
  }, [interests]);

  const onChangeFilters = (filterType, event) => {
    if (filterType === 'field') {
      setFilters({
        ...filters,
        [event.target.name]: event.target.value,
      });
    }
    if (filterType === 'checkbox-group') {
      let newValue;
      const currentValue = filters[event.target.name] || [];
      if (event.target.checked) {
        newValue = [...currentValue, event.target.value];
      } else {
        newValue = currentValue.filter((item) => item !== event.target.value);
      }
      setFilters({
        ...filters,
        [event.target.name]: newValue,
      });
    }
    if (filterType === 'radio-group') {
      setFilters({
        ...filters,
        [event.target.name]: event.target.value,
      });
    }
  };

  const onDeleteFilters = (deletedFilter) => {
    let newFilters = '';
    const filterValue = filters[deletedFilter.name];

    if (typeof filterValue === 'object') {
      newFilters = filterValue.filter((item) => item !== deletedFilter.value);
    }

    setFilters({
      ...filters,
      [deletedFilter.name]: newFilters,
    });
  };

  return (
    <Stack direction={'row'} spacing={3}>
      <DatabaseAccountFilterComponent configFilters={configFilters} filters={filters} onChange={onChangeFilters} />
      <DatabaseAccountListComponent configFilters={configFilters} filters={filters} onDeleteFilters={onDeleteFilters} />
    </Stack>
  );
};

export default DatabaseAccountComponent;
