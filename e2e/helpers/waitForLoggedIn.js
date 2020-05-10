const chalk = require('chalk')
const { By } = require('selenium-webdriver')
const env = require('../env')

// Helpers
const waitForElementFound = require('./waitForElementFound')

module.exports = async function (b) {
  try {
    if (env.E2E_VERBOSE) {
      console.log(chalk.blue(`
        Logging in...
      `))
    }

    const msWait = env.E2E_TIMEOUT_SECONDS * 1000
    await b.get(env.BASE)

    let loggedInFormFound = false

    try {
      if (process.env.E2E_IS_MOBILE) {
        await b.findElement(By.css('.login-form'))
      } else {
        await b.findElement(By.css('#Login'))
      }
      loggedInFormFound = true
    } catch (error) {
      if (env.E2E_VERBOSE) {
        console.log(chalk.blue(`
          No login form found
          proceeding wth test...
        `))
      }
    }

    if (loggedInFormFound) {
      let usernameFieldSelector = 'form > input:nth-child(1)'
      let passwordFieldSelector = 'form > input:nth-child(2)'
      let submitButtonSelector = 'form > button'

      if (process.env.E2E_IS_MOBILE) {
        usernameFieldSelector = '.login-form input[placeholder="Enter email"]'
        passwordFieldSelector = '.login-form input[placeholder="Enter password"]'
        submitButtonSelector = '.login-form div:nth-child(5) div'
      }

      await waitForElementFound(b, usernameFieldSelector, msWait)
      await b.findElement(By.css(usernameFieldSelector)).clear()
      await b.findElement(By.css(usernameFieldSelector)).sendKeys(env.E2E_TEST_USERNAME)
      await b.findElement(By.css(passwordFieldSelector)).clear()
      await b.findElement(By.css(passwordFieldSelector)).sendKeys(env.E2E_TEST_PASSWORD)
      await b.findElement(By.css(submitButtonSelector)).click()

      if (process.env.E2E_IS_MOBILE) {
        await waitForElementFound(b, '.Dashboard', msWait)
      } else {
        await waitForElementFound(b, '#Dashboard', msWait)
      }
    }
  } catch (error) {
    throw error
  }
}
