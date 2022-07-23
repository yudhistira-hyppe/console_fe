import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import { Slide } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { fetchError } from '../../../redux/actions';
import PageLoader from '../PageComponents/PageLoader';

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

export const NotificationLoader = ({ loading, error, message }) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');

  useEffect(() => {
    if (error) {
      setType('error');
      setOpen(true);
    }
    if (message) {
      setType('success');
      setOpen(true);
    }
  }, [error, message]);

  return (
    <React.Fragment>
      {loading && <PageLoader />}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={SlideTransition}>
        <Alert variant="filled" severity={type}>
          {type === 'error' ? error : message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

NotificationLoader.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  message: PropTypes.string,
};

const ContentLoader = () => {
  const { error, loading, message } = useSelector(({ common }) => common);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error || message) {
      setTimeout(() => {
        dispatch(fetchError(''));
      }, 3000);
    }
  }, [dispatch, error, message]);

  return (
    <React.Fragment>
      {loading && <PageLoader />}
      {
        <Snackbar
          open={Boolean(error)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          TransitionComponent={SlideTransition}>
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        </Snackbar>
      }
      {
        <Snackbar
          open={Boolean(message)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          TransitionComponent={SlideTransition}>
          <Alert variant="filled" severity="success">
            {message}
          </Alert>
        </Snackbar>
      }
    </React.Fragment>
  );
};

export default ContentLoader;
