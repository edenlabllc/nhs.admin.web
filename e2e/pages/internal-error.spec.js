import puppeteer from 'puppeteer';
import config from '../config';

describe('Internal error page', () => {
  it(
    'Has correct text',
    async () => {
      const browser = await puppeteer.launch(config.puppeteer);
      const page = await browser.newPage();
      await page.setViewport({
        width: config.puppeteer.width,
        height: config.puppeteer.height
      });

      await page.goto(config.routes.public.internalError);
      await page.waitForSelector('#internal-error-page > div > h1');
      const text = await page.evaluate(() => {
        return document.querySelector('#internal-error-page > div > h1')
          .innerText;
      });

      expect(text).toEqual('Internal Error');

      browser.close();
    },
    config.jasmine
  );
});
