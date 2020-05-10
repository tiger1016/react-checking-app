
# Tests Report 

## Alerts Section 
λ mocha run.js --alerts
PS D:\petcheck\licensee-portal-tests\ui-tests> mocha run.js --alerts


  Test : Remove a single alert, verify it is removed

DevTools listening on ws://127.0.0.1:8795/devtools/browser/638f0f5f-018c-4183-bd54-8f8609e1cf89
    √ Check user parameters (13921ms)

  To alerts Section
    √ Clicking to alerts Section (7498ms)

  Testing remove functions
No alerts found.
    √ Removing first alert
No alerts found.
    √ Removing multiple alerts


  4 passing (21s)

## Invoicing Section 
λ mocha run.js --invoicing
PS D:\petcheck\licensee-portal-tests\ui-tests> mocha run.js --invoicing


  Test : Checking the invoices list.

DevTools listening on ws://127.0.0.1:23896/devtools/browser/23300ef1-2c8d-4a75-aa39-bb3a4b99d782
    √ Check user parameters (10481ms)

  To invoices Section
    √ Clicking to Invoicing (4199ms)

  Show first Invoice
    √ Show first Invoice  (4500ms)

  Check Unpaid list
    √ Clicking to Unpaid tab (4253ms)

  Check Paid list
    √ Clicking to paid tab (194ms)
    √ Show first Invoice 

  Search and send invoice to Customer
    √ Clicking to All tab (239ms)
    √ Sending invoice to customer (6820ms)

  Test : To Scheduler section.
    √ Clicking to Scheduler (107ms)

  Test : As the licensee, schedule a new service for today for customer one using walker one with all fields and save.  Verify the walk saved correctly.
    √ Openning modals (5596ms)
    √ filling form (5394ms)

  To invoices Section
    √ Clicking to Invoicing (379ms)

  Create new Invoice
    √ filling form (3543ms)

  Receive Payment
    √ Checking payment parameters (16999ms)


  14 passing (1m)

## Payrolls Section 
λ mocha run.js --payrolls
PS D:\petcheck\licensee-portal-tests\ui-tests> mocha run.js --payrolls


  Test : Login

DevTools listening on ws://127.0.0.1:23971/devtools/browser/7bc29b53-0740-49f5-b2d4-4eaf50e47086
    √ log in (11732ms)

  To payroll Section
    √ Clicking to Staff Section (1423ms)

  Test : Checking the staff list.
    √ Search for walker to check payroll (426ms)
    √ Checking if exist (3090ms)
    √ Sending payroll (5003ms)


  5 passing (22s)

##SCHEDULER
PS D:\petcheck\licensee-portal-tests\ui-tests> mocha run.js --scheduler


  Test : To Scheduler section.

DevTools listening on ws://127.0.0.1:23771/devtools/browser/bb07824f-112e-479e-9bc3-89cf4df0c678
    √ log in (11910ms)

  Test : To Scheduler section.
    √ Clicking to Scheduler (2182ms)

  Test : As the licensee, schedule a new service without the required fields.  Verify the error.
    √ Openning modals (5378ms)
    √ Checking errors for required fields (110ms)

  Test : As the licensee, schedule a new service for today for customer one using walker one with all fields and save.  Verify the walk saved correctly.
    √ Openning modals (5319ms)
    √ filling form (4639ms)

  Test : As the licensee, delete one of the walks, make sure that it no longer appears on the schedule.
    √ Searching and remove walk (7596ms)

  As the licensee, search for the first service based on pet name, verify that it appears as expected.
    √ Search service based on pet name (1136ms)
    √ verify that it appears as expected.

  As the licensee, change all values of the second service, verify it saved as expected.
    √ change all values of the second service (9520ms)

  As the licensee, search for the first service with the search box.  Verify it's the only one you see.
    √ getting firts service information (10328ms)
    √ search for the first service with the search box (1358ms)
    √ Verify it's the only one you see.

  As the licensee, search for the second service with the services filter.  Verify it's the only one you see.
appointment-76981
    √ getting firts service information (10326ms)
    √ search for the second service with the services filter. (1378ms)
    √ Verify it's the only one you see.


  16 passing (1m)

## Reports Section 
λ mocha run.js --reports

PS D:\petcheck\licensee-portal-tests\ui-tests> mocha run.js --reports


  Test : Login

