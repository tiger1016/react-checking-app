var React = require('react')
var buildClassName = require('../mixins/buildClassName')

var MenuTrigger = module.exports = React.createClass({

  contextTypes: {
    id: React.PropTypes.string,
    active: React.PropTypes.bool
  },

  mixins: [buildClassName],

  toggleActive: function () {
    this.props.onToggleActive(!this.context.active)
  },
  openMenu: function () {
    this.props.openMenu()
  },
  handleKeyUp: function (e) {
    if (e.key === ' ') { this.toggleActive() }
  },

  handleKeyDown: function (e) {
    if (e.key === 'Enter') { this.toggleActive() }
  },

  render: function () {
    var triggerClassName =
      this.buildClassName(
        'Menu__MenuTrigger ' +
        (this.context.active
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

})
