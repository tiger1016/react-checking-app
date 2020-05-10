/* globals after */

const { Builder, By, Key, until } = require('selenium-webdriver')
const driver = new Builder().forBrowser('chrome').build()
const helper = require('../helper.js')

const path = require('path')
var properties = require('properties-reader')
var config = require('../config.json')

const serviceproperties = properties(path.join(process.cwd(), 'e2e/v1/selectors', 'service.properties'))

const maxWaitForErrorResponse = 110000

function randomN () {
  return Math.floor(Math.random() * (200000 - 1 + 1) + 1)
}

async function checkforalerts () {
  await driver.sleep(5000)
  await driver.findElements(By.css('div.sweet-alert.visible')).then(async function (elements) { // check for modal
    var length = elements.length // Here's your length!

    if (length > 0) {
      await driver.wait(until.elementLocated(By.css('button.confirm'), 12000))
      await driver.findElement(By.css('button.confirm')).click()
    }
  })
}

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

const globalServiceName = 'UI TESTS #' + randomN() // to add repeated service name

// set the driver for helper module
helper.setDriver(driver)

const dropdownDescriptiong = serviceproperties.get('dropdownDescription')
const costg = serviceproperties.get('cost')
const defwalkerpayrollg = serviceproperties.get('defwalkerpayroll')
const Hg = serviceproperties.get('H')
const Hming = serviceproperties.get('Hmin')
const buttong = '.ButtonGroup button'

var test1 = async function () {
  describe('Test : Add a service, verify that it saved', function () {
  // Comment this 'let driver' and uncomment the driver definition on line 20
  // so edmond tests work also

    // Max time allowed for the test
    this.timeout(250000)
    it('Check user parameters', async function () {
      try {
        await driver.manage().window().setRect({ width: 1800, height: 900 })
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
        throw error
      }
    })

    it('Clicking to Settings > Services', async function () {
      await driver.sleep(5000)
      await driver.wait(until.elementLocated(By.css('a.setting-link')), maxWaitForErrorResponse)
      await driver.sleep(15000)
      await driver.findElement(By.css('a.setting-link')).click()
      await driver.sleep(5000)
      await driver.findElement(By.css('a.nav-tab-link:nth-child(2)')).click()
      await driver.wait(until.elementLocated(By.className('t-form-link')), maxWaitForErrorResponse)
      await driver.findElement(By.className('t-form-link')).click()
    })

    it('Adding Service Parameters', async function () {
      await driver.executeScript('window.scrollTo(0, document.documentElement.scrollLeft )')
      //        await console.log(dropdownDescription)
      await driver.findElement(By.css(dropdownDescriptiong)).sendKeys(globalServiceName)
      await driver.findElement(By.css(costg)).sendKeys(10)
      await driver.findElement(By.css(defwalkerpayrollg)).sendKeys(12)
      await checkforalerts()
      await helper.assign_select(Hg, 3)
      await checkforalerts()
      await helper.assign_select(Hming, 3)
      await checkforalerts()
      await driver.findElement(By.css(buttong)).click()
      await checkforalerts()
      await driver.wait(until.elementLocated(By.css(helper.success_toa)), maxWaitForErrorResponse)
      await driver.wait(until.elementLocated(By.css('div.rt-tbody > div.rt-tr-group div:nth-child(1) span')), maxWaitForErrorResponse)
    })

    it('verify that it saved', async function () {
      await driver.findElement(By.css('div.rt-tbody > div.rt-tr-group div:nth-child(1) span')).click()
      await helper.check_value(driver.findElement(By.css(dropdownDescriptiong)), globalServiceName)
      await helper.check_value(driver.findElement(By.css(costg)), 10)
      await helper.check_value(driver.findElement(By.css(defwalkerpayrollg)), 12)
      await helper.closeErrorNotifications()
    })
  })
}

var test2 = async function () {
  describe('Test : Add a second service, verify that it saved', function () {
  // Max time allowed for the test
    this.timeout(250000)

    it('click >  + add a new Service', async function () {
      await driver.sleep(5000)
      await driver.findElement(By.className('t-form-link')).click()
    })

    it('Adding Second Service Parameters', async function () {
      await driver.findElement(By.css(dropdownDescriptiong)).sendKeys('Second service ' + globalServiceName)
      await driver.findElement(By.css(costg)).sendKeys(10)
      await driver.findElement(By.css(defwalkerpayrollg)).sendKeys(12)
      await helper.assign_select(Hg, 3)
      await helper.assign_select(Hming, 3)
      await checkforalerts()
      await driver.findElement(By.css(buttong)).click()
      await driver.wait(until.elementLocated(By.css(helper.success_toa)), maxWaitForErrorResponse)
      await helper.closeErrorNotifications()
      await driver.wait(until.elementLocated(By.css('div.rt-tbody > div.rt-tr-group div:nth-child(1) span')), maxWaitForErrorResponse)
      await checkforalerts()
    })

    it('verify that it saved', async function () {
      await driver.findElement(By.css('div.rt-tbody > div.rt-tr-group div:nth-child(1) span')).click()
      await helper.check_value(driver.findElement(By.css(dropdownDescriptiong)), 'Second service ' + globalServiceName)
      await helper.check_value(driver.findElement(By.css(costg)), 10)
      await helper.check_value(driver.findElement(By.css(defwalkerpayrollg)), 12)
      await helper.closeErrorNotifications()
    })
  })
}

