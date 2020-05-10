/* globals after */

const properties = require('properties-reader')
const config = require('../config.json')

/** usefull libraries */
const moment = require('moment-timezone')
const path = require('path')
const { Builder, By, Key, until } = require('selenium-webdriver')
let driver
const helper = require('../helper.js')
const successValidationObj = 'div.Toastify__toast--success'
const globalproperties = properties(path.join(process.cwd(), 'e2e/v1/selectors', 'global.properties'))
const schedulerproperties = properties(path.join(process.cwd(), 'e2e/v1/selectors', 'Scheduler.properties'))
const maxWaitForErrorResponse = 100000

const init = async function () {
  driver = await new Builder().forBrowser('chrome').build()
  await helper.setDriver(driver)
}

const setDriver = async function (driver__) {
  driver = driver__
  await helper.setDriver(driver)
}

const login = async function () {
  describe('Test : To Scheduler section.', function () {
  // Max time allowed for the test
    this.timeout(100000)
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

const clickToSchedulerSection = async function () {
  describe('Test : To Scheduler section.', function () {
    // Max time allowed for the test
    this.timeout(100000)
    it('Clicking to Scheduler', async function () {
      await driver.wait(until.elementLocated(By.css(schedulerproperties.get('nav'))), maxWaitForErrorResponse)
      await driver.findElement(By.css(schedulerproperties.get('nav'))).click()
    })
  })
}

const newServiceWhitoutRequiredFields = async function () {
  describe('Test : As the licensee, schedule a new service without the required fields.  Verify the error.', function () {
    this.timeout(100000)
    it('Openning modals', async function () {
      await helper.closeMifexist()
      await driver.sleep(5000)
      await openModal()
    })

    it('Checking errors for required fields', async function () {
      await driver.wait(until.elementLocated(By.css(schedulerproperties.get('send_walk_button'))), maxWaitForErrorResponse)
      await driver.findElement(By.css(schedulerproperties.get('send_walk_button'))).click()
      await driver.wait(until.elementLocated(By.css(schedulerproperties.get('customer_select_error'))), maxWaitForErrorResponse)
      await driver.wait(until.elementLocated(By.css(schedulerproperties.get('service_select_error'))), maxWaitForErrorResponse)
    })

    after(function () {
      helper.closeMifexist()
    })
  })
}

const newServiceForToday = async function () {
  describe('Test : As the licensee, schedule a new service for today for customer one using walker one with all fields and save.  Verify the walk saved correctly.', function () {
    this.timeout(100000)

    it('Openning modals', async function () {
      await driver.sleep(5000)
      await openModal()
    })

    it('filling form', async function () {
      await fillfields(1, 1, 2, 1, 4, 5, 3)
      await driver.wait(until.elementLocated(By.css(schedulerproperties.get('send_walk_button'))), maxWaitForErrorResponse)
      await driver.findElement(By.css(schedulerproperties.get('send_walk_button'))).click()
      await driver.findElements(By.css(schedulerproperties.get('pets_select_error'))).then(async function (elements) { // check for modal
        if (elements.length > 0) {
          await driver.wait(until.elementLocated(By.css(schedulerproperties.get('pets_select'))), maxWaitForErrorResponse)
          await helper.assignSelect(schedulerproperties.get('pets_select'), 1)
          await driver.findElement(By.css(schedulerproperties.get('send_walk_button'))).click()
        }
      })
      await driver.wait(until.elementLocated(By.css(successValidationObj)), maxWaitForErrorResponse)
    })
  })
}

const removeWalk = async function () {
  describe('Test : As the licensee, delete one of the walks, make sure that it no longer appears on the schedule.', function () {
    this.timeout(100000)

    it('Searching and remove walk', async function () {
      await driver.wait(until.elementLocated(By.css(schedulerproperties.get('week_view'))), maxWaitForErrorResponse)
      await driver.findElements(By.css("div[id^='appointment-']")).then(async function (elements) { // check for modal
        var el = elements[1]
        await driver.sleep(2000)
        await driver.actions({ bridge: true }).move({ x: 0, y: 0, origin: el }).perform()
        await driver.wait(until.elementLocated(By.css(schedulerproperties.get('remove_walk_button'))), maxWaitForErrorResponse)
        await driver.findElement(By.css(schedulerproperties.get('remove_walk_button'))).click()
        await driver.wait(until.elementLocated(By.css(schedulerproperties.get('confirm_button'))), maxWaitForErrorResponse)
        await driver.findElement(By.css(schedulerproperties.get('confirm_button'))).click()
        await driver.sleep(5000)
      })
    })
  })
}

const searchByPetName = async function () {
  describe('As the licensee, search for the first service based on pet name, verify that it appears as expected.', function () {
    this.timeout(100000)

    it('Search service based on pet name', async function () {
      await driver.wait(until.elementLocated(By.css(schedulerproperties.get('pet_text'))), maxWaitForErrorResponse)

      await driver.findElement(By.css(schedulerproperties.get('pet_text'))).getAttribute('innerHTML').then(async function (html) {
        const petname = html

        await search(petname)
      })
    })

    it('verify that it appears as expected.', async function () {
      await driver.wait(until.elementLocated(By.css(schedulerproperties.get('pet_text'))), maxWaitForErrorResponse)
    })
  })
}

const changeValuesOfSecondService = async function () {
  describe('As the licensee, change all values of the second service, verify it saved as expected.', function () {
    this.timeout(100000)
    it('change all values of the second service', async function () {
      await driver.wait(until.elementLocated(By.css(schedulerproperties.get('week_view'))), maxWaitForErrorResponse)
      await driver.findElements(By.css("div[id^='appointment-']")).then(async function (elements) { // check for modal
        if (elements.length >= 2) {
          await driver.actions({ bridge: true }).move({ x: 0, y: 0, origin: elements[1] }).perform()
          await driver.wait(until.elementLocated(By.css(schedulerproperties.get('edit_walk_btn'))), maxWaitForErrorResponse)
          await driver.findElement(By.css(schedulerproperties.get('edit_walk_btn'))).click()
          await driver.sleep(3000)
          await fillfields(5, 5, 2, 2, false, false, 3)
          await driver.wait(until.elementLocated(By.css(schedulerproperties.get('send_walk_button'))), maxWaitForErrorResponse)
          await driver.findElement(By.css(schedulerproperties.get('send_walk_button'))).click()
          await driver.wait(until.elementLocated(By.css(schedulerproperties.get('confirm_button'))), maxWaitForErrorResponse)
          await driver.sleep(2000)
          await driver.findElement(By.css(schedulerproperties.get('confirm_button'))).click()
          await driver.wait(until.elementLocated(By.css(successValidationObj)), maxWaitForErrorResponse)
        } else {
          console.log('Second Service not found')
        }
      })
    })
  })
}

var searchFirstService = async function () {
  describe("As the licensee, search for the first service with the search box.  Verify it's the only one you see.", function () {
    let customerName = ''
    let petName = ''
    let status = ''
    let selectedWalkId = ''
    this.timeout(100000)

    it('getting firts service information', async function () {
      await driver.wait(until.elementLocated(By.css('div.appointment')), maxWaitForErrorResponse)
      await driver.sleep(10000)
      await driver.findElements(By.css("div[id^='appointment-']")).then(async function (elements) {
        const element = elements[0]
        // getting servicce id
        await element.getAttribute('id').then(async function (idN) {
          selectedWalkId = idN
        })
        // get pet name
        await driver.findElement(By.css(schedulerproperties.get('pet_text'))).getAttribute('innerHTML').then(async function (html) {
          petName = html
        })
        await driver.actions({ bridge: true }).move({ x: 0, y: 0, origin: element }).perform() // opening walks info dialog
        await driver.wait(until.elementLocated(By.css(schedulerproperties.get('walk-detail-customer'))), maxWaitForErrorResponse)
        await driver.findElement(By.css(schedulerproperties.get('walk-detail-customer'))).getAttribute('innerHTML').then(async function (html) {
          customerName = html
        })
        // get status
        await driver.wait(until.elementLocated(By.css(schedulerproperties.get('walk-detail-status'))), maxWaitForErrorResponse)
        await driver.findElement(By.css(schedulerproperties.get('walk-detail-status'))).getAttribute('innerHTML').then(async function (html) {
          status = html
        })
      })
    })

    it('search for the first service with the search box', async function () {
      await search(petName, customerName, status)
    })

    it("Verify it's the only one you see.", async function () {
      await driver.wait(until.elementLocated(By.css("div[id='" + selectedWalkId + "']")), maxWaitForErrorResponse)
    })
  })
}

var searchForSecondService = async function () {
  describe("As the licensee, search for the second service with the services filter.  Verify it's the only one you see.", function () {
    let customerName = ''
    let petName = ''
    let status = ''
    let selectedWalkId = ''
    this.timeout(100000)
    it('getting firts service information', async function () {
      await driver.wait(until.elementLocated(By.css('div.appointment')), maxWaitForErrorResponse)
      await driver.sleep(10000)
      await driver.findElements(By.css("div[id^='appointment-']")).then(async function (elements) { // check for modal
        const element = elements[1]
        // getting servicce id
        await element.getAttribute('id').then(async function (idN) {
          selectedWalkId = idN
          console.log(idN)
        })

        // get pet name
        await driver.findElement(By.css('div#' + selectedWalkId + ' ' + schedulerproperties.get('pet_text'))).getAttribute('innerHTML').then(async function (html) {
          petName = html
        })
        await driver.actions({ bridge: true }).move({ x: 0, y: 0, origin: element }).perform() // opening walks info dialog
        // get customer name div.WalkDetailTooltip div.container div.data
        await driver.wait(until.elementLocated(By.css(schedulerproperties.get('walk-detail-customer'))), maxWaitForErrorResponse)
        await driver.findElement(By.css(schedulerproperties.get('walk-detail-customer'))).getAttribute('innerHTML').then(async function (html) {
          customerName = html
        })

        // get status
        await driver.wait(until.elementLocated(By.css(schedulerproperties.get('walk-detail-status'))), maxWaitForErrorResponse)
        await driver.findElement(By.css(schedulerproperties.get('walk-detail-status'))).getAttribute('innerHTML').then(async function (html) {
          status = html
        })
      })
    })

    it('search for the second service with the services filter.', async function () {
      await search(petName, customerName, status)
    })

    it("Verify it's the only one you see.", async function () {
      await driver.wait(until.elementLocated(By.css("div[id='" + selectedWalkId + "']")), maxWaitForErrorResponse)
    })
  })
}

var search = async function (petName = '', customer = '', status = '') {
  await driver.findElement(By.css(schedulerproperties.get('search_button'))).click()
  await driver.wait(until.elementLocated(By.css(schedulerproperties.get('modal'))), maxWaitForErrorResponse)
  await driver.wait(until.elementLocated(By.css(schedulerproperties.get('pets_select'))), maxWaitForErrorResponse)
  await driver.wait(until.elementLocated(By.css(schedulerproperties.get('customers_select'))), maxWaitForErrorResponse)
  if (petName !== '') {
    await driver.findElement(By.css(schedulerproperties.get('pets_select'))).click()
    await driver.findElement(By.css(schedulerproperties.get('pets_select_input'))).sendKeys(petName + '' + Key.TAB)
  }

  if (customer !== '') {
    await driver.findElement(By.css(schedulerproperties.get('customers_select'))).click()
    await driver.findElement(By.css(schedulerproperties.get('customers_select_input'))).sendKeys(customer + '' + Key.TAB)
  }

  if (status !== '') {
    await driver.findElement(By.css(schedulerproperties.get('status_select'))).click()
    await driver.findElement(By.css(schedulerproperties.get('status_select_input'))).sendKeys(status + '' + Key.TAB)
  }
  await driver.findElement(By.css(schedulerproperties.get('search_btn_sch'))).click()
}

var openModal = async function () {
  await driver.wait(until.elementLocated(By.css(schedulerproperties.get('new_walk_modal'))), maxWaitForErrorResponse)
  await driver.findElement(By.css(schedulerproperties.get('new_walk_modal'))).click()
  await driver.wait(until.elementLocated(By.css(schedulerproperties.get('modal_container'))), maxWaitForErrorResponse)
}

var fillfields = async function (timeH = 1, timeM = 1, timeAmpm = 2, walkerSelect = 2, frecuencySelect = 4, customersSelect = 1, serviceSelect = 3) { // setting walk default time to 01:01 parameters
  if (customersSelect !== false) {
    await driver.wait(until.elementLocated(By.css(schedulerproperties.get('customers_select'))), maxWaitForErrorResponse)
    await helper.assignSelect(schedulerproperties.get('customers_select'), customersSelect)
  }

  if (walkerSelect !== false) {
    await driver.wait(until.elementLocated(By.css(schedulerproperties.get('walker_select'))), maxWaitForErrorResponse)
    await helper.assignSelect(schedulerproperties.get('walker_select'), walkerSelect)
  }

  if (frecuencySelect !== false) {
    await driver.wait(until.elementLocated(By.css(schedulerproperties.get('frecuency_select'))), maxWaitForErrorResponse)
    await helper.assignSelect(schedulerproperties.get('frecuency_select'), frecuencySelect)
  }

  if (serviceSelect !== false) {
    await driver.wait(until.elementLocated(By.css(schedulerproperties.get('service_select'))), maxWaitForErrorResponse)
    await helper.assignSelect(schedulerproperties.get('service_select'), serviceSelect)
  }

  if (timeH !== false) {
    await driver.wait(until.elementLocated(By.css(schedulerproperties.get('hour_select'))), maxWaitForErrorResponse)
    await helper.assignSelect(schedulerproperties.get('hour_select'), timeH)
  }

  if (timeM !== false) {
    await driver.wait(until.elementLocated(By.css(schedulerproperties.get('minute_select'))), maxWaitForErrorResponse)
    await helper.assignSelect(schedulerproperties.get('minute_select'), timeM)
  }

  if (timeAmpm !== false) {
    await driver.wait(until.elementLocated(By.css(schedulerproperties.get('ampm_select'))), maxWaitForErrorResponse)
    await helper.assignSelect(schedulerproperties.get('ampm_select'), timeAmpm)
  }

  await helper.clear(await driver.findElement(By.css(schedulerproperties.get('requested_time_input'))))
  await driver.findElement(By.css(schedulerproperties.get('requested_time_input'))).sendKeys(moment().format('MM/DD/YYYY'))
}

const run = async function () {
  // First test

  await login()
  await clickToSchedulerSection()
  // End - First test
  await newServiceWhitoutRequiredFields()
  await newServiceForToday()
  await removeWalk()
  await searchByPetName()
  await changeValuesOfSecondService()
  await searchFirstService()
  await searchForSecondService()
}

module.exports = {
  login,
  clickToSchedulerSection,
  newServiceWhitoutRequiredFields,
  newServiceForToday,
  removeWalk,
  searchByPetName,
  changeValuesOfSecondService,
  searchFirstService,
  searchForSecondService,
  driver,
  setDriver,
  run
}
