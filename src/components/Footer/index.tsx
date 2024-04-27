
import { FaFacebook, FaInstagram, FaSpotify, FaTwitter } from 'react-icons/fa'
import logo from '../../assets/LOGO LEO PNG.png'
import './index.css'


function Footer() {
    return (

        <div className='main-footer'>
            <div className='container'>
              
                <div className='row text-center'>
                  <div className='logo'>
              <img src={logo}></img>
            </div>
                    {/* Column 1 */}
                    <div className='col-md-3 col-sm-6'>
                        <h4>Início</h4>
                        <ul className='list-unstyled'>
                            <li>Home</li>
                            <li>Promoções</li>
                            <li>Destinos</li>
                            <li>Contato</li>
                        </ul>
                    </div>
                    
                   
            </div>
            </div>
            
            <div className='container'>
                <div className='social-items'>
                    <ul className='list-social-icon'>
                        <li className='list-icon'><FaFacebook /><a href='https://www.facebook.com/'></a></li>
                        <li className='list-icon'><FaInstagram /></li>
                        <li className='list-icon'><FaTwitter /></li>
                        <li className='list-icon'><FaSpotify /></li>
                    </ul>
                </div>

                <div className='d-flex justify-content-center w-100'>
  <p className='text-center'>
    &copy;{new Date().getFullYear()} Wisley Rodrigues - Todos os Direitos Reservados
  </p>
</div>

            </div>
        </div>
    )
}
  
export default Footer;