var test3 = async function () {
  describe('Test : Add a Third service, verify that it saved', function () {
  // Max time allowed for the test
    this.timeout(250000)
    it('click >  + add a new Service', async function () {
      await driver.wait(until.elementLocated(By.className('t-form-link')), maxWaitForErrorResponse)
      await driver.findElement(By.className('t-form-link')).click()
    })

    it('Adding Third Service Parameters', async function () {
      await driver.findElement(By.css(dropdownDescriptiong)).sendKeys('Third service ' + globalServiceName)
      await driver.findElement(By.css(costg)).sendKeys(10)
      await driver.findElement(By.css(defwalkerpayrollg)).sendKeys(12)
      await checkforalerts()
      await helper.assign_select(Hg, 3)
      await checkforalerts()
      await helper.assign_select(Hming, 3)
      await checkforalerts()
      await driver.findElement(By.css(buttong)).click()
      await driver.wait(until.elementLocated(By.css(helper.success_toa)), maxWaitForErrorResponse)
      await driver.wait(until.elementLocated(By.css('div.rt-tbody > div.rt-tr-group div:nth-child(1) span')), maxWaitForErrorResponse)
      await checkforalerts()
    })

    it('verify that it saved', async function () {
      await driver.findElement(By.css('div.rt-tbody > div.rt-tr-group div:nth-child(1) span')).click()
      await helper.check_value(driver.findElement(By.css(dropdownDescriptiong)), 'Second service ' + globalServiceName)
      await helper.check_value(driver.findElement(By.css(costg)), 10)
      await helper.check_value(driver.findElement(By.css(defwalkerpayrollg)), 12)
    })
  })
}

var test4 = async function () {
  describe('Test : Add a service with the identical criteria as one of the above', function () {
  // Max time allowed for the test
    this.timeout(250000)
    try {
      it('click >  + add a new Service', async function () {
        await driver.wait(until.elementLocated(By.className('t-form-link')), maxWaitForErrorResponse)
        await driver.findElement(By.className('t-form-link')).click()
      })

      it('Add service with the identical criteria as one of the above', async function () {
        await driver.findElement(By.css(dropdownDescriptiong)).sendKeys(globalServiceName)
        await driver.findElement(By.css(costg)).sendKeys(10)
        await driver.findElement(By.css(defwalkerpayrollg)).sendKeys(12)
        await checkforalerts()
        await helper.assign_select(Hg, 3)
        await checkforalerts()
        await helper.assign_select(Hming, 3)
        await checkforalerts()
        await driver.findElement(By.css(buttong)).click()
        await driver.wait(until.elementLocated(By.css(helper.error_toa)), maxWaitForErrorResponse)
        await checkforalerts()
      })
    } catch (error) {
      throw error
    }
  })
}

var test5 = async function () {
  describe('Test:Try to add another service, but enter a letter for the pay rate', function () {
  // Max time allowed for the test
    this.timeout(250000)
    it('click >  + add a new Service', async function () {
      await driver.wait(until.elementLocated(By.className('t-form-link')), maxWaitForErrorResponse)
      await driver.findElement(By.className('t-form-link')).click()
    })

    try {
      it('Adding service, but enter a letter for the pay rate', async function () {
        await driver.findElement(By.css(dropdownDescriptiong)).sendKeys(globalServiceName + ' letter for pay rate')
        await checkforalerts()
        await driver.findElement(By.css(costg)).sendKeys(10)
        await checkforalerts()
        await driver.findElement(By.css(defwalkerpayrollg)).sendKeys('aaa')
        await checkforalerts()
        await driver.wait(until.elementLocated(By.css('div.rt-tbody > div.rt-tr-group div:nth-child(3) div.TextInput.error')), maxWaitForErrorResponse)
        await checkforalerts()
      })
    } catch (error) {
      throw error
    }
  })
}

