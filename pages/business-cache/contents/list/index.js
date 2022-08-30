import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from "../../../@jumbo/components/PageComponents/PageLoader";
import SecurePage from "../../../authentication/auth-page-wrappers/SecurePage";

const ContentListModule = dynamic(() => import('../../../modules/Pages/content-management/ContentList'), {
    loading: () => <PageLoader />,
});

const ContentListPage = () => (
    <SecurePage>
        <ContentListModule />
    </SecurePage>
);

export default ContentListPage;
