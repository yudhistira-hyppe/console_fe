import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../@jumbo/components/PageComponents/PageLoader';

const Home = dynamic(() => import('../modules/Pages/home/HomeReplace'), {
  ssr: false,
  loading: () => <PageLoader />,
});

const HomePage = () => <Home />;

export default HomePage;
