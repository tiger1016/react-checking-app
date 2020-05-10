/* globals after */

const config = require('../config.json')
const path = require('path')
const moment = require('moment-timezone')
const { Builder, By, Key, until } = require('selenium-webdriver')
const properties = require('properties-reader')
const helper = require('../helper.js')
const scheduler = require('./scheduler.js')
const successValidationObj = 'div.Toastify__toast--success'

const maxWaitForErrorResponse = 250000
const serchFieldCss = "div.filter-search-bar input[name='search']"
const invoicingpr = properties(path.join(process.cwd(), 'e2e/v1/selectors', 'invoicing.properties'))
let driver

/** USEFULL FUNCTIONS */
async function openInvoice (childList) {
  await driver.findElements(By.css('div.ReactTable div.rt-table div.rt-tbody > div:nth-child(' + childList + ') > div > div:nth-child(8) > div > span.ion-edit.ions-style')).then(async function (elements) { // check for modal
    var length = elements.length
    if (length > 0) {
      await driver.findElement(By.css('div.ReactTable div.rt-table div.rt-tbody div.rt-tr-group:nth-child(' + childList + ')')).click()
      await driver.sleep(3000)
      await console.log('openned')
      await closeModal()
    }
  })
}

async function removeInvoice (childList) { // remove child number (childList) invoice on list
  await driver.wait(until.elementLocated(By.css('div.ReactTable div.rt-table div.rt-tbody div.rt-tr-group:nth-child(' + childList + ') span.ion-android-delete')), maxWaitForErrorResponse)
  await driver.findElement(By.css('div.ReactTable div.rt-table div.rt-tbody div.rt-tr-group:nth-child(' + childList + ') span.ion-android-delete')).click()
  await driver.wait(until.elementLocated(By.css(successValidationObj)), maxWaitForErrorResponse)
}

async function searchCustomer (customerName) {
  await driver.wait(until.elementLocated(By.css(serchFieldCss)), maxWaitForErrorResponse)
  await driver.findElement(By.css(serchFieldCss)).clear()
  await driver.findElement(By.css(serchFieldCss)).sendKeys(customerName)
}

async function sendInvoice (childList) { // send invoice in invoice #childList in the list
  await driver.wait(until.elementLocated(By.css('div.ReactTable div.rt-table div.rt-tbody div.rt-tr-group:nth-child(' + childList + ') span.ion-paper-airplane')), maxWaitForErrorResponse)
  await driver.sleep(5000)
  await driver.findElement(By.css('div.ReactTable div.rt-table div.rt-tbody div.rt-tr-group:nth-child(' + childList + ')  span.ion-paper-airplane')).click()
  await driver.wait(until.elementLocated(By.css(successValidationObj)), maxWaitForErrorResponse)
}

async function closeModal () { // close modal
  await driver.wait(until.elementLocated(By.css('.ReactModal__Content button')), maxWaitForErrorResponse)
  await driver.findElement(By.css('.ReactModal__Content button')).click()
}

/** END - USEFULL FUNCTIONS */

const init = async function () {
  driver = new Builder().forBrowser('chrome').build()
  await driver.sleep(5000)
  helper.setDriver(driver)
  await scheduler.setDriver(driver)
}

const login = async function () {
  describe('Test : Checking the invoices list.', function () {
    this.timeout(250000)

    it('Check user parameters', async function () {
      await init()
      await driver.manage().window().setRect({ width: 1800, height: 900 })
      // Build a browser
      // Set variables (if you want to)
      const usernameFieldSelector = 'form > input:nth-child(1)'
      const passwordFieldSelector = 'form > input:nth-child(2)'
      const submitButtonSelector = 'form > button'
      // Go to url (in this case is localhost defined in the beginning of this file)
      await driver.get(config.url_local)
      // Find username field and clear any text in it
      await driver.wait(until.elementLocated(By.css(usernameFieldSelector)), maxWaitForErrorResponse)
      await helper.clear(await driver.findElement(By.css(usernameFieldSelector)))
      await helper.clear(await driver.findElement(By.css(passwordFieldSelector)))
      await driver.findElement(By.css(usernameFieldSelector)).sendKeys(config.username)
      await driver.findElement(By.css(passwordFieldSelector)).sendKeys(config.password)
      await driver.findElement(By.css(submitButtonSelector)).click()
    })
  })
}
const toInvoicesSectionFromScheduler = async function (sectionSelector) {
  describe('To invoices Section', function () {
    this.timeout(50000)
    it('Clicking to Invoicing', async function () {
      await driver.wait(until.elementLocated(By.css(sectionSelector)), 50000)
      await driver.findElement(By.css(sectionSelector)).click()
    })
  })
}
const toInvoicesSection = async function () {
  describe('To invoices Section', function () {
    this.timeout(250000)
    it('Clicking to Invoicing', async function () {
      await driver.wait(until.elementLocated(By.css('#NavBar-Link-To-Invoices')), maxWaitForErrorResponse)
      await driver.findElement(By.css('#NavBar-Link-To-Invoices')).click()
      await driver.sleep(2000)
    })
  })
}

const showFirstInvoice = async function () {
  describe('Show first Invoice', function () {
    this.timeout(250000)
    it('Show first Invoice ', async function () {
      await driver.wait(until.elementLocated(By.css('div.filter-container div.DatePicker input')), maxWaitForErrorResponse)
      await helper.clear(await driver.findElement(By.css('div.filter-container div.DatePicker input')))
      await driver.findElement(By.css('div.filter-container div.DatePicker input')).sendKeys('01/01/2018')
      await driver.findElement(By.css('div.filter-container div.DatePicker input')).sendKeys(Key.ESCAPE)
      await openInvoice(1)
      await driver.sleep(4000)
    })
  })
}

