import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  textField: {
    '&.MuiTextField-root input': {
      height: '21px',
    },
  },
  formGroup: {
    '&.MuiFormGroup-root': {
      gap: '12px',
    },
  },
  formControlLabel: {
    '&.MuiFormControlLabel-root': {
      margin: '0px 0px 0px -11px',
    },
  },
  checkbox: {
    '&.MuiCheckbox-root': {
      padding: '0px 9px',
    },
  },
  radio: {
    '&.MuiRadio-root': {
      padding: '0px 9px',
    },
  },
}));

export default useStyles;
