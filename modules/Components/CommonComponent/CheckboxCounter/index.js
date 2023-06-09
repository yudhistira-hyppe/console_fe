import { Checkbox, FormControlLabel, Stack } from '@mui/material';
import React from 'react';
import NumberPlusMinus from '../NumberPlusMinus';
import { Typography } from '@material-ui/core';

const CheckboxCounter = ({ label, description, max, min, style, handleCheckbox, handleCounter, value }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <FormControlLabel
        control={
          <Checkbox
            color="secondary"
            checked={value >= 1}
            onChange={() => {
              handleCheckbox();
            }}
          />
        }
        label={<Typography style={{ color: '#9B9B9B' }}>{label || 'label here'}</Typography>}
        style={{ width: 100, ...style }}
      />
      {value >= 1 && (
        <>
          <NumberPlusMinus
            counter={value}
            onChange={(val) => {
              handleCounter(val);
            }}
            size={max || 0}
            min={min || 0}
          />
          <Typography style={{ color: '#9B9B9B' }}>{description || 'description here'}</Typography>
        </>
      )}
    </Stack>
  );
};

export default CheckboxCounter;
