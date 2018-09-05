import axios from "axios";
import appConst from "../../const/app.const";

const getAPIHost = url => {
  if (/^http(s)?:\/\//.test(url)) {
    return "";
  }
  return appConst.API_HOST;
};

function getAbsUrl(host, url) {
  if (host === "") {
    return url;
  }
  return `${host.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
}

function addHeaderToken(config) {
  if (!config.headers) {
    config.headers = {};
  }
  config.headers.Token = "c57fee8c96bdc10e88c57b69dbf148ed";
}

export default class Request {
  static postFile(url, fileBase64, config = {}) {
    let { host, ...other } = config;
    if (!host) {
      host = getAPIHost(url);
    }

    const requestConfig = {
      headers: {
        "Content-Type": "text/plain;charset=UTF-8"
      },
      ...other
    };
    addHeaderToken(requestConfig);

    const requestUrl = getAbsUrl(host, url);

    return axios({
      method: "post",
      url: requestUrl,
      data: fileBase64,
      ...requestConfig
    });
    // .then(requestValidate, wrapError)
  }

  static post(url, data, config = {}) {
    let { host, ...other } = config;
    if (!host) {
      host = getAPIHost(url);
    }

    const requestConfig = {
      ...other
    };
    addHeaderToken(requestConfig);

    const requestUrl = getAbsUrl(host, url);

    return axios({
      method: "post",
      url: requestUrl,
      data: data,
      ...requestConfig
    });
    // .then(requestValidate, wrapError)
  }

  static get(url, data, config = {}) {
    let { host, ...other } = config;
    if (!host) {
      host = getAPIHost(url);
    }

    const requestConfig = {
      ...other
    };
    addHeaderToken(requestConfig);

    const requestUrl = getAbsUrl(host, url);

    return axios({
      method: "get",
      url: requestUrl,
      params: { Params: data },
      ...requestConfig
    });
    // .then(requestValidate, wrapError)
  }
}
