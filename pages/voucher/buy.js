import React from "react";
import dynamic from "next/dynamic";
import PageLoader from "../../@jumbo/components/PageComponents/PageLoader";
import SecurePage from "../../authentication/auth-page-wrappers/SecurePage";
import BuyVoucher from "../../modules/Pages/ads/CreateCampaign/Voucher/BuyVoucher";

const BuyVoucherModule = dynamic(() => import('../../modules/Pages/ads/CreateCampaign/Voucher/BuyVoucher'), {
    loading: () => <PageLoader/>,
});

const BuyVoucherPage = () => (
    <SecurePage>
        <BuyVoucher/>
    </SecurePage>
);

export default BuyVoucherPage;
