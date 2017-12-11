import puppeteer from "puppeteer";
import config from "../config";

describe("Trying to go to private route", () => {
  it(
    "Dashboard must redirect to sign-in page",
    async () => {
      const browser = await puppeteer.launch(config.puppeteer);
      const page = await browser.newPage();
      await page.setViewport({
        width: config.puppeteer.width,
        height: config.puppeteer.height
      });

      // Go to private route.
      await page.goto(config.routes.private.dashboard);
      await page.waitForSelector("#sign-in-page > div > article > a");

      // After redirect we must be on signIn page.
      const dashboardText = await page.evaluate(() => {
        return document.querySelector("#sign-in-page > div > article > a")
          .textContent;
      });

      expect(dashboardText).toEqual("Увійти за допомогою EHEALTH");

      await browser.close();
    },
    config.jasmine
  );
});
