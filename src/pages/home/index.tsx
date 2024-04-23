import { useState, useEffect } from 'react';
import { Container } from "../../components/container";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

// Seu código...

<div className='bg-blue-500 h-64 px-100 rounded-lg text-white font-medium text-lg mt-4 relative'>
  <div className="gradient">
    <button>
      <a
        href="https://api.whatsapp.com/send?phone=5583991812589"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center bg-green-500 text-white px-3 py-2 rounded-md"
      >
        WhatsApp
        <FontAwesomeIcon icon={faWhatsapp} className="ml-2" />
      </a>
    </button>
  </div>
</div>



import {
  collection,
  query,
  getDocs,
  orderBy,
  where
} from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';

import logoImg from '../../assets/banner.png';
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

const MyComponent = () => {
  useEffect(() => {
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

        const map = L.map('map').setView([latitude, longitude], zoom);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        }).addTo(map);
        const marker = L.marker([latitude, longitude]).addTo(map);
        marker.bindPopup('Localização desejada').openPopup();
      });
  }, []);

  return <div
  id="map"
  style={{
    width: '100%',
    height: '400px',
    marginTop: '20px',
    marginBottom: '20px'
  }}
></div>
};

export function Home() {
  const [cars, setCars] = useState<CarsProps[]>([]);
  const [loadImages, setLoadImages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const component = document.getElementById('whatsapp-component');
  
      if (component) {
        const componentOffsetTop = component.offsetTop;
  
        if (scrollTop > componentOffsetTop - windowHeight / 2) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    loadCars();
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
  

  return (
    <Container>
      <section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2">
        <input
          className="w-full border-2rounded-lg h-9 px-3 outline-none"
          placeholder="Digite o nome do carro..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-blue-500 h-9 px-8 rounded-lg text-white font-medium text-lg"
          onClick={handleSearchCar}
        >
          Buscar
        </button>
      </section>

      <img src={logoImg} alt="Logo do site" className="w-full  mt-6" />

      <h1 className="font-bold text-center mt-6 text-2xl mb-4">
        Carros novos e usados em todo o Brasil
      </h1>

      <main className="grid gird-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <Link key={car.id} to={`/car/${car.id}`}>
            <section className="w-full bg-white rounded-lg">
              <div
                className="w-full h-72 rounded-lg bg-slate-200"
                style={{
                  display: loadImages.includes(car.id) ? 'none' : 'block'
                }}
              ></div>
              <img
                className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
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
      <div id="whatsapp-component" className={`relative bg-blue-500 h-64 px-100 rounded-lg text-white font-medium text-lg mt-4 overflow-hidden ${isVisible ? 'visible' : ''}`}>
  <div className="gradient absolute top-0 left-0 right-0 bottom-50">
    <a
      href="https://api.whatsapp.com/send?phone=5583991812589"
      target="_blank"
      rel="noopener noreferrer"
      className={`whatsapp-button absolute left-10 transition-transform duration-1000 ${isVisible ? 'translate-x-0' : '-translate-x-full visible'}`}
    >
      Whatsteste
      <FontAwesomeIcon icon={faWhatsapp} className="ml-2" />
    </a>
    <h2 className={`texto absolute right-100 transition-transform duration-1000 ${isVisible ? 'translate-x-0' : 'translate-x-full visible'}`}>Fale com a gente</h2>
  </div>
</div>

          
      <MyComponent />
    </Container>
    
  );
}