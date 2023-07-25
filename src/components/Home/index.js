import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {
    backdropData: {},
    trendingData: [],
    originalData: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount = () => {
    this.getBackdropData()
    this.getTrendingData()
    this.getOriginalData()
  }

  getBackdropData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'
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
      const dataLength = data.results.length
      const random = data.results[Math.floor(Math.random() * dataLength)]
      const updatedBackdropData = {
        backdropPath: random.backdrop_path,
        id: random.id,
        overView: random.overview,
        posterPath: random.poster_path,
        title: random.title,
      }
      this.setState({
        backdropData: {...updatedBackdropData},
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  getTrendingData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
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
      const updatedTrendingData = data.results.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        overView: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))
      this.setState({
        trendingData: updatedTrendingData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  getOriginalData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'
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
      const updatedOriginalData = data.results.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        overView: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))
      this.setState({
        originalData: updatedOriginalData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderBackdropSuccessView = () => {
    const {backdropData} = this.state
    const {id, title, overView, backdropPath} = backdropData
    return (
      <div
        className="home-upper-div"
        key={id}
        backgroundImage={`url(${backdropPath})`}
      >
        <h1 className="home-head" key={title}>
          {title}
        </h1>
        <p className="home-para" key={overView}>
          {overView}
        </p>
        <button className="home-play" type="button">
          Play
        </button>
      </div>
    )
  }

  renderTrendingSuccessView = () => {
    const {trendingData} = this.state
    return (
      <div className="trending-div">
        <h1 className="home-success-para">Trending Now</h1>
        <Slider {...settings}>
          {trendingData.map(eachItem => {
            const {id, title, posterPath} = eachItem
            return (
              <div className="list-item" key={id}>
                <Link className="link-item" to={`/movies/${id}`}>
                  <img className="li-img" src={posterPath} alt={title} />
                </Link>
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }

  renderOriginalSuccessView = () => {
    const {originalData} = this.state
    return (
      <div className="original-div">
        <h1 className="home-success-para">Originals</h1>
        <Slider {...settings}>
          {originalData.map(eachItem => {
            const {id, title, posterPath} = eachItem
            return (
              <div className="list-item" key={id}>
                <Link className="link-item" to={`/movies/${id}`}>
                  <img className="li-img" src={posterPath} alt={title} />
                </Link>
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderBackdropFailureView = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dcnuotlhb/image/upload/v1690264009/alert-triangle_wrkrgq.png"
        alt="failure view"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button
        className="retry-button"
        type="button"
        onClick={this.onRetryBackdrop}
      >
        Try Again
      </button>
    </div>
  )

  renderTrendFailureView = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dcnuotlhb/image/upload/v1690264009/alert-triangle_wrkrgq.png"
        alt="failure view"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button
        className="retry-button"
        type="button"
        onClick={this.onRetryTrending}
      >
        Try Again
      </button>
    </div>
  )

  renderOriginalFailureView = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dcnuotlhb/image/upload/v1690264009/alert-triangle_wrkrgq.png"
        alt="failure view"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button
        className="retry-button"
        type="button"
        onClick={this.onRetryOriginal}
      >
        Try Again
      </button>
    </div>
  )

  onRetryBackdrop = () => {
    this.getBackdropData()
  }

  onRetryTrending = () => {
    this.getTrendingData()
  }

  onRetryOriginal = () => {
    this.getOriginalData()
  }

  renderBackdrop = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderBackdropSuccessView()
      case apiConstants.failure:
        return this.renderBackdropFailureView()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderTrending = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderTrendingSuccessView()
      case apiConstants.failure:
        return this.renderTrendFailureView()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderOriginals = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderOriginalSuccessView()
      case apiConstants.failure:
        return this.renderOriginalFailureView()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="home-main-div">
        <div className="home-upper-div">
          <Header />
          {this.renderBackdrop()}
          <div className="home-bottom-div">
            {this.renderTrending()}
            {this.renderOriginals()}
            <div className="footer-div">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
