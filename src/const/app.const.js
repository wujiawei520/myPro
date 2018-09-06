const appConst = {};

if (process.env.NODE_ENV === "development") {
  Object.assign(appConst, {
    REGION: "zh-cn",
    API_HOST: "https://easy-mock.com/mock/5b8e279cf48818592445f43b/myPro",
    TOKEN: "token",
    IS_HTML5_MODE: false,
    DEBUG: false
  });
}

export default appConst;
