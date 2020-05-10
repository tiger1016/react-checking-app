// Libraries
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TabLabels } from './TabLabels'
import { Circle } from 'rc-progress'

// Styles
import './index.css'

export class Tab extends Component {
  constructor () {
    super()
    this.state = {
      currentTab: 0
    }
    this.currentTab = this.state.currentTab
  }

  static propTypes = {
    tabs: PropTypes.array.isRequired
  }

  componentDidMount () {
    if (this.props.onRef) {
      this.props.onRef(this)
    }
  }

  onTabChange = (index) => {
    if (index > this.currentTab && this.props.checkValidation) {
      if (this.props.tabs[this.state.currentTab].checkValidation()) {
        this.setState({ currentTab: index })
        this.props.onTabChange(index)
      }
    } else {
      this.setState({ currentTab: index })
      this.props.onTabChange(index)
    }
  }

  nextTab = () => {
    if (this.props.checkValidation) {
      if (this.props.tabs[this.state.currentTab].checkValidation()) {
        if (this.props.tabs.length !== this.state.currentTab) {
          this.setState({ currentTab: this.state.currentTab + 1 })
          this.props.onTabChange(this.state.currentTab + 1)
        }
      }
    } else {
      if (this.props.tabs.length !== this.state.currentTab) {
        this.setState({ currentTab: this.state.currentTab + 1 })
        this.props.onTabChange(this.state.currentTab + 1)
      }
    }
  }

  previousTab = () => {
    if (this.state.currentTab !== 0) {
      this.setState({ currentTab: this.state.currentTab - 1 })
      this.props.onTabChange(this.state.currentTab - 1)
    }
  }

  render () {
    const tabContent = this.props.tabs.length > 0 ? this.props.tabs[this.state.currentTab].content : null
    const progress = ((this.state.currentTab + 1) / (this.props.tabs.length)) * 100
    return (
      <div className={this.props.isModal ? 'petcheck_tab modal' : 'petcheck_tab'} id={this.props.id}>
        <TabLabels
          ident={this.props.id}
          tabs={this.props.tabs}
          onTabChange={this.onTabChange}
          currentTab={this.state.currentTab}>
          {this.props.isProgress ? <div className='circleContainer'>
            <Circle trailWidth='15' percent={progress} strokeWidth='13' strokeColor='#1875F0' />
          </div> : null}
        </TabLabels>
        {tabContent}
      </div>
    )
  }
}
