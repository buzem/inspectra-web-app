export default function dashboards(state = {}, action) {
  switch (action.type) {
    case "GETDASHBOARDS_SUCCESS":
      console.log(state);
      return {
        ...state,
        dashboards: action.dashboards,
      };
    // case "UPDATEDASHBOARD_SUCCESS":
    //     console.log("UPDATEDASHBOARD_SUCCESS");
    //     console.log(action.dashboard);
    //     return { dashboards: action.dashboards };
    default:
      return state;
  }
}
