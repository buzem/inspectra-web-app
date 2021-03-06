import UserService from "../../services/UserService";

export function login(username, password) {
  function onSuccess(user) {
    return { type: "LOGIN_SUCCESS", user: user };
  }
  function onFailure(error) {
    return { type: "LOGIN_FAILURE", error: error };
  }

  return async (dispatch) => {
    try {
      let resp = await UserService.login(username, password);
      dispatch(onSuccess(resp.user));
    } catch (e) {
      dispatch(onFailure(e));
    }
  };
}

export function logout() {
  function onSuccess() {
    return { type: "USER_LOGGED_OUT" };
  }

  UserService.logout();
  return (dispatch) => {
    dispatch(onSuccess());
  };
}

export function loginReset() {
  return { type: "LOGIN_RESET" };
}

export function register(username, password) {
  function onSuccess(user) {
    return { type: "LOGIN_SUCCESS", user: user };
  }
  function onFailure(error) {
    return { type: "LOGIN_FAILURE", error: error };
  }

  return async (dispatch) => {
    try {
      let resp = await UserService.register(username, password);
      dispatch(onSuccess(resp.user));
    } catch (e) {
      dispatch(onFailure(e));
    }
  };
}
