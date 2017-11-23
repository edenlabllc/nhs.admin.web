const appUrlBase = 'http://localhost:8080';
const width = 1024;
const height = 768;
const debugMode = process.env.DEBUG === 'true';

const config = {
  debug: debugMode,
  puppeteer: {
    headless: !debugMode,
    slowMo: debugMode ? 250 : 0,
    args: [`--window-size=${width},${height}`]
  },
  jasmine: 16000,
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
