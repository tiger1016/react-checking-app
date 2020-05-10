// Libraries
import React from 'react'
import ReactTable, { ReactTableDefaults } from 'react-table'

// Components
import Button from '../Button'
import Loader from '../Loader'

// Styles
import './index.css'

const LoaderComponent = props => {
  if (!props.loading) return null
  return <div className='table-loading'>
    <Loader />
  </div>
}

const NextComponent = ({ children, disabled, onClick }) => {
  return <Button disabled={disabled} iconOnly='ion-arrow-right-c' onClick={onClick} textOnly />
}

const PreviousComponent = ({ children, disabled, onClick }) => {
  return <Button disabled={disabled} iconOnly='ion-arrow-left-c' onClick={onClick} textOnly />
}

export default class CustomTable extends React.Component {
  render () {
    return <div className='CustomTable'>
      <ReactTable
        className='-striped -highlight'
        column={{
          ...ReactTableDefaults.column,
          Header: props => <div className='wrapper'>{props.column.label}
            <div className='ion-android-arrow-dropup icon up' />
            <div className='ion-android-arrow-dropdown icon down' />
          </div>
        }}
        defaultPageSize={this.props.pageSize || 30}
        LoadingComponent={LoaderComponent}
        NextComponent={NextComponent}
        NoDataComponent={() => null}
        pageSizeOptions={[5, 10, 20, 30, 50, 100]}
        PreviousComponent={PreviousComponent}
        {...this.props}
      />
    </div>
  }
}
