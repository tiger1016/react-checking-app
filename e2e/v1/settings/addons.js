const { Builder, By, until } = require('selenium-webdriver')
const helper = require('../helper.js')
const path = require('path')
const properties = require('properties-reader')
const config = require('../config.json')
const globalproperties = properties(path.join(process.cwd(), 'e2e/v1/selectors', 'global.properties'))
const addonproperties = properties(path.join(process.cwd(), 'e2e/v1/selectors', 'addon.properties'))

const lastAddonSaved = addonproperties.get('first_addon')
let driver

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
    } else {
      console.log('any notification modal')
    }
  })
}

const init = async function () {
  driver = new Builder().forBrowser('chrome').build()
  await driver.sleep(5000)
  helper.setDriver(driver)
}

const globalAddonsName = 'UI ADDON TESTS #' + randomN() // to add repeated service name
const maxWaitForErrorResponse = 110000

async function addNewAddon (name, price, walkerPrice) {
  const button = '.ButtonGroup button'
  console.log(addonproperties.get('addon_name'))
  await driver.wait(until.elementLocated(By.css(addonproperties.get('addon_name'))), maxWaitForErrorResponse)
  await driver.sleep(5000)
  await driver.findElement(By.css(addonproperties.get('addon_name'))).click()
  await driver.sleep(5000)
  await driver.findElement(By.css(addonproperties.get('addon_name'))).sendKeys(name)
  await driver.wait(until.elementLocated(By.css(addonproperties.get('addon_price'))), maxWaitForErrorResponse)
  await driver.findElement(By.css(addonproperties.get('addon_price'))).sendKeys(price)
  await driver.wait(until.elementLocated(By.css(addonproperties.get('default_walker_payroll'))), maxWaitForErrorResponse)
  await driver.findElement(By.css(addonproperties.get('default_walker_payroll'))).sendKeys(walkerPrice)
  await driver.findElement(By.css(button)).click() // save the addon
  await checkforalerts()
}

const login = async function () {
  describe('Test : Add Addon, verify that it saved', function () {
    // Comment this 'let driver' and uncomment the driver definition on line 20
    // so edmond tests work also
    // Max time allowed for the test
    this.timeout(150000)
    it('log in', async function () {
      try {
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
      } catch (error) {
        // Always rethrow errors
        throw error
      }
    })

    it('Clicking to Settings > Addons', async function () {
      await driver.wait(until.elementLocated(By.className('setting-link')), maxWaitForErrorResponse)
      await driver.findElement(By.className('setting-link')).click()
      await driver.sleep(2000)
      await driver.wait(until.elementLocated(By.id('Settings-NavTab-link-to-/settings/addons')), maxWaitForErrorResponse)
      await driver.findElement(By.id('Settings-NavTab-link-to-/settings/addons')).click()
      await driver.wait(until.elementLocated(By.className('t-form-link')), maxWaitForErrorResponse)
    })

    it('Check Addons Parameters', async function () {
      await driver.sleep(5000)
      await driver.findElement(By.className('t-form-link')).click()
      await addNewAddon(globalAddonsName, 12, 10)
      await driver.wait(until.elementLocated(By.css(helper.successToa)), maxWaitForErrorResponse)
    })

    it(' verify that it saved', async function () {
      await driver.findElement(By.css(lastAddonSaved)).click()
      await helper.checkValue(driver.findElement(By.css(addonproperties.get('addon_name'))), globalAddonsName)
      await helper.checkValue(driver.findElement(By.css(addonproperties.get('addon_price'))), 12)
      await helper.checkValue(driver.findElement(By.css(addonproperties.get('default_walker_payroll'))), 10)
    })
  })
}