DevTools listening on ws://127.0.0.1:18835/devtools/browser/9610f5c1-bf6c-4ff3-b5d1-c5e8d1f6d827
    √ log in (11839ms)

  To Reports Section
    √ Clicking to Reports (9053ms)

  Generating Transactions report
    √ setting start and end Date (19078ms)

  Generating Sales  report
    √ setting start and end Date (51655ms)

  Generating Disbursement report
    √ clicking to Disbursement tab (117ms)
    √ setting start and end Date (8164ms)

  Generating Recievables report
    √ setting start and end Date (16451ms)

  Generating Activity report
    √ setting start and end Date (37922ms)

  Generating Walk Audit report
    √ setting start and end Date (18671ms)

  Generating Payroll  report
    √ setting start and end Date (8862ms)

  Generating Qr codes report
    √ setting start and end Date (8385ms)

  Generating Customer mailing  report
    √ setting start and end Date (24710ms)


  12 passing (4m)


## Staff Section
PS D:\petcheck\licensee-portal-tests\ui-tests> mocha run.js --staff


  Test : Login

DevTools listening on ws://127.0.0.1:56199/devtools/browser/2be661af-3554-46c0-be25-b4f69f61a5a3
    √ log in (12506ms)

  To Staff Section
    √ Clicking to Staff (17757ms)

  [ Petcheck UI Tests ] >> Create new walker step by step
    √ Step 1  (7778ms)
    √ Step 2  (1644ms)
    √ Step 3  (4784ms)
    √ Step 4  (3001ms)
    √ step 5 (37926ms)

  To Staff Section
    √ Clicking to Staff (3192ms)

  [ Petcheck UI Tests ] >> Create a second Staff member with an email we can automatically check later.
    √ Step 1  (9372ms)
    √ Step 2  (1653ms)
    √ Step 3  (966ms)
    √ Step 4  (2831ms)
    √ step 5 (36253ms)
    √ checking saved information (8618ms)

  To Staff Section
    √ Clicking to Staff (4667ms)

  [ Petcheck UI Tests ] >> Create a third Staff member with an email we can automatically check later.
    √ Step 1  (8287ms)
    √ Step 2  (1718ms)
    √ Step 3  (1055ms)
    √ Step 4 & 5 not implemented yet (13468ms)
    √ checking saved information (7981ms)

  To Staff Section
    √ Clicking to Staff (3330ms)

  [ Petcheck UI Tests ] >> Try to create a staff member with an invalid email, verify the error.
    √ Step 1  (12201ms)

  [ Petcheck UI Tests ] >> Try to create a staff member without required fields, verify the error
    1) Step 1 

  [ Petcheck UI Tests ] >> Edit walker information, verify result
    √ Search for specific walker (4058ms)
    √ Updating Contact information  (3591ms)
    √ Updating Work information  (1017ms)
    √ Updating emergency information  (6398ms)


  26 passing (4m)
  1 failing

  1) [ Petcheck UI Tests ] >> Try to create a staff member without required fields, verify the error
       Step 1 :
     Error: Timeout of 20000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (D:\petcheck\licensee-portal-tests\ui-tests\run.js)
  


### Customers
λ mocha run.js --customers                                                                                                                                 
PS D:\petcheck\licensee-portal-tests\ui-tests> mocha run.js --customers


  Test : Checking the Customers list.

DevTools listening on ws://127.0.0.1:24080/devtools/browser/46b945de-4df6-4825-b164-10c7fdd316e4
    √ Check user parameters (11756ms)

  To Custmer Section
    √ Clicking to Customers (4229ms)

  Create a customer with all fields entered. Assign the 1st service and the 1st walker as defaults. Payment Type: Credit Card, Billing Frequency: Weekly, Billing Timing: "Bill customer after service", Invoice Terms: Upon Receipt.
    √ Openning Modal (624ms)
    √ Setting  customer`s contact info (6784ms)
    √ Setting customer`s profile info (24706ms)
    √ Setting customer`s pet info (1733ms)
    √ Setting customer`s billing info (1111ms)
    √ Using default prices (1567ms)

  Create a duplicate customer, verify the error..
    √ Openning Modal (8439ms)
    √ Setting  customer`s contact info (7649ms)
    √ Setting customer`s profile info (10293ms)
    √ Setting customer`s pet info (1353ms)
    √ Setting customer`s billing info (1374ms)
    √ Using default prices (1601ms)

  Add a malformed email, verify the error.
    √ Openning Modal (2449ms)
    √ Setting  customer`s contact info (8783ms)

  Try to save without the required fields, verify the error message.
    √ Openning Modal (419ms)
    √ Setting  customer`s contact info (6448ms)

  Add a second pet.
    √ Openning Modal (338ms)
    √ Setting  customer`s contact info (5427ms)
    √ Setting customer`s profile info (17871ms)
    √ Setting customer`s pet info (4053ms)
    √ Setting customer`s billing info (1392ms)
    √ Using default prices (8945ms)

  Verify that you see two services, as expected
    √ Openning Modal (5404ms)
    √ Setting  customer`s contact info (5274ms)
    √ Setting customer`s profile info (1609ms)
    √ Setting customer`s pet info (1185ms)
    √ Setting customer`s billing info (650ms)
    √ Verify that you see two services, as expected
    √ Try to enter alphabet characters for the service price, verify the error. (60ms)
    √ Try to enter alphabet characters for the addons price, verify the error. (57ms)


  32 passing (3m)


