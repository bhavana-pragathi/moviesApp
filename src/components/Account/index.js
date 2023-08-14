import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Account = props => {
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')
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
          <p className="account-para">Member ship</p>
          <div>
            <p>{username}@gmail.com</p>
            <p>Password: {star}</p>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="username-password">
          <p className="account-para">Plan details</p>
          <div className="premium-ultra">
            <p className="premium">Premium</p>
            <p className="ultra">Ultra HD</p>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="button-div">
          <button className="logout-button" type="button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Account
