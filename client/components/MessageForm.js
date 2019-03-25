import React from 'react'
import {Button, Form} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {postMessageThunk} from '../store/transactions'
import {withToastManager} from 'react-toast-notifications'

class MessageForm extends React.Component {
  constructor(props) {
    super(props)
    this.getMessageStatus = this.getMessageStatus.bind(this)
  }
  getMessageStatus(message) {
    if (
      message.startsWith('You have insufficient') ||
      message.startsWith('The user you are trying') ||
      message.startsWith('We are in beta') ||
      message.startsWith('You need to enter') ||
      message.startsWith('You are not registered') ||
      message.startsWith('You can only send')
    ) {
      return 'warning'
    } else {
      return 'success'
    }
  }

  render() {
    const {handleSubmit} = this.props
    console.log(this.getMessageStatus(this.props.message), 'getMessageStatus')
    return (
      <div className="message-form">
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Message</label>
            <input name="messages" placeholder="Your command" />
          </Form.Field>
          <Button
            type="submit"
            onClick={() =>
              setTimeout(() => {
                this.props.toastManager.add(this.props.message, {
                  appearance: this.getMessageStatus(this.props.message),
                  autoDismiss: true
                })
              }, 1100)
            }
          >
            Sent
          </Button>
        </Form>
      </div>
    )
  }
}
const mapProps = state => {
  return {
    message: state.transactions.message
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const messages = evt.target.messages.value
      dispatch(postMessageThunk(messages))
      evt.target.messages.value = ''
    }
  }
}
export default withToastManager(connect(mapProps, mapDispatch)(MessageForm))
