import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import {
  getNotification,
  changeNotification,
  addNotification,
  getDataCollectors,
  getFieldSchemas,
  dismissWarning,
} from "../redux/actions";
import NotificationDetailsComponent from "../components/Notification/NotificationDetailsComponent";
import Loading from "../components/General/Loading";

/**
 * Manages the process of getting notification details data
 * @param {props} props
 */
function NotificationDetailsView(props) {
  // props can be deconstructed into single variables, so you do not need to write "props." all the time
  let { match } = props;

  // from redux store
  const selectedNotification = useSelector(
    (state) => state.selectedNotification
  );
  const dataCollectors = useSelector((state) => state.entities.datacollectors);

  const user = useSelector((state) => state.user);

  // let collectorArray = [];
  // if (datacollectors) {
  //   collectorArray = datacollectors.map((datacollector) => {
  //     return {
  //       key: datacollector._id,
  //       text: datacollector.title,
  //       value: { id: datacollector._id, title: datacollector.title },
  //     };
  //   });
  // }

  // state variable of this functional component
  const [newNotification, setNewNotification] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

  useEffect(() => {
    // load datacollectors when the page is loaded or the datacollectors have changed.
    if (!dataCollectors) {
      loadDataCollectors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCollectors]);

  const loadDataCollectors = async () => {
    // trigger the redux action getDataCollectors
    props.dispatch(getDataCollectors());
  };

  useEffect(() => {
    // get id of dataCollector from URL
    let notificationId = match.params.id;

    // check if a new dataCollector is created
    if (notificationId === "new") {
      // procedd with an empty element
      setNewNotification(true);
    } else {
      setNewNotification(false);
      // trigger dataCollector load from backend
      props.dispatch(getNotification(notificationId));
    }
  }, [match.params]);

  useEffect(() => {
    console.log(selectedNotification);
  }, [selectedNotification]);

  // for saving an existing notification
  const onSave = (notification) => {
    console.log(" props.dispatch(changeNotification(notification));");
    props.dispatch(changeNotification(notification));
    // setRefresh(!refresh);
  };

  const retrieveSchema = (dataCollectorId) => {
    props.dispatch(getFieldSchemas(dataCollectorId));
  };

  const onDismissWarning = () => {
    props.dispatch(dismissWarning());
  };

  // for creating a new notification
  const onCreate = (notification) => {
    // trigger redux action add notification
    props.dispatch(addNotification(notification));
    // navigate back to the notification list
    props.history.push("/notifications");
  };
  return !dataCollectors && !dataCollectors?.length === 0 ? (
    <Loading />
  ) : newNotification ? (
    <NotificationDetailsComponent
      key={"newNotification"}
      dataCollectors={dataCollectors}
      new={true}
      isLoggedIn={!!user.user}
      retrieveSchema={retrieveSchema}
      onCreate={onCreate}
      onDismissWarning={onDismissWarning}
    />
  ) : selectedNotification.notification ? (
    <NotificationDetailsComponent
      key={selectedNotification.notification._id}
      notification={selectedNotification.notification}
      dataCollectors={dataCollectors}
      isLoggedIn={!!user.user}
      new={false}
      onSave={onSave}
      retrieveSchema={retrieveSchema}
      onDismissWarning={onDismissWarning}
    />
  ) : (
    <div>No case applied</div>
  );
}

// connect() establishes allows the usage of redux functionality
// here the function getNotification, changeNotification and addNotification are mentionend
// this is an alternative way of calling connecting them with redux
// another way is shown in NotificationListView.js
/*export default connect(null, { getNotification, changeNotification, addNotification, getDataCollectors })(
     NotificationDetailsView
);*/

export default connect()(NotificationDetailsView);
