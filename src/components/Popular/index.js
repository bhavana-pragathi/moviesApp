import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import FailureView from '../FailureView'
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
      <ul>
        {popularData.map(eachItem => (
          <li key={eachItem.id}>
            <img src={eachItem.posterPath} alt={eachItem.title} />
          </li>
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="Spinner" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => <FailureView />

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
      <div>
        <Header />
        {this.renderPopular()}
        <Footer />
      </div>
    )
  }
}

export default Popular
