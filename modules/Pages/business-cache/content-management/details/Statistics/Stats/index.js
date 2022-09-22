import { TrendingDown, TrendingUp } from '@material-ui/icons';
import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import numberWithCommas from '../../../../../Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import { Badge } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: '22px',
    lineHeight: '22px',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  subtitle: {
    fontFamily: 'Lato',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.15px',
    color: 'rgba(0, 0, 0, 0.6)',
  },
}));

const Stats = ({ number, subTitle, precentage, isIncreased, fontSizeTitle, isNumber }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.title}>
        {/* numberWithCommas() is error function */}
        {/* {isNumber ? numberWithCommas(number) : number} */}
        {isNumber ? number : number}
      </div>
      <center className={classes.subtitle}>
        {subTitle}

        {/*plase dont remove code below, this is no use, still confusing */}
        {/* {isIncreased ? (
          <span className="ml-2 align-items-center" style={{ color: '#8DCD03', fontSize: '16px' }}>
            {precentage} %
            <TrendingUp />
          </span>
        ) : (
          <span className="ml-2 align-items-center" style={{ color: '#E00930', fontSize: '16px' }}>
            {precentage} %
            <TrendingDown />
          </span>
        )} */}
      </center>
    </div>
  );
};

export default Stats;
