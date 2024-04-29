import { useState, useEffect } from 'react';
import { Container } from "../../components/container";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';


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

export function Home() {
  const [cars, setCars] = useState<CarsProps[]>([]);
  const [loadImages, setLoadImages] = useState<string[]>([]);
  const [input, setInput] = useState('');

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

        const map = L.map('Mapa').setView([latitude, longitude], zoom);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        }).addTo(map);
        const marker = L.marker([latitude, longitude]).addTo(map);
        marker.bindPopup('Leo Automoveis').openPopup();

        marker.on('click', function () {
          const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
          window.open(googleMapsUrl, '_blank');
        });
      });
  }

  return (
    <Container>
      <img src={logoImg} alt="Logo do site" className="w-full mt-6 mx-auto -mx-4" />

      
       <h1 className="font-bold text-center mt-6 text-3xl mb-4" style={{ color: '#F2442E', fontFamily: 'Exo2' }}>
        Encontre seu veículo 
      </h1>
      <h2 className=" text-center text-2xl "style={{  fontFamily: 'Exo2' }}>faça uma pesquisa completa </h2>
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


      <div className="mt-8">
  <div style={{ textAlign: 'center', marginLeft: '10px' }}> {/* Adicionando estilos inline para posicionar o h1 */}
    <h1 style={{ color: '#F2442E',fontSize: '3rem',  fontFamily: 'Exo2' }}>Nossos Veiculos</h1> {/* Adicionando estilos inline para posicionar o h1 */}
    <h2 style={{ textAlign: 'center', marginLeft: '0px', fontFamily: 'Exo2',
      fontSize: '1.5rem'
     }}>As melhores ofertas para você adquirir seu carro novo!</h2> {/* Adicionando estilos inline para posicionar o h2 */}
  </div><div className="mt-7"></div>
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
      <div id="Mapa" style={{ width: '100%', height: '400px', marginTop: '20px', marginBottom: '20px' }}></div>
      
      

      <div style={{ backgroundColor: '#F2442E', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',  overflowX: 'hidden' }}>
  <div style={{  padding: '0 20px' }}>
    <h1 style={{ color: 'white', fontSize: '2rem', marginBottom: '10px' }}>Financiamento facilitado</h1>
    <h3 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '10px' }}>Faça uma simulação de financiamento sem compromisso</h3>
  </div>
  <div>
    <a href="https://api.whatsapp.com/send?phone=5583991812589" target="_blank" rel="noopener noreferrer">
      <button style={{ backgroundColor: 'green', color: 'white', padding: '8px 20px', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>WhatsApp</button>
    </a>
  </div>
</div>


    </Container>
  );
}