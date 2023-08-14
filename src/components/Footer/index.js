import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-div">
    <div className="icons-div">
      <FaGoogle size={12} className="bottom-icon" />
      <FaTwitter size={12} className="bottom-icon" />
      <FaInstagram size={12} className="bottom-icon" />
      <FaYoutube size={12} className="bottom-icon" />
    </div>
    <p className="contact-us">Contact Us</p>
  </div>
)

export default Footer
