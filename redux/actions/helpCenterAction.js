import { fetchError, fetchStart, fetchSuccess } from './Common';
import { instance, setAuthorizationHeader } from 'authentication/auth-provider/AuthApi';
import { GET_LIST_USERS_PENGUMUMAN,
  CHANGE_CHECKED_STATE_USERS_PENGUMUMAN,
  SET_FILTER_TYPE,
  ADD_NEW_FAQ,
  SELECTED_FAQ,
  UPDATE_SELECTED_FAQ,
  ADD_NEW_INFO,
  SELECTED_INFO,
  UPDATE_SELECTED_INFO
} from 'modules/Constants/ActionTypes';

export const getListUserPengumuman = ({
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

    api.post('/monetize/pendaftaran/users', bodyFormData)
    .then(({ data }) => {
        if (data && data.response_code == 202) {
          data.data.map(dt => {
            dt.check = false
          });
          dispatch(fetchSuccess());
          dispatch({ type: GET_LIST_USERS_PENGUMUMAN, payload: data.data });
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch((error) => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const changeCheckedPengguna = (data) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_CHECKED_STATE_USERS_PENGUMUMAN, payload: {
      data: data.data,
      status: data.status
    } });
  }
}

//For setting Filtertype
export const setFilterType = (filterType) => {
  return {
    type: SET_FILTER_TYPE,
    payload: filterType,
  };
};

export const postNewFaq = (title) => {
  return {
    type: ADD_NEW_FAQ,
    payload: title,
  };
};

export const setSelectedFaq = (faq) => {
  return {
    type: SELECTED_FAQ,
    payload: faq,
  };
};

export const updateSelectedFaq = (payload) => {
  return {
    type: UPDATE_SELECTED_FAQ,
    payload: payload,
  };
};

export const postNewInfo = (title) => {
  return {
    type: ADD_NEW_INFO,
    payload: title,
  };
};

export const setSelectedInfo = (info) => {
  return {
    type: SELECTED_INFO,
    payload: info,
  };
};

export const updateSelectedInfo = (payload) => {
  return {
    type: UPDATE_SELECTED_INFO,
    payload: payload,
  };
};