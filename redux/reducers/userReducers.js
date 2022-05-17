import {
    GET_LIST_USERS,
  } from 'modules/Constants/ActionTypes';

  const INIT_STATE = {
    users: []
  };

const userReducers = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_LIST_USERS: {
            return {
                    ...state,
                    users: action.payload,
                };
            }
            default:
                return state;
    }
};
export default userReducers;