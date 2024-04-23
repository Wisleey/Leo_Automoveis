import logoImg from '../../assets/logo.jpg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export function Header() {

  return (
    <div className="w-full flex items-center justify-center bg-blue-500 mb-4">
      <div className="w-full max-w-7xl">
        <header className="flex items-center justify-between px-4 py-2 mx-auto">
          <Link to="/">
            <img src={logoImg} alt="Logo do site" />
          </Link>
          <nav className="flex justify-between items-center px-1 py-1 ">
  
  <ul className="flex items-center space-x-4">
    <li>
      <Link to="/" className="text-black">Início</Link>
    </li>
    <li>
      <Link to="/car/car" className="text-black">Caranga</Link>
    </li>
    <li>
      <Link to="/login" className="text-black">Entrar</Link>
    </li>
   
    <li>
      <a
        href="https://api.whatsapp.com/send?phone=5583991812589"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center bg-green-500 text-white px-1 py-1 rounded-md"
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