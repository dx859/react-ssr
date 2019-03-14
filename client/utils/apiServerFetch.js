import axios from "axios";
import {createServerApiUrl} from "./urlUtils";

const apiServerFetch = (apiPrefix, tenant) => (action, data = {}) => {
  let url = createServerApiUrl(action, apiPrefix, tenant);
  console.log(url)
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

export default apiServerFetch;
