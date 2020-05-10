/* globals after */

const { Builder, By, until } = require('selenium-webdriver')

let driver

const helper = require('../helper.js')
const config = require('../config.json')
const path = require('path')
const properties = require('properties-reader')
const maxWaitForErrorResponse = 250000
const serchFieldCss = 'div.SearchInput input.search-input'

const globalproperties = properties(path.join(process.cwd(), 'e2e/v1/selectors', 'global.properties'))
const payrollproperties = properties(path.join(process.cwd(), 'e2e/v1/selectors', 'payroll.properties'))

async function randomN () {
  return Math.floor(Math.random() * (200000 - 1 + 1) + 1)
}

async function searchWalker (walkerInfo) {
  await driver.wait(until.elementLocated(By.css(serchFieldCss)), maxWaitForErrorResponse)
  await driver.findElement(By.css(serchFieldCss)).clear()
  await driver.findElement(By.css(serchFieldCss)).sendKeys(walkerInfo)
}

const init = async function () {
  driver = await new Builder().forBrowser('chrome').build()
  await driver.sleep(5000)
  helper.setDriver(driver)
}

const setDriver = async function (driver__) {
  driver = driver__
  await helper.setDriver(driver)
}

const login = async function () {
  describe('Test : Login ', function () {
    this.timeout(150000)
    it('log in', async function () {
      await init()
      // Go to url (in this case is localhost defined in the beginning of this file)
      await driver.get(config.url_local)
      // Find username field and clear any text in it
      await helper.clear(await driver.findElement(By.css(globalproperties.get('username'))))
      await helper.clear(await driver.findElement(By.css(globalproperties.get('password'))))
      await driver.findElement(By.css(globalproperties.get('username'))).sendKeys(config.username)
      await driver.findElement(By.css(globalproperties.get('password'))).sendKeys(config.password)
      // Click on the submit button
      await driver.findElement(By.css(globalproperties.get('submitbutton'))).click()
    })
  })
}

const toPayrollSection = async function () {
  describe('To payroll Section', function () {
    this.timeout(250000)
    it('Clicking to Staff Section', async function () {
      await driver.wait(until.elementLocated(By.css(payrollproperties.get('payroll_section_button'))), maxWaitForErrorResponse)
      await driver.findElement(By.css(payrollproperties.get('payroll_section_button'))).click()
    })
  })
}

const sendPayroll = function () {
  describe('Test : Checking the staff list.', function () {
    this.timeout(200000)

    it('Search for walker to check payroll', async function () {
      await driver.wait(until.elementLocated(By.css(payrollproperties.get('search_box'))), maxWaitForErrorResponse)
      //      await searchWalker('')
      driver.sleep(4000)
    })

    it('Checking if exist', async function () {
      await driver.wait(until.elementLocated(By.css(payrollproperties.get('send_firt_payroll'))), maxWaitForErrorResponse)
      await driver.findElement(By.css(payrollproperties.get('first_row'))).click()
    })

    it('Sending payroll', async function () {
      var confirmButton = payrollproperties.get('send_button')
      await driver.wait(until.elementLocated(By.css(confirmButton)), maxWaitForErrorResponse)
      await driver.findElement(By.css(confirmButton)).click()
      await driver.wait(until.elementLocated(By.css(helper.successToa)), maxWaitForErrorResponse)
      await helper.closeMifexist()
    })
    after(function () {
      driver.quit()
    })
  })
}

var run = async function () {
  await login()
  await toPayrollSection()
  await sendPayroll()
}

module.exports = {
  login,
  toPayrollSection,
  sendPayroll,
  randomN,
  searchWalker,
  setDriver,
  run
}
