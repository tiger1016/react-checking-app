// Libraries
import React from 'react'
import { connect } from 'react-redux'

// Stlyes
import './index.css'

const FirstColumn = props => {
  const {
    bg,
    highlightWalkerAndColumn,
    onlyFirstColumns,
    walker
  } = props
  const { walkerId } = highlightWalkerAndColumn
  const backgroundColor = bg === 'dark' ? 'rgba(220,220,220,.6)' : '#FFF'
  return <div id={`row-label-${walker.walker_id}${onlyFirstColumns ? '-onlyHeaders' : ''}`}
    className={`grid-row-label${walkerId !== null && Number(walkerId) === Number(walker.walker_id) ? ' active' : ''}${walker.walks.length ? '' : ' no-walks'}${walker.walker_name.startsWith('*') ? ' selected' : ''}`}
    style={{ backgroundColor }}>
    <span className={`customer`}>{`${walker.walker_name.replace(/^\*/, '')}`}</span>
  </div>
}

const mapStateToProps = state => {
  return {
    highlightWalkerAndColumn: state.scheduler.highlightWalkerAndColumn
  }
}

export default connect(mapStateToProps)(FirstColumn)
