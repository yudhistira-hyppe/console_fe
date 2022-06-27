import React from 'react';
import PropTypes from 'prop-types';
import GridContainer from '@jumbo/components/GridContainer';
import { Grid } from '@material-ui/core';
import moment from 'moment';
// import CmtDropdownMenu from '@coremat/CmtDropdownMenu';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';

// const actions = [
//   {
//     label: 'Ubah',
//     icon: <EditIcon />,
//   },
//   {
//     label: 'Hapus',
//     icon: <DeleteIcon />,
//   },
// ];

const FaqItem = ({ data }) => {
  const dateObject = moment(data.datetime, 'YYYY-MM-DD');
  return (
    <GridContainer>
      <Grid item xs={12} sm={6} md={7}>
        {data.title}
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        {dateObject.format('DD MMM')}
      </Grid>
      {/* <Grid item xs={12} sm={2} md={2}>
        <CmtDropdownMenu
          TriggerComponent={
            <IconButton size="small">
              <MoreVertIcon />
            </IconButton>
          }
          items={actions}
          onItemClick={() => null}
        />
      </Grid> */}
    </GridContainer>
  );
};

FaqItem.propTypes = {
  data: PropTypes.object,
};

export default FaqItem;