const checkUnpaidList = async function () {
  describe('Check Unpaid list', function () {
    this.timeout(250000)
    it('Clicking to Unpaid tab', async function () {
      await driver.wait(until.elementLocated(By.css('div#Invoices div.NavTab a:nth-child(2)')), maxWaitForErrorResponse)
      await driver.findElement(By.css('div#Invoices div.NavTab a:nth-child(2)')).click()
      await driver.sleep(4000)
    })
  })
}

const checkPaidList = async function () {
  describe('Check Paid list', function () {
    this.timeout(250000)
    it('Clicking to paid tab', async function () {
      await driver.wait(until.elementLocated(By.css('div#Invoices div.NavTab a:nth-child(3)')), maxWaitForErrorResponse)
      await driver.findElement(By.css('div#Invoices div.NavTab a:nth-child(3)')).click()
    })

    it('Show first Invoice ', async function () {
      await openInvoice(1)
    })
  })
}

const sendInvoiceToCustomer = async function () {
  describe('Search and send invoice to Customer', function () {
    this.timeout(250000)

    it('Clicking to All tab', async function () {
      await driver.wait(until.elementLocated(By.css('div#Invoices div.NavTab a:nth-child(1)')), maxWaitForErrorResponse)
      await driver.findElement(By.css('div#Invoices div.NavTab a:nth-child(1)')).click()
    })

    it('Sending invoice to customer', async function () {
      await sendInvoice(1) // customer with my email
    })
  })
}

const receivePayment = async function () {
  describe('Receive Payment', function () {
    this.timeout(250000)
    const receivePaymentButton = '.headerRightComponent button'
    const customerNameCss = 'div.CustomSelect div.Select'
    const amount = 'div.CurrencyInput div.input-section input'
    const invoice = '.rt-tbody .rt-tr-group div.checkbox-input label'

    it('Checking payment parameters', async function () {
      await driver.wait(until.elementLocated(By.css(receivePaymentButton)), maxWaitForErrorResponse)
      await driver.findElement(By.css(receivePaymentButton)).click()
      await driver.wait(until.elementLocated(By.css(customerNameCss)), maxWaitForErrorResponse)
      // select user
      await driver.sleep(8000)
      helper.assignSelect(customerNameCss, 5)
      /// wait for unpaid items
      await driver.wait(until.elementLocated(By.css('div.ModalTemplate-actions .button-container button > span')), maxWaitForErrorResponse)
      await driver.sleep(2000)

      await driver.wait(until.elementLocated(By.css(invoice)), maxWaitForErrorResponse)
      await driver.findElement(By.css(invoice)).click()

      // payment amount
      await driver.wait(until.elementLocated(By.css(amount)), maxWaitForErrorResponse)
      await helper.clear(await driver.findElement(By.css(amount)))
      await driver.findElement(By.css(amount)).sendKeys(10)
      // next > payment method
      await driver.findElement(By.css(invoicingpr.get('submit_payment_button'))).click()
      await driver.sleep(2000)
      await driver.findElement(By.css(invoicingpr.get('cash_payment_radio_button'))).click()
      await driver.findElement(By.css(invoicingpr.get('submit_payment_button'))).click()
      // next  > confirm paymetn
      await driver.findElement(By.css(invoicingpr.get('submit_payment_button'))).click()
      await driver.wait(until.elementLocated(By.css(successValidationObj)), maxWaitForErrorResponse)
    })
    after(function () {
      driver.quit()
    })
  })
}

var createNewInvoice = async function () {
  describe('Create new Invoice', function () {
    this.timeout(250000)

    it('filling form', async function () {
      await driver.wait(until.elementLocated(By.css(invoicingpr.get('new_invoice_button'))), maxWaitForErrorResponse)
      await driver.findElement(By.css(invoicingpr.get('new_invoice_button'))).click()

      await driver.wait(until.elementLocated(By.css(invoicingpr.get('customer_select'))), maxWaitForErrorResponse)
      await helper.assignSelect(invoicingpr.get('customer_select'), 5)

      await helper.clear(await driver.findElement(By.css(invoicingpr.get('date_due_input'))))
      await driver.findElement(By.css(invoicingpr.get('date_due_input'))).sendKeys(moment().format('MM/DD/YYYY'))
      await driver.wait(until.elementLocated(By.css('div.create-invoice-row-container div.row-0')), maxWaitForErrorResponse)
      await driver.wait(until.elementLocated(By.css(invoicingpr.get('send_invoice_button'))), maxWaitForErrorResponse)
      await driver.findElement(By.css(invoicingpr.get('send_invoice_button'))).click()
    })

    after(function () {
      //     driver.quit()
    })
  })
}

var run = async function () {
  // First test
  await login()
  await toInvoicesSection()
  await showFirstInvoice()
  // End - First test
  await checkUnpaidList()
  await checkPaidList()
  await sendInvoiceToCustomer()

  await scheduler.clickToSchedulerSection()
  await scheduler.newServiceForToday()
  await toInvoicesSectionFromScheduler(invoicingpr.get('invoices_section_h'))
  await createNewInvoice()
  await receivePayment()
}

module.exports = {
  login,
  toInvoicesSection,
  showFirstInvoice,
  checkUnpaidList,
  checkPaidList,
  sendInvoiceToCustomer,
  receivePayment,
  removeInvoice,
  createNewInvoice,
  searchCustomer,
  toInvoicesSectionFromScheduler,
  run
}
