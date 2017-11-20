module.exports = {
  'Internal Error page.': browser => {
    const url = 'http://localhost:8080/internal-error/';

    browser
      .url(url)
      .waitForElementVisible('body', 5000)
      .assert.urlEquals(url) // Has no redirects.
      .assert.title('NHS - Internal Error') // Correct title.
      .end();
  }
};
