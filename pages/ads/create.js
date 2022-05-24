import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from "../../@jumbo/components/PageComponents/PageLoader";
import SecurePage from "../../authentication/auth-page-wrappers/SecurePage";

const AdsCreateModule = dynamic(() => import('../../modules/Pages/ads/CreateCampaign'), {
    loading: () => <PageLoader/>,
});

const Create = () => (
    <SecurePage>
        <AdsCreateModule/>
    </SecurePage>
);

export default Create;
