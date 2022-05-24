import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from "../../../@jumbo/components/PageComponents/PageLoader";
import SecurePage from "../../../authentication/auth-page-wrappers/SecurePage";

const MonetizeModule = dynamic(() => import('../../../modules/Pages/content-management/monetize'), {
    loading: () => <PageLoader />,
});

const MonetizePage = () => (
    <SecurePage>
        <MonetizeModule />
    </SecurePage>
);

export default MonetizePage;
