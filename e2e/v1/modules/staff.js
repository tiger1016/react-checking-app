/* globals after */

const { Builder, By, until } = require('selenium-webdriver')
let driver
const path = require('path')
const helper = require('../helper.js')
const properties = require('properties-reader')
const config = require('../config.json')
const globalproperties = properties(path.join(process.cwd(), 'e2e/v1/selectors', 'global.properties'))
const staffHtml = properties(path.join(process.cwd(), 'e2e/v1/selectors', 'staff.properties'))
const TestHeader = '[ Petcheck UI Tests ] >> '
const maxWaitForErrorResponse = 100000
const serchFieldCss = 'div.SearchInput input.search-input'

async function searchWalker (walkerInfo) {
  await driver.wait(until.elementLocated(By.css(serchFieldCss)), maxWaitForErrorResponse)
  await driver.findElement(By.css(serchFieldCss)).clear()
  await driver.findElement(By.css(serchFieldCss)).sendKeys(walkerInfo)
  await driver.sleep(3000)
}

function randomN () {
  return Math.floor(Math.random() * (200000 - 1 + 1) + 1)
}
const init = async function () {
  driver = await new Builder().forBrowser('chrome').build()
  await driver.sleep(5000)
  helper.setDriver(driver)
}

var newWalker = { // step1
  first_name: 'first name walker',
  last_name: 'last name walker',
  email: 'new_email_example_@example.com',
  phone_mobile: '1234565469',
  phone_work: '1234565469',
  phone_home: '1234565469',
  address: 'address',
  address2: 'address 123 ',
  city: 'city',
  staff_zip: '12345'
}

var stepTwoForm = {
  password: '123456',
  password2: '123456',
  security_question: 'Question?',
  security_answer: 'answer'
}

var toUpdate1 = {
  first_name: 'edited from ui test',
  last_name: 'edited from ui test',
  zip: 123456,
  phone_mobile: '1234565469',
  phone_work: '1234565469',
  phone_home: '1234565469'
}

var toUpdate2 = {
  transportation_type: 'bus',
  license_plate: 99998888
}

var toUpdate3 = {
  name_emergency: 'EMERGENCY!!!',
  phone_emergency: '1234565469'
}

