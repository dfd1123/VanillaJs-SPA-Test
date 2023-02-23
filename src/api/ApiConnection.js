import axios from 'axios';

function objectToQueryString(obj) {
  const keyValuePairs = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = encodeURIComponent(obj[key]);
      keyValuePairs.push(`${key}=${value}`);
    }
  }

  return keyValuePairs.join('&');
}

export default class ApiConnection {
  #axios;
  #responseHandler;

  constructor(baseURL, handler) {
    this.#axios = axios.create({ baseURL });
    this.#axios.interceptors.request.use(handler.request);
    this.#responseHandler = handler.response;
  }

  get(path, params, config) {
    const uri = `${path}?${objectToQueryString(params)}`;
    return this.#responseHandler(this.#axios.get(path, {...config, params}));
  }

  post(path, data, config) {
    return this.#responseHandler(this.#axios.post(path, data, config));
  }

  put(path, data, config) {
    return this.#responseHandler(this.#axios.put(path, data, config));
  }

  delete(path, config) {
    return this.#responseHandler(this.#axios.delete(path, config));
  }
}
