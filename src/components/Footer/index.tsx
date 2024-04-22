import { FaPhone, FaMapMarker, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import '../Footer/index.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-contact">
          <div className="footer-item">
            <FaPhone className="footer-icon" />
            <span>(XX) XXXX-XXXX</span>
          </div>
          <div className="footer-item">
            <FaMapMarker className="footer-icon" />
            <span>Av: feira, Caldas Novas - Go </span>
          </div>
        </div>
        <div className="footer-social">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="social-icon" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="social-icon" />
          </a>
        </div>
      </div>
      <div className="footer-info">
        <p>© 2024 Dev Wisley Rodrigues. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;