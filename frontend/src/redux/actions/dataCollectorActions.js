import DataCollectorService from "../../services/DataCollectorService";

export function getDataCollectors() {
  // when the backend call was successfull and the datacollectors are retrieved
  // in the dispatcher the datacollectors will be added to the global state
  function onSuccess(datacollectors) {
    return { type: "GETCOLLECTORS_SUCCESS", datacollectors: datacollectors };
  }
  // when the backend call was failed
  function onFailure(error) {
    // error handling
    console.log("failed to get the datacollectors", error);
  }

  return async (dispatch) => {
    try {
      // ask for the datacollectors in the backend
      let datacollectors = await DataCollectorService.getDataCollectors();
      // call onSuccess in context of redux
      dispatch(onSuccess(datacollectors));
    } catch (e) {
      onFailure(e);
    }
  };
}

export function deleteDataCollector(id) {
  function onSuccess(datacollectors) {
    return { type: "DELETECOLLECTOR_SUCCESS" };
  }
  function onFailure(error) {
    console.log("delete dataCollector failure", error);
  }

  return async (dispatch) => {
    try {
      let result = await DataCollectorService.deleteDataCollector(id);
      let actions = [onSuccess(result), getDataCollectors()];

      actions.map((a) => dispatch(a));

      // dispatch(onSuccess(datacollectors));
    } catch (e) {
      onFailure(e);
    }
  };
}

export function addDataCollector(dataCollector) {
  function onSuccess() {
    return { type: "ADDCOLLECTOR_SUCCESS" };
  }
  function onFailure(error) {
    console.log("add dataCollector failure", error);
  }

  return async (dispatch) => {
    try {
      let newDataCollector = await DataCollectorService.createDataCollector(
        dataCollector
      );
      let actions = [onSuccess(newDataCollector), getDataCollectors()];
      actions.map((a) => dispatch(a));
      // dispatch(onSuccess());
    } catch (e) {
      onFailure(e);
    }
  };
}

export function changeDataCollector(changedDataCollector, dataCollectorEvents) {
  function onSuccess(dataCollector, dataCollectorEvents) {
    return {
      type: "CHANGE_SELECTED_COLLECTOR",
      dataCollector: dataCollector,
      dataCollectorEvents: dataCollectorEvents,
    };
  }

  function onFailure(error) {
    // console.log("change dataCollector failure", error);
  }

  return async (dispatch) => {
    try {
      let dataCollector = await DataCollectorService.updateDataCollector(
        changedDataCollector
      );
      let actions = [
        onSuccess(dataCollector, dataCollectorEvents),
        getDataCollectors(),
      ];
      actions.map((a) => dispatch(a));
      //  dispatch(onSuccess(dataCollector, dataCollectorEvents));
    } catch (e) {
      onFailure(e);
    }
  };
}

export const getDataCollector = (id) => {
  function onSuccess(dataCollector, dataCollectorEvents) {
    return {
      type: "GETCOLLECTOR_SUCCESS",
      dataCollector: dataCollector,
      dataCollectorEvents: dataCollectorEvents,
    };
  }
  function onFailure(error) {
    // console.log("failed to load a dataCollector and events", error);
  }

  return async (dispatch, getState) => {
    try {
      let dataCollector = await DataCollectorService.getDataCollector(id);
      let dataCollectorEvents =
        await DataCollectorService.getDataCollectorEvents(id);
      dispatch(onSuccess(dataCollector, dataCollectorEvents));
    } catch (e) {
      onFailure(e);
    }
  };
};

export const getDataCollectorEvents = (id) => {
  function onSuccess(dataCollectorEvents) {
    return {
      type: "GETCOLLECTOREVENTS_SUCCESS",
      dataCollectorEvents: dataCollectorEvents,
    };
  }
  function onFailure(error) {
    // console.log("failed to load a dataCollectorEvents", error);
  }

  return async (dispatch, getState) => {
    try {
      let dataCollectorEvents =
        await DataCollectorService.getDataCollectorEvents(id);
      dispatch(onSuccess(dataCollectorEvents));
    } catch (e) {
      onFailure(e);
    }
  };
};



