import HttpService from "./HttpService";

export default class DataCollectorService {
  static baseURL() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      return "http://localhost:4000/api/data-collector";
    } else {
      return "/api/data-collector";
    }
  }

  static getDataCollectors() {
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

  static getDataCollector(id) {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        `${DataCollectorService.baseURL()}/${id}`,
        function (data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject("Error while retrieving DataCollector");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getDataCollectorEvents(id) {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        `${DataCollectorService.baseURL()}/${id}/events`,
        function (data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject("Error while retrieving DataCollectorEvents");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getDataCollectorEventData(id, path) {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        `${DataCollectorService.baseURL()}/${id}/events/data/${path}`,
        function (data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            // console.log(data);
            resolve(data);
          } else {
            reject("Error while retrieving DataCollectorEventData");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static deleteDataCollector(id) {
    return new Promise((resolve, reject) => {
      HttpService.remove(
        `${DataCollectorService.baseURL()}/${id}`,
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

  static updateDataCollector(dataCollector) {
    return new Promise((resolve, reject) => {
      HttpService.put(
        `${this.baseURL()}/${dataCollector._id}`,
        dataCollector,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static createDataCollector(dataCollector) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        DataCollectorService.baseURL(),
        dataCollector,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getDataCollectorEventSchema(id) {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        `${DataCollectorService.baseURL()}/${id}/events/schema`,
        function (data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject("Error while retrieving DataCollectorEvents");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  // static getDataCollectorEventSchema(id) {
  //   return new Promise(async (resolve, reject) => {
  //     HttpService.get(
  //       `${DataCollectorService.baseURL()}/${id}/events/schema`,
  //       function (data) {
  //         if (data !== undefined || Object.keys(data).length !== 0) {
  //           resolve(data);
  //           //it works
  //         } else {
  //           reject("Error while retrieving FieldSchemas");
  //         }
  //       },
  //       function (textStatus) {
  //         reject(textStatus);
  //       }
  //     );
  //   });
  // }
}
