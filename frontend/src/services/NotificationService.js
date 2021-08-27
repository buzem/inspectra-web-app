import HttpService from "./HttpService";

export default class NotificationService {
  static baseURL() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      return "http://localhost:4000/api/notification";
    } else {
      return "/api/notification";
    }
  }

  static getNotifications() {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        this.baseURL(),
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getNotification(id) {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        `${NotificationService.baseURL()}/${id}`,
        function (data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject("Error while retrieving Notification");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static deleteNotification(id) {
    return new Promise((resolve, reject) => {
      HttpService.remove(
        `${NotificationService.baseURL()}/${id}`,
        function (data) {
          if (data.message !== undefined) {
            resolve(data.message);
          } else {
            reject("Error while deleting");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static updateNotification(notification) {
    return new Promise((resolve, reject) => {
      HttpService.put(
        `${this.baseURL()}/${notification._id}`,
        notification,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static createNotification(notification) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        NotificationService.baseURL(),
        notification,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }
}
