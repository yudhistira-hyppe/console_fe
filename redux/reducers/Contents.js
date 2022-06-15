import { GET_CONTENTS } from '../../modules/Constants/ActionTypes';

const INIT_STATE = {
  contents: [],
  currentContent: null,
};

const Contents = (state = INIT_STATE, action) => {
  //console.log(action.payload);
  switch (action.type) {
    case GET_CONTENTS: {
      if (action.loadMore) {
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
    default:
      return state;
  }
};
export default Contents;
