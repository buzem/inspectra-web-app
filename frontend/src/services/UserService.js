import HttpService from "./HttpService";

export default class UserService {
  static baseURL() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      return "http://localhost:4000/api/auth";
    } else {
      return "/api/auth";
    }
  }

  static register(user, pass) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${UserService.baseURL()}/register`,
        {
          username: user,
          password: pass,
        },
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static login(user, pass) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${UserService.baseURL()}/login`,
        {
          username: user,
          password: pass,
        },
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static logout() {
    window.localStorage.removeItem("jwtToken");
  }
}
