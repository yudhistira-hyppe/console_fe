import {
    GET_LIST_USERS_MONETIZE,
    GET_CONTENTS_MONETIZE,
    GET_CONTENTS_MONETIZE_META,
    GET_DASHBOARD_MONETIZE,
    GET_CONTENTS_MONETIZE_CONTENT,
    GET_LIST_VOUCHER,
    GET_LIST_USERS_VOUCHER,
    POST_CREATE_VOUCHER
  } from 'modules/Constants/ActionTypes';

  const INIT_STATE = {
    users: [],
    contents: [],
    contentData: [],
    meta: null,
    dashboard: null,
    vouchers: [],
    voucherUsers: [],
    createdVoucherLists: []
  };

const monetizeReducers = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_LIST_USERS_MONETIZE: {
            return {
                    ...state,
                    users: action.payload,
                };
            }
        case GET_CONTENTS_MONETIZE: {
            if(action.loadMore) {
                return {
                ...state,
                contents: [...state.contents, ...action.payload],
                };
            } else {
                return {
                ...state,
                contents: action.payload,
                };
            }
        }
        case GET_CONTENTS_MONETIZE_META: {
            return {
                ...state,
                meta: action.payload,
            };
        }
        case GET_DASHBOARD_MONETIZE: {
            return {
                ...state,
                dashboard: action.payload,
            };
        }
        case GET_CONTENTS_MONETIZE_CONTENT: {
            if(action.loadMore) {
                return {
                ...state,
                contentData: [...state.contentData, ...action.payload],
                };
            } else {
                return {
                ...state,
                contentData: action.payload,
                };
            }
        }
        case GET_LIST_USERS_VOUCHER: {
            if(action.loadMore) {
                return {
                ...state,
                voucherUsers: [...state.voucherUsers, ...action.payload],
                };
            } else {
                return {
                ...state,
                voucherUsers: action.payload,
                };
            }
        }
        case GET_LIST_VOUCHER: {
            if(action.loadMore) {
                return {
                ...state,
                vouchers: [...state.vouchers, ...action.payload],
                };
            } else {
                return {
                ...state,
                vouchers: action.payload,
                };
            }
        }
        case POST_CREATE_VOUCHER: {
            return {
                ...state,
                createdVoucherLists: action.payload,
            };
        }
        default:
            return state;
    }
};
export default monetizeReducers;