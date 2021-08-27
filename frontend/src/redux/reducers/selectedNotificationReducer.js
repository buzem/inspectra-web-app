export default function selectedNotification(state = {}, action) {
  switch (action.type) {
    case "GETNOTIFICATION_SUCCESS":
      return { notification: action.notification };
    case "GETNOTIFICATION_ERROR":
      return { error: action.error };
    case "UPDATENOTIFICATION_SUCCESS":
      return {
        notification: action.notification,
      };
    case "UPDATENOTIFICATION_ERROR":
      return { ...state, error: action.error };
    case "DISMISS_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
