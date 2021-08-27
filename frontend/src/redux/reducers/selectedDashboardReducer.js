export default function selectedDashboard(state = {}, action) {
  switch (action.type) {
    case "GETDASHBOARD_SUCCESS":
      return { dashboard: action.dashboard };
    case "GETDASHBOARD_ERROR":
      return { error: action.error };
    case "UPDATEDASHBOARD_SUCCESS":
      console.log(state);
      return {
        dashboard: action.dashboard,
      };
    case "ADDDASHBOARD_SUCCESS":
      console.log(action.dashboard);

      return {
        dashboard: action.dashboard,
      }; // case "CHANGE":s
    //     dashboard: {
    //       ...state.dashboard,
    //       ...action.updates,
    //     },
    //   };
    default:
      return state;
  }
}
