import logoImg from '../../assets/LOGO LEO PNG.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full bg-[#14289b] mb-4">
      <div className="w-full max-w-7xl mx-auto">
        <header className="flex items-center justify-between px-4 py-2">
          <Link to="/">
            <img src={logoImg} alt="Logo do site" style={{ width: '100px' }} />
          </Link>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isMenuOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
            </button>
          </div>
          <nav className={`md:flex items-center ${isMenuOpen ? 'block' : 'hidden'}`}>
            <ul className="flex flex-col md:flex-row md:items-center md:space-x-4">
              <li>
                <Link to="/car/car" className="text-white hover:text-gray-300">Início</Link>
              </li>
              <li>
                <Link to="/car/car" className="text-white hover:text-gray-300">Carros</Link>
              </li>
              <li>
                <Link to="/login" className="text-white hover:text-gray-300">Entrar</Link>
              </li>
              <li>
                <a
                  href="https://api.whatsapp.com/send?phone=5564992014770"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    </div>
  );
}