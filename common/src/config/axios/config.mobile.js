import getEnvVars from 'Root/environment'

const { REACT_APP_API_URL } = getEnvVars()

console.log(getEnvVars, REACT_APP_API_URL)

export default {
  // `baseURL` will be prepended to `url` unless `url` is absolute.
  // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
  // to methods of that instance.
  baseURL: REACT_APP_API_URL || ''
}
