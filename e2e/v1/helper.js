
const { By, Key, until } = require('selenium-webdriver')
let driver = null
const successValidationObj = 'div[data-css-w74h2a=""]'
const errorValidationObj = 'div[data-css-1imjg0i=""]'
const successToa = 'div.Toastify__toast--success'
const errorToa = 'div.Toastify__toast--error'
const maxWaitForErrorResponse = 100000

var closeM = async function closeModal () {
  await driver.sleep(2000)
  await driver.findElements(By.css('.ReactModal__Content button')).then(async function (elements) { //  check for modal
    var length = elements.length
    if (length > 0) {
      for (var i = 0; i < elements.length; i++) {
        await driver.findElement(By.css('.ReactModal__Content button')).click()
      }
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

var closeMifexist = async function closeMifexist () {
  await driver.findElements(By.css('div.CustomIcon i.ion-close')).then(async function (elements) { // check for modal
    var length = elements.length
    if (length > 0) {
      await driver.wait(until.elementLocated(By.css('div.CustomIcon i.ion-close'), 12000))
      await driver.findElement(By.css('div.CustomIcon i.ion-close')).click()
      await driver.sleep(3000)
    }
  })
}

var closeErrorNotifications = async function () {
  await driver.findElements(By.css(errorToa)).then(async function (elements) { // check for modal
    var length = elements.length
    if (length > 0) {
      for (var i = 0; i < elements.length; i++) {
        await driver.sleep(4000)
        await driver.wait(until.elementLocated(By.css('.Toastify__close-button--error'), 12000))
        await driver.findElement(By.css('.Toastify__close-button--error')).click()
      }
    }
  })
}

/**
 * [description]
 * @param  {[type]}  parentElement [parent html element]
 * @param  {[type]}  childOption  [item number on select to click]
 * @param  {Boolean} debug         [debug messages]
 * @param  {Boolean} wait          [wait for select option]
 * @return {[type]}                [description]
 */
var assignSelect = async function (parentElement, childOption, debug = false, wait = false) {
  const elementName = parentElement + ' div.Select-control'
  const optionsCss = ' div.Select-menu-outer'

  if (debug) {
    await driver.findElement(By.css(parentElement)).getAttribute('innerHTML').then(async function (html) {
      console.log('[debug] >> ___PARENT:' + html)
    })
  }

  const element = await driver.findElement(By.css(elementName))

  if (debug) {
    console.log('[debug] >> clicking to ' + elementName)
    await element.getAttribute('innerHTML').then(async function (html) {
      console.log('[debug] >> ___PARENT > SELECT-CONTROL:' + html)
    })
  }

  await element.click()
  if (wait) {
    await driver.sleep(8000)
  }
  if (debug) {
    console.log('[debug] >> search to  ' + childOption + ' child on ' + parentElement)
    await element.getAttribute('innerHTML').then(async function (html) {
      console.log('[debug] >> ___PARENT > SELECT-CONTROL:' + html)
    })
  }

  if (childOption !== '' || parseInt(childOption) < 10) {
    await driver.wait(until.elementLocated(By.css(parentElement + optionsCss)), 110000)
    if (debug) {
      console.log('[debug] >> search to  ' + childOption + ' child on ' + parentElement)
    }
    await driver.findElement(By.css(parentElement + optionsCss + ' div.Select-option:nth-child(' + childOption + ')')).click()
    if (debug) {
      console.log('[debug] >> just clicked on ' + parentElement + optionsCss + ' div.Select-option:nth-child(' + childOption + ')')
    }
  }
}

var populateForm = async function (formObj, container = '') {
  const keys = Object.keys(formObj)

  await driver.wait(until.elementLocated(By.css(container + 'input[name="' + keys[0] + '"]')), 250000)

  try {
    keys.forEach(function (value) {
      driver.findElement(By.css(container + 'input[name="' + value + '"]')).clear()
      driver.findElement(By.css(container + 'input[name="' + value + '"]')).sendKeys(formObj[value])
    })
    await driver.sleep(1000)
  } catch (e) {
    console.log(e)
  }
}

var setDriver = (driverfromtest) => {
  driver = driverfromtest
}
var checkValue = async function checkvalueinform (elemtn, editedValue) {
  const text = await elemtn.getAttribute('value')

  if (text === editedValue) {
    return true
  } else {
    await driver.wait(until.elementLocated(By.css('input[value="' + text + '"]')), maxWaitForErrorResponse)
  }
}

const acceptAlert = async function () {
  driver.switchTo().alert().then((alert) => {
    alert.accept()
  }, () => {})
}

const checkforAlerts = async function checkforalerts () {
  await driver.sleep(8000)
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

module.exports = {
  assignSelect: assignSelect,
  setDriver: setDriver,
  successValidationObj,
  errorValidationObj,
  checkforAlerts,
  populateForm,
  closeM,
  successToa,
  errorToa,
  acceptAlert,
  closeErrorNotifications,
  closeMifexist,
  clear,
  checkValue
}
