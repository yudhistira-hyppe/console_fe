import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CmtCard from '../../../../../@coremat/CmtCard';
import CmtCardContent from '../../../../../@coremat/CmtCard/CmtCardContent';
import { TrendingDown, TrendingUp } from '@material-ui/icons';
import numberWithCommas from '../../../../Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import Stats from './Stats';

const Statistics = ({ data }) => {
  return (
    <CmtCard className="h-full">
      <CmtCardContent className="h-full">
        <div className="h-full flex flex-row justify-content-between align-items-center">
          <Stats number={data?.views} subTitle={'Total dilihat'} isNumber={true} />
          <Stats number={data?.likes} subTitle={'Total Disukai'} isNumber={true} />
          <Stats number={data?.shares} subTitle={'Total Dibagikan'} isNumber={true} />
        </div>
      </CmtCardContent>
    </CmtCard>
  );
};

export default Statistics;
