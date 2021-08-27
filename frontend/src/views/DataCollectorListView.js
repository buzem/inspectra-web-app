import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";

import { getDataCollectors, deleteDataCollector } from "../redux/actions";
import DataCollectorListComponent from "../components/DataCollector/DataCollectorListComponent";
import Loading from "../components/General/Loading";

/**
 * Manages the process of getting dataCollector list data
 * @param {props} props
 */
function DataCollectorListView(props) {
  // state from the redux store
  const datacollectors = useSelector((state) => state.entities.datacollectors);
  const user = useSelector((state) => state.user);
  console.log(datacollectors);

  useEffect(() => {
    // load datacollectors when the page is loaded or the datacollectors have changed.
    if (!datacollectors) {
      loadDataCollectors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datacollectors]);


  const loadDataCollectors = async () => {
    // trigger the redux action getDataCollectors
    props.dispatch(getDataCollectors());
  };

  const onClickDeleteDataCollector = (id) => {
    // trigger the redux action delete DataCollectors
    props.dispatch(deleteDataCollector(id));
  };

  const onClickDisplayDataCollector = (id) => {
    // navigate to details of the selected dataCollector
    props.history.push("/data-collector/" + id);
  };

  const onAddDataCollector = () => {
    // navigate to an empty mask for entering details of the new dataCollector
    props.history.push("/data-collector/new");
  };

  return !datacollectors ? (
    // if no datacollectors are loaded, the above useEffect should be triggered
    <Loading />
  ) : !Array.isArray(datacollectors) ? (
    // apperantly something went wrong, usually there should be some kind of error handling
    <div>error</div>
  ) : (
    // everyhing is fine an the dataCollector list can be displayed
    <DataCollectorListComponent
      datacollectors={datacollectors}
      onClickDisplayDataCollector={onClickDisplayDataCollector}
      onClickDeleteDataCollector={onClickDeleteDataCollector}
      onAddDataCollector={onAddDataCollector}
      isLoggedIn={!!user.user}
    />
  );
}

// connect() establishes the connection to the redux functionalities
export default connect()(DataCollectorListView);
