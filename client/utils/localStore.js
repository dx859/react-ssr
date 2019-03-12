import {getTenantCode} from "./urlUtils";

export function getToken(tenant) {
  let token = getLocalData("token", tenant);
  return token === undefined ? "" : token;
}

export function setToken(value, tenant) {
  setLocalData("token", value, tenant);
}

export function getLocalData(key, tenant) {
  tenant = !tenant ? getTenantCode() : tenant;
  let data = window.localStorage.getItem(tenant);
  if (data === undefined) {
    return null;
  }
  try {
    data = JSON.parse(data);
  } catch (e) {
    return null;
  }

  if (typeof data === "object" && data !== null) {
    return data[key];
  }
  return null;
}

export function setLocalData(key, value, tenant) {
  tenant = tenant === undefined ? getTenantCode() : tenant;
  let data = window.localStorage.getItem(tenant);
  try {
    data = JSON.parse(data);
  } catch (e) {
    data = null;
  }
  if (typeof data !== "object" || data === null) {
    data = {};
  }
  data[key] = value;
  window.localStorage.setItem(tenant, JSON.stringify(data));
}
