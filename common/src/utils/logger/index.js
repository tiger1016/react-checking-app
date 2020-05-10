// Utils
import { UrlUtil } from '../urlUtil'

class Logger {
  /**
   * Set variables and configuration options for logger class
   * @return {Void}
   */
  constructor () {
    // Toggle log
    this.doLog = true
    // Show PC (Petcheck) label
    this.pcLabel = false
    // Set enviroment
    this.env = process.env.NODE_ENV
    // Set build target
    this.buildTarget = process.env.BUILD_TARGET
    // logs Downloads
    this.logDownloads = false
    // Toggle rendering log
    this.logRenders = false
    // Toggle session log
    this.logSession = false
    // Toggle storage log
    this.logStorage = false
    // Toggle XHR log
    this.logXHR = true
  }

  /**
   * Get color of error code
   * @param  {Number}    code error code
   * @return {String} hex color string
   */
  colorCode (code = -1) {
    if (typeof code === 'string') {
      const match = code.match(/\d+/g)
      if (match && match.length) {
        code = match[0]
      } else {
        code = -1
      }
    }
    switch (code) {
      case 1:
        return '#e6323d'
      case 2:
        return '#efce19'
    }
    return '#4d8f7a'
  }

  /**
   * Disable logging
   * @return {void}
   */
  disableLog () {
    this.doLog = false
  }

  /**
   * log function for storage operations
   * @param  {String} message   Description to log
   * @param  {Mixed}  data      Data to log
   * @return {Void}
   */
  dlog (message, data) {
    if (this.logStorage) {
      this.log(message, data, 'Storage', '#9642d3')
    }
  }

  /**
   * Enable logging
   * @return {Void}
   */
  enableLog () {
    this.doLog = true
  }

  /**
   * Get color of http code
   * @param  {Number}    httpCode http code
   * @return {String} hex color string
   */
  httpColorCode (httpCode = -1) {
    if (typeof httpCode === 'string') {
      const match = httpCode.match(/\d+/g)
      if (match && match.length) {
        httpCode = match[0]
      } else {
        httpCode = -1
      }
    }
    httpCode = Number(httpCode)
    if (httpCode < 0) {
      return '#7a9eea'
    } else if (httpCode === 200) {
      return '#38fd19'
    } else if (httpCode < 500) {
      return '#daa520'
    } else if (httpCode < 600) {
      return '#ff440b'
    }
    return '#7a9eea'
  }

  /**
   * generic log function
   * @param  {String} message    description to log
   * @param  {Mixed}  data       data to log
   * @param  {String} label      log type identifier
   * @param  {String} labelColor color for log type identifier
   * @param  {Number} code       error or http code
   * @return {Void}
   */
  log (message = '', data = null, label = 'log', labelColor = '#fae583', code = 0) {
    if (this.env !== 'production' && this.doLog) {
      console.group(
        `%c${this.pcLabel ? '[ PC ]' : ''}[ env: ${this.env} ](%c${label}%c) >> %c${message}`,
        `color: ${this.colorCode(code)}`,
        `color: ${labelColor}`,
        `color: ${this.colorCode(code)}`,
        `color: ${labelColor}`
      )
      console.log(data)
      console.groupEnd()
    }
  }

  /**
   * log function for component renders
   * @param  {String} message   Description to log
   * @param  {Mixed}  component Component object
   * @return {Void}
   */
  rlog (message, component) {
    if (this.logRenders) {
      this.log(message, component, 'Render', '#ff7f50')
    }
  }

  /**
   * log function for session operations
   * @param  {String} message   Description to log
   * @param  {Mixed}  data      Data to log
   * @return {Void}
   */
  slog (message, data) {
    if (this.logSession) {
      this.log(message, data, 'Session', '#44eeee')
    }
  }

  /**
   * logs download progress
   * @param  {String} url        url source string
   * @param  {Number} statusCode response status code
   * @param  {String} statusText response status text
   * @param  {Number} loaded     loaded progress
   * @param  {Number} total      download total
   * @return {Void}
   */
  xdownload (url = '', statusCode = -1, statusText = '', loaded = 0, total = 0) {
    // let labelColor = '#7a9eea'
    if (this.logDownloads) {
      const urlFormatted = new UrlUtil(url)
      console.log(
        `%c${this.pcLabel ? '[ PC ]' : ''}(${this.buildTarget})(${this.env})(%cXHR%c) >> %c${statusCode}:${statusText} DOWNLOAD ${urlFormatted.pathname()} %c${loaded} of ${total && total > 0 ? total : 'unknown'}`,
        `font-weight: 100; color: #617976`,
        `font-weight: 100; color: #617976`,
        `font-weight: 100; color: #617976`,
        `font-weight: 100; color: #617976`,
        `font-weight: 100;`
      )
    }
  }

  /**
   * log XHR error
   * @param  {Object} error XHR error
   * @return {Void}
   */
  xerror (error) {
    console.error(error)
  }

  /**
   * log function for XHR operations
   * @param  {String} message   Description to log
   * @param  {Mixed}  data      Data to log
   * @param  {Number}    code      Error code
   * @return {Void}
   */
  xlog (responseCodeOrRequestMethod, url, dataLabel, reponseDataOrRequestParams, code = 0) {
    const labelColor = '#7a9eea'
    if (this.logXHR && url !== '/network') {
      console.groupCollapsed(
        `%c${this.pcLabel ? '[ PC ]' : ''}(${this.buildTarget})(${this.env})(%cXHR%c) >> %c${responseCodeOrRequestMethod} %c${url}`,
        `font-weight: 100; color: ${this.colorCode(code)}`,
        `font-weight: 100; color: ${labelColor}`,
        `font-weight: 100; color: ${this.colorCode(code)}`,
        `font-weight: 100; color: ${this.httpColorCode(responseCodeOrRequestMethod)}`,
        `font-weight: 100;`
      )
      console.log(dataLabel, reponseDataOrRequestParams)
      console.groupEnd()
    }
  }
}
export const logger = new Logger()
