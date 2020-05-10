// Libraries
import React from 'react'
import { connect } from 'react-redux'

// Components
import CustomersSelect from 'GlobalComponents/input/CustomersSelect'
import CurrencyInput from 'GlobalComponents/input/CurrencyInput'
import ModalTemplate from 'GlobalComponents/ModalTemplate'
import ModalTemplateField from 'GlobalComponents/ModalTemplate/components/ModalTemplateField'

// Actions
import issueCredits from 'Actions/credits/issueCredits'

// Controllers
import { appController } from 'Controllers/appController'

// Styles
import './index.css'

class IssueCreditModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: [],
      issueCreditAmount: null,
      issueCreditFor: this.props.app.modal.data.customer.user_id
    }
  }
  closeIssueCreditModal = () => {
    appController.actions.toggleModal({
      canClose: true,
      data: null,
      isOpen: false,
      modalIdentifier: null
    })
    this.setState({ issueCreditFor: null, issueCreditAmount: null })
  }
  issueCredits = () => {
    var selectedCustomer = this.props.customers && this.state.issueCreditFor ? this.props.customers.find(c => { return Number(c.user_id) === Number(this.state.issueCreditFor) }) : undefined
    if (this.state.issueCreditFor && this.state.issueCreditAmount) {
      appController.confirmSaveChanges(() => {
        this.props.issueCredits(this.state.issueCreditFor, this.state.issueCreditAmount, () => { appController.closeModal() })
      }, `You are about to issue a credit to ${selectedCustomer.first_name + ' ' + selectedCustomer.last_name} in the amount of $${parseFloat(this.state.issueCreditAmount).toFixed(2)}. Do you wish to continue?`)
    }
  }
  render () {
    return <ModalTemplate
      actions={[
        {
          hide: this.props.creditsLoading,
          disabled: this.props.disabled,
          onClick: this.closeIssueCreditModal,
          text: 'Cancel',
          textOnly: true
        },
        {
          loading: this.props.creditsLoading,
          disabled: !this.state.issueCreditFor || !this.state.issueCreditAmount,
          onClick: this.issueCredits,
          text: 'Issue'
        }
      ]}
      body={() => <div className='IssueCreditModal'>
        <ModalTemplateField
          input={() => <CustomersSelect
            onChange={selected => this.setState({ issueCreditFor: selected.value })}
            value={this.state.issueCreditFor}
            disabled
          />}
          label='Select customer'
        />
        <ModalTemplateField
          input={() => <CurrencyInput
            onChange={e => this.setState({ issueCreditAmount: e.target.value })}
            value={this.state.issueCreditAmount}
          />}
          label='Select amount'
        />
      </div>}
      title='Issue Credit'
    />
  }
}

const mapStateToProps = state => {
  return {
    creditsLoading: state.credits.loading,
    customers: state.customers.customers,
    app: state.app
  }
}

const mapDispatchToProps = {
  issueCredits
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueCreditModal)
