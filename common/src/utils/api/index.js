// Libraries
import axios from 'axios'

// Config
import axiosConfig from '../../config/axios.config'

// Selectors
import { sessionTokenSelector } from '../../selectors/sessionSelector'

// Utils
import { logger } from '../logger'
import { UrlUtil } from '../urlUtil'
import { utility } from '../utility'

// Store
import { store } from '../../store'

// Actions
import destroySession from '../../actions/session/destroySession'
import updateSessionToken from '../../actions/session/updateSessionToken'

/**
 * NOTE: API CLASS CANNOT BE IMPORTED IN REDUCERS!!
 */
class Api {
  /**
   * Set variables and configuration options for logger class
   * @return {Void}
   */
  constructor () {
    // Initialize axios
    this.axios = axios.create(axiosConfig)

    // Initialize interceptor store
    this.interceptor = null

    // Log request
    this.requestLog = true
    // Log request params
    this.requestParamsLogger = true
    // Log url in short format
    this.requestUrlShortFormat = true

    // Log response
    this.responseLog = false
    // Log response url
    this.responseUrlLogger = true
    // Log url in short format
    this.responseUrlShortFormat = true
  }

  /**
   * Intercepts Error for processing before receive
   * @return {Promise Exception}         Reject exception
   */
  createResponseErrorInterceptor () {
    return error => {
      logger.xerror(error)
      return Promise.reject(error)
    }
  }

  /**
   * Intercepts response for processing before receive
   * @return {Object}         Response object
   */
  createResponseSuccessInterceptor () {
    const filename = 'utils/api'

    return response => {
      if (utility.isInvalid(response) || !utility.isAnObject(response)) {
        return Promise.reject(new Error('Response is not a valid object', filename, 60))
      }
      if (utility.isAnEmptyObject(response)) {
        return Promise.reject(new Error('Response object is empty', filename, 63))
      }
      if (utility.isAString(response)) {
        return Promise.reject(new Error(response))
      }

      response.data = response.data || {}
      response.data.error = response.data.error || {}

      if (this.responseCodeResolver(response.status) === 1) {
        let message

        if (!response.data.error) {
          message = `HTTP error code ${response.status}`
        } else if (utility.isAString(response.data.error)) {
          message = response.data.error
        } else if (utility.isAString(response.data.error.message)) {
          message = response.data.error.message
        } else if (response.data.error.error) {
          message = response.data.error.error
        } else {
          message = `HTTP error code ${response.status}`
        }
        return Promise.reject(new Error(message, filename, 69))
      }
      if (utility.isEmpty(response.data)) {
        return Promise.reject(new Error(`response.data is empty or null -> response.data = ${response.data}`, filename, 72))
      }
      if (response.data.error && response.data.error.error) {
        return Promise.reject(new Error(this.printError(response.data.error) || 'Error on api', filename, 75))
      }
      if (response.data.error && response.data.error.message) {
        return Promise.reject(new Error(this.printError(response.data.error) || 'Error on api', filename, 75))
      }
      if (response.url === `${process.env.REACT_APP_API_URL}/login` && utility.getSubDomain() === 'demo' && Number(response.data.type) !== 2) {
        return Promise.reject(new Error('Demo is only enabled for business owners'))
      }
      return response
    }
  }

  /**
   * Intercepts request for processing before send
   * @return {Object}         Request object
   */
  createRequestInterceptor = () => {
    return request => {
      this.requestLogger(request)
      return request
    }
  }

  /**
   * Delete request
   * @param  {String}  endpoint               pathname to endpoint
   * @param  {Object}  params                 url params
   * @param  {Boolean} addTokenToUrlParams    send (or not) session token in url param
   * @return {Promise}                        response promise
   */
  delete = (endpoint = '', params = {}, addTokenToUrlParams = true) => {
    const config = { method: 'delete', url: endpoint, params }
    return this.request(config, addTokenToUrlParams)
  }

  /**
   * Get request
   * @param  {String}  endpoint               pathname to endpoint
   * @param  {Object}  params                 url params
   * @param  {Boolean} addTokenToUrlParams    send (or not) session token in url param
   * @return {Promise}                        response promise
   */
  get = (endpoint = '', params = {}, addTokenToUrlParams = true) => {
    const config = { method: 'get', url: endpoint, params }
    return this.request(config, addTokenToUrlParams)
  }

  /**
   * Get request and dispatch download progress
   * @param  {String}  endpoint               pathname to endpoint
   * @param  {Object}  params                 url params
   * @param  {Func}    dispatch               redux dispatch
   * @param  {String}  progressActionType     action type fto be dispatch on download progress
   * @param  {Boolean} addTokenToUrlParams    send (or not) session token in url params
   * @return {Promise}                        response promise
   */
  getAndDispatchDownloadProgress = (endpoint = '', params = {}, dispatch, progressActionType, addTokenToUrlParams = true) => {
    const config = {
      method: 'get',
      url: endpoint,
      params,
      onDownloadProgress (e) {
        dispatch({ type: progressActionType, payload: { progress: e.loaded, progressTotal: e.total } })
      }
    }
    return this.request(config, addTokenToUrlParams)
  }

  /**
   * Returns session jwt
   * @return {String} Session JWT token string
   */
  getSessionToken () {
    return sessionTokenSelector(store.getState())
  }

