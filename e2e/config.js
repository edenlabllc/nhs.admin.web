/**
 * @link https://github.com/motdotla/dotenv
 */
require("dotenv").config();

const appUrlBase = "http://localhost:8080";
const width = 1024;
const height = 768;
const debugMode = process.env.DEBUG === "true";

const config = {
  user: {
    login: process.env.TEST_USER_LOGIN,
    password: process.env.TEST_USER_PASSWORD
  },
  debug: debugMode,
  puppeteer: {
    headless: !debugMode,
    slowMo: debugMode ? 100 : 0,
    args: [`--window-size=${width},${height}`],
    width: width,
    height: height
  },
  delay: 2000,
  jasmine: 64000,
  routes: {
    baseUrl: appUrlBase,
    public: {
      internalError: `${appUrlBase}/internal-error/`,
      signIn: `${appUrlBase}/sign-in/`,
      notFound: `${appUrlBase}/asdfasdfasdf/`
    },
    private: {
      dashboard: `${appUrlBase}/dashboard/`
    }
  }
};

export default config;
