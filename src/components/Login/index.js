import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {showError: false, errorMsg: '', username: '', password: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
    const {username, password} = this.state
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
  }

  onFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {showError, errorMsg, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-div">
        <img
          className="login-logo"
          src="https://res.cloudinary.com/dcnuotlhb/image/upload/v1690009709/urzfzliigozcxhv3deem.png"
          alt="login website logo"
        />
        <form className="login-form" onSubmit={this.onSubmitForm}>
          <h1 className="login-head">Login</h1>
          <div className="label-input">
            <label htmlFor="username-input">USERNAME</label>
            <input
              id="username-input"
              type="text"
              onChange={this.onChangeUsername}
              value={username}
            />
          </div>
          <div className="label-input">
            <label htmlFor="password-input">PASSWORD</label>
            <input
              id="password-input"
              type="password"
              onChange={this.onChangePassword}
              value={password}
            />
          </div>
          {showError && <p className="login-error">{errorMsg}</p>}
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
