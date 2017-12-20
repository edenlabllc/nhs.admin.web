import puppeteer from "puppeteer";
import config from "../config";

// This suite should be rewritten to test only OAuth 2 compliace instead of
// testing whole authentication service UI
xdescribe("Login", () => {
  it(
    "User can login",
    async () => {
      const browser = await puppeteer.launch(config.puppeteer);
      const page = await browser.newPage();
      await page.setViewport({
        width: config.puppeteer.width,
        height: config.puppeteer.height
      });

      // Go to internal signIn page.
      await page.goto(config.routes.public.signIn);
      await page.waitForSelector("#sign-in-page > div > article > a");

      // Go to external login form.
      await page.click("#sign-in-page > div > article > a");

      // Fill login form.
      await page.waitForSelector('input[name="email"]');
      await page.waitForSelector('input[name="password"]');

      await page.type('input[name="email"]', config.user.login);
      await page.waitFor(config.delay); // React needs some time for input validation.

      await page.type('input[name="password"]', config.user.password);
      await page.waitFor(config.delay); // React needs some time for input validation.

      // Submit login form.
      await page.click("button[type=submit]");

      // Submit accept page.
      await page.waitForSelector("button[type=button]");
      await page.click("button[type=button]");

      // We must be on dashboard already.
      await page.waitForSelector("#dashboard-page > h1");
      const dashboardText = await page.evaluate(
        () => document.querySelector("#dashboard-page > h1").textContent
      );
      const dashboardUrl = page.url();
      expect(dashboardText).toEqual("Статистика");
      expect(dashboardUrl).toEqual(config.routes.private.dashboard);

      await browser.close();
    },
    config.jasmine
  );
});
