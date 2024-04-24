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
import barraAzul from '../../assets/barraAzul.png';
import FUNCIONARIO1 from '../../assets/FUNCIONARIO1.png';
import FUNCIONARIO2 from '../../assets/FUNCIONARIO2.png';
import email from '../../assets/email.png';
import localizacao from '../../assets/localizacao.png';
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
  ></div>;
};

export function Home() {
  const [cars, setCars] = useState<CarsProps[]>([]);
  const [loadImages, setLoadImages] = useState<string[]>([]);
  const [input, setInput] = useState('');

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
      <img src={logoImg} alt="Logo do site" className="w-full mt-6" />

      <h1 className="font-bold text-center mt-6 text-2xl mb-4">
        Carros novos e usados em todo o Brasil
      </h1>
      
      <section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2">
        <input
          className="w-full border-2 rounded-lg h-9 px-3 outline-none"
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

      <div className="mt-8">
        <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      </div>

      <div style={{ position: 'relative', marginTop: '40px' }}>
        {/* Título "Nossa equipe" */}
        <h1 style={{ 
          position: 'absolute',
          top: '10%',
          left: '9%',
          color: 'red',
          zIndex: 1,
          fontSize: '3rem', // Ajusta o tamanho da fonte
          fontWeight: 'bold', // Torna a fonte mais grossa
        }}>Nossa equipe</h1>

        {/* Descrição */}
        <h4 style={{ 
          position: 'absolute',
          top: '30%', 
          left: '20%', 
          transform: 'translateX(-50%)', 
          color: 'white', 
          zIndex: 1, 
          textAlign: 'center' 
        }}> 
          Tire todas as suas dúvidas<br /> 
          através do nosso atendimento online direto<br /> 
          pelo WhatsApp.
        </h4>

        {/* Ícone de localização */}
        <img 
          src={localizacao} 
          alt="Localização" 
          style={{ 
            position: 'absolute', 
            bottom: '30%', 
            left: '10%',  
            width: '20px', // Defina a largura desejada
            height: '20px' // Defina a altura desejada
          }} 
        />

        {/* Endereço */}
        <p style={{ 
          position: 'absolute',
          bottom: '30%',
          left: '13%', 
          color: 'white', 
          zIndex: 1,
          textAlign: 'center'
        }}>
          R. 5 - Jardim Roma, Caldas Novas - GO. 75690-000
        </p>

        {/* Ícone de e-mail */}
        <img 
          src={email}
          alt="E-mail" 
          style={{ 
            position: 'absolute',
            bottom: '20%',
            left: '10%',
            width: '20px', // Defina a largura desejada
            height: '15px' // Defina a altura desejada
          }} 
        />

        {/* E-mail */}
        <p style={{ 
          position: 'absolute',
          bottom: '19%',
          left: '13%',
          color: 'white',
          textAlign: 'center'
        }}>
          leoauto01@gmail.com
        </p>

        {/* Outras imagens */}
        <a href="https://api.whatsapp.com/send?phone=5564993147007" target="_blank" rel="noopener noreferrer">
          <img src={FUNCIONARIO1} alt="João" style={{ position: 'absolute', top: '50px', right: '30px', zIndex: 1 }} />
        </a>
        <a href="https://api.whatsapp.com/send?phone=5564992014770" target="_blank" rel="noopener noreferrer">
          <img src={FUNCIONARIO2} alt="Neguinho" style={{ position: 'absolute', top: '50px', right: '270px', zIndex: 1 }} />
        </a>

        {/* Imagem "barraAzul.png" */}
        <img src={barraAzul} alt="barra azul" className="w-full mt-6" />
      </div>
      
      <MyComponent />
    </Container>
  );
}
