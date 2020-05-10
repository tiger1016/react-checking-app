import React, { Component, PropTypes } from 'react'

// Styles
import '../../style.less'

class TabLabels extends Component {
  static propTypes = {
    tabs: PropTypes.array.isRequired
  }

  render () {
    const labels = this.props.tabs.map((tab, index) => {
      return (
        <TabLabel
          title={tab.title}
          key={index}
          index={index}
          onTabChange={this.props.onTabChange}
          selectedTab={this.props.currentTab} />
      )
    })

    return (
      <div className='tab-container'>
        {labels}
      </div>
    )
  }
}
export default class TabLabel extends Component {
  static propTypes = {
    title: PropTypes.any.isRequired,
    index: PropTypes.number.isRequired
  }

  onClick (e) {
    this.props.onTabChange(this.props.index)
  }

  render () {
    return (
      <button type='button'
        className={'tab-item' + (this.props.selectedTab === this.props.index ? ' highlight' : '')}
        onClick={this.onClick.bind(this)} >
        {this.props.title}
      </button>
    )
  }
}

module.exports = TabLabels
