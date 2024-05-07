import React from 'react';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import logo from '../../assets/LOGO LEO PNG.png'
import './index.css'


  const whatsappNumber = '5564992014770'; 
  const whatsappNumber2 = '5564993147007'
const Footer: React.FC = () => {
  return (
    <footer>
      <div id="footer_content" className="footer-content">
      


      <div id="footer_logo" className="footer-section">
  <img src={logo} alt="Logo" />
</div>
<div id="footer_links" className="footer-section">
  <ul className="footer-list">
    <li>
      <h3>Compar</h3>
    </li>
    <li>
  <a  href={`https://api.whatsapp.com/send?phone=${whatsappNumber}`} className="footer-link">Vender via WhatsApp</a>
</li>

    <li>
      <a href={`https://api.whatsapp.com/send?phone=${whatsappNumber2}`} className="footer-link">Contato</a>
    </li>
    <li>
      <a href={`https://api.whatsapp.com/send?phone=${whatsappNumber}`} className="footer-link">Peça Orçamento</a>
    </li>
  </ul>
</div>
<div id="footer_social_media" className="footer-section">
  <a href="https://www.instagram.com/leoautomoveiscn/?hl=en" className="footer-link" id="instagram">
    <FaInstagram />
  </a>
  <a href="https://web.facebook.com/CALZADA.VEICULOS.LTDA" className="footer-link" id="facebook">
    <FaFacebookF />
  </a>
  <a href= {`https://api.whatsapp.com/send?phone=${whatsappNumber}`} className="footer-link" id="whatsapp">
    <FaWhatsapp />
  </a>
</div>


        
      </div>
      <div id="footer_copyright">
         Dev WisleyRodrigues 2024 Todos Direitos Reservados
      </div>
    </footer>
  );
}

export default Footer;
