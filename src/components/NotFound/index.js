import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const NotFound = () => (
  <div>
    <Header />
    <h1>Lost Your Way</h1>
    <Link to="/">
      <button type="button">Go to Home</button>
    </Link>
    <Footer />
  </div>
)

export default NotFound
