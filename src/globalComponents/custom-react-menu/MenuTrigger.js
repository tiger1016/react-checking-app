import React from 'react'
import buildClassName from './mixins/buildClassName'
export default class MenuOptions extends React.Component {
  buildClassName = buildClassName.buildClassName
  toggleActive = () => {
    this.props.onToggleActive(!this.props.active)
  }
  openMenu = () => {
    this.props.openMenu()
  }
  handleKeyUp = (e) => {
    if (e.key === ' ') { this.toggleActive() }
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') { this.toggleActive() }
  }

  render () {
    var triggerClassName =
      this.buildClassName(
        'Menu__MenuTrigger ' +
        (this.props.active
          ? 'Menu__MenuTrigger__active'
          : 'Menu__MenuTrigger__inactive')
      )

    return (
      <div
        className={triggerClassName}
        // onMouseEnter={this.openMenu}

        onKeyUp={this.handleKeyUp}
        onKeyDown={this.handleKeyDown}
        tabIndex='0'
        role='button'
        aria-owns={this.context.id}
        aria-haspopup='true'
      >
        {React.cloneElement(this.props.children, { openMenu: this.openMenu })}
      </div>
    )
  }
}
// var MenuTrigger = module.exports = React.createClass({

//   contextTypes: {
//     id: PropTypes.string,
//     active: PropTypes.bool
//   },

//   mixins: [buildClassName],

//   toggleActive: function () {
//     this.props.onToggleActive(!this.context.active)
//   },
//   openMenu: function () {
//     this.props.openMenu()
//   },
//   handleKeyUp: function (e) {
//     if (e.key === ' ') { this.toggleActive() }
//   },

//   handleKeyDown: function (e) {
//     if (e.key === 'Enter') { this.toggleActive() }
//   },

//   render: function () {
//     var triggerClassName =
//       this.buildClassName(
//         'Menu__MenuTrigger ' +
//         (this.context.active
//           ? 'Menu__MenuTrigger__active'
//           : 'Menu__MenuTrigger__inactive')
//       )

//     return (
//       <div
//         className={triggerClassName}
//         // onMouseEnter={this.openMenu}

//         onKeyUp={this.handleKeyUp}
//         onKeyDown={this.handleKeyDown}
//         tabIndex='0'
//         role='button'
//         aria-owns={this.context.id}
//         aria-haspopup='true'
//       >
//         {React.cloneElement(this.props.children, {openMenu: this.openMenu})}
//       </div>
//     )
//   }

// })
