/* globals after */

const { Builder, By, until } = require('selenium-webdriver')
const helper = require('../helper.js')
const path = require('path')
const config = require('../config.json')
const serchFieldCss = 'input.search-input'

let driver
const maxWaitForErrorResponse = 100000

function randomN () {
  return Math.floor(Math.random() * (200000 - 1 + 1) + 1)
}

var idCustomerProfileForm = {
  customer_password: 123456,
  customer_confirm_password: 123456
}

var idCustomerFormPrimary = {
  customer_first_name_contact: 'Customer name',
  customer_last_name_contact: 'Customer last name',
  customer_email_contact: 'custoemr@petchecktechnology.com',
  customer_work_phone_contact: '5985193645',
  customer_home_phone_contact: '5985193645',
  customer_mobile_phone_contact: '5985193645',
  customer_steet_addresss_contact: 'Streen adress 123',
  customer_steet_address_2_contact: 'Streen adress 12312',
  customer_city_contact: 'city',
  customer_zip_contact: '12345'
}

var idPet = {
  customer_pet_name: 'petName',
  customer_pet_type: 'petType'
}

async function searchCustomer (customerName) {
  await driver.wait(until.elementLocated(By.css(serchFieldCss)), maxWaitForErrorResponse)
  await driver.findElement(By.css(serchFieldCss)).clear()
  await driver.findElement(By.css(serchFieldCss)).sendKeys(customerName)
}

const init = async function () {
  driver = new Builder().forBrowser('chrome').build()
  await driver.sleep(5000)
  await helper.setDriver(driver)
}

