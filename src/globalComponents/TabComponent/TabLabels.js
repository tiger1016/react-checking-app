// Libraries
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class TabLabels extends Component {
  static propTypes = {
    tabs: PropTypes.array.isRequired
  }

  render () {
    const labels = this.props.tabs.map((tab, index) => <TabLabel
      ident={`${this.props.ident}-link-to-${tab.tabIdent}`}
      title={tab.title}
      key={index}
      index={index}
      onTabChange={this.props.onTabChange}
      selectedTab={this.props.currentTab} />
    )

    return <div className='tabContainer'>
      {this.props.children}
      {labels}
    </div>
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
    return <button
      className={`tabBtn tabButton${this.props.selectedTab === this.props.index ? ' highlight' : ''}`}
      id={this.props.ident}
      onClick={this.onClick.bind(this)}
      title={this.props.title}
      type='button'>
      {this.props.title}
    </button>
  }
}
