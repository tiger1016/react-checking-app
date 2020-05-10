// Libraries
import React from 'react'
import classNames from 'classnames'
import Select from 'react-select'
import { connect } from 'react-redux'

// Controller
import { walkersController } from 'Controllers'

// Styles
import './index.css'

class WalkerSearch extends React.Component {
  componentWillMount () {
    const { walkers } = this.props
    if (!walkers || !walkers.length) {
      walkersController.actions.fetchWalkers()
    }
  }

  render () {
    const { className, hasValue, id, onChange, options, placeholder } = this.props

    return <div id={id} className={className}>
      <div className={classNames(['WalkerSearch', hasValue && 'has-value'])}>
        <Select
          autoBlur={false}
          closeMenuOnSelect={false}
          multi
          onChange={onChange}
          options={options}
          placeholder={placeholder}
        />
      </div>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    walkers: state.walkers.walkers
  }
}

export default connect(mapStateToProps)(WalkerSearch)
