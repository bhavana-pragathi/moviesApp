import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {popularData: [], apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getPopularData()
  }

  getPopularData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedPopularData = data.results.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        overView: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))
      this.setState({
        popularData: updatedPopularData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {popularData} = this.state
    return (
      <ul className="popular-list-items">
        {popularData.map(eachItem => {
          const {id, title, posterPath} = eachItem
          return (
            <Link className="link-item" to={`/movies/${id}`}>
              <li className="popular-item" key={id}>
                <img className="popular-images" src={posterPath} alt={title} />
              </li>
            </Link>
          )
        })}
      </ul>
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
      <button className="retry-button" type="button">
        Try Again
      </button>
    </div>
  )

  renderPopular = () => {
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
      <div className="popular-div">
        <Header />
        {this.renderPopular()}
        <div className="footer-div">
          <Footer />
        </div>
      </div>
    )
  }
}

export default Popular
