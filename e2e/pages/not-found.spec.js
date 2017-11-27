import puppeteer from 'puppeteer';
import config from '../config';

describe('Not found page', () => {
  it(
    'Has correct text',
    async () => {
      const browser = await puppeteer.launch(config.puppeteer);
      const page = await browser.newPage();
      await page.setViewport({
        width: config.puppeteer.width,
        height: config.puppeteer.height
      });

      await page.goto(config.routes.public.notFound);
      await page.waitForSelector('#not-found-page > div > h1');
      const text = await page.evaluate(
        () => document.querySelector('#not-found-page > div > h1').innerText
      );

      expect(text).toEqual('Сторінка не знайдена');

      browser.close();
    },
    config.jasmine
  );
});
