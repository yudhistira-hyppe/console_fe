import CmtCard from '@coremat/CmtCard';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import CmtList from '@coremat/CmtList';
import CmtProgressBar from '@coremat/CmtProgressBar';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { Stack } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  indicator: {
    backgroundColor: 'rgb(170, 34, 175)',
  },
  tabRoot: {
    minHeight: '40px',
    textAlign: 'center',
    fontSize: '0.8em',
    fontWeight: '900',
    letterSpacing: '2px',
  },
}));

const ProgressIndicator = ({ item, ...rest }) => {
  return (
    <Box width={1} {...rest}>
      <CmtProgressBar
        label={
          <Box display="flex" alignItems="center">
            {`${item.label}`} | <Box pl={1} component="span" color="text.secondary" fontSize={12}>{`${item.rate}`}</Box>
          </Box>
        }
        labelPos="top-left"
        value={item.value}
        renderValue={(value) => {
          return `${value}%`;
        }}
        containedColor={item.color}
        onlyContained
      />
    </Box>
  );
};

const Gender = () => {
  const classes = useStyles();

  const data = [
    { label: 'Perempuan', value: 60, rate: 12000, color: '#B457F6' },
    { label: 'Laki-laki', value: 40, rate: 8000, color: '#D72934' },
  ];

  return (
    <CmtCard>
      <CmtCardContent style={{ minHeight: '214px' }}>
        <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={3}>
          <Typography component="span" variant="h3">
            Jenis Kelamin
          </Typography>
          <Box width={1}>
            <CmtList
              data={data}
              renderRow={(item, index) => <ProgressIndicator key={index} className={classes.listItemRoot} item={item} />}
            />
          </Box>
        </Stack>
      </CmtCardContent>
    </CmtCard>
  );
};

export default Gender;
