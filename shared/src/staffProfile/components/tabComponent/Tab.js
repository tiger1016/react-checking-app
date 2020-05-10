import React, { Component, PropTypes } from 'react'
import TabLabels from './TabLabels'

export class Tab extends Component {
  static propTypes = {
    tabs: PropTypes.array.isRequired
  }

  constructor () {
    super()
    this.state = {
      currentTab: 0
    }
  }

  onTabChange (index) {
    this.setState({ currentTab: index })
  }

  render () {
    const tabContent = this.props.tabs.length > 0 ? this.props.tabs[this.state.currentTab].content : null

    return (
      <div>
        <TabLabels
          tabs={this.props.tabs}
          onTabChange={this.onTabChange.bind(this)}
          currentTab={this.state.currentTab} />
        {tabContent}
      </div>
    )
  }
}