var test6 = async function () {
  describe('Test: Try to add another service, but enter a service longer than 200 characters long', function () {
  // Max time allowed for the test
    this.timeout(250000)
    it('click >  + add a new Service', async function () {
      await driver.wait(until.elementLocated(By.className('t-form-link')), maxWaitForErrorResponse)
      await driver.findElement(By.className('t-form-link')).click()
    })

    it('Adding service, but enter a service longer than 200 characters long', async function () {
      const H = 'div.rt-tbody > div.rt-tr-group div:nth-child(4) '
      const Hmin = 'div.rt-tbody > div.rt-tr-group div:nth-child(4) div.MinutesSelect '
      const button = '.ButtonGroup button'
      await driver.findElement(By.css(dropdownDescriptiong)).sendKeys(globalServiceName + ' thisisaservicenamewithmorethan200characterslongthisisaservicenamewithmorethan200characterslongthisisaservicenamewithmorethan200characterslongthisisaservicenamewithmorethan200characterslongthisisaservicen')
      await driver.findElement(By.css(costg)).sendKeys(10)
      await driver.findElement(By.css(defwalkerpayrollg)).sendKeys(12)
      await checkforalerts()
      await helper.assign_select(H, 3)
      await checkforalerts()
      await helper.assign_select(Hmin, 3)
      await checkforalerts()
      await driver.findElement(By.css(button)).click()
      await driver.wait(until.elementLocated(By.css(helper.error_toa)), maxWaitForErrorResponse)
      await checkforalerts()
    })
  })
}

var test7 = async function () {
  describe('Test: Try to add another service, but enter a letter for the company price', function () {
  // Max time allowed for the test
    this.timeout(250000)
    it('click >  + add a new Service', async function () {
      await driver.wait(until.elementLocated(By.className('t-form-link')), maxWaitForErrorResponse)
      await driver.findElement(By.className('t-form-link')).click()
    })

    it('Try to add another service, but enter a letter for the company price', async function () {
      const dropdownDescription = 'div.rt-tbody > div.rt-tr-group div:nth-child(1) input'

      await driver.findElement(By.css(dropdownDescription)).sendKeys(globalServiceName + ' letter for the company price ')
      await checkforalerts()
      await driver.findElement(By.css(costg)).sendKeys('aaa')
      await checkforalerts()
      await driver.wait(until.elementLocated(By.css('div.rt-tbody > div.rt-tr-group div:nth-child(2) div.TextInput.error')), maxWaitForErrorResponse)
      await checkforalerts()
    })
    after(function () {
      driver.quit()
    })
  })
}

var test9 = async function () {
  describe("Edit an exsisting service with the identical criteria as one of the above and save, verify the error (shouldn't allow duplicates)", function () {
  // Max time allowed for the test
    this.timeout(250000)
    it('getting information from a current service', async function () {
      await driver.wait(until.elementLocated(By.className('FormText')), maxWaitForErrorResponse)
      await driver.findElements(By.css('span.FormText')).then(async function (elements) { // check for modal
        var length = elements.length

        if (length > 0) {
          await driver.findElement(By.css('span.FormText')).getAttribute('innerHTML').then(async function (html) {

          })
        }
      })
    })

    it('Edit an exsisting service with the identical criteria as one of the above and save', async function () {

    })
    after(function () {
      driver.quit()
    })
  })
}

var test8 = async function () {
  describe('Test : Update all fields of the third service, verify that the fields saved as expected.', function () {
  // Max time allowed for the test
    this.timeout(250000)

    //  it('click >  + add a new Service'  , async function(){
    //      await driver.wait(until.elementLocated(By.className('t-form-link')), maxWaitForErrorResponse)
    //      await driver.findElement(By.className('t-form-link')).click()
    //  })
    const cost = 'div.rt-tbody > div.rt-tr-group:nth-child(3) div:nth-child(2) input'
    const defwalkerpayroll = 'div.rt-tbody > div.rt-tr-group:nth-child(3) div:nth-child(3) input'
    const H = 'div.rt-tbody > div.rt-tr-group:nth-child(3) div:nth-child(4) '
    const Hmin = 'div.rt-tbody > div.rt-tr-group:nth-child(3) div:nth-child(4) div.MinutesSelect '
    const active = 'div.rt-tbody > div.rt-tr-group:nth-child(3) div:nth-child(5) div.Switch div'
    const button = '.ButtonGroup button'

    it('Updating all fields of the third service', async function () {
      await driver.findElement(By.css(cost)).clear()
      await driver.findElement(By.css(cost)).sendKeys(55)
      await driver.findElement(By.css(defwalkerpayroll)).clear()
      await driver.findElement(By.css(defwalkerpayroll)).sendKeys(65)
      await checkforalerts()
      await helper.assign_select(H, 4)
      await checkforalerts()
      await helper.assign_select(Hmin, 4)
      await checkforalerts()
      await driver.findElement(By.css(active)).click()
      await driver.findElement(By.css(button)).click()
      await driver.wait(until.elementLocated(By.css('div.rt-tbody > div.rt-tr-group:nth-child(3) div:nth-child(1) div')), maxWaitForErrorResponse)
      await checkforalerts()
    })
    it('verify that the fields saved as expected.', async function () {
      await helper.check_value(driver.findElement(By.css(cost)), 55)
      await helper.check_value(driver.findElement(By.css(defwalkerpayroll)), 65)
    })
  })
}

var run = async function () {
  await test1()
  await test8()
  await test2()
  await test3()
  await test4()
  await test5()
  await test6()
  await test7()

  await test9()
}

module.exports = {
  run

}
