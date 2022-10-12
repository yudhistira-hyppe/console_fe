import React from 'react';
import Head from 'next/head';
import { Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import AdsListing from './AdsListing';
import AdsPerformaceComponents from './AdsPerformance';
import AdsDemographyComponent from './AdsDemography';
import { SearchSection, TableSection } from './components';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Pusat Iklan', isActive: true },
];

const status = [
  {
    value: 'tinjau', 
    label: 'Tinjau',
  },
  {
    value: 'dijadwalkan', 
    label: 'Dijadwalkan',
  },
  {
    value: 'tayang', 
    label: 'Tayang',
  },
  {
    value: 'ditolak', 
    label: 'Ditolak',
  },
]

const listAds = {
  totalrow: 10,
  page: 1,
  data: [
    {
      createdAt: '22/08/05-13:29 WIB',
      ads_img: 'https://images.pexels.com/photos/6386956/pexels-photo-6386956.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      ads_title: '5 Tempat Makan Hidden Gems di Jakarta',
      ads_type: 'Content Ads',
      ads_placement: 'Pre-HyppeVid',
      ads_credit_used: 1000,
      ads_credit_left: 0,
      ads_status: 'Tinjau'
    },
    {
      createdAt: '22/08/05-13:29 WIB',
      ads_img: 'https://images.pexels.com/photos/6386955/pexels-photo-6386956.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      ads_title: 'Viral! Video tawuran antar genk',
      ads_type: 'Content Ads',
      ads_placement: 'Pre-HyppeVid',
      ads_credit_used: 1000,
      ads_credit_left: 0,
      ads_status: 'Tinjau'
    },
    {
      createdAt: '22/08/05-13:29 WIB',
      ads_img: '',
      ads_title: 'Viral! Video tawuran antar genk',
      ads_type: 'Content Ads',
      ads_placement: 'Pre-HyppeVid',
      ads_credit_used: 1000,
      ads_credit_left: 0,
      ads_status: 'Tinjau'
    },
    {
      createdAt: '22/08/05-13:29 WIB',
      ads_img: '',
      ads_title: '10 Tempat termurah di Bandung untuk kamu yang mau staycation',
      ads_type: 'Content Ads',
      ads_placement: 'Pre-HyppeVid',
      ads_credit_used: 1000,
      ads_credit_left: 954,
      ads_status: 'Tayang'
    },
    {
      createdAt: '22/08/05-13:29 WIB',
      ads_img: '',
      ads_title: 'We buy this modified bike so you don’t have to',
      ads_type: 'Content Ads',
      ads_placement: 'Pre-HyppeVid',
      ads_credit_used: 1000,
      ads_credit_left: 876,
      ads_status: 'Tayang'
    },
    {
      createdAt: '22/08/05-13:29 WIB',
      ads_img: '',
      ads_title: 'Lorem Ipsum',
      ads_type: 'Content Ads',
      ads_placement: 'Pre-HyppeVid',
      ads_credit_used: 1000,
      ads_credit_left: 750,
      ads_status: 'Tayang'
    },
    {
      createdAt: '22/08/05-13:29 WIB',
      ads_img: '',
      ads_title: 'Lorem Ipsum',
      ads_type: 'Content Ads',
      ads_placement: 'Pre-HyppeVid',
      ads_credit_used: 1000,
      ads_credit_left: 643,
      ads_status: 'Tayang'
    },
    {
      createdAt: '22/08/05-13:29 WIB',
      ads_img: '',
      ads_title: 'Lorem Ipsum',
      ads_type: 'Content Ads',
      ads_placement: 'Pre-HyppeVid',
      ads_credit_used: 1000,
      ads_credit_left: 0,
      ads_status: 'Habis'
    },
    {
      createdAt: '22/08/05-13:29 WIB',
      ads_img: '',
      ads_title: 'Lorem Ipsum',
      ads_type: 'Content Ads',
      ads_placement: 'Pre-HyppeVid',
      ads_credit_used: 1000,
      ads_credit_left: 0,
      ads_status: 'Dijadwalkan'
    },
    {
      createdAt: '22/08/05-13:29 WIB',
      ads_img: '',
      ads_title: 'Lorem Ipsum',
      ads_type: 'Content Ads',
      ads_placement: 'Pre-HyppeVid',
      ads_credit_used: 1000,
      ads_credit_left: 0,
      ads_status: 'Ditolak'
    }
  ]
}

