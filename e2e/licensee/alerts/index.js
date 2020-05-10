/* globals after, before */

let browser = require('../../browser')
const { By } = require('selenium-webdriver')
const chalk = require('chalk')
const context = require('../../context')
const env = require('../../env')

// Helpers
const waitForElementFound = require('../../helpers/waitForElementFound')
const waitForLoggedIn = require('../../helpers/waitForLoggedIn')
const waitForSuccessElement = require('../../helpers/waitForSuccessElement')
const waitForSweetAlert = require('../../helpers/waitForSweetAlert')

describe('Alerts', function () {
  if (
    context.getChain() !== 'e2e' ||
    context.getChain() !== 'licensee' ||
    context.getChain() !== 'alerts'
  ) {
    context.setChain('alerts')
  }

  const msWait = env.E2E_TIMEOUT_SECONDS * 1000
  this.timeout(msWait)

  before(async function () {
    await waitForLoggedIn(browser)
    await browser.navigate().to(env.BASE + '/alerts')
  })

  after(function () {
    if (context.getChain() === 'alerts') {
      browser.quit()
    }
  })

  const alertConfirmDeletebuttonS = '.sa-confirm-button-container button'
  const buttonS = '#Alerts tr:nth-child(1) i.ion-trash-b' // first row remove button
  const deleteSelectedButtonS = '#Alerts div.button-container.base.round button'
  const row1SelectCheckBox = '#Alerts tbody tr.Row:nth-child(1) td:nth-child(1) .checkbox-input label'
  const row2SelectCheckBox = '#Alerts tbody tr.Row:nth-child(2) td:nth-child(1) .checkbox-input label'

  require('./loads')

  async function waitForAlertsFound (b) {
    let alertsFound = true
    try {
      await waitForElementFound(browser, buttonS, msWait)
      const elements = await b.findElements(By.css(buttonS))
      const length = elements.length
      alertsFound = length > 0
    } catch (error) {
      alertsFound = false
    }
    return alertsFound
  }

  it('Removes first alert', async function () {
    try {
      if (await waitForAlertsFound(browser)) {
        let el = await browser.findElement(By.css(buttonS))
        await el.click()
        await waitForSweetAlert(browser, msWait)
        await waitForElementFound(browser, alertConfirmDeletebuttonS, msWait)
        el = await browser.findElement(By.css(alertConfirmDeletebuttonS))
        await el.click()
        await waitForSuccessElement(browser, msWait)
      } else {
        if (env.E2E_VERBOSE) {
          console.log(chalk.blue(`
            No alerts found
            proceeding wth test...
          `))
        }
      }
    } catch (error) {
      throw error
    }
  })

  it('Removes multiple alerts', async function () {
    try {
      if (await waitForAlertsFound(browser)) {
        await waitForElementFound(browser, row1SelectCheckBox, msWait)
        let checkbox = await browser.findElement(By.css(row1SelectCheckBox))
        await checkbox.click()

        let secondCheckBoxExists = true

        try {
          await waitForElementFound(browser, row1SelectCheckBox, msWait)
          checkbox = await browser.findElement(By.css(row2SelectCheckBox))
          await checkbox.click()
        } catch (error) {
          secondCheckBoxExists = false
        }

        if (!secondCheckBoxExists) {
          if (env.E2E_VERBOSE) {
            console.log(chalk.blue(`
              Only one alert found
              proceeding wth test...
            `))
          }
        }

        const deleteButton = await browser.findElement(By.css(deleteSelectedButtonS))
        await deleteButton.click()

        await waitForSweetAlert(browser, msWait)
        await waitForElementFound(browser, alertConfirmDeletebuttonS, msWait)
        let el = await browser.findElement(By.css(alertConfirmDeletebuttonS))
        await el.click()

        await waitForSuccessElement(browser, msWait)
      } else {
        if (env.E2E_VERBOSE) {
          console.log(chalk.blue(`
            No alerts found
            proceeding wth test...
          `))
        }
      }
    } catch (error) {
      throw error
    }
  })
})
