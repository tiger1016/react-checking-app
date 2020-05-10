/*
this checks for the exsitence of a
CSS selector, useful to check if a
page loaded correctly
*/

const { By, until } = require('selenium-webdriver')

module.exports = async function (b, s, msWait) {
  try {
    await b.wait(until.elementLocated(By.css(s)), msWait)
  } catch (error) {
    throw error
  }
}
