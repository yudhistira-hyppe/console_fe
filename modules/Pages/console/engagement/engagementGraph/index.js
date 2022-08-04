import react, { useState } from 'react';
import CmtAdvCard from '@coremat/CmtAdvCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { Stack } from '@mui/material';
import GridContainer from '@jumbo/components/GridContainer';
import { Grid, makeStyles, Box, Typography, alpha } from '@material-ui/core';
import VisitorChart from './graph';
import CmtAvatar from '@coremat/CmtAvatar';
import { intranet } from './fakeData';

const useStyles = makeStyles((theme) => ({
  actionBtn: {
    backgroundColor: 'rgba(0, 0, 0, 0.04);',
    transition: '0.7s',
    cursor: 'pointer',
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 10,
    width: 10,
    borderRadius: '50%',
    cursor: 'pointer',
    marginLeft: 10,
  },
}));

const EngagementGraph = () => {
  const { siteVisitors } = intranet;
  const [country, setCountry] = useState(siteVisitors.countryList[0]);

  const classes = useStyles();
  const [isActiveAction, setIsActiveAction] = useState('dilihat');
  console.log('isActiveAction:', isActiveAction);
  const engagementAction = [
    {
      label: 'Dilihat',
      icon: <img src="/images/icons/Eye_On.svg" width="24" alt="icon" />,
      color: '#D72934',
      value: 10000,
      key: 'dilihat',
    },
    {
      label: 'Disukai',
      icon: <img src="/images/icons/likes.svg" width="24" alt="icon" />,
      color: '#3F51B5',
      value: 200000,
      key: 'disukai',
    },
    {
      label: 'Komentar',
      icon: <img src="/images/icons/Message.svg" width="24" alt="icon" />,
      color: '#FFA005',
      value: 100,
      key: 'komentar',
    },
    {
      label: 'Dibagikan',
      icon: <img src="/images/icons/Share.svg" width="24" alt="icon" />,
      color: '#5D9405',
      value: 1000,
      key: 'dibagikan',
    },
  ];
  const Title = () => {
    return (
      <>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <div>Engagement</div>
          <div>
            <ButtonGroup size="small" aria-label="small button group">
              <Button key="one">
                <span style={{ fontSize: '10px' }}>Harian</span>
              </Button>

              <Button key="two">
                <span style={{ fontSize: '10px' }}>Mingguan</span>
              </Button>

              <Button key="three">
                <span style={{ fontSize: '10px' }}>Bulanan</span>
              </Button>

              <Button key="three">
                <span style={{ fontSize: '10px' }}>Rentang</span>
              </Button>
            </ButtonGroup>
          </div>
        </Stack>
      </>
    );
  };
  return (
    <>
      <CmtAdvCard>
        <CmtCardHeader
          titleProps={{
            variant: 'h4',
            component: 'div',
          }}
          title={<Title />}
        />
        <GridContainer>
          <Grid item xs={12} sm={4} md={4}>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="space-between"
              // style={{ border: '1px solid black' }}
              mx={1}
              spacing={1}>
              {engagementAction.map((action) => {
                return (
                  <>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      // my={1}
                      // mx={2}
                      onClick={() => setIsActiveAction(action.key)}
                      style={{ padding: '5px 10px', borderRadius: '10px', cursor: 'pointer' }}
                      className={action.key === isActiveAction ? classes.actionBtn : null}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                        }}>
                        {action.icon}
                        <span style={{ marginLeft: '7px' }}>{action.label}</span>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                        }}>
                        {action.value}
                        <span>
                          <Box bgcolor={action.color} color={action.color} className={classes.avatar} />
                        </span>
                      </div>
                    </Stack>
                  </>
                );
              })}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={8} md={8}>
            <VisitorChart data={country.data} color={country.badgeColor} chartGradientColor={country.chartGradientColor} />
          </Grid>
        </GridContainer>
      </CmtAdvCard>
    </>
  );
};

export default EngagementGraph;
