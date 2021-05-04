import axios from "axios";

export const Api = {
  get: getCall,
  post: postCall,
};
let baseURL = "";
if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:8087/";
} else {
  baseURL = "/api/";
}

function getCall(url: any) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: baseURL.concat(url),
    //   withCredentials: true,
    //   headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function postCall(url: any, data: any) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: baseURL.concat(url),
      data: data,
      withCredentials: true,
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
