// Libraries
import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

// Components
import FirstRow from '../FirstRow'
import Row from '../Row'

// Controllers
import { schedulerController } from 'Controllers'

// Syles
import './index.css'

class Grid extends React.Component {
  componentDidMount () {
    this.props.scrollEventListener()
    document.addEventListener('mousemove', this.captureMouseDocument)
  }

  componentWillReceiveProps (nextProps) {
    const { walksByWalker } = this.props
    if (nextProps.selectAllWalks) {
      walksByWalker.forEach(walker => {
        if (walker.walks && walker.walks.length) {
          walker.walks.forEach(w => {
            const selected = _.indexOf(nextProps.bulkList, w.walk_id) > -1
            if (!selected) {
              schedulerController.actions.toggleWalkOnBulkList(w.walk_id)
            }
          })
        }
      })
    }
  }

  componentWillUnmount () {
    document.removeEventListener('mousemove', this.captureMouseDocument)
  }

  adjustFixedColumnSearch (element) {
    document.querySelectorAll('.search-only').forEach(el => {
      el.style.height = element.offsetHeight + 'px'
    })
  }

  captureMouseDocument = event => {
    // To position tooltip based on mouse position
    window.petcheckMPX = event.clientX
    window.petcheckMPY = event.clientY
  }

  render () {
    const { headerColumns, walksByWalker } = this.props

    const wSelected = walksByWalker.filter(w => w.filterSelected)
    const lastSelectedId = wSelected.length ? wSelected[wSelected.length - 1].walker_id : null

    return <div id='grid' className='grid'>
      <div id='h-scroll'>
        <FirstRow adjustFixedColumnSearch={this.adjustFixedColumnSearch} columns={headerColumns} />
        <div className='fixed-top-row'><FirstRow adjustFixedColumnSearch={this.adjustFixedColumnSearch} columns={headerColumns} /></div>
        {walksByWalker.map((w, index) => <Row
          columnIds={headerColumns.map(c => c.id)}
          key={w.walker_id}
          lastSelected={`${lastSelectedId}` === `${w.walker_id}`}
          onlyFirstColumns={false}
          rowId={w.walker_id}
          rowIndex={index}
          walkerData={w}
        />)}
      </div>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    bulkList: state.scheduler.bulkList,
    selectAllWalks: state.scheduler.selectAllWalks
  }
}

export default connect(mapStateToProps)(Grid)
