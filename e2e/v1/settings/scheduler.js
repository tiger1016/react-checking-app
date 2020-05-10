/* globals after */

const { Builder, By, until } = require('selenium-webdriver')
const helper = require('../helper.js')
const config = require('../config.json')
const maxWaitForErrorResponse = 110000
const path = require('path')
const properties = require('properties-reader')
const scpr = properties(path.join(process.cwd(), 'e2e/v1/selectors', 'settings.scheduler.properties'))

let driver

const init = async function () {
  driver = new Builder().forBrowser('chrome').build()
  await driver.sleep(5000)
  helper.setDriver(driver)
}

const enableAllValues = async function () {
  describe('Test :Enable all values.  Set cutoff times to 6pm 1 Day Prior.  Verify they saved correctly.', function () {
  // Max time allowed for the test
    this.timeout(250000)
    it('Check user parameters', async function () {
      await init()
      // Build a browser
      // Set variables (if you want to)
      const usernameFieldSelector = 'form > input:nth-child(1)'
      const passwordFieldSelector = 'form > input:nth-child(2)'
      const submitButtonSelector = 'form > button'
      await driver.get(config.url_local)
      // Find username field and clear any text in it
      await helper.clear(await driver.findElement(By.css(usernameFieldSelector)))
      await helper.clear(await driver.findElement(By.css(passwordFieldSelector)))
      //      await driver.findElement(By.css(usernameFieldSelector)).clear()
      await driver.findElement(By.css(usernameFieldSelector)).sendKeys(config.username)
      //      await driver.findElement(By.css(passwordFieldSelector)).clear()
      await driver.findElement(By.css(passwordFieldSelector)).sendKeys(config.password)
      // Click on the submit button
      await driver.findElement(By.css(submitButtonSelector)).click()
    })

    it('Clicking to Settings > Scheduler', async function () {
      await driver.sleep(5000)
      await driver.wait(until.elementLocated(By.className('setting-link')), maxWaitForErrorResponse)
      await driver.sleep(15000)
      await driver.findElement(By.className('setting-link')).click()
      await driver.sleep(5000)
      await driver.wait(until.elementLocated(By.css('.input-section div:nth-child(2) label')), maxWaitForErrorResponse) // check if customer-billing form is loaded (to avoid a little timming issue)
      await driver.findElement(By.css('a.nav-tab-link:nth-child(4)')).click()
    })

    it('Adding Payroll Parameters', async function () {
      const button = '.ButtonGroup button'
      await driver.wait(until.elementLocated(By.css(scpr.get('enable_cancel_deadlines'))), maxWaitForErrorResponse)
      await driver.findElement(By.css(scpr.get('enable_request_deadlines'))).click() // payroll option
      await helper.assignSelect('.custom-form-inner-container div.InputGroup:nth-child(2)', 3)
      await helper.assignSelect('.custom-form-inner-container div.InputGroup:nth-child(3) div.input-section div.HourMinuteSelect div.HoursSelect', 7)
      await helper.assignSelect('.custom-form-inner-container div.InputGroup:nth-child(3) div.input-section div.HourMinuteSelect div.MinutesSelect', 11)
      await driver.findElement(By.css(scpr.get('enable_edit_deadlines'))).click() // payroll option
      await helper.assignSelect('.custom-form-inner-container div.InputGroup:nth-child(6) div.input-section div.HourMinuteSelect div.HoursSelect', 7)
      await helper.assignSelect('.custom-form-inner-container div.InputGroup:nth-child(6)  div.input-section div.HourMinuteSelect div.MinutesSelect', 11)
      await driver.findElement(By.css(scpr.get('enable_cancel_deadlines'))).click() // payroll option
      await helper.assignSelect('.custom-form-inner-container div.InputGroup:nth-child(9) div.input-section div.HourMinuteSelect div.HoursSelect', 7)
      await helper.assignSelect('.custom-form-inner-container div.InputGroup:nth-child(9)  div.input-section div.HourMinuteSelect div.MinutesSelect', 11)
      await driver.findElement(By.css(button)).click()
      await driver.wait(until.elementLocated(By.css(helper.successToa)), maxWaitForErrorResponse)
    })
    after(function () {
      driver.quit()
    })
  })
}

const run = async function () {
  await enableAllValues()
}

module.exports = {
  enableAllValues,
  run
}
