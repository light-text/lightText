import React from 'react'
import {Button, Form} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {postMessageThunk, getTransactionThunk} from '../store/transactions'
import {withToastManager} from 'react-toast-notifications'

class MessageForm extends React.Component {
  constructor(props) {
    super(props)
    this.getMessageStatus = this.getMessageStatus.bind(this)
  }

  componentDidMount() {
    this.props.transaction()
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
  //Hello
  render() {
    const {handleSubmit} = this.props
    console.log(this.getMessageStatus(this.props.message), 'getMessageStatus')
    return (
      <div className="message-form">
        <p id="beforeBox">
          You prefere to send a message from your account instead of a SMS ? It
          is possible , use the box here !
        </p>
        <form onSubmit={handleSubmit} className="message">
          <div className="ui input focus">
            <label htmlFor="input_messages">Message</label>
            <input
              name="messages"
              id="input_messages"
              placeholder="Your command"
              // style={{marginTop: '10px', marginLeft: '250px'}}
            />
          </div>
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
            Send
          </Button>
        </form>
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
    transaction: () => getTransactionThunk(),

    handleSubmit(evt) {
      evt.preventDefault()
      const messages = evt.target.messages.value
      dispatch(postMessageThunk(messages))

      evt.target.messages.value = ''
    }
  }
}
export default withToastManager(connect(mapProps, mapDispatch)(MessageForm))
