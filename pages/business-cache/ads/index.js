import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from "../../@jumbo/components/PageComponents/PageLoader";
import SecurePage from "../../authentication/auth-page-wrappers/SecurePage";

const AdsModule = dynamic(() => import('../../modules/Pages/ads'), {
    loading: () => <PageLoader />,
});

const AdsPage = () => (
    <SecurePage>
        <AdsModule />
    </SecurePage>
);

export default AdsPage;
