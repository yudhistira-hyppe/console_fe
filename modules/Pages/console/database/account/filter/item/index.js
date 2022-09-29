import PropTypes from 'prop-types';
import { Checkbox, Radio, RadioGroup } from '@mui/material';
import { FormGroup, FormControlLabel } from '@material-ui/core';
import DelayedTextField from 'modules/Components/CommonComponent/DelayedTextField';
import useStyles from './index.style';

const DatabaseAccountFilterItemComponent = (props) => {
  const classes = useStyles();
  const { configKey, configItem, filters, onChange } = props;

  switch (configItem.type) {
    case 'field': {
      return (
        <DelayedTextField
          className={classes.textField}
          fullWidth
          waitForInput={true}
          placeholder="Cari"
          name={configKey}
          filterValue={filters[configKey]}
          onChange={(event) => onChange(configItem.type, event)}
        />
      );
    }
    case 'checkbox-group':
      return (
        <FormGroup className={classes.formGroup}>
          {configItem.items.map((checkbox) => {
            const filterValue = filters[configKey] || [];
            const isChecked = filterValue.includes(checkbox.value);
            return (
              <FormControlLabel
                className={classes.formControlLabel}
                key={checkbox.value}
                label={checkbox.label}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={isChecked}
                    value={checkbox.value}
                    name={configKey}
                    onChange={(event) => onChange(configItem.type, event)}
                  />
                }
              />
            );
          })}
        </FormGroup>
      );
    case 'radio-group': {
      const selectedRadio = filters[configKey] || '';
      return (
        <RadioGroup
          className={classes.formGroup}
          value={selectedRadio}
          onChange={(event) => onChange(configItem.type, event)}>
          {configItem.items.map((radio) => (
            <FormControlLabel
              className={classes.formControlLabel}
              key={radio.value}
              label={radio.label}
              name={configKey}
              value={radio.value}
              control={<Radio className={classes.radio} />}
            />
          ))}
        </RadioGroup>
      );
    }
    default:
      return null;
  }
};

DatabaseAccountFilterItemComponent.propTypes = {
  configKey: PropTypes.string,
  configItem: PropTypes.object,
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

export default DatabaseAccountFilterItemComponent;
