import { combineReducers } from "redux";
import user from "./userReducer";
import entities from "./entitiesReducer";
import fieldSchemas from "./fieldSchemaReducer";
import selectedDataCollector from "./selectedDataCollectorReducer";
import selectedNotification from "./selectedNotificationReducer";
import selectedDashboard from "./selectedDashboardReducer";
import selectedGraph from "./selectedGraphReducer";
import graphs from "./graphReducer";
import dashboardsReducer from "./dashboardReducer";

const appReducer = combineReducers({
  user,
  entities,
  selectedDataCollector,
  selectedNotification,
  selectedDashboard,
  selectedGraph,
  graphs,
  dashboards: dashboardsReducer,
  fieldSchemas,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === "USER_LOGGED_OUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
