import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';
const data = [
  {
    id: 1,
    name: 'VOUCHER HYPPE ASIX',
    createdAt: '22/08/05-13:29 WIB',
    kredit: '1000',
    kode: 'ABC',
    bonus: '100',
    stok: '1000',
    dibeli: '200',
    price: 1500000,
    status: 'active',
    exp: '90',
    sdk: null,
  },
  {
    id: 2,
    name: 'VOUCHER HYPPE ASIX',
    createdAt: '22/08/05-13:29 WIB',
    kredit: '1000',
    kode: 'ACB',
    bonus: '100',
    stok: '1000',
    dibeli: '200',
    price: 1500000,
    status: 'active',
    exp: '30',
    sdk: 'hello'
  },
];

const ConsoleVoucherDetailComponent = dynamic(() => import('modules/Pages/console/monetize/Voucher/Detail'), {
  loading: () => <PageLoader />,
});

const ConsoleVoucherDetailPage = (props) => {
  return (
    <SecureConsolePage>
      <ConsoleVoucherDetailComponent data={props?.data} />
    </SecureConsolePage>
  );
};

export async function getServerSideProps(props) {
  const selectedData = data.filter((el) => el.id == props.query.id);
  return {
    props: { data: selectedData[0] },
  };
}

export default ConsoleVoucherDetailPage;
