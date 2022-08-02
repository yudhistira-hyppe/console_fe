import CmtAdvCard from '@coremat/CmtAdvCard';
import CmtAdvCardContent from '@coremat/CmtAdvCard/CmtAdvCardContent';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import { makeStyles, Typography } from '@material-ui/core';
import { Stack } from '@mui/material';
import ActionButtons from './ActionButtons';
import OverallBalance from './OverAllBalances';
import PortfolioDetails from './PortofolioDetails';

const useStyles = makeStyles((theme) => ({
  subTitle: {
    color: theme.palette.text.secondary,
  },
}));

const Card = ({ headTitle, TypeProblem, numberOfProblem }) => {
  const classes = useStyles();
  const wallets = [
    { label: 'Baru', value: 74, rate: 8.75, color: '#89CB00' },
    { label: 'Dalam Proses', value: 18, rate: 1.23, color: '#FF8800' },
    { label: 'Selesai', value: 8, rate: 0.71, color: '#E31D41' },
  ];

  const Title = () => {
    return (
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={0}>
        <Typography>{headTitle}</Typography>
        <Typography style={{ fontSize: '0.8rem', border: '1px solid black', padding: '1px 5px', borderRadius: '3px' }}>
          Bulan ini
        </Typography>
      </Stack>
    );
  };

  return (
    <>
      <CmtAdvCard>
        <CmtCardHeader
          title={<Title />}
          titleProps={{
            variant: 'h4',
            component: 'div',
          }}
        />
        <CmtAdvCardContent
          title={<OverallBalance numberOfProblem={numberOfProblem} />}
          subTitle={TypeProblem}
          subTitleProps={{
            variant: 'body2',
            component: 'p',
            className: classes.subTitle,
          }}
          extraContent={<ActionButtons />}
          reverseDir>
          <PortfolioDetails
            // title={'Portfolio Distribution'}
            data={wallets}
          />
        </CmtAdvCardContent>
      </CmtAdvCard>
    </>
  );
};

export default Card;
