import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";

import { getNotifications, deleteNotification } from "../redux/actions";
import NotificationListComponent from "../components/Notification/NotificationListComponent";

/**
 * Manages the process of getting notification list data
 * @param {props} props
 */
function NotificationListView(props) {
     // state from the redux store
     const notifications = useSelector((state) => state.entities.notifications);
     const user = useSelector((state) => state.user);

     console.log(notifications);
     useEffect(() => {
          // load notifications when the page is loaded or the notifications have changed.
          if (!notifications) {
               loadNotifications();
          }
     }, [notifications]);

     const loadNotifications = async () => {
          // trigger the redux action getNotifications
          props.dispatch(getNotifications());
     };

     const onClickDeleteNotification = (id) => {
          // trigger the redux action delete Notifications
          props.dispatch(deleteNotification(id));
     };

     const onClickDisplayNotification = (id) => {
          // navigate to details of the selected notification
          props.history.push("/notification/" + id);
     };

     const onAddNotification = () => {
          // navigate to an empty mask for entering details of the new notification
          props.history.push("/notification/new");
     };

     return !notifications ? (
          // if no notifications are loaded, the above useEffect should be triggered
          "no notifications"
     ) : !Array.isArray(notifications) ? (
          // apperantly something went wrong, usually there should be some kind of error handling
          <div>error</div>
     ) : (
          // everyhing is fine an the notification list can be displayed
          <NotificationListComponent
               notifications={notifications}
               onClickDisplayNotification={onClickDisplayNotification}
               onClickDeleteNotification={onClickDeleteNotification}
               onAddNotification={onAddNotification}
               isLoggedIn={!!user.user}
               isAdmin={!!user.user ? user.user.role === "admin" : false}
          />
     );
}

// connect() establishes the connection to the redux functionalities
export default connect()(NotificationListView);
