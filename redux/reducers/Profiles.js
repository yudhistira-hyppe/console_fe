import {
    GET_PROFILES,
    DEACTIVATE_PROFILE,
  } from '../../modules/Constants/ActionTypes';

  const INIT_STATE = {
    profiles: [],
    currentProfile: null,
  };

  const Profiles = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_PROFILES: {
          return {
            ...state,
            profiles: action.payload,
          };
        }
        default:
          return state;
      }
    };
    export default Profiles;