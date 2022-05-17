import { getTodayDate, getYesterdayDate } from '@jumbo/utils/dateHelper';
import { TouchApp } from '@material-ui/icons';
import { Refresh } from '@material-ui/icons';
import { FileCopy } from '@material-ui/icons';
import { Share } from '@material-ui/icons';
export const fakeDb = {
  adsStatistics: {
    labelBudget: 'Spent',
    labelGrowth: 'Growth',
    chartData: [
      { month: 'Jan', budget: 500, growth: 500 },
      { month: 'Feb', budget: 700, growth: 750 },
      { month: 'Mar', budget: 900, growth: 1200 },
      { month: 'Apr', budget: 1000, growth: 1350 },
      { month: 'May', budget: 945, growth: 1400 },
      { month: 'Jun', budget: 1100, growth: 1200 },
      { month: 'Jul', budget: 1250, growth: 1000 },
      { month: 'Aug', budget: 1400, growth: 500 },
      { month: 'Sep', budget: 1120, growth: 500 },
      { month: 'Oct', budget: 1030, growth: 500 },
      { month: 'Nov', budget: 1150, growth: 500 },
      { month: 'Dec', budget: 1500, growth: 500 },
    ],
  },
  wallets: [
    { label: 'Voucher', value: 74, rate: 8.75, color: '#89CB00' },
    { label: 'HyppeWallet', value: 18, rate: 1.23, color: '#FF8800' },
  ],
  profileInsights: [
    { label: 'Likes', value: 234 },
    { label: 'Comments', value: 45 },
    { label: 'Views', value: 74 },
  ],
  contentTabCategories: [
    { name: 'Latest', slug: 'latest' },
    { name: 'Popular', slug: 'popular' },
    { name: 'Monetize', slug: 'monetize' },
  ],
  postType: [
    { name: 'advertise', slug: 'HyppeAds' },
    { name: 'story', slug: 'HyppeStory' },
    { name: 'diary', slug: 'HyppeDiary'},
    { name: 'vid', slug: 'HyppeVideo'},
    { name: 'pict', slug: 'HyppePic'}
  ],
  postAdsType: [
    { name: 'Tayang', slug: 'publish' },
    { name: 'Disetuhui', slug: 'accept' },
    { name: 'Tinjau', slug: 'review' },
  ],
  activeUsers: [
    { month: 'Jan', count: 2000 },
    { month: 'Feb', count: 1450 },
    { month: 'Mar', count: 1100 },
    { month: 'Apr', count: 1400 },
    { month: 'May', count: 900 },
    { month: 'Jun', count: 1600 },
    { month: 'Jul', count: 1300 },
    { month: 'Aug', count: 1800 },
    { month: 'Sep', count: 1200 },
    { month: 'Oct', count: 1600 },
  ],
  measuredActivityTitle: [
    {
      label: 'Minggu 1',
      bgColor: '#D7F5B1',
      color: '#5D9405',
    },
    {
      label: 'Minggu 2',
      bgColor: '#FFDE99',
      color: '#D36F1A',
    },
    {
      label: 'Minggu 3',
      bgColor: '#9BE7FD',
      color: '#0356AF',
    },
    {
      label: 'Minggu 4',
      bgColor: '#F2E7FE',
      color: '#7F39FB',
    },
  ],
  measuredActivity: [
    { name: 'Page A', minggu1: 4000, minggu2: 2400, minggu3: 2400, minggu4: 3678 },
    { name: 'Page B', minggu1: 3000, minggu2: 7234, minggu3: 9863, minggu4: 4533 },
    { name: 'Page C', minggu1: 2000, minggu2: 9800, minggu3: 2364, minggu4: 3473 },
    { name: 'Page D', minggu1: 2780, minggu2: 3908, minggu3: 9987, minggu4: 3443 },
    { name: 'Page E', minggu1: 1890, minggu2: 4800, minggu3: 4643, minggu4: 3224 },
    { name: 'Page F', minggu1: 2390, minggu2: 4365, minggu3: 6589, minggu4: 9173 },
    { name: 'Page G', minggu1: 3490, minggu2: 4300, minggu3: 2100, minggu4: 4233 },
  ],
  statusKepemilikan: [
    { month: 'Jan', notif: 400, pending: 400, sukses: 400},
    { month: 'Feb', notif: 500, pending: 600, sukses: 254},
    { month: 'Mar', notif: 400, pending: 300, sukses: 243},
    { month: 'Apr', notif: 350, pending: 200, sukses: 225},
    { month: 'May', notif: 700, pending: 700, sukses: 643},
    { month: 'Jun', notif: 100, pending: 600, sukses: 350},
    { month: 'Jul', notif: 500, pending: 50, sukses: 444},
    { month: 'Aug', notif: 350, pending: 550, sukses: 440},
    { month: 'Sep', notif: 300, pending: 200, sukses: 460},
    { month: 'Oct', notif: 200, pending: 500, sukses: 430},
    { month: 'Nov', notif: 200, pending: 600, sukses: 220},
    { month: 'Dec', notif: 200, pending: 100, sukses: 730},
  ],
  akunPengguna: [
    {
      id: 1,
      name: 'Alex Dglove',
      gender: 'L',
      age: 21,
      location: 'Bogor, Jawa Barat',
      acount_type: 'Basic',
      interest: 'Entertainment, Travel',
      owner_of: 'Mami Geda Salad',
      last_active: '5 Menit yang lalu',
      status: false,
      detail: {
        email: 'alex@gmail.com',
        dob: '20 Juni 1985',
        status: 'complete_bio'
      }
    },
    {
      id: 2,
      name: 'Jane Cooper Jr',
      gender: 'W',
      age: 13,
      location: 'Depok, Jawa Barat',
      acount_type: 'Basic',
      interest: 'Games, Hobby',
      owner_of: '-',
      last_active: '23 Menit yang lalu',
      status: false,
      detail: {
        email: 'janecooper@gmail.com',
        dob: '20 Juni 1985',
        status: 'complete_bio'
      }
    },
    {
      id: 3,
      name: 'Wade Warren',
      gender: 'L',
      age: 23,
      location: 'Bekasi, Jawa Barat',
      acount_type: 'Premium',
      interest: 'Entertainment, Travel, Food',
      owner_of: '-',
      last_active: '1 Jam yang lalu',
      status: false,
      detail: {
        email: 'wade@gmail.com',
        dob: '20 Juni 1985',
        status: 'complete_bio'
      }
    },
    {
      id: 4,
      name: 'Esther Howard',
      gender: 'W',
      age: 21,
      location: 'Jakarta Timur, DKI Jakarta',
      acount_type: 'Premium',
      interest: 'Travel',
      owner_of: 'PT Lentera Project',
      last_active: '1 Jam yang lalu',
      status: true,
      detail: {
        email: 'esther@gmail.com',
        dob: '20 Juni 1985',
        status: 'complete_bio'
      }
    },
    {
      id: 5,
      name: 'Jane Cooper',
      gender: 'W',
      age: 20,
      location: 'Jakarta Pusat, DKI Jakarta',
      acount_type: 'Basic',
      interest: 'Games',
      owner_of: '-',
      last_active: '3 Hari yang lalu',
      status: false,
      detail: {
        email: 'janecooper@gmail.com',
        dob: '20 Juni 1985',
        status: 'complete_bio'
      }
    }
  ],
  postTabCategories: [
    { name: 'HyppeVid', slug: 'hyppevid' },
    { name: 'HyppeDiary', slug: 'diary' },
    { name: 'HyppePic', slug: 'pict' },
  ],
  postList: [
    {
      id: 1,
      images: [
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 1',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 2',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 3',
        },
      ],
      title: 'Luxury family home at beach side',
      address: '2972, Washington Road, New Jersey',
      bedrooms: 3,
      bathrooms: 3,
      area: '1400',
      owner: { id: 1, name: 'John Nash' },
      publishedDate: 'June 26, 2020',
      availability: 'sale',
      isTrending: true,
      price: '$670,500',
      pricePerSqFt: '$587/sqft',
      category: 'hyppevid',
    },
    {
      id: 2,
      images: [
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 1',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 2',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 3',
        },
      ],
      title: 'Sunset view Apartment in Colarado',
      address: '2972, Washington Road, New Jersey',
      bedrooms: 3,
      bathrooms: 3,
      area: '1400',
      owner: { id: 1, name: 'John Nash' },
      publishedDate: 'June 25, 2020',
      availability: 'rent',
      isTrending: false,
      price: '$670,500',
      pricePerSqFt: '$587/sqft',
      category: 'hyppediary',
    },
    {
      id: 3,
      images: [
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 1',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 2',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 3',
        },
      ],
      title: 'Best property in Albama',
      address: '2972, Washington Road, New Jersey',
      bedrooms: 3,
      bathrooms: 3,
      area: '1400',
      owner: { id: 1, name: 'John Nash' },
      publishedDate: 'June 23, 2020',
      availability: 'rent',
      isTrending: false,
      price: '$670,500',
      pricePerSqFt: '$587/sqft',
      category: 'hyppepic',
    },
    {
      id: 4,
      images: [
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 1',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 2',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 3',
        },
      ],
      title: 'Best house deal in New jersey',
      address: '2972, Washington Road, New Jersey',
      bedrooms: 3,
      bathrooms: 3,
      area: '1400',
      owner: { id: 1, name: 'John Nash' },
      publishedDate: 'June 24, 2020',
      availability: 'sale',
      isTrending: false,
      price: '$670,500',
      pricePerSqFt: '$587/sqft',
      category: 'hyppevid',
    },
    {
      id: 5,
      images: [
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 1',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 2',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 3',
        },
      ],
      title: 'Luxury apartment in Colarado',
      address: '2972, Washington Road, New Jersey',
      bedrooms: 3,
      bathrooms: 3,
      area: '1400',
      owner: { id: 1, name: 'John Nash' },
      publishedDate: 'June 28, 2020',
      availability: 'rent',
      isTrending: true,
      price: '$670,500',
      pricePerSqFt: '$587/sqft',
      category: 'hyppediary',
    },
    {
      id: 6,
      images: [
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 1',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 2',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 3',
        },
      ],
      title: 'Plot in Albama',
      address: '2972, Washington Road, New Jersey',
      bedrooms: 3,
      bathrooms: 3,
      area: '1400',
      owner: { id: 1, name: 'John Nash' },
      publishedDate: 'June 29, 2020',
      availability: 'sale',
      isTrending: true,
      price: '$670,500',
      pricePerSqFt: '$587/sqft',
      category: 'hyppepic',
    },
    {
      id: 7,
      images: [
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 1',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 2',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 3',
        },
      ],
      title: 'House in New jersey',
      address: '2972, Washington Road, New Jersey',
      bedrooms: 3,
      bathrooms: 3,
      area: '1400',
      owner: { id: 1, name: 'John Nash' },
      publishedDate: 'June 24, 2020',
      availability: 'sale',
      isTrending: false,
      price: '$670,500',
      pricePerSqFt: '$587/sqft',
      category: 'hyppevid',
    },
    {
      id: 8,
      images: [
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 1',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 2',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 3',
        },
      ],
      title: 'Flat in Colarado',
      address: '2972, Washington Road, New Jersey',
      bedrooms: 3,
      bathrooms: 3,
      area: '1400',
      owner: { id: 1, name: 'John Nash' },
      publishedDate: 'June 20, 2020',
      availability: 'rent',
      isTrending: true,
      price: '$670,500',
      pricePerSqFt: '$587/sqft',
      category: 'hyppediary',
    },
    {
      id: 9,
      images: [
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 1',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 2',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 3',
        },
      ],
      title: '3 BHK house in Albama',
      address: '2972, Washington Road, New Jersey',
      bedrooms: 3,
      bathrooms: 3,
      area: '1400',
      owner: { id: 1, name: 'John Nash' },
      publishedDate: 'June 28, 2020',
      availability: 'sale',
      isTrending: false,
      price: '$670,500',
      pricePerSqFt: '$587/sqft',
      category: 'hyppepic',
    },
    {
      id: 10,
      images: [
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 1',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 2',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 3',
        },
      ],
      title: 'Best house for family in New Jersey',
      address: '2972, Washington Road, New Jersey',
      bedrooms: 3,
      bathrooms: 3,
      area: '1400',
      owner: { id: 1, name: 'John Nash' },
      publishedDate: 'June 26, 2020',
      availability: 'rent',
      isTrending: true,
      price: '$670,500',
      pricePerSqFt: '$587/sqft',
      category: 'hyppevid',
    },
    {
      id: 11,
      images: [
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 1',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 2',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 3',
        },
      ],
      title: 'Villa in Colarado',
      address: '2972, Washington Road, New Jersey',
      bedrooms: 3,
      bathrooms: 3,
      area: '1400',
      owner: { id: 1, name: 'John Nash' },
      publishedDate: 'June 16, 2020',
      availability: 'rent',
      isTrending: true,
      price: '$670,500',
      pricePerSqFt: '$587/sqft',
      category: 'hyppediary',
    },
    {
      id: 12,
      images: [
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 1',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 2',
        },
        {
          image: 'https://via.placeholder.com/640x420',
          title: 'image 3',
        },
      ],
      title: 'Sunrise view apartment in Albama',
      address: '2972, Washington Road, New Jersey',
      bedrooms: 3,
      bathrooms: 3,
      area: '1400',
      owner: { id: 1, name: 'John Nash' },
      publishedDate: 'June 28, 2020',
      availability: 'sale',
      isTrending: false,
      price: '$670,500',
      pricePerSqFt: '$587/sqft',
      category: 'hyppepic',
    },
  ],
  recentOrders: [
    {
      jenis: 1,
      orderDate: getTodayDate(),
      nominal: 'Rp. 1.000.000',
      remarks: 'Penjualan konten',
    },
    {
      jenis: 1,
      orderDate: getTodayDate(),
      nominal: 'Rp. 1.000.000',
      remarks: 'Iklan',
    },
    {
      jenis: 2,
      orderDate: getTodayDate(),
      nominal: 'Rp. 1.000.000',
      remarks: 'Pembelian Konten',
    },
    {
      jenis: 2,
      orderDate: getYesterdayDate(),
      nominal: 'Rp. 1.000.000',
      remarks: 'Pembelian Konten',
    },
    {
      jenis: 3,
      orderDate: '20.06.2020',
      nominal: 'Rp. 1.000.000',      
      remarks: 'Transfer DANA',
    },
    {
      jenis: 1,
      orderDate: getTodayDate(),
      nominal: 'Rp. 1.000.000',
      remarks: 'Penjualan Konten',
    },
    {
      jenis: 2,
      orderDate: getTodayDate(),
      nominal: 'Rp. 1.000.000',
      remarks: 'Biaya pendaftaran konten',
    },
  ],
  projects: [
    {
      label: 'jumbo react',
      value: 'jumbo-react',
      color: '#6200EE',
      totalHours: 20,
      dailyAverageHours: 11,
      data: [
        { month: 'Jan', queries: 400, deals: 400 },
        { month: 'Feb', queries: 500, deals: 600 },
        { month: 'Mar', queries: 400, deals: 300 },
        { month: 'Apr', queries: 350, deals: 200 },
        { month: 'May', queries: 700, deals: 700 },
        { month: 'Jun', queries: 100, deals: 600 },
        { month: 'Jul', queries: 500, deals: 50 },
      ],
    },
    {
      label: 'Wieldy',
      value: 'wieldy',
      color: '#F5A32F',
      totalHours: 15,
      dailyAverageHours: 7,
      data: [
        { month: 'Jan', queries: 400, deals: 400 },
        { month: 'Feb', queries: 500, deals: 700 },
        { month: 'Mar', queries: 400, deals: 300 },
        { month: 'Apr', queries: 350, deals: 400 },
        { month: 'May', queries: 700, deals: 700 },
        { month: 'Jun', queries: 100, deals: 800 },
        { month: 'Jul', queries: 500, deals: 50 },
        { month: 'Aug', queries: 350, deals: 550 },
        { month: 'Sep', queries: 300, deals: 300 },
        { month: 'Oct', queries: 200, deals: 500 },
        { month: 'Nov', queries: 200, deals: 700 },
        { month: 'Dec', queries: 200, deals: 200 },
      ],
    },
    {
      label: 'Drift Angular',
      value: 'drift-angular',
      color: '#FF4081',
      totalHours: 18,
      dailyAverageHours: 9,
      data: [
        { month: 'Jan', queries: 400, deals: 500 },
        { month: 'Feb', queries: 500, deals: 400 },
        { month: 'Mar', queries: 400, deals: 600 },
        { month: 'Apr', queries: 350, deals: 200 },
        { month: 'May', queries: 700, deals: 900 },
        { month: 'Jun', queries: 100, deals: 600 },
        { month: 'Jul', queries: 500, deals: 50 },
        { month: 'Aug', queries: 350, deals: 600 },
        { month: 'Sep', queries: 300, deals: 200 },
        { month: 'Oct', queries: 200, deals: 500 },
        { month: 'Nov', queries: 200, deals: 800 },
        { month: 'Dec', queries: 200, deals: 300 },
      ],
    },
  ],
  marketingData: [
    {
      id: 1,
      name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      desc: '08/11/2021 00:01 s/d 08/12/2021 23:59',
      icon: 'https://via.placeholder.com/80x80',
      color: 'bg-indigo lighten-1',
      budget: '3.000.000',
      growth: 20,
    },
  
    {
      id: 2,
      name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      desc: '08/11/2021 00:01 s/d 08/12/2021 23:59',
      icon: 'https://via.placeholder.com/80x80',
      color: 'bg-light-blue accent-2',
      budget: '3.000.000',
      growth: -5,
    },
  
    {
      id: 3,
      name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      desc: '08/11/2021 00:01 s/d 08/12/2021 23:59',
      icon: 'https://via.placeholder.com/80x80',
      color: 'bg-pink accent-3',
      budget: '3.000.000',
      growth: 20,
    },
  
    {
      id: 3,
      name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      desc: '08/11/2021 00:01 s/d 08/12/2021 23:59',
      icon: 'https://via.placeholder.com/80x80',
      color: 'bg-pink accent-3',
      budget: '3.000.000',
      growth: 145,
    },
  ],
  revenueSummary: [
    { month: 'Jan', income: 500, expense: 300 },
    { month: 'Feb', income: 1000, expense: 600 },
    { month: 'Mar', income: 1500, expense: 1000 },
    { month: 'Apr', income: 900, expense: 400 },
    { month: 'May', income: 200, expense: 200 },
    { month: 'Jun', income: 500, expense: 1100 },
    { month: 'Jul', income: 800, expense: 1400 },
    { month: 'Aug', income: 1400, expense: 1700 },
    { month: 'Sep', income: 2000, expense: 2000 },
    { month: 'Oct', income: 1300, expense: 400 },
    { month: 'Nov', income: 700, expense: 700 },
    { month: 'Dec', income: 1300, expense: 2100 },
  ],
  totalInstall: [
    {
      label: 'Android',
      value: 'android',
      color: '#6200EE',
      total: 354,
    },
    {
      label: 'Ios',
      value: 'ios',
      color: '#AF56AF',
      total: 145,
    },
  ],
  countryList: [
    [
      {
        name: 'Jakarta',
        flagCode: 'us',
        visitors: '12,455',
        badgeColor: '#D72934',
      },
      { name: 'Jawa Barat', flagCode: 'fr', visitors: '445', badgeColor: '#3F51B5' },
      { name: 'Jawa Timur', flagCode: 'gm', visitors: '36,855', badgeColor: '#FFA005' },
      { name: 'Bali', flagCode: 'es', visitors: '9,877', badgeColor: '#5D9405' },
    ],
    [
      {
        name: 'Makasar',
        flagCode: 'us',
        visitors: '12,455',
        badgeColor: '#D72934',
      },
      { name: 'Balikpapan', flagCode: 'fr', visitors: '445', badgeColor: '#3F51B5' },
      { name: 'Ambon', flagCode: 'gm', visitors: '36,855', badgeColor: '#FFA005' },
      { name: 'Palu', flagCode: 'es', visitors: '9,877', badgeColor: '#5D9405' },
    ]
  ],
  countryListMarker: [
    [
      {
        name: 'Jakarta',
        latLng: [-6.1840025795983395, 106.83177614531071]
      },
      { name: 'Jawa Barat', latLng: [-6.9143152918417865, 107.60473009564406]},
      { name: 'Jawa Timur', latLng: [-7.254158376719283, 112.75044704906571]},
      { name: 'Bali', latLng: [-8.666567719982247, 115.20435833229052]},
    ],
    [
      {
        name: 'Makasar',
        latLng: [-5.12926724035593, 119.45446707302521]
      },
      { name: 'Balikpapan', latLng: [-1.2310233619904665, 116.81355039461425]},
      { name: 'Ambon', latLng: [-3.6595776907364366, 128.19778834813164]},
      { name: 'Palu', latLng: [-0.8963805524896058, 119.8729662420806]},
    ]
  ],
  engagementTitle: [
    {
      label: 'Dilihat',
      bgColor: '#D7F5B1',
      color: '#5D9405',
      icon: <TouchApp/>
    },
    {
      label: 'Disukai',
      bgColor: '#FFDE99',
      color: '#D36F1A',
      icon: <Refresh/>
    },
    {
      label: 'Dibagikan',
      bgColor: '#9BE7FD',
      color: '#0356AF',
      icon: <FileCopy/>
    },
    {
      label: 'Reaksi',
      bgColor: '#F2E7FE',
      color: '#7F39FB',
      icon: <Share/>
    },
  ],
  performance: [
    { month: 'Jan', price: 1500 },
    { month: 'Feb', price: 2000 },
    { month: 'Mar', price: 1200 },
    { month: 'Apr', price: 2200 },
    { month: 'May', price: 2600 },
    { month: 'Jun', price: 4300 },
    { month: 'July', price: 2900 },
    { month: 'Aug', price: 3800 },
    { month: 'Sep', price: 1500 },
  ],
  konten: [
    {
      id: 1,
      name: 'Intan jual baju',
      waktu: '08/11/2021 12:00',
      insight: {
        dilihat: 210,
        disukai: 62,
        komentar: 41,
        dibagikan: 12,
      },
      harga: 'Rp. 1.000.000',
      id: '12549anfh852'
    },
    {
      id: 1,
      name: 'Intan jual baju',
      waktu: '08/11/2021 12:00',
      insight: {
        dilihat: 210,
        disukai: 62,
        komentar: 41,
        dibagikan: 12,
      },
      harga: 'Rp. 1.000.000',
      id: '12549anfh852'
    },
    {
      id: 1,
      name: 'Intan jual baju',
      waktu: '08/11/2021 12:00',
      insight: {
        dilihat: 210,
        disukai: 62,
        komentar: 41,
        dibagikan: 12,
      },
      harga: 'Rp. 1.000.000',
      id: '12549anfh852'
    },
    {
      id: 1,
      name: 'Intan jual baju',
      waktu: '08/11/2021 12:00',
      insight: {
        dilihat: 210,
        disukai: 62,
        komentar: 41,
        dibagikan: 12,
      },
      harga: 'Rp. 1.000.000',
      id: '12549anfh852'
    },
    {
      id: 1,
      name: 'Intan jual baju',
      waktu: '08/11/2021 12:00',
      insight: {
        dilihat: 210,
        disukai: 62,
        komentar: 41,
        dibagikan: 12,
      },
      harga: 'Rp. 1.000.000',
      id: '12549anfh852'
    },
    {
      id: 1,
      name: 'Intan jual baju',
      waktu: '08/11/2021 12:00',
      insight: {
        dilihat: 210,
        disukai: 62,
        komentar: 41,
        dibagikan: 12,
      },
      harga: 'Rp. 1.000.000',
      id: '12549anfh852'
    },
    {
      id: 1,
      name: 'Intan jual baju',
      waktu: '08/11/2021 12:00',
      insight: {
        dilihat: 210,
        disukai: 62,
        komentar: 41,
        dibagikan: 12,
      },
      harga: 'Rp. 1.000.000',
      id: '12549anfh852'
    },
  ]
};