import axios from "axios";
import { createApiUrl } from "./urlUtils";

const apiFetch = function(action, data = {}) {
  let url = createApiUrl(action);

  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(response => {
        if (response.data.result) {
          resolve(response.data.data);
        } else {
          reject(response.data);
        }
      })
      .catch(e => reject(e.msg ? e.msg : { msg: "系统繁忙，请稍后再试" }));
  });
};

export default apiFetch;
