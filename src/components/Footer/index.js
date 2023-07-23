import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div>
    <div className="icons-div">
      <button className="icon-button" type="button">
        <FaGoogle size={12} color="#ffffff" />
      </button>
      <button className="icon-button" type="button">
        <FaTwitter size={12} color="#ffffff" />
      </button>
      <button className="icon-button" type="button">
        <FaInstagram size={12} color="#ffffff" />
      </button>
      <button className="icon-button" type="button">
        <FaYoutube size={12} color="#ffffff" />
      </button>
    </div>
    <p className="contact-us">Contact Us</p>
  </div>
)

export default Footer
