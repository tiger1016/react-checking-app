const { By } = require('selenium-webdriver')

// Helpers
const waitForElementFound = require('./waitForElementFound')

module.exports = async function (
  browser,
  parentElement,
  selectOption,
  msWait,
  debug = false,
  wait = false
) {
  try {
    const elementName = `${parentElement} div.Select-control`
    const optionsCss = `${parentElement} div.Select-menu-outer`

    const element = await browser.findElement(By.css(elementName))
    await element.click()

    await waitForElementFound(browser, optionsCss, msWait)
    const el = await browser.findElement(By.css(optionsCss + ' div.Select-option:nth-child(' + selectOption + ')'))
    await el.click()
  } catch (e) {
    throw e
  }
}
