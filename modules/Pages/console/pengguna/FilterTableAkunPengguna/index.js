import React from 'react';
import { Box, FormControl, Select, MenuItem, InputLabel,Button } from '@material-ui/core';
import CmtSearch from '@coremat/CmtSearch';
import CmtGridView from '@coremat/CmtGridView';
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
        // '& .MuiInputLabel-outlined': {
        //     display: 'block',
        //     transform: 'translate(14px, 10px) scale(1)'
        // },
        // '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
        //     display: 'none'
        // },
        // '& .MuiOutlinedInput-notchedOutline': {
        //     border: '1px solid rgba(0, 0, 0, 0.12)'
        // },
    },
    searchInput: {
        '& .CmtSearch-input-root': {
            border: '1px solid rgba(0, 0, 0, 0.12)!important'
        },
        display: 'inline-flex',
        backgroundColor: '#FFFFFF',
        marginRight: 10,
    },
    btnReset: {
        border: '1px solid #AB22AF',
        '& .MuiButton-label': {
            color: '#AB22AF',
        }
    }
}));

const FilterTableAkunPengguna = () => {
    const classes = useStyles();
    const [gender, setGender] = React.useState('');
    const [cariNama, setCariNama] = React.useState('');

    const handleChangeGender = event => {
        setGender(event.target.value);
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
                            value={cariNama}
                            onChange={e => setCariNama(e.target.value)} />
                            
                <FormControl variant="outlined" className={classes.formControl}>
                    <Select
                        displayEmpty
                        value={gender}
                        onChange={handleChangeGender}>
                        <MenuItem value="">
                        <em>Jenis Kelamin</em>
                        </MenuItem>
                        <MenuItem value="MALE">Laki - Laki</MenuItem>
                        <MenuItem value="FEMALE">Perempuan</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                    <Select
                    displayEmpty
                        value={gender}
                        onChange={() => null}>
                        <MenuItem value="">
                        <em>Jenis Akun</em>
                        </MenuItem>
                        <MenuItem value={10}>User</MenuItem>
                        <MenuItem value={20}>Admin</MenuItem>
                        <MenuItem value={30}>Sys Admin</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                    <Select
                    displayEmpty
                        value={gender}
                        onChange={() => null}>
                        <MenuItem value="">
                        <em>Umur</em>
                        </MenuItem>
                        <MenuItem value={10}>&lsaquo; 15</MenuItem>
                        <MenuItem value={20}>15 - 25</MenuItem>
                        <MenuItem value={30}>26 - 35</MenuItem>
                        <MenuItem value={30}>36 - 50</MenuItem>
                        <MenuItem value={30}>&rsaquo; 50</MenuItem>
                    </Select>
                </FormControl>
                <Button className={classes.btnReset}>
                    Atur Ulang
                </Button>
            </form>
        </Box>
    )
}

export default FilterTableAkunPengguna;