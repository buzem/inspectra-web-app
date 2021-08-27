import DashboardService from "../../services/DashboardService";

export function getDashboards() {
  function onSuccess(dashboards) {
    return { type: "GETDASHBOARDS_SUCCESS", dashboards: dashboards };
  }
  function onFailure(error) {
    console.log("failed to get the dashboards", error);
  }

  return async (dispatch) => {
    console.log("get dashboards triggered");
    try {
      let dashboards = await DashboardService.getDashboards();
      dispatch(onSuccess(dashboards));
    } catch (e) {
      onFailure(e);
    }
  };
}

export const getDashboard = (id) => {
  function onSuccess(dashboard) {
    return { type: "GETDASHBOARD_SUCCESS", dashboard: dashboard };
  }
  function onFailure(error) {
    console.log("Failed to load the dashboard", error);
    return { type: "GETDASHBOARD_ERROR", error: error };
  }

  return async (dispatch, getState) => {
    try {
      let dashboard = await DashboardService.getDashboard(id);
      dispatch(onSuccess(dashboard));
    } catch (e) {
      onFailure(e);
    }
  };
};

export function addDashboard(dashboard) {
  function onSuccess(createdDashboard) {
    return { type: "ADDDASHBOARD_SUCCESS", dashboard: createdDashboard };
  }
  function onFailure(error) {
    console.log("Add dashboard failure", error);
  }

  return async (dispatch) => {
    console.log("add dashboard triggered");
    try {
      let createdDashboard = await DashboardService.createDashboard(dashboard);
      let actions = [onSuccess(createdDashboard), getDashboards()];
      // dispatch(onSuccess(createdDashboard));
      actions.map((a) => dispatch(a));
    } catch (e) {
      onFailure(e);
    }
  };
}

export function changeDashboard(dashboard) {
  function onSuccess(dashboard) {
    return { type: "UPDATEDASHBOARD_SUCCESS", dashboard: dashboard };
  }

  function onFailure(error) {
    console.log("change dashboard failure", error);
  }

  return async (dispatch) => {
    try {
      let updatedDashboard = await DashboardService.updateDashboard(dashboard);
      let actions = [onSuccess(updatedDashboard), getDashboards()];

      actions.map((a) => dispatch(a));
      // dispatch(onSuccess(updatedDashboard));
    } catch (e) {
      onFailure(e);
    }
  };
}

export function deleteDashboard(id) {
  // function onSuccess() {
  //   return { type: "DELETEDASHBOARD_SUCCESS" };
  // }
  function onFailure(error) {
    console.log("delete dataCollector failure", error);
  }

  return async (dispatch) => {
    try {
      await DashboardService.deleteDashboard(id);
      dispatch(getDashboards());
    } catch (e) {
      onFailure(e);
    }
  };
}
