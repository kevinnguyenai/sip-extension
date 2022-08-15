export const Cookie = (name, value, expr, path) => Object.create(
  {
    url: 'http://127.0.0.1',
    name: name,
    value: value,
    path: path || '/',
    expirationDate: (new Date().getTime()/1000) + expr,
  }
);

export const CookieRequest = (id, method, data) => Object.create(
  {
    id: id,
    method: method,
    data: data,
  }
);

export const CookieResponse = (id, method, result, data) => Object.create(
  {
    id: id,
    method: method,
    result: result,
    data: data,
  }
)
