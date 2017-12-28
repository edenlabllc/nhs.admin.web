import { CALL_API } from "redux-api-middleware";

export const invoke = ({ body, headers, ...config }, { auth = true } = {}) => (
  dispatch,
  getState,
  { req }
) =>
  dispatch({
    [CALL_API]: {
      ...config,
      body: typeof body === "string" ? body : JSON.stringify(body),
      headers: {
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
        Cookie: req ? req.headers.cookie : undefined, // use cookie from request in SSR mode
        ...headers
      },
      credentials: auth ? "same-origin" : "omit"
    }
  });
