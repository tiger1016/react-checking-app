// Libraries
import React from 'react'
import { connect } from 'react-redux'

// Components
import ModalTemplate from 'GlobalComponents/ModalTemplate'
import ModalTemplateField from 'GlobalComponents/ModalTemplate/components/ModalTemplateField'
import TextInput from 'GlobalComponents/input/TextInput'
import EmailInput from 'GlobalComponents/input/EmailInput'
import TextBox from 'GlobalComponents/input/TextBox'

// Controllers
import { appController, profileController } from 'Controllers'

// Styles
import './index.css'

class FeedbackModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      errors: [],
      message: '',
      name: '',
      NameFocused: false,
      MessageFocused: false
    }
  }

  disabled = () => {
    return !(this.state.email && this.state.message && this.state.name)
  }
  render () {
    return <ModalTemplate
      className='FeedbackModal'
      actions={[
        {
          onClick: () => appController.closeModal(),
          text: 'Cancel',
          textOnly: true
        },
        {
          disabled: this.disabled(),
          onClick: () => { this.setState({ formClicked: true }); appController.closeModal(); profileController.actions.sendFeedback({ name: this.state.name, message: this.state.message, page: this.props.app.modal.data.url, email: this.state.email }) },
          text: 'Send'
        }
      ]}
      body={() => <div className='FeedbackModal-Body'>
        <ModalTemplateField
          input={<TextInput error={this.state.NameFocused && !this.state.name} value={this.state.name} onChange={e => this.setState({ name: e.target.value, NameFocused: true })} />}
          label='Name'
        />
        <ModalTemplateField
          input={<EmailInput value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />}
          label='Email'
        />
        <ModalTemplateField
          input={() => <TextBox error={this.state.MessageFocused && !this.state.message} onChange={e => this.setState({ message: e.target.value, MessageFocused: true })} />}
          label='Feedback'
        />
      </div>}
      title='Send Feedback'
    />
  }
}

const mapStateToProps = state => {
  return {
    app: state.app
  }
}

export default connect(mapStateToProps)(FeedbackModal)
