import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
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
  state = {movieData: [], apiStatus: apiConstants.initial, similarMovies: []}

  componentDidMount() {
    this.getMovieData()
  }

  getFetchedData = eachItem => ({
    adult: eachItem.adult,
    backdropPath: eachItem.backdrop_path,
    budget: eachItem.budget,
    genres: eachItem.genres,
    overview: eachItem.overview,
    posterPath: eachItem.poster_path,
    releaseDate: eachItem.release_date,
    runtime: eachItem.runtime,
    similarMovies: eachItem.similar_movies,
    spokenLanguages: eachItem.spoken_languages,
    title: eachItem.title,
    voteAverage: eachItem.vote_average,
    voteCount: eachItem.vote_count,
  })

  getMovieData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
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
      const updatedData = this.getFetchedData(data.movie_details)
      this.setState({
        apiStatus: apiConstants.success,
        movieData: updatedData,
        similarMovies: updatedData.similarMovies.slice(0, 6),
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {movieData, similarMovies} = this.state
    const {
      adult,
      backdropPath,
      budget,
      genres,
      overview,
      releaseDate,
      runtime,
      spokenLanguages,
      title,
      voteAverage,
      voteCount,
    } = movieData
    const bgImage = backdropPath
    const hour = Math.floor(runtime / 60)
    const min = runtime % 60
    const date = new Date(releaseDate)
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const day = date.getDay().toString()
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    let dateEnd
    if (day.endsWith('3')) {
      dateEnd = 'rd'
    } else if (day.endsWith('2')) {
      dateEnd = 'nd'
    } else if (day.endsWith('1')) {
      dateEnd = 'st'
    } else {
      dateEnd = 'th'
    }

    return (
      <div className="success-div">
        <div
          className="image-div"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%',
          }}
        >
          <h1 className="movie-title">{title}</h1>
          <div className="duration-div">
            <p className="duration-para">{`${hour}h ${min}m`}</p>
            <p className="duration-para">{adult ? 'A' : 'U/A'}</p>
            <p className="duration-para">{`${day}${dateEnd} ${month} ${year}`}</p>
          </div>
          <p className="overview">{overview}</p>
          <button type="button" className="movie-play">
            Play
          </button>
        </div>
        <div className="genres-div">
          <div className="genres-sub-div">
            <h1 className="genre-para">Genres</h1>
            <ul className="ul-item">
              {genres.map(eachGenre => (
                <li className="genre-item" key={eachGenre.id}>
                  <p className="names">{eachGenre.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="genres-sub-div">
            <h1 className="genre-para">Audio Available</h1>
            <ul className="ul-item">
              {spokenLanguages.map(eachLang => (
                <li className="genre-item" key={eachLang.id}>
                  <p className="names">{eachLang.english_name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="genres-sub-div">
              <h1 className="genre-para">Rating Count</h1>
              <p className="names">{voteCount}</p>
            </div>
            <div className="genres-sub-div">
              <h1 className="genre-para">Rating Average</h1>
              <p className="names">{voteAverage}</p>
            </div>
          </div>
          <div>
            <div className="genres-sub-div">
              <h1 className="genre-para">Budget</h1>
              <p className="names">{budget}</p>
            </div>
            <div className="genres-sub-div">
              <h1 className="genre-para">Release Date</h1>
              <p className="names">{releaseDate}</p>
            </div>
          </div>
        </div>
        <div className="similar-div">
          <h1 className="similar-head">More like this</h1>
          <ul className="similar-ul">
            {similarMovies.map(eachMovie => (
              <li key={eachMovie.id}>
                <Link to={`/movies/${eachMovie.id}`} target="blank">
                  <img
                    className="similar-image"
                    src={eachMovie.poster_path}
                    alt={eachMovie.title}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="popular-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  onRetryMovies = () => {
    this.getMovieData()
  }

  renderFailureView = () => (
    <div className="failure-div">
      <img
        className="failure-img"
        src="https://res.cloudinary.com/dcnuotlhb/image/upload/v1690030924/Failure_fqtq3g.png"
        alt="failure view"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button
        className="retry-button"
        type="button"
        onClick={this.onRetryMovies}
      >
        Try Again
      </button>
    </div>
  )

  renderMovie = () => {
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
      <div className="movie-div">
        <Header />
        <div>{this.renderMovie()}</div>
        <Footer />
      </div>
    )
  }
}

export default MovieItemDetails
