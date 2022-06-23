import React from "react";
import dynamic from "next/dynamic";
import PageLoader from "../../@jumbo/components/PageComponents/PageLoader";
import SecurePage from "../../authentication/auth-page-wrappers/SecurePage";
import Wallet from "../../modules/Pages/wallet";

const WalletModul = dynamic(() => import('../../modules/Pages/wallet'), {
    loading: () => <PageLoader/>,
});

const WalletsPage = () => (
    <SecurePage>
        <Wallet/>
    </SecurePage>
);

export default WalletsPage;
