const { Key } = require('selenium-webdriver')

module.exports = async function waitForClearedInput (el) {
  const text = await el.getAttribute('value')
  const len = text.length
  let n = 0
  while (n < (2 * len)) {
    await el.sendKeys(Key.DELETE)
    await el.sendKeys(Key.BACK_SPACE)
    n++
  }

  return n === 0
}