// var test2 = async function () {
//   describe('Test : Add a second addon, verify that it saved', function () {
//     const maxWaitForErrorResponse = 110000
//
//     // Max time allowed for the test
//     this.timeout(150000)
//     it('click >  + add a new Addon', async function () {
//       await driver.wait(until.elementLocated(By.css('a.t-form-link')), maxWaitForErrorResponse)
//       await driver.findElement(By.className('t-form-link')).click()
//       await driver.sleep(3000)
//     })
//
//     it('Adding Second Addon Parameters', async function () {
//       await addNewAddon('Second addon ' + globalAddonsName, 12, 10)
//       await driver.wait(until.elementLocated(By.css(helper.successToa)), maxWaitForErrorResponse)
//       await driver.wait(until.elementLocated(By.css(lastAddonSaved)), maxWaitForErrorResponse)
//     })
//
//     it(' verify that it saved', async function () {
//       await driver.findElement(By.css(lastAddonSaved)).click()
//       await helper.checkValue(driver.findElement(By.css(addonproperties.get('addon_name'))), 'Second addon ' + globalAddonsName)
//       await helper.checkValue(driver.findElement(By.css(addonproperties.get('addon_price'))), 12)
//       await helper.checkValue(driver.findElement(By.css(addonproperties.get('default_walker_payroll'))), 10)
//     })
//   })
// }
//
// var test3 = async function () {
//   describe('Test : Add a Third addon, verify that it saved', function () {
//     const maxWaitForErrorResponse = 110000
//     // Max time allowed for the test
//     this.timeout(150000)
//
//     it('click >  + add a new addon', async function () {
//       await driver.wait(until.elementLocated(By.className('t-form-link')), maxWaitForErrorResponse)
//       await driver.wait(until.elementLocated(By.css('a.t-form-link')), maxWaitForErrorResponse)
//       await driver.findElement(By.className('t-form-link')).click()
//     })
//
//     it('Adding Third addon Parameters', async function () {
//       await addNewAddon('Third Addon ' + globalAddonsName, 12, 10)
//       await driver.wait(until.elementLocated(By.css(lastAddonSaved)), maxWaitForErrorResponse)
//       await driver.wait(until.elementLocated(By.css(helper.successToa)), maxWaitForErrorResponse)
//     })
//     it(' verify that it saved', async function () {
//       await driver.findElement(By.css(lastAddonSaved)).click()
//       await helper.checkValue(driver.findElement(By.css(addonproperties.get('addon_name'))), 'Third addon ' + globalAddonsName)
//       await helper.checkValue(driver.findElement(By.css(addonproperties.get('addon_price'))), 12)
//       await helper.checkValue(driver.findElement(By.css(addonproperties.get('default_walker_payroll'))), 10)
//     })
//   })
// }
//
// var test4 = async function () {
//   describe('Test : Add a Addon with the identical criteria as one of the above', function () {
//     const maxWaitForErrorResponse = 110000
//     // Max time allowed for the test
//     this.timeout(150000)
//     try {
//       it('click >  + add a new Service', async function () {
//         await driver.wait(until.elementLocated(By.className('t-form-link')), maxWaitForErrorResponse)
//         await driver.wait(until.elementLocated(By.css('a.t-form-link')), maxWaitForErrorResponse)
//         await driver.findElement(By.className('t-form-link')).click()
//       })
//
//       it('Add Addon with the identical criteria as one of the above', async function () {
//         await addNewAddon(globalAddonsName, 12, 10)
//         //      await driver.wait(until.elementLocated(By.css(helper.error_toa)), maxWaitForErrorResponse)
//       })
//     } catch (error) {
//       throw error
//     }
//   })
// }
//
// var test5 = async function () {
//   describe('Test:Try to add another addon, but enter a letter for the pay rate', function () {
//     const maxWaitForErrorResponse = 110000
//     // Max time allowed for the test
//     this.timeout(150000)
//
//     it('click >  + add a new Service', async function () {
//       await driver.wait(until.elementLocated(By.className('t-form-link')), maxWaitForErrorResponse)
//       await driver.wait(until.elementLocated(By.css('a.t-form-link')), maxWaitForErrorResponse)
//       await driver.findElement(By.className('t-form-link')).click()
//     })
//
//     it('Adding addon, but enter a letter for the pay rate', async function () {
//       await addNewAddon(globalAddonsName + ' letter for the pay rate', 12, 'aaa')
//       await driver.wait(until.elementLocated(By.css(addonproperties.get('error_payroll'))), maxWaitForErrorResponse)
//     })
//   })
// }
//
// var test6 = async function () {
//   describe('Test: Try to add another addon, but enter a addon longer than 50 characters long', function () {
//     const maxWaitForErrorResponse = 110000
//     // Max time allowed for the test
//     this.timeout(150000)
//
//     it('click >  + add a new Service', async function () {
//       await driver.wait(until.elementLocated(By.className('t-form-link')), maxWaitForErrorResponse)
//       await driver.wait(until.elementLocated(By.css('a.t-form-link')), maxWaitForErrorResponse)
//       await driver.findElement(By.className('t-form-link')).click()
//     })
//
//     it('Adding addon, addon longer than 50 characters long', async function () {
//       await addNewAddon(globalAddonsName + ' thisisaservicenamewithmorethan50characterslong', 12, 10)
//       await driver.wait(until.elementLocated(By.css(lastAddonSaved)), maxWaitForErrorResponse)
//     })
//   })
// }
//
// var test7 = async function () {
//   describe('Test: Try to add another addon, but enter a letter for the company price', function () {
//     const maxWaitForErrorResponse = 110000
//     // Max time allowed for the test
//     this.timeout(150000)
//     it('click >  + add a new Service', async function () {
//       await driver.wait(until.elementLocated(By.className('t-form-link')), maxWaitForErrorResponse)
//       await driver.wait(until.elementLocated(By.css('a.t-form-link')), maxWaitForErrorResponse)
//       await driver.findElement(By.className('t-form-link')).click()
//     })
//
//     it('Try to add another addon, but enter a letter for the company price', async function () {
//       await addNewAddon(globalAddonsName + ' letter for the company prices', 'a', 10)
//       await driver.wait(until.elementLocated(By.css(addonproperties.get('error_addon_price'))), maxWaitForErrorResponse)
//       await driver.sleep(3000)
//       await checkforalerts()
//     })
//   })
// }
//
// var test8 = async function () {
//   describe('Test : Update all fields of the third addon, verify that the fields saved as expected.', function () {
//     const maxWaitForErrorResponse = 110000
//     // Max time allowed for the test
//     this.timeout(150000)
//
//     //  it('click >  + add a new Service', async function () {
//     //    await driver.sleep(8000)
//     //    await driver.wait(until.elementLocated(By.className('t-form-link')), maxWaitForErrorResponse)
//     //    await driver.sleep(3000)
//     //    await checkforalerts();
//     //    await driver.wait(until.elementLocated(By.css('a.t-form-link')), maxWaitForErrorResponse)
//     //    await driver.findElement(By.className('t-form-link')).click()
//     //
//     //  })
//
//     it('Updating all fields of the third addon', async function () {
//       await driver.wait(until.elementLocated(By.css('div.rt-tbody > div.rt-tr-group:nth-child(6) div:nth-child(1) div')), maxWaitForErrorResponse)
//       await driver.findElement(By.css('div.rt-tbody > div.rt-tr-group:nth-child(6) div:nth-child(1) div')).click()
//       const addon_name = 'div.rt-tbody > div.rt-tr-group:nth-child(6) div:nth-child(1) input'
//       const company_cost = 'div.rt-tbody > div.rt-tr-group:nth-child(6) div:nth-child(2) input'
//       const staff_pay_rate = 'div.rt-tbody > div.rt-tr-group:nth-child(6) div:nth-child(3) input'
//       const button = '.ButtonGroup button'
//       //    await driver.findElement(By.css(addon_name)).sendKeys('Third addon edited ' + globalAddonsName)
//       await driver.wait(until.elementLocated(By.css(addon_name)), maxWaitForErrorResponse)
//       await driver.findElement(By.css(company_cost)).sendKeys(55)
//       await driver.findElement(By.css(staff_pay_rate)).sendKeys(65)
//       await driver.findElement(By.css(button)).click()
//       await driver.sleep(3000)
//       await checkforalerts()
//     })
//   })
// }

