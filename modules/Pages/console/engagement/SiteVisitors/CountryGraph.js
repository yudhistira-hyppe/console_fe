import React from 'react';
import { VectorMap } from 'react-jvectormap';
import { Box, Grid } from '@material-ui/core';
import CmtCard from '@coremat/CmtCard';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import CmtList from '@coremat/CmtList';
import CountryListItem from './CountryCell';

import GridContainer from '@jumbo/components/GridContainer';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { fakeDb } from 'modules/FakeDb/fake-db';

const {countryList, countryListMarker} = fakeDb;

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    height: '100%',
  },
  textUppercase: {
    textTransform: 'uppercase',
  },
  vectorMapRoot: {
    width: '100%',
    height: '100%',
    minHeight: 200,
    overflow: 'hidden',
    '& .jvectormap-container': {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      backgroundColor: `${theme.palette.background.paper} !important`,
    },
  },
}));

const CountryGraph = ({value}) => {
  const classes = useStyles();
  const data = countryList[value];
  const marker = countryListMarker[value];
  console.log(marker)
  console.log([{ latLng: [28.02, 73.31], name: 'INDIA(45)' }])
  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardHeader
        title="Site Visitors Statistics"
        subTitle="Lorem ipsum is dummy content Cenas in erat accumsan, hendrerit lorem vel,"
      />
      <CmtCardContent>
        <GridContainer>
          <Grid item xs={12} md={5} xl={6}>
            <Box className={classes.textUppercase} fontSize={10} mb={2}>
              Wilayah
            </Box>

            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }}>
              <CmtList
                data={data}
                mr={{ sm: 5 }}
                renderRow={(country, index) => <CountryListItem key={index} country={country} />}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={7} xl={6}>
            <Box className={classes.vectorMapRoot}>
              <VectorMap
                map={'asia_mill'}
                containerStyle={{
                  width: '100%',
                  height: '100%',
                }}
                regionStyle={{
                  initial: {
                    fill: '#DEE4E8',
                  },
                }}
                markerStyle={{
                  initial: {
                    fill: '#FFC542',
                    stroke: 'rgba(50, 88, 239, 0.2)',
                  },
                }}
                zoomButtons={false}
                zoomOnScroll={false}
                containerClassName="map"
                markers={marker}
              />
            </Box>
          </Grid>
        </GridContainer>
      </CmtCardContent>
    </CmtCard>
  );
};

export default CountryGraph;
