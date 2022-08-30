import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from "../../../@jumbo/components/PageComponents/PageLoader";
import SecurePage from "../../../authentication/auth-page-wrappers/SecurePage";

const DetailsModule = dynamic(() => import('../../../modules/Pages/content-management/details'), {
    loading: () => <PageLoader />,
});

const DetailsPage = () => (
    <SecurePage>
        <DetailsModule />
    </SecurePage>
);

export default DetailsPage;
