import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, FormControl, Select, MenuItem, Button } from '@material-ui/core';
import CmtSearch from '@coremat/CmtSearch';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 155,
    display: 'inline-flex',
    backgroundColor: '#FFFFFF',
    marginRight: 10,
    marginBottom: 10,
    '& .MuiOutlinedInput-input': {
      padding: '9px 25px',
    },
  },
  searchInput: {
    '& .CmtSearch-input-root': {
      border: '1px solid rgba(0, 0, 0, 0.12)!important',
    },
    display: 'inline-flex',
    backgroundColor: '#FFFFFF',
    marginRight: 10,
  },
  btn: {
    marginRight: 10,
    marginBottom: 10,
    border: '1px solid #AB22AF',
    '& .MuiButton-label': {
      color: '#AB22AF',
    },
  },
}));

const FilterTableAkunPengguna = (props) => {
  const classes = useStyles();
  const { handleSearchUsers } = props;
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [roles, setRoles] = useState('');
  const [age, setAge] = useState('');

  const handleResetFields = () => {
    setFullName('');
    setGender('');
    setRoles('');
    setAge('');
  };

  return (
    <Box>
      <form className={classes.root} noValidate autoComplete="off">
        <CmtSearch
          border={true}
          className={classes.searchInput}
          onlyIcon={false}
          iconPosition="left"
          align="left"
          placeholder="Nama"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <FormControl variant="outlined" className={classes.formControl}>
          <Select displayEmpty value={gender} onChange={(e) => setGender(e.target.value)}>
            <MenuItem value="">
              <div>Jenis Kelamin</div>
            </MenuItem>
            <MenuItem value="MALE">Laki - Laki</MenuItem>
            <MenuItem value="FEMALE">Perempuan</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <Select displayEmpty value={roles} onChange={(e) => setRoles(e.target.value)}>
            <MenuItem value="">
              <div>Jenis Akun</div>
            </MenuItem>
            <MenuItem value="ROLE_USER">User</MenuItem>
            <MenuItem value="ROLE_PREMIUM">Premium</MenuItem>
            <MenuItem value="ROLE_SYSADMIN">Sys Admin</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <Select displayEmpty value={age} onChange={(e) => setAge(e.target.value)}>
            <MenuItem value="">
              <div>Umur</div>
            </MenuItem>
            <MenuItem value="<15">&lsaquo; 15</MenuItem>
            <MenuItem value="15-25">15 - 25</MenuItem>
            <MenuItem value="26-35">26 - 35</MenuItem>
            <MenuItem value="36-50">36 - 50</MenuItem>
            <MenuItem value=">50">&rsaquo; 50</MenuItem>
          </Select>
        </FormControl>
        <Button className={classes.btn} fullWidth={false} onClick={() => handleResetFields()}>
          Atur Ulang
        </Button>
        <Button
          className={classes.btn}
          fullWidth={false}
          onClick={() => handleSearchUsers({ fullName, gender, roles, age })}>
          Cari
        </Button>
      </form>
    </Box>
  );
};

FilterTableAkunPengguna.propTypes = {
  handleSearchUsers: PropTypes.func,
};

export default FilterTableAkunPengguna;