# Tests for Settings Section 

### Settings / Addons Section

λ mocha run.js --settings --addons                                                                                                               
problem with inputs... they work very slow

### Settings / Service 

λ mocha run.js --settings --service
problem with inputs... they work very slow

### Settings / Customer Billing 

λ mocha run.js --settings --customer-billing
PS D:\petcheck\licensee-portal-tests\ui-tests> mocha .\run.js --settings --customer-billing


  Test : Submit your selection, verify that it saved

DevTools listening on ws://127.0.0.1:16230/devtools/browser/b5db789d-6da1-43cd-9c8f-421651eacf49
    √ log in (7689ms)
    √ Clicking to Settings > Customer Billing (7381ms)
    √ Adding Customer Billing Parameters (21774ms)


  3 passing (37s)

### Settings / Scheduler
PS D:\petcheck\licensee-portal-tests\ui-tests> mocha .\run.js --settings --sscheduler


  Test :Enable all values.  Set cutoff times to 6pm 1 Day Prior.  Verify they saved correctly.

DevTools listening on ws://127.0.0.1:16836/devtools/browser/3e789a46-8f24-40ae-be80-fa91d3eab639
    √ Check user parameters (6489ms)
    √ Clicking to Settings > Scheduler (27139ms)
    √ Adding Payroll Parameters (13142ms)


  3 passing (47s)

### Staff payroll

  There is not staff payroll section any more


### Profil / Bank Information 
PS D:\petcheck\licensee-portal-tests\ui-tests> mocha run.js --profile --bank-information


  [ Petcheck UI Tests ] >>  : Enter a good set of data and save.  Verify that it saved correctly.

DevTools listening on ws://127.0.0.1:29815/devtools/browser/3e5dc6ec-d751-4fe0-abfa-1272fbbe7ab5
    √ log in (8699ms)
    √ Clicking to Profile > Bank Information (2797ms)
    1) Enter a good set of data and save.  Verify that it saved correctly

  [ Petcheck UI Tests ] >>  Enter a malformed birth date, verify the error
    √ Enter a malformed birth date (20205ms)
    √ verify the error

  Enter a malformed and blank account number, verify the error
    √ Enter a malformed and blank account number (754ms)
    √ verify the error

  Enter a malformed and blank account routing , verify the error
    √ Enter a malformed and blank account routing  (744ms)
    √ verify the error


  8 passing (3m)
  1 failing

  1) [ Petcheck UI Tests ] >>  : Enter a good set of data and save.  Verify that it saved correctly.
       Enter a good set of data and save.  Verify that it saved correctly:
     Error: Timeout of 150000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (D:\petcheck\licensee-portal-tests\ui-tests\run.js)
  



### Password
λ mocha run.js --profile --passwords                                                                                  
 PS D:\petcheck\licensee-portal-tests\ui-tests> mocha .\run.js --profile --passwords


  Test : Enter all information in the profile, make sure it saves correctly.

DevTools listening on ws://127.0.0.1:17050/devtools/browser/71638c63-4c55-4b19-bf9d-fa72fc8abfb3
    √ Check user parameters (8456ms)
    √ Clicking to Profile > Profile Information (8766ms)

  Enter a good set of data for global password & account   password, verify it saved correctly
    √ Clicking to Profile > Passwords (106ms)
    √ Account password (538ms)
    √ Global password (365ms)

  Enter a mismatched password and global password, confirm that there is an error.
    √ Clicking to Profile > Passwords (67ms)
    √ Mismatched  Account password (366ms)
    √ Mismatched Global password (363ms)


  8 passing (19s)
                                                                                                                      
### Profile Information                            
PS D:\petcheck\licensee-portal-tests\ui-tests> mocha run.js --profile --profile-information


  Test : Enter all information in the profile, make sure it saves correctly.

