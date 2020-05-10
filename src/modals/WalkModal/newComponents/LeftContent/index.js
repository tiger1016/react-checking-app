// Libraries
import React from 'react'

// Components
import AddOrEditAWalk from './components/AddOrEditAWalk'
import History from './components/History'

export default class LeftContent extends React.Component {
  render () {
    const {
      isEditModal,
      isCompleted,
      modalState,
      submissionFailedFor,
      updateModalState,
      walk
    } = this.props

    return <div className='LeftContent'>
      {modalState.activeTab === 'scheduling' ? <AddOrEditAWalk
        isEditModal={isEditModal}
        isCompleted={isCompleted}
        modalState={modalState}
        submissionFailedFor={submissionFailedFor}
        updateModalState={updateModalState}
        walk={walk}
      /> : <History />}
    </div>
  }
}
