import React from 'react';
import { Box } from '@material-ui/core';
import CmtImage from '@coremat/CmtImage';
import { alpha, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  camCellItem: {
    transition: 'all .2s',
    borderTop: `1px solid ${alpha(theme.palette.common.dark, 0.04)}`,
    '&:last-child': {
      borderBottom: `1px solid ${alpha(theme.palette.common.dark, 0.04)}`,
    },
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      transform: 'translateY(-4px)',
      boxShadow: `0 3px 10px 0 ${alpha(theme.palette.common.dark, 0.2)}`,
    },
  },
  IconSm: {
    fontSize: 16,
    marginLeft: 4,
  },
  alignStart: {
    alignItems: 'flex-start',
  },
}));

const CampaignCell = ({ data }) => {
  const { name, desc, icon, budget, growth } = data;
  const classes = useStyles();
  return (
    <Box className={classes.camCellItem} display="flex" alignItems="flex-start" justifyContent="space-between" px={6} py={2}>
      <Box display="flex" alignItems="flex-start" flexDirection="row">
        <Box>
          <CmtImage src={icon} height={80} width={80} alt="Icon" />
        </Box>
        <Box ml={4}>
          <Box component="p">{name} </Box>
          <Box component="span" color="text.disabled" fontSize={12}>
            {desc}
          </Box>
        </Box>
      </Box>
      <Box>
        <Box component="h5" mb={0}>
          Anggaran Campaign: Rp {budget}
        </Box>
        <Box component="span" color="text.hint">
          Penempatan: Awal Video
        </Box>
      </Box>
    </Box>
  );
};

export default CampaignCell;