DevTools listening on ws://127.0.0.1:30122/devtools/browser/80f0d419-0134-4034-a8ef-e0000853970d
    √ Check user parameters (8148ms)
    √ Clicking to Profile > Profile Information (7770ms)
any notification modal
    √ Updating Profile information (22726ms)
    √ make sure it saves correctly (312ms)

  Test : Enter a letter for sales tax, verify the error
any notification modal
    √ Updating field sales_tax_percentage  (11391ms)

  Update all fields, set sales tax to 7%, make sure values (including the image) are displayed as expected after edit.
    √ Updating Profile information (15491ms)

  Enter an malformed email address, verify the error
    √ Updating username information (341ms)

  Enter a mismatched password and global password, confirm that there is an error.
any notification modal
    1) Clicking to Profile > Passwords
    √ Mismatched  Account password (838ms)
    √ Mismatched Global password (2264ms)

  Enter qr codes, confirm the success message.  Also confirm that the number of remaining barcodes has changed on the chart. Confirm the message was received by the admin, and add qr codes as the admin.
    √ Clicking to Profile > Qr codes (69ms)
    √ Sending 2 qr codes extra (5862ms)

  Update shipping address by clicking the 'Same as billing address', verify the updated address
    √ Clicking to Profile > profile pic (2110ms)
    √ Update shipping address by clicking the 'Same as billing address' (297ms)
    √ verify the updated address (47ms)

  Successfully log out of licensee profile, return to login page
    2) Clicking to Profile > logout


  14 passing (2m)
  2 failing

  1) Enter a mismatched password and global password, confirm that there is an error.
       Clicking to Profile > Passwords:
     UnexpectedAlertOpenError: unexpected alert open: {Alert text : Are you sure you wanna discard the information you entered?}
  (Session info: chrome=75.0.3770.142)
  (Driver info: chromedriver=2.41.578737 (49da6702b16031c40d63e5618de03a32ff6c197e),platform=Windows NT 10.0.17134 x86_64)
      at Object.checkLegacyResponse (D:\petcheck\licensee-portal-tests\node_modules\selenium-webdriver\lib\error.js:592:13)
      at parseHttpResponse (D:\petcheck\licensee-portal-tests\node_modules\selenium-webdriver\lib\http.js:551:13)
      at Executor.execute (D:\petcheck\licensee-portal-tests\node_modules\selenium-webdriver\lib\http.js:486:26)
      at process._tickCallback (internal/process/next_tick.js:68:7)

  2) Successfully log out of licensee profile, return to login page
       Clicking to Profile > logout:
     WebDriverError: unknown error: Element <span class="profile-pic-container" style="border-color: transparent;">...</span> is not clickable at point (1684, 25). Other element would receive the click: <div class="Toastify__toast Toastify__toast--success" style="">...</div>
  (Session info: chrome=75.0.3770.142)
  (Driver info: chromedriver=2.41.578737 (49da6702b16031c40d63e5618de03a32ff6c197e),platform=Windows NT 10.0.17134 x86_64)
      at Object.checkLegacyResponse (D:\petcheck\licensee-portal-tests\node_modules\selenium-webdriver\lib\error.js:585:15)
      at parseHttpResponse (D:\petcheck\licensee-portal-tests\node_modules\selenium-webdriver\lib\http.js:551:13)
      at Executor.execute (D:\petcheck\licensee-portal-tests\node_modules\selenium-webdriver\lib\http.js:486:26)
      at process._tickCallback (internal/process/next_tick.js:68:7)

### Payment information 
λ mocha run.js --profile --payment-information

not working 
https://demo.petchecktechnology.com/profile/payment-information

### QR code
λ mocha run.js --profile --qr-codes


PS D:\petcheck\licensee-portal-tests\ui-tests> mocha .\run.js --profile --qr-codes


  [ Petcheck UI Tests ] >>  : Enter all information in the profile, make sure it saves correctly.

DevTools listening on ws://127.0.0.1:6783/devtools/browser/11af9de4-9847-42c9-93bb-733a3a021474
    √ Check user parameters (9833ms)

  [ Petcheck UI Tests ] >> Enter qr codes, confirm the success message.  Also confirm that the number of has changed on the chart. Confirm the message was received by the admin, and add qr codes as the admin.
    √ Clicking to Profile > qr-codes (2019ms)
    √ Sending 2 qr codes extra (14710ms)
    √ confirm the success message (1504ms)


  4 passing (28s)