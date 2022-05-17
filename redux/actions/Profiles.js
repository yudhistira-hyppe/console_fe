import { fetchError, fetchStart, fetchSuccess } from './Common';
import { obtainProfiles } from '../../authentication/auth-provider/AuthApi';
import { GET_PROFILES, DEACTIVATE_PROFILE } from '../../modules/Constants/ActionTypes';

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
