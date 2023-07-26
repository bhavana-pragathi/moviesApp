import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import MovieContext from '../../context/MovieContext'

const Account = props => (
  <MovieContext.Consumer>
    {value => {
      const {username, password} = value
      const star = '*'.repeat(password.length)
      const onLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }
      return (
        <div className="account-div">
          <Header />
          <div className="account-content">
            <h1>Account</h1>
            <hr className="hr-line" />
            <div className="username-password">
              <p>Member ship</p>
              <div>
                <p>{username}@gmail.com</p>
                <p>Password: {star}</p>
              </div>
            </div>
            <hr className="hr-line" />
            <div>
              <p>Plan details</p>
              <div>
                <p>Premium</p>
                <p>Ultra HD</p>
              </div>
            </div>
            <hr className="hr-line" />
            <button type="button" onClick={onLogout}>
              Logout
            </button>
          </div>
          <div className="account-footer-div">
            <Footer />
          </div>
        </div>
      )
    }}
  </MovieContext.Consumer>
)

export default Account
