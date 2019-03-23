import React from 'react'
import {Button, Form} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {postMessageThunk} from '../store/transactions'
import {withToastManager} from 'react-toast-notifications'
import {getTransactionThunk} from '../store/transactions'

class MessageForm extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getMessage()
  }
  render() {
    const {handleSubmit, message} = this.props
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
              this.props.toastManager.add('ROROROROOROROR', {
                appearance: 'success',
                autoDismiss: true
              })
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
    getMessage: () => dispatch(getTransactionThunk),
    handleSubmit(evt) {
      evt.preventDefault()
      const messages = evt.target.messages.value
      dispatch(postMessageThunk(messages))
      evt.target.messages.value = ''
    }
  }
}
export default withToastManager(connect(mapProps, mapDispatch)(MessageForm))
