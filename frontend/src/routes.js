import DataCollectorListView from "./views/DataCollectorListView";

import UserLoginView from "./views/UserLoginView";
import SignUpView from "./views/SignUpView";
import DataCollectorDetailsView from "./views/DataCollectorDetailsView";
import CreationsView from "./views/CreationsView";
import NotificationListView from "./views/NotificationListView";
import NotificationDetailsView from "./views/NotificationDetailsView";
import DashboardView from "./views/DashboardView";
import GraphView from "./views/GraphView";

// used for routing

const routes = [
  {
    path: "/",
    component: DataCollectorListView,
    exact: true,
  },
  {
    path: "/login",
    component: UserLoginView,
    exact: true,
  },
  {
    path: "/register",
    component: SignUpView,
    exact: true,
  },
  {
    path: "/data-collector/:id",
    component: DataCollectorDetailsView,
    exact: true,
  },
  {
    path: "/creations",
    component: CreationsView,
    exact: true,
  },
  {
    path: "/dashboard/:id",
    component: DashboardView,
    exact: true,
  },
  {
    path: "/graph/:id",
    component: GraphView,
    exact: true,
  },
  {
    path: "/notification/:id",
    component: NotificationDetailsView,
    exact: true,
  },
  {
    path: "/notifications",
    component: NotificationListView,
    exact: true,
  },
];

export default routes;
