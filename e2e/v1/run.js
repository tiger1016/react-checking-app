/**
 * Command to run tests  - Use the node command to check the syntax.. and mocha to run it..
 *
 * ------------------------------------------------
 * λ node run.js  --help
 * run.js [command]
 *
 * Commands:
 *   run.js run  Run tests default : all.. Run this command using mocha.
 *
 * Options:
 *   --version  Show version number                                       [boolean]
 *   --help     Show help                                                 [boolean]
 * ------------------------------------------------
 * λ node run.js run --help
 * run.js run
 *
 * Run tests default : all.. Run this command using mocha.
 *
 * Options:
 *   --version    Show version number                                     [boolean]
 *   --help       Show help                                               [boolean]
 *   --customers  Run Test for Customers Section
 *   --invoicing  Run Test for Invoicing Section
 *   --staff      Run Test for Staff Section
 *   --payroll    Run Test for Payroll Section
 *   --reports    Run Test for Reports Sectino
 *
 */

const yargs = require('yargs')

const argv = yargs.command('run', 'Run tests default : all.. Run this command using mocha.', {
  customers: {
    describe: 'Run Test for Customers Section.',
    demand: false
  },
  invoicing: {
    describe: 'Run Test for Invoicing Section.',
    demand: false
  },
  staff: {
    describe: 'Run Test for Staff Section.',
    demand: false
  },
  payrolls: {
    describe: 'Run Test for Payroll Section.',
    demand: false
  },
  reports: {
    describe: 'Run Test for Reports Section.',
    demand: false
  },
  settings: {
    describe: 'Run tests for all the Settings Section. (addons, service , scheduler, customer-billing , staff-payroll)'
  },
  scheduler: {
    describe: 'Run tests for all the Scheduler Section.'
  },
  addons: {
    describe: 'Run tests for Settings> Addons in Profile Section.'
  },
  customer_billing: {
    describe: 'Run tests for Settings> Customer Billing in Profile Section.'
  },
  settiScheduler: {
    describe: 'Run tests for Settings> Scheduler in Profile Section.'
  },
  service: {
    describe: 'Run tests for Settings > Service in Profile Section.'
  },
  staff_payroll: {
    describe: 'staff_payroll'
  }

}).help().argv

var runSubSections = async function (subsection) {
  switch (subsection) {
    case 'addons' :
      const addons = require('./settings/addons.js')
      await addons.run()
      break
    case 'customer-billing' :
      const customerBilling = require('./settings/customer-billing.js')
      await customerBilling.run()
      break
    case 'scheduler' :
      const settingsScheduler = require('./settings/scheduler.js')
      await settingsScheduler.run()
      break
    case 'service' :
      const service = require('./settings/service.js')
      await service.run()
      break
    case 'staff-payroll' :
      const staffPayroll = require('./settings/staff-payroll.js')
      await staffPayroll.run()
      break
  }
}

var runSettings = async function () {
  if (argv.addons) {
    await runSubSections('addons')
  } else if (argv.customerBilling) {
    await runSubSections('customer-billing')
  } else if (argv.scheduler) {
    await runSubSections('scheduler')
  } else if (argv.service) {
    await runSubSections('service')
  } else if (argv.staffPayroll) {
    await runSubSections('staff-payroll')
  }
}

var run = async function run () {
  if (argv.customers) {
    const customers = require('./modules/customer.js')
    await customers.run()
  }

  if (argv.invoicing) {
    const invoicing = require('./modules/invoicing.js')
    await invoicing.run()
  }

  if (argv.staff) {
    const staff = require('./modules/staff.js')
    await staff.run()
  }

  if (argv.payrolls) {
    const payrolls = require('./modules/payroll.js')
    await payrolls.run()
  }

  if (argv.reports) {
    const reports = require('./modules/reports.js')
    await reports.run()
  }

  if (argv.scheduler) {
    const scheduler = require('./modules/scheduler.js')
    await scheduler.run()
  }

  if (argv.settings) {
    await runSettings()
  }
}

run()
