const initState = {
  loading_message: null,
  is_loading: false
};

export default function loadingReducer(state = initState, action) {
  const { is_loading, loading_message } = action;
  if (is_loading) {
    return {
      loading_message: loading_message,
      is_loading: is_loading
    }
  } else if (action.type === 'HIDE_LOADING') {
    return {
      loading_message: null,
      is_loading: is_loading
    }
  }

  return state;
}