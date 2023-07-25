import {Component} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {movieData: [], apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getMovieData()
  }

  getMovieData = () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
  }

  render() {
    return (
      <div className="movie-div">
        <Header />
        <div className="footer-div">
          <Footer />
        </div>
      </div>
    )
  }
}

export default MovieItemDetails
