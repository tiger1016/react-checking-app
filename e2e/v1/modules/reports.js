/* globals after */

const properties = require('properties-reader')
const { Builder, By, Key, until } = require('selenium-webdriver')
const path = require('path')
let driver
const helper = require('../helper.js')
const config = require('../config.json')
const globalproperties = properties(path.join(process.cwd(), 'e2e/v1/selectors', 'global.properties'))
const reportproperties = properties(path.join(process.cwd(), 'e2e/v1/selectors', 'report.properties'))

const maxWaitForErrorResponse = 110000

const init = async function () {
  driver = await new Builder().forBrowser('chrome').build()
  await driver.sleep(5000)
  helper.setDriver(driver)
}

const setDriver = async function (driver__) {
  driver = driver__
  await helper.setDriver(driver)
}

const login = function () {
  describe('Test : Login ', function () {
    // Comment this 'let driver' and uncomment the driver definition on line 20
    // so edmond tests work also
    // Max time allowed for the test
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

const toReportsSection = async function () {
  describe('To Reports Section', function () {
    this.timeout(250000)
    it('Clicking to Reports', async function () {
      await driver.wait(until.elementLocated(By.css(reportproperties.get('report_section'))), maxWaitForErrorResponse)
      await driver.findElement(By.css(reportproperties.get('report_section'))).click()
      await driver.sleep(2000)
    })
  })
}

const disbursementReport = function () {
  describe('Generating Disbursement report', function () {
    // Max time allowed for the test
    this.timeout(150000)
    it('clicking to Disbursement tab', async function () {
      await driver.wait(until.elementLocated(By.css(reportproperties.get('disbursement_tab'))), maxWaitForErrorResponse)
      await driver.findElement(By.css(reportproperties.get('disbursement_tab'))).click()
    })

    it('setting start and end Date', async function () {
      await driver.wait(until.elementLocated(By.css('div.filter-container')), maxWaitForErrorResponse)
      await helper.clear(await driver.findElement(By.css(reportproperties.get('disbursement_start'))))
      await driver.sleep(2000)
      await driver.findElement(By.css(reportproperties.get('disbursement_start'))).sendKeys('01/01/2017')
      await driver.findElement(By.css(reportproperties.get('disbursement_start'))).sendKeys(Key.ESCAPE)
      await helper.clear(await driver.findElement(By.css(reportproperties.get('disbursement_end'))))
      await driver.sleep(2000)
      await driver.findElement(By.css(reportproperties.get('disbursement_end'))).sendKeys('01/01/2018')
      await driver.findElement(By.css(reportproperties.get('disbursement_end'))).sendKeys(Key.ESCAPE)
      await driver.findElement(By.css('div.action-container button')).click()
      await driver.wait(until.elementLocated(By.css('div.reportResult')), maxWaitForErrorResponse)
      await driver.sleep(2000)
    })
  })
}

const recievablesReport = function () {
  describe('Generating Recievables report', function () {
    this.timeout(150000)
    it('setting start and end Date', async function () {
      await driver.wait(until.elementLocated(By.css(reportproperties.get('receovables_tab'))), maxWaitForErrorResponse)
      await driver.findElement(By.css(reportproperties.get('receovables_tab'))).click()
      await driver.wait(until.elementLocated(By.css('div.filter-container')), maxWaitForErrorResponse)
      await helper.clear(await driver.findElement(By.css(reportproperties.get('receivables_start'))))
      await driver.findElement(By.css(reportproperties.get('receivables_start'))).sendKeys('01/01/2017')
      await driver.findElement(By.css(reportproperties.get('receivables_start'))).sendKeys(Key.ESCAPE)
      await driver.sleep(3000)
      await helper.clear(await driver.findElement(By.css(reportproperties.get('receivables_end'))))
      await driver.findElement(By.css(reportproperties.get('receivables_end'))).sendKeys('01/01/2018')
      await driver.findElement(By.css(reportproperties.get('receivables_end'))).sendKeys(Key.ESCAPE)
      await driver.sleep(3000)
      await helper.assignSelect('div.filter-container div:nth-child(4) div.is-searchable', 1, false, true)
      await driver.findElement(By.css('div.action-container button')).click()
    })
  })
}

const activityReport = function () {
  describe('Generating Activity report', function () {
    // Max time allowed for the test
    this.timeout(150000)
    it('setting start and end Date', async function () {
      await driver.wait(until.elementLocated(By.css(reportproperties.get('activity_tab'))), maxWaitForErrorResponse)
      await driver.findElement(By.css(reportproperties.get('activity_tab'))).click()
      await driver.wait(until.elementLocated(By.css('div.filter-container')), maxWaitForErrorResponse)
      await helper.clear(await driver.findElement(By.css(reportproperties.get('receivables_start'))))
      await driver.findElement(By.css(reportproperties.get('receivables_start'))).sendKeys('01/01/2017' + Key.ESCAPE)
      await helper.clear(await driver.findElement(By.css(reportproperties.get('receivables_end'))))
      await driver.findElement(By.css(reportproperties.get('receivables_end'))).sendKeys('01/01/2018' + Key.ESCAPE)
      await driver.sleep(3000)
      await helper.assignSelect(reportproperties.get('sales_staff'), 1, false, true)
      await helper.assignSelect(reportproperties.get('sales_customer'), 1, false, true)
      await helper.assignSelect(reportproperties.get('activity_status'), 1, false, true)
      await helper.assignSelect(reportproperties.get('sales_service'), 1, false, true)
      await driver.findElement(By.css('div.action-container button')).click()
    })
  })
}

const walkAuditReport = function () {
  describe('Generating Walk Audit report', function () {
    // Max time allowed for the test
    this.timeout(150000)
    it('setting start and end Date', async function () {
      await driver.wait(until.elementLocated(By.css(reportproperties.get('walk_audit_tab'))), maxWaitForErrorResponse)
      await driver.findElement(By.css(reportproperties.get('walk_audit_tab'))).click()
      await driver.wait(until.elementLocated(By.css('div.filter-container')), maxWaitForErrorResponse)
      await helper.clear(await driver.findElement(By.css(reportproperties.get('receivables_start'))))
      await driver.findElement(By.css(reportproperties.get('receivables_start'))).sendKeys('01/01/2017' + Key.ESCAPE)
      await helper.clear(await driver.findElement(By.css(reportproperties.get('sales_end'))))
      await driver.findElement(By.css(reportproperties.get('sales_end'))).sendKeys('01/01/2018' + Key.ESCAPE)
      await helper.assignSelect(reportproperties.get('sales_staff'), 2, false, true)
      await helper.assignSelect(reportproperties.get('sales_customer'), 2, false, true)
      await driver.findElement(By.css('div.action-container button')).click()
    })
  })
}

const transactionReport = function () {
  describe('Generating Transactions report', function () {
    // Max time allowed for the test
    this.timeout(150000)
    it('setting start and end Date', async function () {
      await driver.wait(until.elementLocated(By.css(reportproperties.get('transaction_tab'))), maxWaitForErrorResponse)
      await driver.findElement(By.css(reportproperties.get('transaction_tab'))).click()
      await driver.wait(until.elementLocated(By.css('div.filter-container')), maxWaitForErrorResponse)
      await helper.clear(await driver.findElement(By.css(reportproperties.get('transaction_start'))))
      await driver.findElement(By.css(reportproperties.get('transaction_start'))).sendKeys('01/01/2017' + Key.ESCAPE)
      await helper.clear(await driver.findElement(By.css(reportproperties.get('transaction_end'))))
      await driver.findElement(By.css(reportproperties.get('transaction_end'))).sendKeys('01/01/2018' + Key.ESCAPE)
      await driver.wait(until.elementLocated(By.css(reportproperties.get('transaction_payment'))), maxWaitForErrorResponse)
      await helper.assignSelect(reportproperties.get('transaction_payment'), 2, false, true)
      await helper.assignSelect(reportproperties.get('transaction_customer'), 2, false, true)
      await driver.findElement(By.css('div.action-container button')).click()
    })
  })
}

const qrCodesReport = function () {
  describe('Generating Qr codes report', function () {
  // Max time allowed for the test
    this.timeout(150000)
    it('setting start and end Date', async function () {
      await driver.wait(until.elementLocated(By.css(reportproperties.get('qr_codes_tab'))), maxWaitForErrorResponse)
      await driver.findElement(By.css(reportproperties.get('qr_codes_tab'))).click()
      await driver.wait(until.elementLocated(By.css('div.filter-container')), maxWaitForErrorResponse)
      await helper.assignSelect(reportproperties.get('sales_customer'), 2, false, true)
      await driver.findElement(By.css('div.action-container button')).click()
    })
  })
}

const customerMailingReport = function () {
  describe('Generating Customer mailing  report', function () {
    // Max time allowed for the test
    this.timeout(150000)

    it('setting start and end Date', async function () {
      await driver.wait(until.elementLocated(By.css(reportproperties.get('customer_mailing_tab'))), maxWaitForErrorResponse)
      await driver.findElement(By.css(reportproperties.get('customer_mailing_tab'))).click()
      await driver.wait(until.elementLocated(By.css('div.filter-container')), maxWaitForErrorResponse)
      await helper.assignSelect(reportproperties.get('activity_status'), 2, false, false)
      await helper.assignSelect(reportproperties.get('sales_zip'), 2, false, true)
      await helper.assignSelect(reportproperties.get('cust_mailing_state'), 2, false, true)
      await helper.assignSelect(reportproperties.get('cust_mailing_city'), 2, false, true)
      await driver.findElement(By.css('div.action-container button')).click()
    })
    after(function () {
      driver.quit()
    })
  })
}

const salesReport = function () {
  describe('Generating Sales  report', function () {
    // Max time allowed for the test
    this.timeout(150000)
    it('setting start and end Date', async function () {
      await driver.wait(until.elementLocated(By.css(reportproperties.get('sales_tab'))), maxWaitForErrorResponse)
      await driver.findElement(By.css(reportproperties.get('sales_tab'))).click()
      await driver.wait(until.elementLocated(By.css('div.filter-container')), maxWaitForErrorResponse)
      await helper.clear(await driver.findElement(By.css(reportproperties.get('sales_start'))))
      await driver.findElement(By.css(reportproperties.get('sales_start'))).sendKeys('01/01/2017' + Key.ESCAPE)
      await helper.clear(await driver.findElement(By.css(reportproperties.get('sales_end'))))
      await driver.findElement(By.css(reportproperties.get('sales_end'))).sendKeys('01/01/2018' + Key.ESCAPE)
      await helper.assignSelect(reportproperties.get('sales_type'), 2, false, true)
      await helper.assignSelect(reportproperties.get('sales_customer'), 2, false, true)
      await helper.assignSelect(reportproperties.get('sales_staff'), 2, false, true)
      await helper.assignSelect(reportproperties.get('sales_service'), 2, false, true)
      await helper.assignSelect(reportproperties.get('sales_addon'), 2, false, true)
      await helper.assignSelect(reportproperties.get('sales_zip'), 2, false, true)
      await driver.findElement(By.css('div.action-container button')).click()
    })
  })
}

const payrollReport = function () {
  describe('Generating Payroll  report', function () {
    // Max time allowed for the test
    this.timeout(150000)
    it('setting start and end Date', async function () {
      await driver.wait(until.elementLocated(By.css(reportproperties.get('payroll_tab'))), maxWaitForErrorResponse)
      await driver.findElement(By.css(reportproperties.get('payroll_tab'))).click()
      await driver.wait(until.elementLocated(By.css('div.filter-container')), maxWaitForErrorResponse)
      await driver.findElement(By.css(reportproperties.get('sales_start'))).clear()
      await driver.findElement(By.css(reportproperties.get('sales_start'))).sendKeys('01/01/2017' + Key.ESCAPE)
      await driver.findElement(By.css(reportproperties.get('sales_end'))).clear()
      await driver.findElement(By.css(reportproperties.get('sales_end'))).sendKeys('01/01/2018' + Key.ESCAPE)
      await helper.assignSelect(reportproperties.get('sales_staff'), 2, false, true)
      await driver.findElement(By.css('div.action-container button')).click()
    })
  })
}

var run = async function () {
  await login()
  await toReportsSection()
  await transactionReport()
  await salesReport()
  await disbursementReport()
  await recievablesReport()
  await activityReport()
  await walkAuditReport()
  await payrollReport()
  await qrCodesReport()
  await customerMailingReport()
}

module.exports = {
  run,
  login,
  toReportsSection,
  disbursementReport,
  recievablesReport,
  setDriver,
  activityReport
}
