import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Header from '../Header'
import FailureView from '../FailureView'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
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
  state = {trendingData: [], originalData: [], apiStatus: apiConstants.initial}

  componentDidMount = () => {
    this.getTrendingData()
    this.getOriginalData()
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

  renderTrendingSuccessView = () => {
    const {trendingData} = this.state
    return (
      <div>
        <p className="home-success-para">Trending Now</p>
        <Slider {...settings}>
          {trendingData.map(eachItem => {
            const {id, title, posterPath} = eachItem
            return (
              <div className="list-item" key={id}>
                <img className="li-img" src={posterPath} alt={title} />
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
      <div>
        <p className="home-success-para">Originals</p>
        <Slider {...settings}>
          {originalData.map(eachItem => {
            const {id, title, posterPath} = eachItem
            return (
              <div className="list-item" key={id}>
                <img className="li-img" src={posterPath} alt={title} />
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => <FailureView />

  renderTrending = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderTrendingSuccessView()
      case apiConstants.failure:
        return this.renderFailureView()
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
        return this.renderFailureView()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-main-div">
        <div className="home-upper-div">
          <Header />
          <div>
            <h1 className="home-head">Super Man</h1>
            <p className="home-para">
              Superman is a fictional superhero who first appeared in American
              comic books published by DC Comics.
            </p>
            <button className="home-play" type="button">
              Play
            </button>
          </div>
          {this.renderTrending()}
          {this.renderOriginals()}
        </div>
      </div>
    )
  }
}

export default Home
