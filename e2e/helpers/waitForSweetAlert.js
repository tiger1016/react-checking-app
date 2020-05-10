// Helpers
const waitForElementFound = require('./waitForElementFound')

module.exports = async function (b, msWait) {
  try {
    const sweetAlertIsVisible = `.showSweetAlert.visible`
    await waitForElementFound(b, sweetAlertIsVisible, msWait)
  } catch (error) {
    throw error
  }
}
