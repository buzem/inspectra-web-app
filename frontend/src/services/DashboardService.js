import HttpService from "./HttpService";

export default class DashboardService {
  static baseURL() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      return "http://localhost:4000/api/dashboard";
    } else {
      return "/api/dashboard";
    }
  }

  // static getDashboards() {
  //     return new Promise(async (resolve, reject) => {
  //         HttpService.get(
  //             DashboardService.baseURL(),
  //             function (data) {
  //                 console.log(data)
  //                 resolve(data);
  //             },
  //             function (textStatus) {
  //                 reject(textStatus);
  //             }
  //         );
  //     });
  // }

  static getDashboards() {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        DashboardService.baseURL(),
        function (data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject("Error while retrieving Dashboard");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getDashboard(id) {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        `${DashboardService.baseURL()}/${id}`,
        function (data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject("Error while retrieving Dashboard");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static deleteDashboard(id) {
    return new Promise((resolve, reject) => {
      HttpService.remove(
        `${DashboardService.baseURL()}/${id}`,
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

  static updateDashboard(dashboard) {
    return new Promise((resolve, reject) => {
      HttpService.put(
        `${this.baseURL()}/${dashboard._id}`,
        dashboard,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static createDashboard(dashboard) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        DashboardService.baseURL(),
        dashboard,
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
