import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Search extends Component {
  state = {searchText: '', searchResults: [], apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getOnSearch()
  }

  getOnSearch = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {searchText} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedSearchResults = data.results.map(eachMovie => ({
        backdropPath: eachMovie.backdrop_path,
        id: eachMovie.id,
        overView: eachMovie.overview,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      this.setState({
        searchResults: updatedSearchResults,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  searchText = text => {
    this.setState({searchText: text}, this.getOnSearch)
  }

  renderResults = () => {
    const {searchResults, searchText} = this.state
    return (
      <div>
        {searchResults.length === 0 ? (
          <div className="no-search-div">
            <img
              src="https://res.cloudinary.com/dcnuotlhb/image/upload/v1690360796/No_Search_sdm3dp.png"
              alt="no movies"
            />
            <p>Your search for {searchText} did not find any matches.</p>
          </div>
        ) : (
          <ul className="popular-list-items">
            {searchResults.map(eachItem => (
              <li className="popular-item" key={eachItem.id}>
                <Link className="link-item" to={`/movies/${eachItem.id}`}>
                  <img
                    className="popular-images"
                    src={eachItem.posterPath}
                    alt={eachItem.title}
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderSuccessView = () => {
    const {searchText} = this.state
    return (
      <div className="success-div">
        {searchText === '' ? (
          <div className="search-start-div">
            <p>Search the movie, by clicking on the search Icon</p>
          </div>
        ) : (
          this.renderResults()
        )}
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="popular-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        className="failure-img"
        src="https://res.cloudinary.com/dcnuotlhb/image/upload/v1690030924/Failure_fqtq3g.png"
        alt="failure view"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button
        onClick={this.onRetrySuccess}
        className="retry-button"
        type="button"
      >
        Try Again
      </button>
    </div>
  )

  onRetrySuccess = () => {
    this.getOnSearch()
  }

  renderSearch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="search-div">
        <Header searchText={this.searchText} />
        <div className="search-results-div">{this.renderSearch()}</div>
        <Footer />
      </div>
    )
  }
}

export default Search
