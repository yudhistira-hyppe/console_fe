import { fetchError, fetchStart, fetchSuccess } from './Common';
import { obtainProfiles } from '../../authentication/auth-provider/AuthApi';
import { GET_PROFILES, DEACTIVATE_PROFILE } from '../../modules/Constants/ActionTypes';
import { READ_NOTIFICATION, SET_NOTIFICATION } from '../reducers/Profiles';

export const getProfiles = (authUser, filterOptions = [], searchTerm = '', callbackFun) => {
  return (dispatch) => {
    dispatch(fetchStart());
    obtainProfiles(authUser)
      .then(({ data }) => {
        if (data && data.response_code == 202) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_PROFILES, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch((error) => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const setNotification = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_NOTIFICATION, payload: data });
  };
};

export const readNotification = () => {
  return (dispatch) => {
    dispatch({ type: READ_NOTIFICATION });
  };
};
