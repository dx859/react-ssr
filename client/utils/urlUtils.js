export function queryString(search) {
  let queryobj = {};
  if (!search) {
    return queryobj;
  }
  search = search.substr(1);
  let querys = search.split('&');

  for (let i = 0; i < querys.length; i++) {
    let query = querys[i];
    let [key, value] = query.split('=');
    queryobj[key] = value;
  }
  return queryobj;
}