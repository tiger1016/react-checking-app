/* globals after */

const { Builder, By, until } = require('selenium-webdriver')
const helper = require('../helper.js')
const config = require('../config.json')
const path = require('path')
const properties = require('properties-reader')
const globalproperties = properties(path.join(process.cwd(), 'e2e/v1/selectors', 'global.properties'))
const cbpr = properties(path.join(process.cwd(), 'e2e/v1/selectors', 'settings.customer-billing.properties'))
let driver

const init = async function () {
  driver = await new Builder().forBrowser('chrome').build()
  await helper.setDriver(driver)
}

var settingCustomerBillingInfo = async function () {
  describe('Test : Submit your selection, verify that it saved', function () {
  // Comment this 'let driver' and uncomment the driver definition on line 20
  // so edmond tests work also
    const maxWaitForErrorResponse = 110000
    // Max time allowed for the test
    this.timeout(250000)
    it('log in', async function () {
      await init()
      // Go to url (in this case is localhost defined in the beginning of this file)
      await driver.get(config.url_local)
      await driver.wait(until.elementLocated(By.css(globalproperties.get('password'))), maxWaitForErrorResponse)
      await helper.clear(await driver.findElement(By.css(globalproperties.get('username'))))
      await helper.clear(await driver.findElement(By.css(globalproperties.get('password'))))
      await driver.findElement(By.css(globalproperties.get('username'))).sendKeys(config.username)
      await driver.findElement(By.css(globalproperties.get('password'))).sendKeys(config.password)
      // Click on the submit button
      await driver.findElement(By.css(globalproperties.get('submitbutton'))).click()
    })

    it('Clicking to Settings > Customer Billing', async function () {
      await driver.sleep(5000)
      await driver.wait(until.elementLocated(By.className('setting-link')), maxWaitForErrorResponse)
      await driver.findElement(By.className('setting-link')).click()
      await driver.wait(until.elementLocated(By.css('a.nav-tab-link:nth-child(1)')), maxWaitForErrorResponse)
    })

    it('Adding Customer Billing Parameters', async function () {
      const button = '.ButtonGroup button'
      await driver.wait(until.elementLocated(By.css(cbpr.get('cust_prepays_checkbox'))), maxWaitForErrorResponse)
      // billing timing
      await driver.findElement(By.css(cbpr.get('cust_prepays_checkbox'))).click()
      // billing frecuncy
      await driver.findElement(By.css(cbpr.get('billing_frec_checkbox_biweekly'))).click()
      //      await helper.assignSelect('div.DaysOfMonthSelect div.Select', 5)
      await driver.findElement(By.css(button)).click()
      await driver.wait(until.elementLocated(By.css(helper.successToa)), maxWaitForErrorResponse)
    })
    after(function () {
      driver.quit()
    })
  })
}

var run = async function () {
  await settingCustomerBillingInfo()
}

module.exports = {
  run
}
