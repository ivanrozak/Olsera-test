import { GET_ITEMS, GET_ITEM_COMMENTS, GET_USER } from './types';

const initialState = {
  dataState: {
    isLoadingItems: false,
    isLoadingComments: false,
    items: [],
    comments: [],
    user: {},
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS: {
      return {
        ...state,
        dataState: {
          ...state.dataState,
          [action.payload.params.name]: action.payload.params.val,
        },
      };
    }
    case GET_ITEM_COMMENTS: {
      return {
        ...state,
        dataState: {
          ...state.dataState,
          [action.payload.params.name]: action.payload.params.val,
        },
      };
    }
    case GET_USER: {
      return {
        ...state,
        dataState: {
          ...state.dataState,
          [action.payload.params.name]: action.payload.params.val,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
