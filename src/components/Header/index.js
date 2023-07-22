import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'

const Header = () => (
  <nav className="header-nav">
    <div className="header-logo-div">
      <img
        className="header-logo"
        src="https://res.cloudinary.com/dcnuotlhb/image/upload/v1690009709/urzfzliigozcxhv3deem.png"
        alt="website logo"
      />
      <p className="header-para">Home</p>
      <p className="header-para">Popular</p>
    </div>
    <div className="header-search-div">
      <button testid="searchButton" type="button" className="search-icon">
        <HiOutlineSearch size={24} color="#ffffff" />
      </button>

      <img
        className="header-profile"
        src="https://res.cloudinary.com/dcnuotlhb/image/upload/v1690027058/Profile_xwmai2.png"
        alt="profile"
      />
    </div>
  </nav>
)

export default Header
