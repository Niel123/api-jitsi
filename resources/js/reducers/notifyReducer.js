const initState = {
  message: null,
  isOpen: false,
  color: 'info',
};

export default  function notifyReducer(state = initState, action) {
  const { message, color } = action;

  if (message) {
    return {
      message: message,
      isOpen: true,
      color: color
    }
  } else if (action.type === 'HIDE_NOTIFY' ) {
    return {
      message: null,
      isOpen: false
    }
  }

  return state;
}