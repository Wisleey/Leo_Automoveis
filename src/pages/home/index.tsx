import { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Container } from "../../components/container";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import funcionario1 from '../../assets/FUNCIONARIO1.png';
import funcionario2 from '../../assets/FUNCIONARIO2.png';
import localizacao from '../../assets/localizacao.png';
import email from '../../assets/email.png';
import { collection, query, getDocs, orderBy, where } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importa os estilos do carrossel
import banner1 from '../../assets/BANNER01.png';
import banner2 from '../../assets/BANNER2.png';
import banner3 from '../../assets/BANNER03.png';
import banner4 from '../../assets/BANNER4.png';

import './home.css';

interface CarsProps {
  id: string;
  name: string;
  year: string;
  uid: string;
  price: string | number;
  city: string;
  km: string;
  images: CarImageProps[];
}

interface CarImageProps {
  name: string;
  uid: string;
  url: string;
}

export function Home() {
  const [cars, setCars] = useState<CarsProps[]>([]);
  const [loadImages, setLoadImages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const whatsappNumber = '5564992014770';
  const whatsappNumber2 = '5564993147007';
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    loadCars();
    renderMap();
  }, []);

  function loadCars() {
    const carsRef = collection(db, 'cars');
    const queryRef = query(carsRef, orderBy('created', 'desc'));

    getDocs(queryRef).then((snapshot) => {
      let listcars = [] as CarsProps[];

      snapshot.forEach((doc) => {
        listcars.push({
          id: doc.id,
          name: doc.data().name,
          year: doc.data().year,
          km: doc.data().km,
          city: doc.data().city,
          price: doc.data().price,
          images: doc.data().images,
          uid: doc.data().uid
        });
      });

      setCars(listcars);
    });
  }

  function handleImageLoad(id: string) {
    setLoadImages((prevImageLoaded) => [...prevImageLoaded, id]);
  }

  async function handleSearchCar() {
    if (input === '') {
      loadCars();
      return;
    }

    setCars([]);
    setLoadImages([]);

    const q = query(
      collection(db, 'cars'),
      where('name', '>=', input.toUpperCase()),
      where('name', '<=', input.toUpperCase() + '\uf8ff')
    );

    const querySnapshot = await getDocs(q);

    let listcars = [] as CarsProps[];

    querySnapshot.forEach((doc) => {
      listcars.push({
        id: doc.id,
        name: doc.data().name,
        year: doc.data().year,
        km: doc.data().km,
        city: doc.data().city,
        price: doc.data().price,
        images: doc.data().images,
        uid: doc.data().uid
      });
    });

    setCars(listcars);
  }

  function renderMap() {
    if (mapRef.current) {
      return; 
    }

    const address = '793G+7X Jardim Roma, Caldas Novas - GO';
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=AIzaSyBnHXyV9AqBQ8kspgEKprx4eUhFiAqqO24`;

    fetch(geocodeUrl)
      .then((response) => response.json())
      .then((data) => {
        const location = data.results[0].geometry.location;
        const latitude = location.lat;
        const longitude = location.lng;
        const zoom = 15;

        mapRef.current = L.map('Mapa').setView([latitude, longitude], zoom);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        }).addTo(mapRef.current);
        const marker = L.marker([latitude, longitude]).addTo(mapRef.current);
        marker.bindPopup('Leo Automoveis').openPopup();

        marker.on('click', function () {
          const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
          window.open(googleMapsUrl, '_blank');
        });
      });
  }

  // Use a função useMediaQuery para detectar o tamanho da tela
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

  return (
    <>
      <div>
      <Carousel autoPlay interval={5000} infiniteLoop showThumbs={false}>
          <div>
            <img src={banner1} alt="Banner 1" className="carousel-image" />
          </div>
          <div>
            <img src={banner2} alt="Banner 2" className="carousel-image" />
          </div>
          <div>
            <img src={banner3} alt="Banner 3" className="carousel-image" />
          </div>
          <div>
            <img src={banner4} alt="Banner 4" className="carousel-image" />
          </div>
        </Carousel>
        <div style={{ backgroundColor: '#ffffff', marginTop: '1px' }}>
          <br></br>
          <h1 className="font-bold text-center mt-6 text-3xl mb-4" style={{ color: '#F2442E', fontFamily: 'Ubuntu Sans, sans-serif' }}>
            Encontre seu veículo
          </h1>
          <h2 className="text-center text-2xl" style={{ fontFamily: 'Ubuntu Sans, sans-serif' }}>Faça uma pesquisa completa</h2>
          <br></br>
          <section className="section-container">
            <input
              className="input-field"
              placeholder="Digite o nome do carro..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="button"
              className="search-button"
              onClick={handleSearchCar}
            >
              Buscar
            </button>
          </section>
          <br></br>
        </div>
      </div>

      <Container>
        <div className="mt-8">
          <div style={{ textAlign: 'center', marginLeft: '10px' }}>
            <h1 style={{ color: '#F2442E', fontSize: '3rem', fontFamily: 'Ubuntu Sans, sans-serif' }}>Nossos Veículos</h1>
            <h2 style={{ textAlign: 'center', marginLeft: '0px', fontFamily: 'Ubuntu Sans, sans-serif', fontSize: '1.5rem' }}>As melhores ofertas para você adquirir seu carro novo!</h2>
          </div>
          <div className="mt-7"></div>
          <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <Link key={car.id} to={`/car/${car.id}`}>
                <section className="w-full bg-white rounded-lg">
                  <div
                    className="w-full h-48 md:h-72 rounded-lg bg-slate-200"
                    style={{
                      display: loadImages.includes(car.id) ? 'none' : 'block'
                    }}
                  ></div>
                  <img
                    className="w-full rounded-lg mb-2 max-h-48 md:max-h-72 hover:scale-105 transition-all"
                    src={car.images[0].url}
                    alt="Carro"
                    onLoad={() => handleImageLoad(car.id)}
                    style={{
                      display: loadImages.includes(car.id) ? 'block' : 'none'
                    }}
                  />
                  <p className="font-bold mt-1 mb-2 px-2">{car.name}</p>

                  <div className="flex flex-col px-2">
                    <span className="text-zinc-700 mb-6">
                      Ano {car.year} | {car.km} km
                    </span>
                    <strong className="text-black font-medium text-xl">
                      R$ {car.price}
                    </strong>
                  </div>

                  <div className="w-full h-px bg-slate-200 my-2"></div>

                  <div className="px-2 pb-2">
                    <span className="text-black">{car.city}</span>
                  </div>
                  <div></div>
                </section>
              </Link>
            ))}
          </main>
        </div>
      </Container>

      {!isMobile && (
        <div className="mobile-photo-container1" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: '20px' }}>
          <div style={{ flex: '1', maxWidth: 'calc(50% - 20px)', marginLeft: '130px' }}>
            <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', marginBottom: '20px' }}>
              <h1 style={{ color: '#F2442E', marginBottom: '40px', fontSize: '44px', textAlign: 'center', fontFamily: 'Ubuntu Sans, sans-serif' }}>Nossa Equipe</h1>
              <h2 style={{ color: 'white', marginBottom: '10px', fontSize: '20px', textAlign: 'center', fontFamily: 'Ubuntu Sans, sans-serif' }}>Tire todas as suas dúvidas através<br></br> do nosso atendimento online, direto<br></br> pelo WhatsApp.</h2>
              <div style={{ display: 'flex', alignItems: 'center', color: 'white', marginBottom: '10px', marginLeft: '80px', }}>
                <img src={localizacao} alt="Ícone de localização" style={{ width: '30px', marginRight: '10px' }} />
                <h3 style={{ fontFamily: 'Lato' }}>R. 5, Jardim Roma, Caldas Novas-GO, 75690-000</h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', color: 'white', marginLeft: '80px' }}>
                <img src={email} alt="Ícone de e-mail" style={{ width: '30px', marginRight: '10px' }} />
                <h3 style={{ fontFamily: 'Lato' }}>leoauto@gmail.com</h3>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', maxWidth: 'calc(50% - 20px)' }}>
            <div className="image-container" style={{ marginTop: '10px', marginBottom: '20px', marginRight: '30px', maxWidth: '300px', marginLeft: '-5px' }}>
              <a href={`https://api.whatsapp.com/send?phone=${whatsappNumber2}`}>
                <img src={funcionario1} alt="Funcionário 1" style={{ maxWidth: '100%', fontFamily: 'Lato' }} />
              </a>
            </div>
            <div className="image-container" style={{ marginTop: '10px', marginBottom: '20px', maxWidth: '300px',marginRight: '200px' }}>
              <a href={`https://api.whatsapp.com/send?phone=${whatsappNumber}`}>
                <img src={funcionario2} alt="Funcionário 2" style={{ maxWidth: '100%', fontFamily: 'Lato' }} />
              </a>
            </div>
          </div>
        </div>
      )}

      {isMobile && (
        <div className="mobile-photo-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
            <h1 style={{ color:'#F2442E', marginBottom: '40px', fontSize: '34px', textAlign: 'center', fontFamily: 'Ubuntu Sans, sans-serif' }}>Nossa Equipe</h1>
            <h2 style={{ color: 'white', marginBottom: '10px', fontSize: '18px', textAlign: 'center', fontFamily: 'Ubuntu Sans, sans-serif' }}>Tire todas as suas dúvidas através do nosso atendimento online, direto pelo WhatsApp.</h2>
            <br />
            <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
              <img src={email} alt="Ícone de e-mail" style={{ width: '30px', marginRight: '10px' }} />
              <h3 style={{ fontFamily: 'Lato' }}>leoauto@gmail.com</h3>
            </div>
            <br></br>
            <div style={{ display: 'flex', alignItems: 'center', color: 'white', marginBottom: '10px', marginRight: '30px' }}>
              <img src={localizacao} alt="Ícone de localização" style={{ width: '30px', marginRight: '20px' }} />
              <h3 style={{ fontFamily: 'Lato' }}>R. 5, Jardim Roma, <br></br>Caldas Novas-GO, <br></br>75690-000</h3>
            </div>
            <br />
          </div>
          <div className="image" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <a href={`https://api.whatsapp.com/send?phone=${whatsappNumber2}`}>
              <img src={funcionario1} alt="Funcionário 1" style={{ fontFamily: 'Ubuntu Sans, sans-serif' }} />
            </a>
          </div>
          <div className="image" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <a href={`https://api.whatsapp.com/send?phone=${whatsappNumber}`}>
              <img src={funcionario2} alt="Funcionário 2" style={{ fontFamily: 'Ubuntu Sans, sans-serif' }} />
            </a>
          </div>
        </div>
      )}
      <div id="Mapa" style={{ width: '100%', height: '400px', marginTop: '20px', marginBottom: '20px' }}></div>

      <div style={{ backgroundColor: '#F2442E', width: '99vw', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
        <div style={{ maxWidth: '45%', textAlign: 'left', fontFamily: 'Ubuntu Sans, sans-serif' }}>
          <h1 style={{ color: 'white', fontSize: '2rem', marginBottom: '20px' }}>Financiamento facilitado</h1>
          <h3 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '20px' }}>Faça uma simulação de financiamento sem compromisso</h3>
        </div>
        <div>
          <a href={`https://api.whatsapp.com/send?phone=${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
            <button style={{ backgroundColor: 'green', color: 'white', padding: '2px 10px', border: 'none', borderRadius: '10px', cursor: 'pointer', fontFamily: 'Lato' }}>Conversar no WhatsApp</button>
          </a>
        </div>
      </div>
    </>
  );
}