  /**
   * adds session jwt token to request params
   * @param  {Object} options request options to which the jwt token will be added
   * @return {Object}         request option with jwt token added
   */
  injectTokenToUrlParams (config = {}) {
    const jwt = this.getSessionToken()
    config.params = config.params || {}
    return {
      ...config,
      params: {
        ...config.params,
        jwt
      }
    }
  }

  /**
   * Toggle response logging
   * @param  {Boolean} logResponse [true or false]
   * @return {Void}
   */
  logResponse (logResponse = true) {
    this.responseLog = logResponse
  }

  /**
   * Toggle request logging
   * @param  {Boolean} logRequest [true or false]
   * @return {Void}
   */
  logRequest (logRequest = true) {
    this.requestLog = logRequest
  }

  /**
   * Creates url utility object from string
   * @param  {String} url url string
   * @return {Object}     UrlUtil instance
   */
  parseUrl (url = '') {
    return new UrlUtil(url)
  }

  /**
   * Post request
   * @param  {String}  endpoint             pathname to endpoint
   * @param  {Object}  data                 request data to post
   * @param  {Boolean} addTokenToUrlParams  send (or not) session token in url params
   * @return {Promise}                      response promise
   */
  post (endpoint, data, addTokenToUrlParams = true, params) {
    let config = { method: 'post', url: endpoint, data }
    if (utility.isAnObject(params)) {
      config = { ...config, params }
    }
    return this.request(config, addTokenToUrlParams)
  }

  /**
   * [printError description]
   * @param  {[type]} error [description]
   * @return {[type]}       [description]
   */
  printError (error) {
    if (utility.isEmpty(error)) {
      return 'Unknown error.'
    }
    if (utility.isEmpty(error.message) && utility.isAString(error.toString())) {
      return error.toString()
    }
    if (utility.isAString(error.message)) {
      return error.message
    }
    if (utility.isAnObject(error.message) || utility.isAnArray(error.message)) {
      return JSON.stringify(error.message)
    }
    return 'Unknown error.'
  }

  /**
   * Put request
   * @param  {String}  endpoint             pathname to endpoint
   * @param  {Object}  options              request options
   * @param  {Boolean} addTokenToUrlParams  send (or not) jwt in put params
   * @return {Promise}                      response promise
   */
  put (endpoint, data, addTokenToUrlParams = true, params) {
    let config = { method: 'put', url: endpoint, data }
    if (utility.isAnObject(params)) {
      config = { ...config, params }
    }
    return this.request(config, addTokenToUrlParams)
  }

  /**
   * Simplifies http codes to error, warning, notice & ok codes
   * @param  {Number} resCode HTTP Code number
   * @return {Void}
   */
  responseCodeResolver (resCode) {
    if (resCode === 401) {
      store.dispatch(destroySession())
      return 1
    }
    if (resCode === 200) {
      return 0
    }
    if (resCode >= 400) {
      return 1
    }
    if (resCode >= 300) {
      return 2
    }
    return 0
  }

  /**
   * Formats response for logging
   * @param  {Object} response Response object
   * @return {Void}
   */
  responseLogger (response = {}) {
    if (this.responseLog) {
      logger.xlog(
        `${response.status}:${response.statusText}`,
        (this.responseUrlLogger ? (this.responseUrlShortFormat ? this.parseUrl(response.request.responseURL).pathname() : response.request.responseURL) : ''),
        'response data',
        response.data,
        this.responseCodeResolver(response.status)
      )
    }
  }

  /**
   * Generic request function
   * @param  {Object}  config  request config object
   * @param  {Boolean} addTokenToUrlParams  append (or not) jwt token to request params
   * @return {Promise}          response promise
   */
  request (config = {}, addTokenToUrlParams = true) {
    // Adds request interceptors to maniuplate request before it is send
    this.requestInterceptor = this.axios.interceptors.request.use(this.createRequestInterceptor())
    // Adds response interceptors to maniuplate response before it is send
    this.responseInterceptor = this.axios.interceptors.response.use(this.createResponseSuccessInterceptor(), this.createResponseErrorInterceptor())
    // Initialize promise
    let promise = null
    // Inject Token to config
    config = addTokenToUrlParams ? this.injectTokenToUrlParams(config) : config
    // Create request promise
    promise = this.axios.request(config)
    // Removes interceptors after call
    this.axios.interceptors.request.eject(this.requestInterceptor)
    this.axios.interceptors.request.eject(this.responseInterceptor)
    promise.then(response => {
      // Log response
      this.responseLogger(response)
      // Update Token in session store
      this.updateSessionToken(response)
    }).catch(err => {
      // Log error
      this.responseLogger(err)
    })
    // Return promise
    return promise
  }

  /**
   * Formats request for logging
   * @param  {Object} request Request object
   * @return {Void}
   */
  requestLogger (request) {
    if (this.requestLog) {
      logger.xlog(
        `${request.method.toUpperCase()}`,
        `${this.requestUrlShortFormat ? this.parseUrl(request.url).pathname() : request.url}`,
        'request params',
        this.requestParamsLogger ? request.method === 'GET' ? request.params : request.data : '',
        0
      )
    }
  }

  /**
   * update token of sessionStorage
   * @param  {Object} response response object
   * @return {Void}
   */
  updateSessionToken = (response = {}) => {
    if (response && response.data && response.data.jwt && (this.getSessionToken() !== response.data.jwt)) {
      store.dispatch(updateSessionToken(response.data.jwt))
    }
  }
}
export const api = new Api()
