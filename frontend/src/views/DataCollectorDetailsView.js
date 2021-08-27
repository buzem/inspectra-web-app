import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";

import {
  getDataCollector,
  changeDataCollector,
  addDataCollector,
} from "../redux/actions";
import DataCollectorDetailsComponent from "../components/DataCollector/DataCollectorDetailsComponent";
import Loading from "../components/General/Loading";
import { People } from "@material-ui/icons";

/**
 * Manages the process of getting dataCollector details data
 * @param {props} props
 */
function DataCollectorDetailsView(props) {
  // props can be deconstructed into single variables, so you do not need to write "props." all the time
  let { match, getDataCollector } = props;

  // from redux store
  const selectedDataCollector = useSelector(
    (state) => state.selectedDataCollector
  );
  const user = useSelector((state) => state.user);
  console.log(selectedDataCollector);

  // state variable of this functional component
  const [newDataCollector, setNewDataCollector] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

  useEffect(() => {
    // get id of dataCollector from URL
    let dataCollectorId = match.params.id;

    // check if a new dataCollector is created
    if (dataCollectorId === "new") {
      // procedd with an empty element
      setNewDataCollector(true);
    } else {
      // trigger dataCollector load from backend
      setNewDataCollector(false);
      getDataCollector(dataCollectorId);
    }
  }, [match.params, refresh]);

  // for saving an existing dataCollector
  const onSave = (dataCollector, dataCollectorEvents) => {
    props.changeDataCollector(dataCollector, dataCollectorEvents);
    setRefresh(!refresh);
  };

  // for creating a new dataCollector
  const onCreate = (dataCollector) => {
    // trigger redux action add dataCollector
    props.addDataCollector(dataCollector);
    // navigate back to the dataCollector list
    props.history.push("/");
  };

  const onRefresh = () => {
    getDataCollector(selectedDataCollector.dataCollector._id);
  };

  return !selectedDataCollector.dataCollector &&
    !selectedDataCollector.error &&
    !newDataCollector ? (
    <Loading />
  ) : selectedDataCollector.error ? (
    <div>error</div>
  ) : newDataCollector ? (
    <DataCollectorDetailsComponent
      key={"newDataCollector"}
      new={true}
      // dataCollector={}
      onCreate={onCreate}
  
      isLoggedIn={!!user.user}
      isAdmin={!!user.user ? user.user.role === "admin" : false}
    />
  ) : selectedDataCollector.dataCollector ? (
    <DataCollectorDetailsComponent
      key={selectedDataCollector.dataCollector._id}
      dataCollector={selectedDataCollector.dataCollector}
      dataCollectorEvents={selectedDataCollector.dataCollectorEvents}
      onSave={onSave}
     å
      onRefresh={onRefresh}
      isLoggedIn={!!user.user}
      isAdmin={!!user.user ? user.user.role === "admin" : false}
    />
  ) : null;
}

// connect() establishes allows the usage of redux functionality
// here the function getDataCollector, changeDataCollector and addDataCollector are mentionend
// this is an alternative way of calling connecting them with redux
// another way is shown in DataCollectorListView.js
export default connect(null, {
  getDataCollector,
  changeDataCollector,
  addDataCollector,
})(DataCollectorDetailsView);
