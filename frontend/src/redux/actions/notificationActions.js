import NotificationService from "../../services/NotificationService";

export function getNotifications() {
  // when the backend call was successfull and the notifications are retrieved
  // in the dispatcher the notifications will be added to the global state
  function onSuccess(notifications) {
    return { type: "GETNOTIFICATIONS_SUCCESS", notifications: notifications };
  }
  // when the backend call was failed
  function onFailure(error) {
    // error handling
    console.log("failed to get the notifications", error);
  }

  return async (dispatch) => {
    try {
      //works OK
      // ask for the notifications in the backend
      let notifications = await NotificationService.getNotifications();
      // call onSuccess in context of redux
      dispatch(onSuccess(notifications));
    } catch (e) {
      onFailure(e);
    }
  };
}

export function deleteNotification(id) {
  function onSuccess(notifications) {
    return { type: "DELETENOTIFICATION_SUCCESS" };
  }
  function onFailure(error) {
    console.log("delete notification failure", error);
  }

  return async (dispatch) => {
    try {
      let result = await NotificationService.deleteNotification(id);
      let actions = [onSuccess(result), getNotifications()];

      actions.map((a) => dispatch(a));
    } catch (e) {
      onFailure(e);
    }
  };
}

export function addNotification(notification) {
  function onSuccess() {
    return { type: "ADDNOTIFICATION_SUCCESS" };
  }
  function onFailure(error) {
    console.log("add notification failure", error);
  }

  return async (dispatch) => {
    try {
      let result = await NotificationService.createNotification(notification);
      let actions = [onSuccess(result), getNotifications()];

      actions.map((a) => dispatch(a));
    } catch (e) {
      onFailure(e);
    }
  };
}

export function changeNotification(changedNotification) {
  function onSuccess(notification) {
    return { type: "UPDATENOTIFICATION_SUCCESS", notification: notification };
  }

  function onFailure(error) {
    console.log("change notification failure", error);
    return { type: "UPDATENOTIFICATION_ERROR", error: error };
  }

  return async (dispatch) => {
    try {
      let notification = await NotificationService.updateNotification(
        changedNotification
      );
      let actions = [onSuccess(notification), getNotifications()];

      actions.map((a) => dispatch(a));
    } catch (e) {
      let error = e;
      if (typeof error === "string") {
        error = {
          code: "UNKNOWN_ERROR",
          title: e,
          details: "Please try again!",
        };
      }
      dispatch(onFailure(error));
    }
  };
}

export const getNotification = (id) => {
  function onSuccess(notification) {
    return { type: "GETNOTIFICATION_SUCCESS", notification: notification };
  }
  function onFailure(error) {
    console.log("failed to load a notification and events", error);
  }

  return async (dispatch, getState) => {
    try {
      let notification = await NotificationService.getNotification(id);
      dispatch(onSuccess(notification));
    } catch (e) {
      onFailure(e);
    }
  };
};
