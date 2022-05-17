import { fetchError, fetchStart, fetchSuccess } from './Common';
import { instance, setAuthorizationHeader } from 'authentication/auth-provider/AuthApi';
import { GET_LIST_USERS_MONETIZE,  GET_CONTENTS_MONETIZE, GET_CONTENTS_MONETIZE_META, GET_DASHBOARD_MONETIZE, GET_CONTENTS_MONETIZE_CONTENT, GET_LIST_VOUCHER, GET_LIST_USERS_VOUCHER, POST_CREATE_VOUCHER} from 'modules/Constants/ActionTypes';

export const getListRegisteredUsers = ({
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
          dispatch(fetchSuccess());
          dispatch({ type: GET_LIST_USERS_MONETIZE, payload: data.data });
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch((error) => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};


export const getListRegisteredContent = ({
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
  
      api.post('/monetize/pendaftaran', bodyFormData)
      .then(({ data }) => {
          if (data && data.response_code == 202) {
            dispatch(fetchSuccess());
            dispatch({ type: GET_CONTENTS_MONETIZE, payload: data.data });
            dispatch({ type: GET_CONTENTS_MONETIZE_META, payload: data.meta });
          } else {
            dispatch(fetchError('There was something issue in responding server.'));
          }
        })
        .catch((error) => {
          dispatch(fetchError('There was something issue in responding server'));
        });
    };
  };

  export const getDashboardData = () => {
    return (dispatch) => {
      dispatch(fetchStart());
  
      const api = setAuthorizationHeader(instance);
  
      api.get('/monetize')
      .then(({ data }) => {
          if (data && data.response_code == 202) {
            dispatch(fetchSuccess());
            dispatch({ type: GET_DASHBOARD_MONETIZE, payload: data.data });
          } else {
            dispatch(fetchError('There was something issue in responding server.'));
          }
        })
        .catch((error) => {
          dispatch(fetchError('There was something issue in responding server'));
        });
    };
  };
  
  export const getListMonetizeContent = ({
    page = 0,
    rowsPerPage =  10,
    search = '',
    category = 'sell',
    type = ''
  }) => {
    return (dispatch) => {
      dispatch(fetchStart());
  
      const bodyFormData = new FormData();
      bodyFormData.append('pageRow', rowsPerPage);
      bodyFormData.append('pageNumber', page);
      bodyFormData.append('search', search);
      bodyFormData.append('category', category);
      bodyFormData.append('type', type);
  
      console.log(bodyFormData);
  
      const api = setAuthorizationHeader(instance);
  
      api.post('/monetize/content', bodyFormData)
      .then(({ data }) => {
          if (data && data.response_code == 202) {
            dispatch(fetchSuccess());
            dispatch({ type: GET_CONTENTS_MONETIZE_CONTENT, payload: data.data });
          } else {
            dispatch(fetchError('There was something issue in responding server.'));
          }
        })
        .catch((error) => {
          dispatch(fetchError('There was something issue in responding server'));
        });
    };
  };

  export const getListVoucherUser = ({
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
  
      //api.post('/monetize/voucher/users', bodyFormData)
      api.post('/user/getprofiles', bodyFormData)
      .then(({ data }) => {
          if (data && data.response_code == 202) {
            dispatch(fetchSuccess());
            dispatch({ type: GET_LIST_USERS_VOUCHER, payload: data.data });
            dispatch({ type: GET_CONTENTS_MONETIZE_META, payload: data.meta });
          } else {
            dispatch(fetchError('There was something issue in responding server.'));
          }
        })
        .catch((error) => {
          dispatch(fetchError('There was something issue in responding server'));
        });
    };
  };

  export const getListVoucherPerUser = ({
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
  
      api.post('/monetize/voucher/lists', bodyFormData)
      .then(({ data }) => {
          if (data && data.response_code == 202) {
            dispatch(fetchSuccess());
            dispatch({ type: GET_LIST_VOUCHER, payload: data.data });
          } else {
            dispatch(fetchError('There was something issue in responding server.'));
          }
        })
        .catch((error) => {
          dispatch(fetchError('There was something issue in responding server'));
        });
    };
  };

  export const postCreateVoucher = (body) => {
    return (dispatch) => {
      dispatch(fetchStart());

      const api = setAuthorizationHeader(instance);
  
      api.post('/monetize/voucher', body)
      .then(({ data }) => {
          if (data && data.response_code == 202) {
            dispatch(fetchSuccess());
            dispatch({ type: POST_CREATE_VOUCHER, payload: data.data });
          } else {
            dispatch(fetchError('There was something issue in responding server.'));
          }
        })
        .catch((error) => {
          dispatch(fetchError('There was something issue in responding server'));
        });
    };
  }