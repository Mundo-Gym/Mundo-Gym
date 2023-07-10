import Carrusel from '../components/carrusel/Carrusel';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default {
  title: 'Carrusel',
  component: Carrusel,
  parameters: {
    layout: 'fullscreen',
  },
};

const slides = [
  {
    id: 1,
    title: "Slide 1",
    image: "https://images.pexels.com/photos/4608175/pexels-photo-4608175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    title: "Slide 2",
    image: "https://images.pexels.com/photos/1092878/pexels-photo-1092878.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    title: "Slide 3",
    image: "https://imageup.me/images/cce0d202-2b71-437a-aef4-96c898085db6.jpeg?v=68",
  },
  {
    id: 4,
    title: "Slide 4",
    image: "https://images.pexels.com/photos/949128/pexels-photo-949128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export const Basic = () => <Carrusel slides={slides} />;

