require('dotenv').config()

const env = process.env

if (!env.E2E_TIMEOUT_SECONDS) {
  throw new Error('Please specify E2E_TIMEOUT_SECONDS in .env file')
}

module.exports = env
