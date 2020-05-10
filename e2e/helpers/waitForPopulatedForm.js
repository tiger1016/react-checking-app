/*
Populates a form given an object of
for names
*/

const { By } = require('selenium-webdriver')

// Helpers
const waitForClearedInput = require('./waitForClearedInput')
const waitForElementFound = require('./waitForElementFound')

module.exports = async function (browser, containerS, formObj, msWait) {
  try {
    const keys = Object.keys(formObj)
    const firstInputS = `${containerS} input[name="${keys[0]}"]`

    await waitForElementFound(browser, firstInputS, msWait)

    await Promise.all(keys.map(v => async () => {
      const currentInputS = `${containerS} input[name="${v}"]`
      await waitForElementFound(browser, currentInputS, msWait)
      const el = await browser.findElement(By.css(currentInputS))
      await el.clear()
      await waitForClearedInput(el)
      await el.sendKeys(formObj[v])
    }))
  } catch (e) {
    throw e
  }
}
