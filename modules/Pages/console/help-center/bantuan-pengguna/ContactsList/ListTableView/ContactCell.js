import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import CmtAvatar from '@coremat/CmtAvatar';
import Typography from '@material-ui/core/Typography';
import useStyles from './ContactCell.style';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ContactCellOptions from './ContactCellOptions';

const ContactCell = ({ contact, checkedContacts, handleCellCheckBox, onClickReply, onClickDelete }) => {
  const classes = useStyles();
  const { id, name, problem, problem_descriptions, report_date } = contact;
  return (
    <TableRow className={classes.tableRowRoot}>
      <TableCell className={classes.tableCellRoot}>
        <Box display="flex" alignItems="center">
          <Box component="span" mr={2} onClick={(e) => e.stopPropagation()}>
            <Checkbox
              color="primary"
              checked={checkedContacts.includes(id)}
              onChange={(event) => handleCellCheckBox(event.target.checked, id)}
            />
          </Box>
          <Box display="flex" alignItems="center">
            <Box mr={{ xs: 4, md: 5 }}>
              <CmtAvatar size={40} src="https://via.placeholder.com/40x40" alt={name} />
            </Box>

            <Box>
              <Typography className={classes.subTitleRoot}>{name}</Typography>
              <Typography className={classes.titleRoot} component="div" variant="h4">
                {problem}
              </Typography>
              <Typography className={classes.subTitleRoot}>{problem_descriptions}</Typography>
            </Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell className={clsx(classes.tableCellRoot, classes.tableCellDate)}>{report_date}</TableCell>
      <TableCell className={clsx(classes.tableCellRoot, classes.tableCellAction)}>
        <ContactCellOptions data={contact} onClickReply={onClickReply} onClickDelete={onClickDelete} />
      </TableCell>
    </TableRow>
  );
};

export default ContactCell;

ContactCell.prototype = {
  contact: PropTypes.object.isRequired,
  checkedContacts: PropTypes.array,
  handleCellCheckBox: PropTypes.func,
};

ContactCell.defaultProps = {
  checkedContacts: [],
};
