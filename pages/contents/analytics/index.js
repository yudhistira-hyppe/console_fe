import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from "../../../@jumbo/components/PageComponents/PageLoader";
import SecurePage from "../../../authentication/auth-page-wrappers/SecurePage";

const AnalyticsModule = dynamic(() => import('../../../modules/Pages/content-management/analytic'), {
    loading: () => <PageLoader />,
});

const AnalyticsPage = () => (
    <SecurePage>
        <AnalyticsModule />
    </SecurePage>
);

export default AnalyticsPage;
