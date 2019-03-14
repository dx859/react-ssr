export function queryString(search) {
  let queryobj = {};
  if (!search) {
    return queryobj;
  }
  search = search.substr(1);
  let querys = search.split("&");

  for (let i = 0; i < querys.length; i++) {
    let query = querys[i];
    let [key, value] = query.split("=");
    queryobj[key] = value;
  }
  return queryobj;
}

export function getTenantCode() {
  return window.location.pathname.split("/")[1];
}

export function createApiUrl(action, tenant) {
  // 获取租户代码
  tenant = !tenant ? getTenantCode() : encodeURIComponent(tenant);

  let paramsArray = [];
  paramsArray.push(`r=CzSupplier/api/run`);
  paramsArray.push(`o=${tenant}`);
  paramsArray.push(`p=${action}`);
  return "/api?" + paramsArray.join("&");
}

export function createServerApiUrl(action, apiPrefix, tenant) {
  let paramsArray = [];
  paramsArray.push(`r=CzSupplier/api/run`);
  paramsArray.push(`o=${tenant}`);
  paramsArray.push(`p=${action}`);
  return apiPrefix + "?" + paramsArray.join("&");
}
