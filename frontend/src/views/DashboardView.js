import React, { useEffect } from "react";

import { connect, useSelector } from "react-redux";
import { getDashboard, changeDashboard, addDashboard } from "../redux/actions";
import { getGraphs } from "../redux/actions";
import DashboardDetailsComponent from "../components/Dashboard/DashboardDetailsComponent";

/**
 * Manages the process of getting dashboard details data
 * @param {props} props
 */

function DashboardView(props) {
  // props can be deconstructed into single variables, so you do not need to write "props." all the time
  let { match } = props;

  // from redux store
  const user = useSelector((state) => state.user);
  const selectedDashboard = useSelector((state) => state.selectedDashboard);
  const selectableGraphs = useSelector((state) => state.graphs.graphs);
  const [newDashboard, setNewDashboard] = React.useState(null);
  // const [updatedDashboard, setUpdatedDashboard] = React.useState(null);

  const newDashboardDefaultData = {
    title: "New Dashboard",
    graphs: [],
    layout: [],
    graphData: [],
  };

  useEffect(() => {
    // get id of dataCollector from URL
    let dashboardId = match.params.id;

    // check if a new dataCollector is created
    if (dashboardId === "new") {
      // proceed with an empty element
      setNewDashboard(true);
      // console.log("new dashboard");
    } else {
      // trigger dataCollector load from backend
      // console.log("loading dashboard " + dashboardId);
      loadDashboard(dashboardId);
    }

    if (!selectableGraphs) {
      loadGraphs();
    }
  }, []);

  const loadGraphs = async () => {
    await props.dispatch(getGraphs());
  };

  const loadDashboard = async (dashboardId) => {
    props.dispatch(getDashboard(dashboardId));
  };

  // for saving an existing dataCollector
  const onSave = (dashboard) => {
    props.dispatch(changeDashboard(dashboard));
  };

  // for creating a new dataCollector
  const onCreate = async (dashboard) => {
    // trigger redux action add dataCollector
    props.dispatch(addDashboard(dashboard));
    setNewDashboard(false);
  };

  return newDashboard ? (
    <DashboardDetailsComponent
      dashboard={newDashboardDefaultData}
      selectableGraphs={selectableGraphs}
      onCreate={onCreate}
      new={true}
      isLoggedIn={!!user.user}
    />
  ) : selectedDashboard.dashboard ? (
    <DashboardDetailsComponent
      dashboard={selectedDashboard.dashboard}
      selectableGraphs={selectableGraphs}
      onSave={onSave}
      new={false}
      isLoggedIn={!!user.user}
    />
  ) : (
    <h1>Error Loading. Please try again</h1>
  );
  // ) : null;
}

export default connect()(DashboardView);
