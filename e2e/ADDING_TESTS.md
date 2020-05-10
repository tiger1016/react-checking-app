#Adding Tests

#V2

###Create or place the tests inside the e2e folders.

If the test if for licensee place it under `e2e/licensee` folder, if it's customer place it under `e2e/customer`, etc...

Then, create a folder for the section the tests corresponds to (if the folder doesn't already exist). For example, `alerts/`, `scheduler/`, etc... You can get the sections from the app's menus.

Each section should have a load test, which makes a quick check that the section loaded in the file `section/loads/index.js`

Add tests to `section/index.js` if no subsections exists, else add test to `section/subsections/index.js`. For example `profile/profileInformation`

###Helpers

The helpers folder has functions that can be used throughout the test.

###Before/After Mocha Hooks

We user the `before` hook and `waitForLoggedIn` helper to login to the website.
In the before hook we should have this login procedure as to not repeat code.
Use context.getChain to check if the current script should execute a login.

###Context and context.getChain/setChain

Context is an object were global properties and functions can be placed.
Because we run the tests as `yarn e2e` or `yarn e2e licensee` or `yarn e2e licensee:profile` we often need to check if we are in `e2e`, in `e2e licensee`, or `e2e:licensee:profile`.
Like for example make sure the mocha `after` hook that includes `browser.quit` only for the last test.

So `setChain` will let us set that (as `context.setChain('licensee')`) and `getChain` should give it back.
In the examples above we would use `e2e`, or `licensee` or `profile` for `setChain` respectively.

This way we can do something like
```
  after(async function () {
    if (context.getChain() === 'profile') {
      await browser.quit()
    }
  })
```
Which only runs quit if the chain ends in profile -> `yarn e2e licensee:profile`


#V1

Add v1 tests as you would normally into `e2e/v1` folder and run them as `yarn e2e:v1`
