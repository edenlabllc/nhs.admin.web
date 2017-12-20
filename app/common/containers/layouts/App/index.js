import React from "react";
import Helmet from "react-helmet";
import { translate } from "react-i18next";

import ErrorMessage from "containers/blocks/ErrorMessage";

const { APP_ENV = "local" } = global.process.env;

const ENV_TITLE = {
  preprod: "[Pre-production]",
  demo: "[Demo]",
  dev: "[Development]",
  local: "[Local]"
};

const App = ({ t, children }) => (
  <div>
    <Helmet
      htmlAttributes={{ lang: "ru", amp: undefined }} // amp takes no value
      titleTemplate={[ENV_TITLE[APP_ENV], "NHS - %s"].filter(Boolean).join(" ")}
      defaultTitle={t("head-default-title")}
      link={[
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/images/icons/apple-touch-icon.png"
        },
        {
          rel: "icon",
          type: "image/png",
          href: "/images/icons/favicon-32x32.png",
          sizes: "32x32"
        },
        {
          rel: "icon",
          type: "image/png",
          href: "/images/icons/favicon-16x16.png",
          sizes: "16x16"
        },
        { rel: "manifest", href: "/images/icons/manifest.json" },
        {
          rel: "mask-icon",
          href: "/images/icons/safari-pinned-tab.svg",
          color: "#2c83b5"
        },
        { rel: "shortcut icon", href: "/favicon.ico?v=216" }
      ]}
      meta={[
        { charset: "utf-8" },
        { name: "format-detection", content: "telephone=no" },
        { name: "description", content: t("head-description") },
        { property: "og:title", content: t("head-og-title") },
        { property: "og:site_name", content: "NHS" },
        { property: "og:description", content: t("head-og-description") },
        { name: "apple-mobile-web-app-title", content: "NHS" },
        { name: "application-name", content: "NHS" },
        { name: "msapplication-TileColor", content: "#2b5797" },
        {
          name: "msapplication-TileImage",
          content: "/images/icons/mstile-150x150.png"
        },
        {
          name: "msapplication-config",
          content: "/images/icons/browserconfig.xml"
        },
        { name: "theme-color", content: "#ffffff" }
      ]}
    />
    <ErrorMessage />
    {children}
  </div>
);

export default translate()(App);
