import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import MovieContext from '../../context/MovieContext'
import './index.css'

class Login extends Component {
  state = {showError: false, errorMsg: ''}

  render() {
    return (
      <MovieContext.Consumer>
        {value => {
          const {username, password, changeUsername, changePassword} = value
          const onChangeUsername = event => {
            changeUsername(event)
          }

          const onChangePassword = event => {
            changePassword(event)
          }

          const onSuccess = jwtToken => {
            const {history} = this.props
            Cookies.set('jwt_token', jwtToken, {
              expires: 30,
              path: '/',
            })
            history.replace('/')
          }

          const onFailure = errorMsg => {
            this.setState({showError: true, errorMsg})
          }

          const onSubmitForm = async event => {
            event.preventDefault()
            const userDetails = {username, password}
            const apiUrl = 'https://apis.ccbp.in/login'
            const options = {
              method: 'POST',
              body: JSON.stringify(userDetails),
            }
            const response = await fetch(apiUrl, options)
            const data = await response.json()
            if (response.ok) {
              onSuccess(data.jwt_token)
            } else {
              onFailure(data.error_msg)
            }
          }

          const {showError, errorMsg} = this.state
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
              <form className="login-form" onSubmit={onSubmitForm}>
                <h1 className="login-head">Login</h1>
                <div className="label-input">
                  <label htmlFor="username-input">USERNAME</label>
                  <input
                    id="username-input"
                    type="text"
                    onChange={onChangeUsername}
                    value={username}
                  />
                </div>
                <div className="label-input">
                  <label htmlFor="password-input">PASSWORD</label>
                  <input
                    id="password-input"
                    type="password"
                    onChange={onChangePassword}
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
        }}
      </MovieContext.Consumer>
    )
  }
}

export default Login
