import puppeteer from 'puppeteer';
import config from '../config';

describe('Sign in page', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch(config.puppeteer);
    page = await browser.newPage();
    await page.goto(config.routes.public.signIn);
  });

  afterEach(async () => {
    await browser.close();
  });

  it(
    'Has correct text',
    async () => {
      const text = await page.evaluate(
        () => document.querySelector('a').textContent
      );

      expect(text).toEqual('Увійти за допомогою EHEALTH');
    },
    config.jasmine
  );

  it(
    'Click to link will redirect to correct page',
    async () => {
      await page.waitForSelector('a');
      await page.click('a'); // Here will be redirect.

      await page.waitForSelector('h1');
      const text = await page.evaluate(
        () => document.querySelector('h1').textContent
      );
      expect(text).toEqual('Вхід у систему eHealth');

      const title = await page.title();
      expect(title).toEqual("Електронна система охорони здоров'я eHealth");
    },
    config.jasmine
  );
});
