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

const Card = ({ headTitle, TypeProblem, numberOfProblem, pathIconLeft, iconLabelLeft, iconLabelRight }) => {
  console.log('iconLabelLeft:', iconLabelLeft);
  const classes = useStyles();
  const wallets = [
    { label: 'Baru', value: 74, rate: 8.75, color: '#89CB00' },
    { label: 'Dalam Proses', value: 18, rate: 1.23, color: '#FF8800' },
    { label: 'Selesai', value: 8, rate: 0.71, color: '#E31D41' },
  ];

  const Title = () => {
    return (
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          {pathIconLeft && <img src={pathIconLeft} alt="icon" />}{' '}
          <Typography variant="h4" component="span" style={{ marginLeft: '7px' }}>
            {headTitle}
          </Typography>
          {iconLabelRight && <img src="/images/icons/small-info.svg" style={{ marginLeft: '7px' }} />}
        </div>
        {/* <Typography variant="h3" component="div">
          {pathIconLeft && <img src={pathIconLeft} alt="icon" />} {headTitle}
          {iconLabelRight && <img src="/images/icons/small-info.svg" style={{ marginLeft: '7px' }} />}
        </Typography> */}
        <Typography
          component="div"
          style={{
            fontSize: '0.7rem',
            border: '1px solid black',
            padding: '1px 3px',
            borderRadius: '3px',
          }}>
          Semua
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