// var test9 = async function () {
//   describe('Test : Update all fields of the third addon, verify that the fields saved as expected.', function () {
//     const maxWaitForErrorResponse = 110000
//     // Max time allowed for the test
//     this.timeout(150000)
//
//     it('click >  + add a new Service', async function () {
//       await helper.closeErrorNotifications()
//       await driver.wait(until.elementLocated(By.className('t-form-link')), maxWaitForErrorResponse)
//       await driver.wait(until.elementLocated(By.css('a.t-form-link')), maxWaitForErrorResponse)
//       await driver.findElement(By.className('t-form-link')).click()
//     })
//
//     it('Updating all fields of the third addon', async function () {
//       const addon_name = 'tbody > tr:nth-child(3) td:nth-child(1) input'
//       const company_cost = 'tbody > tr:nth-child(3) td:nth-child(2) input'
//       const staff_pay_rate = 'tbody > tr:nth-child(3) td:nth-child(3) input'
//
//       const button = '.ButtonGroup button'
//       //    await driver.findElement(By.css(addon_name)).sendKeys('Third addon edited ' + globalAddonsName)
//       await driver.findElement(By.css(company_cost)).sendKeys(55)
//       await driver.findElement(By.css(staff_pay_rate)).sendKeys(65)
//       await driver.findElement(By.css(button)).click()
//       await driver.wait(until.elementLocated(By.css('tbody > tr:nth-child(3) td:nth-child(1) span')), maxWaitForErrorResponse)
//     })
//   })
// }