const login = function () {
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

const toStaffSection = async function () {
  describe('To Staff Section', function () {
    this.timeout(250000)
    it('Clicking to Staff', async function () {
      await driver.wait(until.elementLocated(By.css('#NavBar-Link-To-Staff')), maxWaitForErrorResponse)
      await driver.findElement(By.css('#NavBar-Link-To-Staff')).click()
      await driver.wait(until.elementLocated(By.css('div.SectionHeader button')), maxWaitForErrorResponse)
      await driver.sleep(3000)
    })
  })
}

const createNewWalker = async function () {
  describe(TestHeader + 'Create new walker step by step', function () {
    this.timeout(250000)

    it('Step 1 ', async function () {
      newWalker.email = 'walker_' + randomN() + '@petchecktechnology.com'
      await driver.wait(until.elementLocated(By.css('div.SectionHeader button')), maxWaitForErrorResponse)
      await driver.sleep(3000)
      await driver.findElement(By.css('div.SectionHeader button')).click()
      await driver.wait(until.elementLocated(By.css('input[name="first_name"]')), maxWaitForErrorResponse)
      await helper.populateForm(newWalker)
      await helper.assignSelect('div.t-state-select div.Select', 3)
      await driver.findElement(By.css('div.ModalTemplate-actions button')).click()
    })

    it('Step 2 ', async function () {
      await driver.wait(until.elementLocated(By.css('input[name="security_answer"]')), maxWaitForErrorResponse)
      await helper.populateForm(stepTwoForm)
      await helper.assignSelect('div.is-searchable', 1)
      await driver.findElement(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')).click()
    })

    it('Step 3 ', async function () {
      await driver.sleep(4000)
      await driver.wait(until.elementLocated(By.css('div.ProfileModal-Add-contact-container.StaffPayroll > div > div:nth-child(1) > div.input > div > div:nth-child(3) label')), maxWaitForErrorResponse)
      await driver.findElement(By.css('div.ProfileModal-Add-contact-container.StaffPayroll > div > div:nth-child(1) > div.input > div > div:nth-child(3) label')).click()
      await driver.wait(until.elementLocated(By.css('div.DaysOfMonthSelect div.Select')), maxWaitForErrorResponse)
      await helper.assignSelect('div.DaysOfMonthSelect div.Select', 3)
      await driver.findElement(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')).click()
    })

    it('Step 4 ', async function () {
      await driver.wait(until.elementLocated(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')), maxWaitForErrorResponse)

      // set a list of input  *** IMPORTANT Services
      await driver.findElements(By.css('.row-scroll div.row-container')).then(async function (elements) {
        var length = elements.length // Here's your length!
        length = length / 10
        for (var i = 1; i <= (length - 2); i++) {
          await driver.wait(until.elementLocated(By.css('.row-scroll .row-container:nth-child(' + i + ')  div.t-payroll-price div.t-price input')), maxWaitForErrorResponse)
          var elem = await driver.findElement(By.css('.row-scroll .row-container:nth-child(' + i + ')  div.t-payroll-price div.t-price input'))
          var cost = elem.getAttribute('value')
          await cost.then(async function (value) {
            await driver.findElement(By.css('.row-scroll .row-container:nth-child(' + i + ')  div.t-payroll-price div.t-price input')).clear()
            await driver.findElement(By.css('.row-scroll .row-container:nth-child(' + i + ')  div.t-payroll-price div.t-price input')).sendKeys(parseInt(value) + 1)
          })
        }
        await driver.findElement(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')).click()
      })
    })

    it('step 5', async function () {
    // set a list of input  *** IMPORTANT addons prices
      await driver.findElements(By.css('.row-scroll div.row-container')).then(async function (elements) {
        var length = elements.length // Here's your length!
        length = length / 10
        for (var i = 1; i <= (length - 2); i++) {
          await driver.wait(until.elementLocated(By.css('.row-scroll .row-container:nth-child(' + i + ')  div.t-payroll-price div.t-price input')), maxWaitForErrorResponse)
          var elem = await driver.findElement(By.css('.row-scroll .row-container:nth-child(' + i + ')  div.t-payroll-price div.t-price input'))
          var cost = elem.getAttribute('value')
          await cost.then(async function (value) {
            await driver.findElement(By.css('.row-scroll .row-container:nth-child(' + i + ')  div.t-payroll-price div.t-price input')).clear()
            await driver.findElement(By.css('.row-scroll .row-container:nth-child(' + i + ')  div.t-payroll-price div.t-price input')).sendKeys(parseInt(value) + 1)
          })
        }
        await driver.findElement(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')).click()
      })

      await driver.wait(until.elementLocated(By.css(helper.successToa)), maxWaitForErrorResponse)
    })
  })
}

const createSecondStaffAndCheck = async function () {
  await toStaffSection()

  describe(TestHeader + 'Create a second Staff member with an email we can automatically check later.', function () {
    this.timeout(100000)

    it('Step 1 ', async function () {
      newWalker.email = 'walker_' + randomN() + '@petchecktechnology.com'

      await driver.sleep(5000)
      await driver.wait(until.elementLocated(By.css('div.SectionHeader button')), maxWaitForErrorResponse)
      await driver.findElement(By.css('div.SectionHeader button')).click()
      await driver.wait(until.elementLocated(By.css('input[name="first_name"]')), maxWaitForErrorResponse)
      await helper.populateForm(newWalker)
      await helper.assignSelect('div.t-state-select div.Select', 3, false, false)
      await driver.findElement(By.css('div.ModalTemplate-actions button')).click()
    })

    it('Step 2 ', async function () {
      await driver.wait(until.elementLocated(By.css('input[name="security_answer"]')), maxWaitForErrorResponse)
      await helper.populateForm(stepTwoForm)
      await helper.assignSelect('div.WalkerAccessLevelSelect div.Select', 1, false, false)
      await driver.findElement(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')).click()
    })

    it('Step 3 ', async function () {
      await driver.wait(until.elementLocated(By.css('input[name="payroll_frequency"]')), maxWaitForErrorResponse)
      await driver.findElement(By.css('div.ProfileModal-Add-contact-container.StaffPayroll > div > div:nth-child(1) > div.input > div > div:nth-child(3) label')).click()
      await driver.wait(until.elementLocated(By.css('div.DaysOfMonthSelect div.Select')), maxWaitForErrorResponse)
      await helper.assignSelect('div.DaysOfMonthSelect div.Select', 3)
      await driver.findElement(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')).click()
    })

    it('Step 4 ', async function () {
      await driver.wait(until.elementLocated(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')), maxWaitForErrorResponse)

      // set a list of input  *** IMPORTANT Services
      await driver.findElements(By.css('.row-scroll div.row-container')).then(async function (elements) {
        var length = elements.length // Here's your length!
        length = length / 10
        for (var i = 1; i <= (length - 2); i++) {
          await driver.wait(until.elementLocated(By.css('.row-scroll .row-container:nth-child(' + i + ')  div.t-payroll-price div.t-price input')), maxWaitForErrorResponse)
          var elem = await driver.findElement(By.css('.row-scroll .row-container:nth-child(' + i + ')  div.t-payroll-price div.t-price input'))
          var cost = elem.getAttribute('value')
          await cost.then(async function (value) {
            await driver.findElement(By.css('.row-scroll .row-container:nth-child(' + i + ')  div.t-payroll-price div.t-price input')).clear()
            await driver.findElement(By.css('.row-scroll .row-container:nth-child(' + i + ')  div.t-payroll-price div.t-price input')).sendKeys(parseInt(value) + 1)
          })
        }
        await driver.findElement(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')).click()
      })
    })

    it('step 5', async function () {
    // set a list of input  *** IMPORTANT addons prices
      await driver.findElements(By.css('.row-scroll div.row-container')).then(async function (elements) {
        var length = elements.length // Here's your length!
        length = length / 10
        for (var i = 1; i <= (length - 2); i++) {
          await driver.wait(until.elementLocated(By.css('.row-scroll .row-container:nth-child(' + i + ')  div.t-payroll-price div.t-price input')), maxWaitForErrorResponse)
          var elem = await driver.findElement(By.css('.row-scroll .row-container:nth-child(' + i + ')  div.t-payroll-price div.t-price input'))
          var cost = elem.getAttribute('value')
          await cost.then(async function (value) {
            await driver.findElement(By.css('.row-scroll .row-container:nth-child(' + i + ')  div.t-payroll-price div.t-price input')).clear()
            await driver.findElement(By.css('.row-scroll .row-container:nth-child(' + i + ')  div.t-payroll-price div.t-price input')).sendKeys(parseInt(value) + 1)
          })
        }
        await driver.findElement(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')).click()
      })

      await driver.wait(until.elementLocated(By.css(helper.successToa)), maxWaitForErrorResponse)
    })

    it('checking saved information', async function () {
      await searchWalker(newWalker.email)
      await driver.findElement(By.css('div.CustomTable div.rt-table div.rt-tbody div.rt-tr-group')).click()
      await driver.wait(until.elementLocated(By.css('i.ion-edit')), maxWaitForErrorResponse)
      await driver.findElement(By.css('i.ion-edit')).click()
      await driver.wait(until.elementLocated(By.css(staffHtml.get('first_name'))), maxWaitForErrorResponse)
      await helper.checkValue(driver.findElement(By.css(staffHtml.get('first_name'))), newWalker.first_name)
      await helper.checkValue(driver.findElement(By.css(staffHtml.get('last_name'))), newWalker.last_name)
      await helper.checkValue(driver.findElement(By.css(staffHtml.get('email'))), newWalker.email)
      await helper.checkValue(driver.findElement(By.css(staffHtml.get('address'))), newWalker.address)
      await helper.checkValue(driver.findElement(By.css(staffHtml.get('address2'))), newWalker.address2)
      await helper.checkValue(driver.findElement(By.css(staffHtml.get('city'))), newWalker.city)
      await helper.checkValue(driver.findElement(By.css('input[name="zip"]')), newWalker.zip)
      await driver.findElement(By.css('i.ion-edit')).click()
      await driver.sleep(2000)
      await driver.findElement(By.css('button.confirm')).click()
    })
  })
}

const createThridStaffAndCheck = async function () {
  await toStaffSection()
  describe(TestHeader + 'Create a third Staff member with an email we can automatically check later.', function () {
    this.timeout(100000)
    it('Step 1 ', async function () {
      newWalker.email = 'walker_' + randomN() + '@petchecktechnology.com'
      await driver.sleep(5000)
      await driver.findElement(By.css('div.SectionHeader button')).click()
      await driver.wait(until.elementLocated(By.css('input[name="first_name"]')), maxWaitForErrorResponse)
      await helper.populateForm(newWalker)
      await helper.assignSelect('div.t-state-select div.Select', 3)
      await driver.findElement(By.css('div.ModalTemplate-actions button')).click()
    })

    it('Step 2 ', async function () {
      await driver.wait(until.elementLocated(By.css('input[class="t-security_question"]')), maxWaitForErrorResponse)
      await helper.populateForm(stepTwoForm)
      await helper.assignSelect('div.WalkerAccessLevelSelect div.Select', 1)
      await driver.findElement(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')).click()
    })

    it('Step 3 ', async function () {
      await driver.wait(until.elementLocated(By.css('input[name="payroll_frequency"]')), maxWaitForErrorResponse)
      await driver.findElement(By.css('div.ProfileModal-Add-contact-container.StaffPayroll > div > div:nth-child(1) > div.input > div > div:nth-child(3) label')).click()
      await driver.wait(until.elementLocated(By.css('div.DaysOfMonthSelect div.Select')), maxWaitForErrorResponse)
      await helper.assignSelect('div.DaysOfMonthSelect div.Select', 3)
      await driver.findElement(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')).click()
    })

    it('Step 4 & 5 not implemented yet', async function () {
      await driver.wait(until.elementLocated(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')), maxWaitForErrorResponse)
      await driver.findElement(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')).click()
      await driver.sleep(2000)
      await driver.wait(until.elementLocated(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')), maxWaitForErrorResponse)
      await driver.findElement(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')).click()
      await driver.sleep()
      await driver.wait(until.elementLocated(By.css(helper.successToa)), maxWaitForErrorResponse)
    })

    it('checking saved information', async function () {
      await searchWalker(newWalker.email)
      await driver.findElement(By.css('div.CustomTable div.rt-table div.rt-tbody div.rt-tr-group')).click()
      await driver.wait(until.elementLocated(By.css('i.ion-edit')), maxWaitForErrorResponse)
      await driver.findElement(By.css('i.ion-edit')).click()
      await driver.wait(until.elementLocated(By.css(staffHtml.get('first_name'))), maxWaitForErrorResponse)
      await helper.checkValue(driver.findElement(By.css(staffHtml.get('first_name'))), newWalker.first_name)
      await helper.checkValue(driver.findElement(By.css(staffHtml.get('last_name'))), newWalker.last_name)
      await helper.checkValue(driver.findElement(By.css(staffHtml.get('email'))), newWalker.email)
      await helper.checkValue(driver.findElement(By.css(staffHtml.get('address'))), newWalker.address)
      await helper.checkValue(driver.findElement(By.css(staffHtml.get('address2'))), newWalker.address2)
      await helper.checkValue(driver.findElement(By.css(staffHtml.get('city'))), newWalker.city)
      await helper.checkValue(driver.findElement(By.css('input[name="zip"]')), newWalker.zip)
      await driver.findElement(By.css('i.ion-edit')).click()
      await driver.sleep(2000)
      await driver.findElement(By.css('button.confirm')).click()
    })
  })
}

const tryWithInvalidEmail = async function () {
  await toStaffSection()
  describe(TestHeader + 'Try to create a staff member with an invalid email, verify the error.', function () {
    this.timeout(100000)
    it('Step 1 ', async function () {
      newWalker.email = 'InvalidEmailwalker'
      await driver.sleep(5000)
      await driver.findElement(By.css('div.SectionHeader button')).click()
      await driver.wait(until.elementLocated(By.css('input[name="first_name"]')), maxWaitForErrorResponse)
      await helper.populateForm(newWalker)
      await helper.assignSelect('div.t-state-select div.Select', 3)
      await driver.wait(until.elementLocated(By.css('div.EmailInput div.error')), maxWaitForErrorResponse)
      await helper.closeMifexist()
    })
  })
}

const tryWhitoutRequiredFields = async function () {
  describe(TestHeader + 'Try to create a staff member without required fields, verify the error', function () {
    this.timeout(20000)
    var newWalkerRequired = { // step1
      first_name: '',
      last_name: '',
      email: '',
      phone_mobile: '',
      phone_work: '1234565469',
      phone_home: '1234565469',
      address: 'address',
      address2: 'address 123 ',
      city: 'city',
      staff_zip: '12345'
    }

    it('Step 1 ', async function () {
      await driver.sleep(4000)
      await driver.findElement(By.css('div.SectionHeader button')).click()
      await driver.wait(until.elementLocated(By.css('input[name="first_name"]')), maxWaitForErrorResponse)
      await helper.populateForm(newWalkerRequired)
      await helper.assignSelect('div.t-state-select div.Select', 3)
      await driver.findElement(By.css('div.ModalTemplate-actions button')).click()
      await driver.wait(until.elementLocated(By.css('.t-container-last_name.error')), maxWaitForErrorResponse)
      await driver.wait(until.elementLocated(By.css('.t-container-first_name.error')), maxWaitForErrorResponse)
      await driver.wait(until.elementLocated(By.css('div.EmailInput div.error')), maxWaitForErrorResponse)
    })
    after(async function () {
      await helper.closeMifexist()
    })
  })
}

const editWalker = async function () {
  describe(TestHeader + 'Edit walker information, verify result', function () {
    this.timeout(100000)
    it('Search for specific walker', async function () {
      await searchWalker('walker@example.com')
    })

    it('Updating Contact information ', async function () {
      await driver.wait(until.elementLocated(By.css('div.rt-tbody div.rt-tr-group')), maxWaitForErrorResponse)
      await driver.findElement(By.css('div.rt-tbody div.rt-tr-group')).click()
      await driver.wait(until.elementLocated(By.css('i.ion-edit')), maxWaitForErrorResponse)
      await driver.findElement(By.css('i.ion-edit')).click()
      await helper.populateForm(toUpdate1)
      await helper.assignSelect('div.is-searchable ', 3)
    })

    it('Updating Work information ', async function () {
      await helper.populateForm(toUpdate2)
    })

    it('Updating emergency information ', async function () {
      await helper.populateForm(toUpdate3)
      await driver.sleep(5000)
      await driver.findElement(By.css('div.SaveCancel button')).click()
    })
  })
}

var run = async function () {
  await login()
  await toStaffSection()
  await createNewWalker()
  await createSecondStaffAndCheck()
  await createThridStaffAndCheck()
  await tryWithInvalidEmail()
  await tryWhitoutRequiredFields()
  await editWalker()
}

module.exports = {
  run,
  login,
  toStaffSection,
  createNewWalker,
  createSecondStaffAndCheck,
  tryWithInvalidEmail,
  createThridStaffAndCheck,
  editWalker,
  tryWhitoutRequiredFields
}
