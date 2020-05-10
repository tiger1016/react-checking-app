const chrome = require('selenium-webdriver/chrome')
const env = require('./env')
const firefox = require('selenium-webdriver/firefox')
const { Builder } = require('selenium-webdriver')

const screen = {
  width: process.env.E2E_IS_MOBILE ? 768 : 1080,
  height: 720
}

let browser = new Builder()
  .usingServer()
  .withCapabilities({ browserName: env.E2E_BROWSER || 'chrome' })

if (!env.E2E_NOT_HEADLESS) {
  browser = browser
    .setChromeOptions(new chrome.Options().headless())
    .setFirefoxOptions(new firefox.Options().headless())
}

const build = browser.build()
build.manage().window().setRect(screen)

module.exports = build
