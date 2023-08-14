import {Component} from 'react'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'

class Header extends Component {
  onKeySearch = event => {
    const {searchText} = this.props
    if (event.key === 'Enter') {
      searchText(event.target.value)
    }
  }

  render() {
    return (
      <nav className="header-nav">
        <div className="header-logo-div">
          <Link to="/">
            <img
              className="header-logo"
              src="https://res.cloudinary.com/dcnuotlhb/image/upload/v1690009709/urzfzliigozcxhv3deem.png"
              alt="website logo"
            />
          </Link>
          <Link className="link" to="/">
            <p className="header-para">Home</p>
          </Link>
          <Link className="link" to="/popular">
            <p className="header-para">Popular</p>
          </Link>
        </div>
        <div className="header-search-div">
          <div className="input-div">
            <input
              type="search"
              className="search-icon"
              onKeyDown={this.onKeySearch}
            />
            <Link to="/search">
              <button
                testid="searchButton"
                type="button"
                className="search-button"
                onClick={this.onClickSearch}
              >
                <HiOutlineSearch size={24} color="#ffffff" />
              </button>
            </Link>
          </div>
          <Link to="/account">
            <img
              className="header-profile"
              src="https://res.cloudinary.com/dcnuotlhb/image/upload/v1690174815/profile_female_bgqcsb.png"
              alt="profile"
            />
          </Link>
        </div>
      </nav>
    )
  }
}

export default Header
