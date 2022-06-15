import { fetchError, fetchStart, fetchSuccess } from './Common';
import { instance, setAuthorizationHeader } from 'authentication/auth-provider/AuthApi';
import { GET_CONTENTS } from 'modules/Constants/ActionTypes';

export const getListPosts = ({ page = 0, rowsPerPage = 10, isLoadMore = false, search = '', postType = '' }) => {
  return (dispatch) => {
    dispatch(fetchStart());

    const bodyFormData = new FormData();
    bodyFormData.append('pageRow', rowsPerPage);
    bodyFormData.append('pageNumber', page);
    bodyFormData.append('search', search);
    bodyFormData.append('postType', postType);
    bodyFormData.append('withInsight', true);

    console.log(bodyFormData);

    const api = setAuthorizationHeader(instance);

    api
      .post('/posts/getuserposts', bodyFormData)
      .then(({ data }) => {
        if (data && data.response_code == 202) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_CONTENTS, payload: data.data, loadMore: isLoadMore });
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch((error) => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};
