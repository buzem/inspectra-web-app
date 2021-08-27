export const dismissWarning = () => {

  function dismissWarning() {
    return { type: "DISMISS_ERROR" };
  }
  return (dispatch) => {
    dispatch(dismissWarning());
  };
};
