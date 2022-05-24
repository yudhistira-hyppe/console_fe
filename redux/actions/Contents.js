import { fetchError, fetchStart, fetchSuccess } from './Common';
import { obtainContents } from '../../authentication/auth-provider/AuthApi';
import { GET_CONTENTS } from '../../modules/Constants/ActionTypes';

export const getContents = (authUser, filterOptions = [], searchTerm = '', callbackFun) => {
  return (dispatch) => {
    dispatch(fetchStart());
    obtainContents(authUser)
      .then(({ data }) => {
          console.log('this is response data', data);
        if (data && data.response_code == 202) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_CONTENTS, payload: data.data });
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
