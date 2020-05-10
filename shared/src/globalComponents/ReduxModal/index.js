// Libraries
import React from 'react'
import { Text, View } from 'react-native'
// Controllers
import { appController } from '../../../controllers'

// Styles
import Styles from './styles'

// Modals
import WalkModal from '../../modals/WalkModal'
import PayrollDetailModal from '../../modals/PayrollDetailModal'
export default class Modal extends React.Component {
  renderModal () {
    switch (this.props.app.modal.identifier) {
      case appController.constants.ADD_WALK_MODAL_IDENTIFIER:
      case appController.constants.EDIT_WALK_MODAL_IDENTIFIER:
        return <WalkModal canCloseModal={this.props.canCloseModal} />
      case appController.constants.PAYROLL_DETAIL_MODAL_IDENTIFIER:
        return <PayrollDetailModal />
    }
    return <Text>
             Modal type not supported.
    </Text>
  }

  render () {
    return <View style={Styles.modalMainContainer}>
      {this.renderModal()}
    </View>
  }
}
