import axios from "axios";
import appConst from "../../const/app.const";
import { BusinessError, HttpSystemError, HttpBusinessError } from "./exception";

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

function requestValidate(response) {
  if (response.status !== 200) {
    const msg = "系统错误！";
    throw new HttpBusinessError(response.request, response, msg);
  }
  return response;
}

function wrapError(error) {
  const { response } = error;
  if (!response) {
    throw new BusinessError(error.message);
  }

  const { status } = response;
  if (status === 403) {
    throw new BusinessError("没有权限访问当前页面");
  } else {
    throw new HttpSystemError(
      response.request,
      response,
      `系统出现异常: status: ${response.status}, ${response.statusText}`
    );
  }
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
    }).then(requestValidate, wrapError);
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
    }).then(requestValidate, wrapError);
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
      params: { data: data },
      ...requestConfig
    }).then(requestValidate, wrapError);
  }
}
