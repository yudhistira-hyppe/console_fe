import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';

import PortfolioDetails from './PortfolioDetails';

import CmtAdvCard from '../../../../@coremat/CmtAdvCard';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import CmtAdvCardContent from '../../../../@coremat/CmtAdvCard/CmtAdvCardContent';

import { fakeDb } from '../../../FakeDb/fake-db';
import OverallBalance from './OverallBalance';
import ActionButtons from './ActionButtons';

const useStyles = makeStyles((theme) => ({
  subTitle: {
    color: theme.palette.text.secondary,
  },
}));

const Balances = () => {
  const classes = useStyles();

  return (
    <CmtAdvCard>
      <CmtCardHeader
        title={'Your Balance'}
        titleProps={{
          variant: 'h4',
          component: 'div',
        }}
        alignCenter={true}
      />
      <CmtAdvCardContent
        title={<OverallBalance />}
        subTitle={'Overall balance'}
        subTitleProps={{
          variant: 'body2',
          component: 'p',
          className: classes.subTitle,
        }}
        extraContent={<ActionButtons />}
        alignCenter={true}
        reverseDir>
        {/*<PortfolioDetails title={'Portfolio Distribution'} data={fakeDb.wallets} />*/}
      </CmtAdvCardContent>
    </CmtAdvCard>
  );
};

export default Balances;
