import HttpService from "./HttpService";

export default class GraphService {
  static baseURL() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      return "http://localhost:4000/api/graph";
    } else {
      return "/api/graph";
    }
  }

  static getGraphs() {
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

  static getGraph(id) {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        `${GraphService.baseURL()}/${id}`,
        function (data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            // console.log(data);
            resolve(data);
          } else {
            reject("Error while retrieving Graph");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static deleteGraph(id) {
    return new Promise((resolve, reject) => {
      HttpService.remove(
        `${GraphService.baseURL()}/${id}`,
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

  static updateGraph(graph) {
    return new Promise((resolve, reject) => {
      HttpService.put(
        `${this.baseURL()}/${graph._id}`,
        graph,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static createGraph(graph) {
    graph.id = Math.floor(Math.random() * 100000000 + 1).toString();
    return new Promise((resolve, reject) => {
      HttpService.post(
        GraphService.baseURL(),
        graph,
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
