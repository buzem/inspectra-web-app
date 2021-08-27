import DataCollectorService from "../../services/DataCollectorService";

export const getFieldSchemas = (id) => {
  function onSuccess(fieldSchemas) {
    // console.log("GETFIELDSCHEMAS_SUCCESS");
    return { type: "GETFIELDSCHEMAS_SUCCESS", fieldSchemas: fieldSchemas };
  }
  function onFailure(error) {
    // console.log("failed to load a dataCollectorEvents", error);
    return { type: "GETFIELDSCHEMAS_ERROR", error: error };
  }

  return async (dispatch, getState) => {
    try {
      let fieldSchemas = await DataCollectorService.getDataCollectorEventSchema(
        id
      );
      // console.log(fieldSchemas);
      dispatch(onSuccess(fieldSchemas));
    } catch (e) {
      let error = e;
      if (typeof error === "string") {
        error = {
          code: "UNKNOWN_ERROR",
          title: e,
          dataCollectorId: id,
          details: "Please try again!",
        };
        dispatch(onFailure(error));
      }
    }
  };
};