// var test10 = async function () {
//   describe('Test : delete the third addon, verify that it was removed.', function () {
//     const maxWaitForErrorResponse = 110000
//     // Max time allowed for the test
//     this.timeout(150000)
//
//     it('click >  + add a new addon', async function () {
//       await driver.wait(until.elementLocated(By.className('t-form-link')), maxWaitForErrorResponse)
//       await driver.sleep(3000)
//       await checkforalerts()
//       await driver.wait(until.elementLocated(By.css('a.t-form-link')), maxWaitForErrorResponse)
//       await driver.findElement(By.className('t-form-link')).click()
//     })
//
//     it('delete the third addon', async function () {
//       const active = 'div.rt-tbody > div.rt-tr-group:nth-child(3) div:nth-child(4) div.Switch'
//       const button = '.ButtonGroup button'
//       await driver.findElement(By.css(active)).click()
//       await driver.sleep(3000)
//       await checkforalerts()
//       await driver.findElement(By.css(button)).click()
//       await driver.wait(until.elementLocated(By.css(active)), maxWaitForErrorResponse)
//     })
//   })
// }
//
// var test11 = async function () {
//   describe('Try to add another addon, but enter less than 3 characters, verify the error. ', function () {
//     const maxWaitForErrorResponse = 110000
//     // Max time allowed for the test
//     this.timeout(150000)
//
//     it('click >  + add a new addon', async function () {
//       await driver.wait(until.elementLocated(By.className('t-form-link')), maxWaitForErrorResponse)
//       await driver.wait(until.elementLocated(By.css('a.t-form-link')), maxWaitForErrorResponse)
//       await driver.findElement(By.className('t-form-link')).click()
//     })
//
//     it('Try to add another addon, but enter less than 3 characters', async function () {
//       await addNewAddon('tt', 12, 10)
//     })
//
//     it(' verify the error.', async function () {
//       await driver.wait(until.elementLocated(By.css('div.rt-tbody > div.rt-tr-group:nth-child(1) div:nth-child(1) div.error')), maxWaitForErrorResponse)
//     })
//     after(function () {
//       //     driver.quit()
//     })
//   })
// }

var run = async function () {
  await login()
//  await test8()
//  await test2()
//  await test3()
//  await test4()
//  await test6()
//  await test7()
//  //  await test9();
//  await test5()
//  await test10()
//  await test11()
}

module.exports = {
  run
}
