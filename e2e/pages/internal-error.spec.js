import puppeteer from 'puppeteer';
import config from '../config';

describe('Internal error page', () => {
  test(
    'Has correct text',
    async () => {
      const browser = await puppeteer.launch(config.puppeteer);
      const page = await browser.newPage();

      await page.goto(config.routes.public.internalError);
      await page.waitForSelector('h1');
      const text = await page.evaluate(
        () => document.querySelector('h1').innerText
      );

      expect(text).toEqual('Internal Error');

      browser.close();
    },
    config.jasmine
  );
});
