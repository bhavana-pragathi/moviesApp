import './index.css'

const FailureView = () => (
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

export default FailureView
