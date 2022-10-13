import moment from 'moment';
import { GET_PROFILES } from '../../modules/Constants/ActionTypes';
export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const READ_NOTIFICATION = 'READ_NOTIFICATION';

const INIT_STATE = {
  profiles: [],
  currentProfile: null,
  notification: {
    data: [],
    unread: 0,
  },
};

const Profiles = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PROFILES: {
      return {
        ...state,
        profiles: action.payload,
      };
    }
    case SET_NOTIFICATION: {
      return {
        ...state,
        notification: {
          ...state.notification,
          data: [{ ...action.payload, created_at: moment().format('DD-MM-YYYY HH:mm') }, ...state.notification.data],
          unread: state.notification.unread + 1,
        },
      };
    }
    case READ_NOTIFICATION: {
      return {
        ...state,
        notification: {
          ...state.notification,
          unread: 0,
        },
      };
    }
    default:
      return state;
  }
};
export default Profiles;
