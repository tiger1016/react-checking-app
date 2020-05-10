/* globals after */

const { Builder, By, Key, until } = require('selenium-webdriver')

const helper = require('../helper.js')

var config = require('../config.json')

const driver = new Builder().forBrowser('chrome').build()

// set the driver for helper module
helper.setDriver(driver)

async function clear (elem) {
  const text = await elem.getAttribute('value')
  const len = text.length
  let n = 0
  while (n < (2 * len)) {
    await elem.sendKeys(Key.DELETE)
    await elem.sendKeys(Key.BACK_SPACE)
    n++
  }
}

var test1 = async function () {
  describe('Test : Submit your selection, verify that it saved', function () {
  // Comment this 'let driver' and uncomment the driver definition on line 20
  // so edmond tests work also
    const maxWaitForErrorResponse = 110000
    // Max time allowed for the test
    this.timeout(250000)
    it('Check user parameters', async function () {
      try {
      // Build a browser
      // Set variables (if you want to)
        const usernameFieldSelector = 'form > input:nth-child(1)'
        const passwordFieldSelector = 'form > input:nth-child(2)'
        const submitButtonSelector = 'form > button'
        await driver.get(config.url_local)
        // Find username field and clear any text in it
        await clear(await driver.findElement(By.css(usernameFieldSelector)))
        await clear(await driver.findElement(By.css(passwordFieldSelector)))
        //      await driver.findElement(By.css(usernameFieldSelector)).clear()
        await driver.findElement(By.css(usernameFieldSelector)).sendKeys(config.username)
        //      await driver.findElement(By.css(passwordFieldSelector)).clear()
        await driver.findElement(By.css(passwordFieldSelector)).sendKeys(config.password)
        // Click on the submit button
        await driver.findElement(By.css(submitButtonSelector)).click()
      } catch (error) {
      // Always rethrow errors
        throw error
      }
    })

    it('Clicking to Settings > Staff payroll', async function () {
      await driver.sleep(5000)
      await driver.wait(until.elementLocated(By.className('setting-link')), maxWaitForErrorResponse)
      await driver.sleep(15000)
      await driver.findElement(By.className('setting-link')).click()
      await driver.wait(until.elementLocated(By.css('.input-section div:nth-child(2) input')), maxWaitForErrorResponse) // check if customer-billing form is loaded (to avoid a little timming issue)
      await driver.findElement(By.css('a.nav-tab-link:nth-child(2)')).click()
    })

    it('Adding Staff payroll Parameters', async function () {
      const button = '.ButtonGroup button'
      const chek1 = 'div.InputGroup:nth-child(2) div:nth-child(2) div:nth-child(2) label'
      const chek2 = 'div.InputGroup div:nth-child(2) div:nth-child(3) label'
      const chek3 = 'div.InputGroup:nth-child(2) div:nth-child(2) div:nth-child(2) label'
      await driver.wait(until.elementLocated(By.css(chek1)), maxWaitForErrorResponse)
      await driver.findElement(By.css(chek1)).click() // payroll option
      await driver.findElement(By.css(chek2)).click()
      await driver.findElement(By.css(chek3)).click()
      await driver.findElement(By.css(button)).click()
      await driver.wait(until.elementLocated(By.css(helper.success_validation_obj)), maxWaitForErrorResponse)
    })
    after(function () {
      driver.quit()
    })
  })
}

var run = async function () {
  await test1()
}

module.exports = {
  run
}
