import { fetchError, fetchStart, fetchSuccess } from './Common';
import { instance, setAuthorizationHeader } from 'authentication/auth-provider/AuthApi';
import { GET_LIST_USERS } from 'modules/Constants/ActionTypes';

export const getListUsers = ({
  page = 0,
  rowsPerPage =  10,
  search = ''
}) => {
  return (dispatch) => {
    dispatch(fetchStart());

    const bodyFormData = new FormData();
    bodyFormData.append('pageRow', rowsPerPage);
    bodyFormData.append('pageNumber', page);
    bodyFormData.append('search', search);

    console.log(bodyFormData);

    const api = setAuthorizationHeader(instance);

    api.post('/user/getprofiles', bodyFormData)
    .then(({ data }) => {
        if (data && data.response_code == 202) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_LIST_USERS, payload: data.data });
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch((error) => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};
