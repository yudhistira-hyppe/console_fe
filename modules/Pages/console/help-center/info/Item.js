import React from 'react';
import PropTypes from 'prop-types';
import GridContainer from '@jumbo/components/GridContainer';
import { Grid, IconButton } from '@material-ui/core';
import moment from 'moment';
import CmtDropdownMenu from '@coremat/CmtDropdownMenu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const actions = [
  {
    label: 'Ubah',
    icon: <EditIcon />,
  },
  {
    label: 'Hapus',
    icon: <DeleteIcon />,
  },
];

const InfoItem = ({ data, onClickItem }) => {
  const dateObject = moment(data.datetime, 'YYYY-MM-DD');

  return (
    <GridContainer alignItems="center">
      <Grid item xs={12} sm={6} md={7}>
        {data.title}
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        {dateObject.format('DD MMM')}
      </Grid>
      <Grid item xs={12} sm={2} md={2}>
        <CmtDropdownMenu
          TriggerComponent={
            <IconButton size="small">
              <MoreVertIcon />
            </IconButton>
          }
          items={actions}
          onItemClick={({ label }) => onClickItem(label, data)}
        />
      </Grid>
    </GridContainer>
  );
};

InfoItem.propTypes = {
  data: PropTypes.object,
  onClickItem: PropTypes.func,
};

export default InfoItem;
