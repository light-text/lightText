import React from 'react'

import {connect} from 'react-redux'
import {getAllUsersThunks} from '../store/allUsers'

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchWord: ' '
      // dropdown: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  async componentDidMount() {
    await this.props.getAllUsers()
    console.log(this.props, 'heeeeere')
  }
  handleChange = event => {
    this.setState({
      searchWord: event.target.value
    })
  }
  render() {
    return (
      <div>
        <input
          type="text"
          name="search"
          placeholder="Find a username"
          onChange={this.handleChange}
          // value={this.props.allUsers}
        />

        <div>
          {this.props.allUsers
            .filter(item => {
              return item.username
                .toLowerCase()
                .includes(this.state.searchWord.toLowerCase())
            })
            .map(item => <p key={item.id}>{item.username}</p>)}
        </div>
      </div>
    )
  }
}
const mapState = state => {
  return {
    allUsers: state.allUsers
  }
}

const mapDispatch = dispatch => {
  return {getAllUsers: () => dispatch(getAllUsersThunks())}
}

export default connect(mapState, mapDispatch)(SearchBar)
