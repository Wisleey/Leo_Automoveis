import React from 'react';

import logo from '../../assets/LOGO LEO PNG.png'
import './index.css'
import iconeFace from '../../assets/ICONE FACE.png'
import iconeInsta from '../../assets/ICONE INSTA.png'


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
            <a href={`https://api.whatsapp.com/send?phone=${whatsappNumber}`} className="footer-link">Comprar</a>
          </li>
          <li>
            <a href={`https://api.whatsapp.com/send?phone=${whatsappNumber}`} className="footer-link">Vender via WhatsApp</a>
          </li>
          <li>
            <a href={`https://api.whatsapp.com/send?phone=${whatsappNumber2}`} className="footer-link">Contato</a>
          </li>
          <li>
            <a href={`https://api.whatsapp.com/send?phone=${whatsappNumber}`} className="footer-link">Peça Orçamento</a>
          </li>
        </ul>
      </div>
      <br></br>
      <br></br>
  
      <div className="footer-section" style={{ textAlign: 'center', color: 'white' }}>
        <p style={{ marginBottom: '5px' }}>Redes Sociais</p>
        <br></br>
        <div className="icon-container">
          <a href="https://www.instagram.com/leoautomoveiscn/?hl=en" className="footer-link" id="instagram" style={{ background: 'transparent' }}>
            <img src={iconeInsta} alt="Instagram" className="icon" />
          </a>
          <a href="https://web.facebook.com/CALZADA.VEICULOS.LTDA" className="footer-link" id="facebook" style={{ background: 'transparent' }}>
            <img src={iconeFace} alt="Facebook" className="icon" />
          </a>
        </div>
      </div>
    </div>
    <div id="footer_copyright"style={{ textAlign: 'center', color: 'white' }}>
      Leo Automoveis<br></br> Todos os direitos reservados
      
    </div>
  </footer>
);
}



export default Footer;
