import logoImg from '../../assets/LOGO LEO PNG.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './index.css'

import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const whatsappNumber2 = '5564993147007';
  const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber2}`;


  
 

  
  return (
    
    <div className="w-full bg-[#1b4e93] mb-0">
      <div className="w-full max-w-7xl mx-auto">
        <header className="flex items-center justify-evenly px-5 py-5">
          <Link to="/">
            <img src={logoImg} alt="Logo do site" style={{ width: '100px' }} />
          </Link>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isMenuOpen ? <FontAwesomeIcon icon={faTimes} style={{ fontSize: '24px', color: '#fff' }} /> : <FontAwesomeIcon icon={faBars} />}
            </button>
          </div>
          <nav className={`nav-menu md:flex justify-center items-center ${isMenuOpen ? 'open' : ''}`}>
            
          
            <ul className="nav-links flex flex-col md:flex-row md:items-center md:space-x-10" style={{ color: '#fff' }}>
              <li>
                <Link to="/car/car" className="nav-link" onClick={toggleMenu}>
                  Início
                </Link>
              </li>
              <li>
                <Link to="/car/car" className="nav-link" onClick={toggleMenu}>
                  Carros
                </Link>
              </li>
              <li>
                <Link to="/login" className="nav-link" onClick={toggleMenu}>
                  Entrar
                </Link>
              </li>
              <li>
  <a
    href={whatsappLink}
    target="_blank"
    rel="noopener noreferrer"
    className="nav-link"
    onClick={toggleMenu}
  >
    Quero Vender
  </a>
</li>

              <li className="ml-auto">
                <a
                  href="https://api.whatsapp.com/send?phone=5564992014770"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
                  onClick={toggleMenu}
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="mr-6" />
                  Fale com um Vendedor
                </a>
              </li>
            </ul>
            
            
          </nav>
        </header>
      </div>
    </div>
  );
}
