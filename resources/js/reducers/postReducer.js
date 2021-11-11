import { FETCH_POSTS, NEW_POST, LOADING } from '../actions/types';

const initialState = {
  items: [],
  item: {},
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case NEW_POST:
      return {
        ...state,
        item: action.payload
      };
    case LOADING: return {
      ...state,
      loading: action.payload
    }
    default:
      return state;
  }
}
