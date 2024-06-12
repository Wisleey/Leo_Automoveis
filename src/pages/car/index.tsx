import { useEffect, useState } from 'react';
import { Container } from '../../components/container';
import { FaWhatsapp } from 'react-icons/fa';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';
import { Swiper, SwiperSlide } from 'swiper/react';

interface CarProps {
  id: string;
  name: string;
  model: string;
  city: string;
  year: string;
  km: string;
  description: string;
  created: string;
  price: string | number;
  owner: string;
  uid: string;
  images: ImagesCarProps[];
}

interface ImagesCarProps {
  uid: string;
  name: string;
  url: string;
}

export function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState<CarProps>();
  const [sliderPerView, setSliderPerView] = useState<number>(2);
  const navigate = useNavigate();
  const location = useLocation();
  const currentUrl = location.pathname;

  useEffect(() => {
    async function loadCar() {
      if (!id) { return; }

      const docRef = doc(db, "cars", id);
      getDoc(docRef)
        .then((snapshot) => {
          if (!snapshot.data()) {
            navigate("/");
            return;
          }

          setCar({
            id: snapshot.id,
            name: snapshot.data()?.name,
            year: snapshot.data()?.year,
            city: snapshot.data()?.city,
            model: snapshot.data()?.model,
            uid: snapshot.data()?.uid,
            description: snapshot.data()?.description,
            created: snapshot.data()?.created,
            price: snapshot.data()?.price,
            km: snapshot.data()?.km,
            owner: snapshot.data()?.owner,
            images: snapshot.data()?.images
          });
        });
    }

    loadCar();
  }, [id, navigate]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 720) {
        setSliderPerView(1);
      } else {
        setSliderPerView(2);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const whatsapp1 = '5564992014770';
  const whatsapp2 = '5564993147007';

  const getRandomWhatsapp = () => {
    return Math.random() < 0.5 ? whatsapp1 : whatsapp2;
  };

  return (
    <Container>
      {car && (
        <Swiper
          slidesPerView={sliderPerView}
          pagination={{ clickable: true }}
          navigation
        >
          {car.images.map((image) => (
            <SwiperSlide key={image.name}>
              <img
                src={image.url}
                className="w-full h-96 object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {car && (
        <main className="w-full bg-white rounded-lg p-6 my-4">
          <div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
            <h1 className="font-bold text-3xl text-black">{car.name}</h1>
            <h1 className="font-bold text-3xl text-black">R$ {car.price}</h1>
          </div>
          <p>{car.model}</p>

          <div className="flex w-full gap-6 my-4">
            <div className="flex flex-col gap-4">
              <div>
                <p>Cidade</p>
                <strong>{car.city}</strong>
              </div>
              <div>
                <p>Ano</p>
                <strong>{car.year}</strong>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <p>KM</p>
                <strong>{car.km}</strong>
              </div>
            </div>
          </div>

          <strong>Descrição:</strong>
          <p className="mb-4">{car.description}</p>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              const selectedWhatsapp = getRandomWhatsapp();
              window.open(`https://api.whatsapp.com/send?phone=${selectedWhatsapp}&text=Olá, vi este ${car.name} no Site Leo Automóveis e fiquei interessado! Confira o link: ${window.location.origin}${currentUrl}`, '_blank');
            }}
            className="cursor-pointer bg-green-600 w-full text-white flex items-center justify-center gap-3 my-8 h-14 text-xl rounded-lg font-medium"
          >
            Conversar com vendedor
            <FaWhatsapp size={26} color="#FFF" />
          </a>
        </main>
        // Redireciona o usuário para o WhatsApp com uma mensagem personalizada incluindo o nome do carro e o link da página do carro
      )}
    </Container>
  );
}
