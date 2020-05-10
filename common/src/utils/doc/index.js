class Doc {
  addClassToElement (element, className) {
    const arr = element.className ? element.className.split(' ') : []
    if (arr.indexOf(className) === -1) {
      element.className += ' ' + className
    }
    element.className = element.className.trim()
  }

  captureMouseViewPortPositionFromDragOrMoveEvent (event) {
    var eventDoc
    var doc
    var body
    event = event || window.event // IE-ism

    if (event.pageX == null && event.clientX != null) {
      eventDoc = (event.target && event.target.ownerDocument) || document
      doc = eventDoc.documentElement
      body = eventDoc.body

      event.pageX = event.clientX +
        ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
        ((doc && doc.clientLeft) || (body && body.clientLeft) || 0)
      event.pageY = event.clientY +
        ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
        ((doc && doc.clientTop) || (body && body.clientTop) || 0)
    }
    return { mouseX: event.clientX, mouseY: event.clientY }
  }

  removeClassFromElement (element, className) {
    const regex = new RegExp('\b' + className + '\b', 'g')
    element.className = element.className.replace(regex, '')
  }

  insertElementAfter (newElement, targetElement) {
    // target is what you want it to go after. Look for this elements parent.
    const parent = targetElement.parentNode

    // if the parents lastchild is the targetElement...
    if (parent.lastChild === targetElement) {
      // add the newElement after the target element.
      parent.appendChild(newElement)
    } else {
      // else the target has siblings, insert the new element between the target and it's next sibling.
      parent.insertBefore(newElement, targetElement.nextSibling)
    }
  }

  /**
   * Returns top and left coordinates of provided html element
   * @param  {Object} elem DOC  element
   * @return {Object.top}       top coordinate
   * @return {Object.left}      [left coordinate
   */
  topLeftCoordsOf (elem = {}) {
    // crossbrowser version
    var box = elem.getBoundingClientRect()

    var body = document.body
    var docEl = document.documentElement

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft

    var clientTop = docEl.clientTop || body.clientTop || 0
    var clientLeft = docEl.clientLeft || body.clientLeft || 0

    var top = box.top + scrollTop - clientTop
    var left = box.left + scrollLeft - clientLeft

    return { top: Math.round(top), left: Math.round(left) }
  }

  /**
   * Returns width and height of current viewport
   * @return {Object.width}   Width of viewport
   * @return {Object.height}  Height of viewport
   */
  viewPortDimensions () {
    const test = document.createElement('div')

    test.style.cssText = 'position: fixed;top: 0;left: 0;bottom: 0;right: 0;'
    document.documentElement.insertBefore(test, document.documentElement.firstChild)

    const dimensions = { width: test.offsetWidth, height: test.offsetHeight }
    document.documentElement.removeChild(test)

    return dimensions
  }
}
export const doc = new Doc()
