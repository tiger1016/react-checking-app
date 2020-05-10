// Libraries
import qs from 'qs'

// http://blog.stevenlevithan.com/archives/parseuri
function parseUri (str) {
  var o = parseUri.options
  var m = o.parser[o.strictMode ? 'strict' : 'loose'].exec(str)
  var uri = {}
  var i = 14

  while (i--) uri[o.key[i]] = m[i] || ''

  uri[o.q.name] = {}
  uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
    if ($1) uri[o.q.name][$1] = $2
  })

  return uri
}

parseUri.options = {
  strictMode: false,
  key: [
    'source',
    'protocol',
    'authority',
    'userInfo',
    'user',
    'password',
    'host',
    'port',
    'relative',
    'path',
    'directory',
    'file',
    'query',
    'hash'
  ],
  q: {
    name: 'queryKey',
    // eslint-disable-next-line no-useless-escape
    parser: /(?:^|&)([^&=]*)=?([^&]*)/g
  },
  parser: {
    // eslint-disable-next-line no-useless-escape
    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    // eslint-disable-next-line no-useless-escape
    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
  }
}

export class UrlUtil {
  /**
   * Creates an href element out of url string
   * @param  {String} href Url string to analize
   * @return {Void}
   */
  constructor (href) {
    if (typeof document !== 'undefined') {
      const l = document.createElement('a')
      l.href = href
      this.urlObject = l
    } else {
      this.urlObject = parseUri(href)
    }
  }

  /**
   * [parseQuesryString description]
   * @param  {[type]} string [description]
   * @return {[type]}        [description]
   */
  static parseQuesryString (string) {
    return qs.parse(string.replace(/^\?/, ''))
  }

  /**
   * Returns has section of url string
   * @return {String} url hash
   */
  hash () { // => '#hash'
    return this.urlObject.hash
  }

  /**
   * Returns host section of url
   * @return {String} host
   */
  host () { // => 'example.com:3000'
    return this.urlObject.host
  }

  /**
   * Returns hostname of url
   * @return {String} hostname
   */
  hostname () { // => 'example.com'
    return this.urlObject.hostname
  }

  /**
   * Returns pathname of url
   * @return {String} pathname
   */
  pathname () { // => '/pathname/'
    return this.urlObject.pathname
  }

  /**
   * Returns port of url
   * @return {String} port
   */
  port () { // => '3000'
    return this.urlObject.port
  }

  /**
   * Returns protocol of url
   * @return {String} protocol
   */
  protocol () { // => 'http(s):'
    return this.urlObject.protocol
  }

  /**
   * Returns search query of url
   * @return {String} search query
   */
  search () { // => '?search=test'
    return this.urlObject.search
  }
}
