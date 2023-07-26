import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-div">
    <h1 className="not-found-head">Lost Your Way ?</h1>
    <p className="not-found-para">
      we are sorry the page you requested could not be found. Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button className="not-found-button" type="button">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound
