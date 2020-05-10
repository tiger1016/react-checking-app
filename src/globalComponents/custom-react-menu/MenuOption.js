import React from 'react'
import buildClassName from './mixins/buildClassName'

export default class MenuOption extends React.Component {
  notifyDisabledSelect = () => {
    if (this.props.onDisabledSelect) {
      this.props.onDisabledSelect()
    }
  }
  buildClassName = buildClassName.buildClassName
  onSelect = () => {
    if (this.props.disabled) {
      this.notifyDisabledSelect()
      // early return if disabled
      return
    }
    if (this.props.onSelect) {
      this.props.onSelect()
    }
    this.props._internalSelect()
  }

  handleKeyUp = (e) => {
    if (e.key === ' ') {
      this.onSelect()
    }
  }

  handleKeyDown = (e) => {
    e.preventDefault()
    if (e.key === 'Enter') {
      this.onSelect()
    }
  }

  handleClick = () => {
    this.onSelect()
  }

  handleHover = () => {
    this.props._internalFocus(this.props.index)
  }

  buildName = () => {
    var name = this.buildClassName('Menu__MenuOption')
    if (this.props.active) {
      name += ' Menu__MenuOption--active'
    }
    if (this.props.disabled) {
      name += ' Menu__MenuOption--disabled'
    }
    return name
  }

  render () {
    var {
      disabled, role, children
    } = this.props
    return (
      <div
        // {...otherProps}
        onClick={this.handleClick}
        onKeyUp={this.handleKeyUp}
        onKeyDown={this.handleKeyDown}
        onMouseOver={this.handleHover}
        className={this.buildName()}
        role={role}
        tabIndex='-1'
        aria-disabled={disabled}
      >
        {children}
      </div>
    )
  }
}
MenuOption.defaultProps = {
  role: 'menuitem'
}
// var MenuOption = module.exports = React.createClass({

//   propTypes: {
//     active: PropTypes.bool,
//     onSelect: PropTypes.func,
//     onDisabledSelect: PropTypes.func,
//     disabled: PropTypes.bool,
//     role: PropTypes.string
//   },

//   getDefaultProps: function () {
//     return {
//       role: 'menuitem'
//     }
//   },

//   mixins: [buildClassName],

//   notifyDisabledSelect: function () {
//     if (this.props.onDisabledSelect) {
//       this.props.onDisabledSelect()
//     }
//   },

//   onSelect: function () {
//     if (this.props.disabled) {
//       this.notifyDisabledSelect()
//       // early return if disabled
//       return
//     }
//     if (this.props.onSelect) {
//       this.props.onSelect()
//     }
//     this.props._internalSelect()
//   },

//   handleKeyUp: function (e) {
//     if (e.key === ' ') {
//       this.onSelect()
//     }
//   },

//   handleKeyDown: function (e) {
//     e.preventDefault()
//     if (e.key === 'Enter') {
//       this.onSelect()
//     }
//   },

//   handleClick: function () {
//     this.onSelect()
//   },

//   handleHover: function () {
//     this.props._internalFocus(this.props.index)
//   },

//   buildName: function () {
//     var name = this.buildClassName('Menu__MenuOption')
//     if (this.props.active) {
//       name += ' Menu__MenuOption--active'
//     }
//     if (this.props.disabled) {
//       name += ' Menu__MenuOption--disabled'
//     }
//     return name
//   },

//   render: function () {
//     var {
//       active, onSelect, onDisabledSelect, disabled, role, children, ...otherProps
//     } = this.props
//     return (
//       <div
//         // {...otherProps}
//         onClick={this.handleClick}
//         onKeyUp={this.handleKeyUp}
//         onKeyDown={this.handleKeyDown}
//         onMouseOver={this.handleHover}
//         className={this.buildName()}
//         role={role}
//         tabIndex='-1'
//         aria-disabled={disabled}
//       >
//         {children}
//       </div>
//     )
//   }

// })
