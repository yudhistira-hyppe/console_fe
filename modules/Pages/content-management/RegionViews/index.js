import Box from '@material-ui/core/Box';
import CmtProgressBar from '../../../../@coremat/CmtProgressBar';
import React from 'react';
import ContentDataCard from '../ContentDataCard';

const RegionViews = ({ regions }) => {
  // const value = 1;
  // const label = 'Indonesia';
  const color = '#AB22AF';
  return (
    <ContentDataCard
      title={'Recently Region Viewers'}
      contentType={'HyppeVid'}
      content={
        <Box width={1} mb={{ xs: 3, sm: 6 }}>
          {regions?.map((region) => {
            return (
              <CmtProgressBar
                label={<Box mb={-1}>{region?._id}</Box>}
                labelPos="top-left"
                value={region?.totalpost}
                renderValue={(value) => {
                  return `${value}%`;
                }}
                containedColor={color}
                thickness={7}
                onlyContained
              />
            );
          })}
          {/* <CmtProgressBar
                label={<Box mb={-1}>{label}</Box>}
                labelPos="top-left"
                value={value}
                renderValue={(value) => {
                    return `${value}%`;
                }}
                containedColor={color}
                thickness={7}
                onlyContained
            /> */}
        </Box>
      }
    />
  );
};

export default RegionViews;
