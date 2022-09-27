import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const DelayedTextField = (props) => {
  const { waitForInput, filterValue, ...inputProps } = props;
  const [waitEvent, setWaitEvent] = useState(null);
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(filterValue || '');
  }, [filterValue]);

  useEffect(() => {
    let timer = 0;
    if (waitEvent && waitForInput) {
      timer = setTimeout(() => inputProps.onChange(waitEvent), 2000);
    }
    return () => clearTimeout(timer);
  }, [waitEvent]);

  const onChange = (event) => {
    setValue(event.target.value);
    if (waitForInput) {
      event.persist();
      setWaitEvent(event);
    } else {
      inputProps.onChange(event);
    }
  };

  return <TextField {...inputProps} value={value} onChange={onChange} />;
};

DelayedTextField.propTypes = {
  waitForInput: PropTypes.bool,
  filterValue: PropTypes.string,
};

export default DelayedTextField;
