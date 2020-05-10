// Libraries
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

// Components
import CalendarBody from './components/CalendarBody'
import CalendarHeader from './components/CalendarHeader'
import CustomScrollBar from './components/CustomScrollBar'
import FloatingButton from 'GlobalComponents/FloatingButton'

// Controllers
import { appController, schedulerController, customersController } from 'Controllers'

// Styles
import './index.css'

class Licensee extends React.Component {
  state = {
    maxScrollAmount: null,
    maxScrollPercentage: 100,
    scrollableElWidth: null,
    scrollAmount: null,
    scrollPercentage: null,
    visibleAreaWidth: null,
    verticalMaxScrollAmount: null,
    verticalScrollAmount: null,
    verticalScrollableElWidth: null,
    verticalScrollPercentage: null,
    verticalVisibleAreaHeight: null
  }

  scrollableEl = null
  stickyTopRowEl = null
  verticalScrollEl = null

  componentWillMount () {
    if (!this.props.customersLoaded) {
      customersController.actions.fetchCustomers()
    }
    document.addEventListener('keydown', this.handleKeyScroll)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyScroll)
  }

  customScrollBarOnChange = scrollPercentage => {
    if (scrollPercentage !== this.state.scrollPercentage) {
      this.setState({ scrollPercentage }, () => {
        this.scrollByPercentage(this.state.scrollPercentage)
      })
    }
  }

  handleHorizontalScroll = e => {
    const scrollAmount = this.scrollableEl.scrollLeft
    const scrollableElWidth = this.scrollableEl.scrollWidth
    const visibleAreaWidth = this.scrollableEl.offsetWidth
    const maxScrollAmount = this.scrollableEl.scrollWidth - this.scrollableEl.offsetWidth
    const scrollPercentage = this.state.scrollAmount * 100 / this.state.maxScrollAmount
    if (!this.stickyTopRowEl) this.stickyTopRowEl = document.querySelector('.fixed-top-row > div')

    this.stickyTopRowEl.style.marginLeft = '-' + scrollAmount + 'px'

    if (
      scrollAmount !== this.state.scrollAmount ||
      scrollableElWidth !== this.state.scrollableElWidth ||
      visibleAreaWidth !== this.state.visibleAreaWidth ||
      maxScrollAmount !== this.state.maxScrollAmount ||
      scrollPercentage !== this.state.scrollPercentage
    ) {
      this.setState({ maxScrollAmount, scrollableElWidth, scrollAmount, scrollPercentage, visibleAreaWidth })
    }
    if (scrollAmount === 0) {
      e.preventDefault()
    }
  }

  handleVerticalScroll = e => {
    const html = document.querySelector('html')
    const verticalScrollAmount = html.scrollTop
    const verticalScrollableElWidth = html.scrollHeight
    const verticalVisibleAreaHeight = html.offsetHeight
    const verticalMaxScrollAmount = html.scrollHeight - html.offsetHeight
    const verticalScrollPercentage = verticalScrollAmount * 100 / verticalMaxScrollAmount

    this.setState({
      verticalMaxScrollAmount,
      verticalScrollableElWidth,
      verticalScrollAmount,
      verticalScrollPercentage,
      verticalVisibleAreaHeight
    })
  }

  scrollByPercentage = scrollPercentage => {
    const scrollAmount = scrollPercentage * this.state.maxScrollAmount / 100
    if (this.scrollableEl && scrollAmount !== this.state.scrollAmount) {
      this.setState({ scrollAmount }, () => {
        this.scrollableEl.scrollLeft = this.state.scrollAmount
      })
    }
  }

  scrollEventListener = action => {
    const { view } = this.props
    const selector = 'DailyView'
    // if (view === 'week') selector = 'h-scroll'
    if (view === 'day') this.scrollableEl = document.getElementById(selector)
    this.verticalScrollEl = document.querySelector('html')
    if (this.scrollableEl) {
      if (action === 'remove') {
        if (view === 'day') this.scrollableEl.removeEventListener('scroll', this.handleHorizontalScroll)
        window.removeEventListener('scroll', this.handleVerticalScroll)
      } else {
        if (view === 'day') this.scrollableEl.addEventListener('scroll', this.handleHorizontalScroll)
        window.addEventListener('scroll', this.handleVerticalScroll)
      }
    }
  }

  addButtonOnClick = () => {
    appController.actions.toggleModal({
      modalIdentifier: appController.constants.ADD_WALK_MODAL_IDENTIFIER,
      canClose: true,
      isOpen: true,
      data: { walk: {} }
    })
  }

  handleKeyScroll = e => {
    const { scrollPercentage } = this.state
    if (e.keyCode === 37) {
      if (scrollPercentage >= 10) {
        this.setState({ scrollPercentage: scrollPercentage - 10 }, () => {
          this.scrollByPercentage(scrollPercentage)
        })
      }
    } else if (e.keyCode === 39) {
      if (scrollPercentage <= 90) {
        this.setState({ scrollPercentage: scrollPercentage + 10 }, () => {
          this.scrollByPercentage(scrollPercentage)
        })
      }
    }
  }

  render () {
    const { view } = this.props
    const handleWidth = 100 * this.state.visibleAreaWidth / this.state.scrollableElWidth

    return <div id='Scheduler-Licensee' className={`${this.state.verticalScrollAmount > 167 ? 'sticky-top-row' : ''}`}>
      <CalendarHeader />
      <CalendarBody scrollEventListener={this.scrollEventListener} />
      {view === 'day' && <CustomScrollBar
        handleWidth={handleWidth}
        max={this.state.maxScrollPercentage || 100}
        onChange={this.customScrollBarOnChange}
        value={this.state.scrollPercentage || 0}
      />}
      <FloatingButton onClick={this.addButtonOnClick} />
    </div>
  }
}

Licensee.propTypes = {
  customersLoaded: PropTypes.bool,
  view: PropTypes.string
}

const mapStateToProps = (state, props) => {
  const { location } = props
  const view = schedulerController.isView(location.pathname)

  return {
    customersLoaded: Boolean(state.customers.customers) && state.customers.customers.length > 0 && true,
    view
  }
}

export default withRouter(connect(mapStateToProps)(Licensee))