var login = async function () {
  describe('Test : Checking the Customers list.', function () {
  // Comment this 'let driver' and uncomment the driver definition on line 20
  // so edmond tests work also
  // Max time allowed for the test
    this.timeout(100000)
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

const toCustomersSection = async function () {
  describe('To Custmer Section', function () {
    this.timeout(250000)
    it('Clicking to Customers', async function () {
      await driver.wait(until.elementLocated(By.css('#NavBar-Link-To-Customers')), maxWaitForErrorResponse)
      await driver.findElement(By.css('#NavBar-Link-To-Customers')).click()
      await driver.sleep(2000)
    })
    idCustomerFormPrimary.customer_email_contact = randomN() + '_' + idCustomerFormPrimary.customer_email_contact
  })
}

const createNewCustomer = async function () {
  describe('Create a customer with all fields entered. Assign the 1st service and the 1st walker as defaults. Payment Type: Credit Card, Billing Frequency: Weekly, Billing Timing: "Bill customer after service", Invoice Terms: Upon Receipt.', function () {
    this.timeout(100000)

    it('Openning Modal', async function () {
      await driver.wait(until.elementLocated(By.css('div.SectionHeader button')), maxWaitForErrorResponse)
      await driver.findElement(By.css('div.SectionHeader button')).click()
    })

    it('Setting  customer`s contact info', async function () {
      await helper.populateForm(idCustomerFormPrimary)
      await helper.assignSelect('div.t-state-select div.Select', 4, false)
      await driver.findElement(By.css('div.ModalTemplate-actions div.ButtonGroup button')).click()
    })

    it('Setting customer`s profile info', async function () {
      await helper.populateForm(idCustomerProfileForm)
      await driver.wait(until.elementLocated(By.css('div.ServicesSelect div.Select')), maxWaitForErrorResponse)
      await helper.assignSelect('div.ServicesSelect div.Select', 1, false, true)
      await driver.sleep(15000)
      await driver.wait(until.elementLocated(By.css('div.WalkersSelect div.Select')), maxWaitForErrorResponse)
      await helper.assignSelect('div.WalkersSelect div.Select', 1, false, false)
      await driver.findElement(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')).click()
    })

    it('Setting customer`s pet info', async function () {
      await helper.populateForm(idPet)
      await helper.assignSelect('div.PetBreedSelect div.Select', 2)
      // upload image
      var element = await driver.findElement(By.css('div.t-image-uploader div.DropZone input'))
      var js = "arguments[0].removeAttribute('style');"
      await driver.executeScript(js, element)
      await driver.findElement(By.css('div.t-image-uploader div.DropZone input')).sendKeys(path.join(process.cwd().toLowerCase(), 'assets', '3.jpg'))
      await driver.findElement(By.css('div.base:nth-child(3) > button:nth-child(1)')).click()
    })

    it('Setting customer`s billing info', async function () {
      await helper.assignSelect('div.PaymentTypeSelect div.Select', 2)
      await helper.assignSelect('div.BillingTimingSelect div.Select', 1)
      await helper.assignSelect('div.BillingFrequencySelect div.Select', 1)
      await helper.assignSelect('div.InvoiceTermsSelect div.Select', 1)
      await driver.findElement(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')).click()
    })

    it('Using default prices', async function () {
      await driver.wait(until.elementLocated(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')), maxWaitForErrorResponse)
      await driver.findElement(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')).click()
      await driver.wait(until.elementLocated(By.css(helper.successToa)), maxWaitForErrorResponse)
    })

    after(async function () {
      await driver.wait(until.elementLocated(By.css('div.SectionHeader button')), maxWaitForErrorResponse)
      await driver.sleep(3000)
      await helper.closeErrorNotifications()
    })
  })
}

const createDuplicatedCustomer = async function () {
  describe('Create a duplicate customer, verify the error..', function () {
    this.timeout(100000)

    it('Openning Modal', async function () {
      await driver.wait(until.elementLocated(By.css('div.SectionHeader button')), maxWaitForErrorResponse)
      await driver.sleep(8000)
      await driver.findElement(By.css('div.SectionHeader button')).click()
    })

    it('Setting  customer`s contact info', async function () {
      await helper.populateForm(idCustomerFormPrimary)
      await helper.assignSelect('div.t-state-select div.Select', 4, false)
      await driver.findElement(By.css('div.ModalTemplate-actions div.ButtonGroup button')).click()
      await driver.sleep(2000)
    })

    it('Setting customer`s profile info', async function () {
      await helper.populateForm(idCustomerProfileForm)
      await driver.wait(until.elementLocated(By.css('div.ServicesSelect div.Select')), maxWaitForErrorResponse)
      await helper.assignSelect('div.ServicesSelect div.Select', 1, false, true)
      await driver.wait(until.elementLocated(By.css('div.WalkersSelect div.Select')), maxWaitForErrorResponse)
      await helper.assignSelect('div.WalkersSelect div.Select', 1, false, false)
      await driver.findElement(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')).click()
    })

    it('Setting customer`s pet info', async function () {
      await helper.populateForm(idPet)

      var element = await driver.findElement(By.css('div.t-image-uploader div.DropZone input'))
      var js = "arguments[0].removeAttribute('style');"
      await driver.executeScript(js, element)
      await driver.findElement(By.css('div.t-image-uploader div.DropZone input')).sendKeys(path.join(process.cwd().toLowerCase(), 'assets', '4.jpg'))
      await driver.findElement(By.css('div.base:nth-child(3) > button:nth-child(1)')).click()
    })

    it('Setting customer`s billing info', async function () {
      await driver.wait(until.elementLocated(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')), maxWaitForErrorResponse)
      await helper.assignSelect('div.PaymentTypeSelect div.Select', 2)
      await helper.assignSelect('div.BillingTimingSelect div.Select', 1)
      await helper.assignSelect('div.BillingFrequencySelect div.Select', 1)
      await helper.assignSelect('div.InvoiceTermsSelect div.Select', 1)
      await driver.findElement(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')).click()
    })

    it('Using default prices', async function () {
      await driver.wait(until.elementLocated(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')), maxWaitForErrorResponse)
      await driver.findElement(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')).click()
      await driver.wait(until.elementLocated(By.css(helper.errorToa)), maxWaitForErrorResponse)
    })

    after(async function () {
      await helper.closeMifexist()
      await driver.sleep(3000)
      await helper.closeErrorNotifications()
    })
  })
}

const malformedEmail = async function () {
  describe('Add a malformed email, verify the error.', function () {
    this.timeout(100000)
    it('Openning Modal', async function () {
      await driver.sleep(2000)
      await driver.wait(until.elementLocated(By.css('div.SectionHeader button')), maxWaitForErrorResponse)
      await driver.findElement(By.css('div.SectionHeader button')).click()
    })

    it('Setting  customer`s contact info', async function () {
      var temp = idCustomerFormPrimary.customer_email_contact
      idCustomerFormPrimary.customer_email_contact = 'malformedEmail' + randomN() + '.com'
      await helper.populateForm(idCustomerFormPrimary)
      await helper.assignSelect('div.t-state-select div.Select', 4, false)
      //   await driver.findElement(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')).click()
      await driver.wait(until.elementLocated(By.css('div.t-containercustomer_email_contact.error')), maxWaitForErrorResponse)
      idCustomerFormPrimary.customer_email_contact = temp
      await helper.closeMifexist()
    })
  })

  describe('Try to save without the required fields, verify the error message.', function () {
    this.timeout(100000)
    it('Openning Modal', async function () {
      await driver.wait(until.elementLocated(By.css('div.SectionHeader button')), maxWaitForErrorResponse)
      await driver.findElement(By.css('div.SectionHeader button')).click()
    })

    it('Setting  customer`s contact info', async function () {
      var customerEmailContact = idCustomerFormPrimary.customer_email_contact
      idCustomerFormPrimary.customer_email_contact = ''
      var customerFirstNameContact = idCustomerFormPrimary.customer_first_name_contact
      idCustomerFormPrimary.customer_first_name_contact = ''
      var customerLastNameContact = idCustomerFormPrimary.customer_last_name_contact
      idCustomerFormPrimary.customer_last_name_contact = ''

      await helper.populateForm(idCustomerFormPrimary)
      await driver.findElement(By.css('div.ModalTemplate-actions div.ButtonGroup button')).click()
      await driver.wait(until.elementLocated(By.css('div.t-containercustomer_email_contact.error')), maxWaitForErrorResponse)
      await driver.wait(until.elementLocated(By.css('div.t-containercustomer_first_name_contact.error')), maxWaitForErrorResponse)
      await driver.wait(until.elementLocated(By.css('div.t-containercustomer_last_name_contact.error')), maxWaitForErrorResponse)

      idCustomerFormPrimary.customer_email_contact = customerEmailContact
      idCustomerFormPrimary.customer_first_name_contact = customerFirstNameContact
      idCustomerFormPrimary.customer_last_name_contact = customerLastNameContact
      await helper.closeMifexist()
    })
  })
}

var addSecondPet = async function () {
  describe('Add a second pet.', function () {
    this.timeout(100000)

    it('Openning Modal', async function () {
      await driver.wait(until.elementLocated(By.css('div.SectionHeader button')), maxWaitForErrorResponse)
      await driver.findElement(By.css('div.SectionHeader button')).click()
    })

    it('Setting  customer`s contact info', async function () {
      await helper.populateForm(idCustomerFormPrimary)
      await helper.assignSelect('div.Select.is-searchable', 4)
      await driver.findElement(By.css('div.ModalTemplate-actions div.ButtonGroup button')).click()
    })

    it('Setting customer`s profile info', async function () {
      await helper.populateForm(idCustomerProfileForm)
      await helper.assignSelect('div.ServicesSelect div.Select', 1, false, true)
      await helper.assignSelect('div.WalkersSelect div.Select', 1, false, true)
      await driver.findElement(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')).click()
    })

    it('Setting customer`s pet info', async function () {
      await helper.populateForm(idPet)

      var element = await driver.findElement(By.css('div.t-image-uploader div.DropZone input'))
      var js = "arguments[0].removeAttribute('style');"
      await driver.executeScript(js, element)
      await driver.findElement(By.css('div.t-image-uploader div.DropZone input')).sendKeys(path.join(process.cwd().toLowerCase(), 'assets', '4.jpg'))

      // click to  add another button
      await driver.wait(until.elementLocated(By.css('div.t-buttons div:nth-child(1) div:nth-child(1) button')), maxWaitForErrorResponse)
      await driver.findElement(By.css('div.t-buttons div:nth-child(1) div:nth-child(1) button')).click()
      idPet.customer_pet_name = idPet.customer_pet_name + '_' + randomN()
      // adding sectond pet
      await helper.populateForm(idPet, 'div.t-form-new-pet-2 ')
      element = await driver.findElement(By.css('div.t-form-new-pet-2 ' + 'div.t-image-uploader div.DropZone input'))
      await driver.executeScript(js, element)
      await driver.findElement(By.css('div.t-form-new-pet-2 ' + 'div.t-image-uploader div.DropZone input')).sendKeys(path.join(process.cwd().toLowerCase(), 'assets', '4.jpg'))
      await driver.wait(until.elementLocated(By.css('div.t-buttons div:nth-child(3) button')), maxWaitForErrorResponse)
      await driver.findElement(By.css('div.t-buttons div:nth-child(3) button')).click()
    })

    it('Setting customer`s billing info', async function () {
      await driver.wait(until.elementLocated(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')), maxWaitForErrorResponse)
      await helper.assignSelect('div.PaymentTypeSelect div.Select', 2)
      await helper.assignSelect('div.BillingTimingSelect div.Select', 1)
      await helper.assignSelect('div.BillingFrequencySelect div.Select', 1)
      await helper.assignSelect('div.InvoiceTermsSelect div.Select', 1)
      await driver.findElement(By.css('div.t-buttons div:nth-child(2) button')).click()
    })

    it('Using default prices', async function () {
      await driver.wait(until.elementLocated(By.css('div.t-buttons div:nth-child(2) button')), maxWaitForErrorResponse)
      await driver.findElement(By.css('div.t-buttons div:nth-child(2) button')).click()
      await driver.wait(until.elementLocated(By.css(helper.errorToa)), maxWaitForErrorResponse)
      await helper.closeMifexist()
      await helper.closeErrorNotifications()
    })
  })
}

const verifyServices = async function () {
  describe('Verify that you see two services, as expected', async function () {
    this.timeout(100000)

    it('Openning Modal', async function () {
      await driver.sleep(5000)
      await driver.wait(until.elementLocated(By.css('div.SectionHeader button')), maxWaitForErrorResponse)
      await driver.findElement(By.css('div.SectionHeader button')).click()
    })

    it('Setting  customer`s contact info', async function () {
      await helper.populateForm(idCustomerFormPrimary)
      await helper.assignSelect('div.Select.is-searchable', 4)
      await driver.findElement(By.css('div.ModalTemplate-actions div.ButtonGroup button')).click()
    })

    it('Setting customer`s profile info', async function () {
      await helper.populateForm(idCustomerProfileForm)
      await helper.assignSelect('div.ServicesSelect div.Select', 1)
      // remove comment after fixes
      //   await helper.assignSelect('div.WalkersSelect div.Select' , 1)
      await driver.findElement(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')).click()
    })

    it('Setting customer`s pet info', async function () {
      await helper.populateForm(idPet)

      var element = await driver.findElement(By.css('div.t-image-uploader div.DropZone input'))
      var js = "arguments[0].removeAttribute('style');"
      await driver.executeScript(js, element)
      await driver.findElement(By.css('div.t-image-uploader div.DropZone input')).sendKeys(path.join(process.cwd().toLowerCase(), 'assets', '4.jpg'))

      await driver.findElement(By.css('div.base:nth-child(3) > button:nth-child(1)')).click()
    })

    it('Setting customer`s billing info', async function () {
      await driver.wait(until.elementLocated(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')), maxWaitForErrorResponse)
      await helper.assignSelect('div.PaymentTypeSelect div.Select', 2)
      await helper.assignSelect('div.BillingTimingSelect div.Select', 1)
      await helper.assignSelect('div.BillingFrequencySelect div.Select', 1)
      await helper.assignSelect('div.InvoiceTermsSelect div.Select', 1)
      await driver.findElement(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')).click()
    })

    it('Verify that you see two services, as expected', async function () {
      await driver.wait(until.elementLocated(By.css('#Modal > div > div.ModalTemplate-body > div > div > div.sub-align > div:nth-child(2) > div.container > div:nth-child(1) > div:nth-child(2)')), maxWaitForErrorResponse)
      await driver.wait(until.elementLocated(By.css('#Modal > div > div.ModalTemplate-body > div > div > div.sub-align > div:nth-child(2) > div.container > div:nth-child(1) > div:nth-child(3)')), maxWaitForErrorResponse)
      //      await helper.closeMifexist()
    })

    it('Try to enter alphabet characters for the service price, verify the error.', async function () {
      await driver.wait(until.elementLocated(By.css('#Modal > div > div.ModalTemplate-body > div > div > div.sub-align > div:nth-child(2) > div.container > div:nth-child(1) > div:nth-child(3) input')), maxWaitForErrorResponse)
      await driver.findElement(By.css('#Modal > div > div.ModalTemplate-body > div > div > div.sub-align > div:nth-child(2) > div.container > div:nth-child(1) > div:nth-child(3) input')).sendKeys('aaa')
    })

    it('Try to enter alphabet characters for the addons price, verify the error.', async function () {
      await driver.wait(until.elementLocated(By.css('#Modal > div > div.ModalTemplate-body > div > div > div.sub-align > div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) input')), maxWaitForErrorResponse)
      await driver.findElement(By.css('#Modal > div > div.ModalTemplate-body > div > div > div.sub-align > div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) input')).sendKeys('aaa')
    })
    after(async function () {
      await helper.closeMifexist()
      await helper.closeErrorNotifications()
    })
  })
}

const createOtherCustomerAndRemove = async function () {
  describe('Create a fourth customer with all fields entered. We;`ll just be using this customer to test the delete function.', function () {
    this.timeout(100000)
    idCustomerFormPrimary.customer_first_name_contact = 'Customertodelete'
    idCustomerFormPrimary.customer_last_name_contact = 'Customertodelete'
    idCustomerFormPrimary.customer_email_contact = 'customertodelete' + randomN() + '@gmail.com'

    it('Clicking to Customers section ', async function () {
      await driver.wait(until.elementLocated(By.css('#NavBar-Link-To-Customers')), maxWaitForErrorResponse)
      await driver.findElement(By.css('#NavBar-Link-To-Customers')).click()
    })

    it('Openning Modal', async function () {
      await driver.wait(until.elementLocated(By.css('div.SectionHeader button')), maxWaitForErrorResponse)
      await driver.findElement(By.css('div.SectionHeader button')).click()
    })

    it('Setting  customer`s contact info', async function () {
      await helper.populateForm(idCustomerFormPrimary)
      await helper.assignSelect('div.Select.is-searchable', 4)
      await driver.findElement(By.css('div.ModalTemplate-actions div.ButtonGroup button')).click()
    })

    it('Setting customer`s profile info', async function () {
      await helper.populateForm(idCustomerProfileForm)
      await helper.assignSelect('div.ServicesSelect div.Select', 1)
      await helper.assignSelect('div.WalkersSelect div.Select', 1)
      await driver.findElement(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')).click()
    })

    it('Setting customer`s pet info', async function () {
      await helper.populateForm(idPet)

      var element = await driver.findElement(By.css('div.t-image-uploader div.DropZone input'))
      var js = "arguments[0].removeAttribute('style');"
      await driver.executeScript(js, element)
      await driver.findElement(By.css('div.t-image-uploader div.DropZone input')).sendKeys(path.join(process.cwd().toLowerCase(), 'assets', '4.jpg'))

      await driver.findElement(By.css('div.base:nth-child(3) > button:nth-child(1)')).click()
    })

    it('Setting customer`s billing info', async function () {
      await driver.wait(until.elementLocated(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')), maxWaitForErrorResponse)
      await helper.assignSelect('div.PaymentTypeSelect div.Select', 2)
      await helper.assignSelect('div.BillingTimingSelect div.Select', 1)
      await helper.assignSelect('div.BillingFrequencySelect div.Select', 1)
      await helper.assignSelect('div.InvoiceTermsSelect div.Select', 1)
      await driver.findElement(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')).click()
    })

    it('Using default prices', async function () {
      await driver.wait(until.elementLocated(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')), maxWaitForErrorResponse)
      await driver.findElement(By.css('#Modal > div > div.ModalTemplate-actions > div > div.base.button-container > button')).click()
      await driver.wait(until.elementLocated(By.css(helper.successToa)), maxWaitForErrorResponse)
    })

    it('Removing Customertodelete', async function () {
      await searchCustomer('customertodelete')
      await driver.findElement(By.css('div.rt-tbody div.rt-tr-group')).click()
      await driver.wait(until.elementLocated(By.css('div.delete-icon-container')), maxWaitForErrorResponse)
      await driver.findElement(By.css('div.delete-icon-container')).click()
    })

    after(function () {
      driver.quit()
    })
  })
}

var run = async function () {
  await login()
  await toCustomersSection()
  await createNewCustomer()
  await createDuplicatedCustomer()
  await malformedEmail()
  await addSecondPet()
  await verifyServices()
}

module.exports = {
  login,
  toCustomersSection,
  createOtherCustomerAndRemove,
  createDuplicatedCustomer,
  createNewCustomer,
  malformedEmail,
  addSecondPet,
  verifyServices,
  run
}
