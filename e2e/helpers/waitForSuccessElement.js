/*
Use this to assert operation succeeded
*/

// Helpers
const waitForElementFound = require('./waitForElementFound')

module.exports = async function (b, msWait) {
  try {
    const successToast = `.Toastify__toast--success`
    await waitForElementFound(b, successToast, msWait)
  } catch (error) {
    throw error
  }
}
