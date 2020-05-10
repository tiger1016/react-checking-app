#!/bin/bash

branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
commits=$(git log origin/${branch}..${branch} | grep commit | sed s/commit//)
targetFiles=""

while read -r line; do
  targetFiles="$targetFiles $(git show --stat --oneline $line | grep -E 'common|shared|src')"
done <<< "$commits"

testAll=false
testAlerts=false
testCustomers=false
testDashboard=false
testInvoices=false
testPayroll=false
testProfile=false
testScheduler=false
testSettings=false
testStaff=false

while read -r line; do
  if echo $line | grep -iq 'alerts'; then
    testAlerts=true
  fi

  if echo $line | grep -iq 'common'; then
    testAll=true
  fi

  if echo $line | grep -iq 'customer'; then
    testCustomers=true
  fi

  if echo $line | grep -iq 'dashboard'; then
    testDashboard=true
  fi

  if echo $line | grep -iq 'invoic'; then
    testInvoices=true
  fi

  if echo $line | grep -iq 'payroll'; then
    testPayroll=true
  fi

  if echo $line | grep -iq 'profile'; then
    testProfile=true
  fi

  if echo $line | grep -iq 'shared'; then
    testAll=true
  fi

  if echo $line | grep -iq 'scheduler'; then
    testScheduler=true
  fi

  if echo $line | grep -iq 'settings'; then
    testSettings=true
  fi

  if echo $line | grep -iq 'staff'; then
    testStaff=true
  fi
done <<< "$targetFiles"

# $testAlerts && \
# $testCustomers && \
# $testDashboard && \
# $testInvoices && \
# $testPayroll && \
# $testProfile && \
# $testScheduler && \
# $testStaff && \
# testAll=true

if [ "$testAll" = true ]; then
  yarn e2e
elif [ "$testAlerts" = true ]; then
  yarn e2e licensee:alerts
elif [ "$testCustomers" = true ]; then
  yarn e2e licensee:customers
  yarn e2e:v1:customers
elif [ "$testDashboard" = true ]; then
  yarn e2e licensee:dashboard
elif [ "$testInvoices" = true ]; then
  yarn e2e:v1:invoices
elif [ "$testPayroll" = true ]; then
  yarn e2e:v1:payroll
elif [ "$testProfile" = true ]; then
  yarn e2e licensee:profile
elif [ "$testScheduler" = true ]; then
  yarn e2e licensee:scheduler
elif [ "$testStaff" = true ]; then
  yarn e2e licensee:staff
elif [ "$testSettings" = true ]; then
  yarn e2e licensee:settings
else
  echo "No tests needed"
fi
