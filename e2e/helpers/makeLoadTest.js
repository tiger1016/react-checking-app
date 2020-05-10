/* globals after, before */

const context = require('../context')
const env = require('../env')

// Helpers
const waitForLoggedIn = require('../helpers/waitForLoggedIn')

module.exports = function (browser, userType, tag, url, makeDescribe) {
  return function () {
    if (
      context.getChain() !== 'e2e' ||
      context.getChain() !== userType ||
      context.getChain() !== tag
    ) {
      context.setChain(`${tag}-loads`)
    }

    const msWait = env.E2E_TIMEOUT_SECONDS * 1000
    this.timeout(msWait)

    before(async function () {
      await waitForLoggedIn(browser)
      if (url) await browser.navigate().to(url)
    })
    after(function () {
      if (context.getChain() === `${tag}-loads`) {
        browser.quit()
      }
    })

    makeDescribe(msWait)
  }
}