const ConsoleAdsCenterComponent = () => {
  const [filter, setFilter] = React.useState({
    descending: 'true',
    assignto: '',
    search: '',
    status: null,
    penggunaan_kredit: null,
    startdate: '',
    enddate: '',
    page: 0,
    limit: 10,
  });

  const onOrderChange = (e) => {
    setFilter((prevVal) => {
      return {
        ...prevVal,
        descending: e.target.value,
        page: 0
      }
    })
  }

  const handleSearchChange = (kind, value) => {
    setFilter((prevVal) => {
      if (kind === 'ticket_date') {
        const dateFrom = moment().subtract(value, 'd').format('YYYY-MM-DD');
        const dateNow = moment().format('YYYY-MM-DD');
        return {
          ...prevVal,
          startdate: dateFrom,
          enddate: dateNow,
        };
      } else if (kind === 'ticket_range') {
        return { ...prevVal, startdate: value[0], enddate: value[1] };
      } else if (kind === 'status') {
        return {
          ...prevVal,
          status: value
        };
      } else if (kind === 'search') {
        return {
          ...prevVal,
          search: value,
        };
      } else if (kind === 'penerima') {
        return {
          ...prevVal,
          assignto: value,
        };
      } else if (kind === 'sumber') {
        return {
          ...prevVal,
          sumber: filter.sumber.find((item) => item === value)
            ? filter.sumber.filter((item) => item !== value)
            : [...filter.sumber, value],
        };
      } else if (kind === 'category') {
        return {
          ...prevVal,
          kategori: filter.kategori.find((item) => item === value)
            ? filter.kategori.filter((item) => item !== value)
            : [...filter.kategori, value],
        };
      } else if (kind === 'level') {
        return {
          ...prevVal,
          level: filter.level.find((item) => item === value)
            ? filter.level.filter((item) => item !== value)
            : [...filter.level, value],
        };
      } else if (kind === 'penggunaan_kredit'){
        return {
          ...prevVal,
          penggunaan_kredit: value
        }
      }
    });
  };

  const handlePageChange = (e, value) => {
    setFilter((prevVal) => {
      return {
        ...prevVal,
        page: value - 1,
      };
    });
  };

  const onResetFilter = (name) => {
    console.log(name, `<< name`)
    if (name === 'all') {
      setFilter((prev) => {
        return {
          ...prev,
          status: null,
          penggunaan_kredit: null,
        }
      })
    } else {
      setFilter((prev) => {
        return {
          ...prev,
          [name]: null
        }
      })
    }
  }
  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Pusat Iklan</title>
      </Head>
      <PageContainer heading="Pusat Iklan" breadcrumbs={breadcrumbs}>
        <GridContainer>
          <Grid item xs={12} md={12} lg={4} xl={4}>
            <AdsPerformaceComponents />
          </Grid>
          <Grid item xs={12} md={12} lg={8} xl={8}>
            <AdsDemographyComponent />
          </Grid>
        </GridContainer>

        <GridContainer>
          <Grid item xs={12} md={12} lg={3} xl={3} className="mt-3">
            <SearchSection 
              loadingStatus={false}
              status={status}
              handleChange={handleSearchChange}
              filter={filter}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={9} xl={9} className="mt-3">
            <TableSection 
              order={filter.descending}
              page={filter.page + 1}
              handleOrder={onOrderChange}
              handlePageChange={handlePageChange}
              listAds={listAds}
              filter={filter}
              onResetFilter={onResetFilter}
            />
          </Grid>
        </GridContainer>
      </PageContainer>
    </>
  );
};

export default ConsoleAdsCenterComponent;
