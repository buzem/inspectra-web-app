export default function entities(state = {}, action) {
  switch (action.type) {
    case "GETCOLLECTORS_SUCCESS":
      return { datacollectors: action.datacollectors };
    case "DELETECOLLECTOR_SUCCESS":
      return state;
  
    case "GETNOTIFICATIONS_SUCCESS":
      return { notifications: action.notifications };
    case "GETNOTIFICATIONS_ERROR":
      return { error: action.error };
    case "ADDNOTIFICATION_SUCCESS":
      return { ...state };
    default:
      return state;
  }
}
