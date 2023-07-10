import Slider from 'react-slick'
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


function MyCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Muestra solo un slide a la vez
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    // nextArrow: <h1>LALALA</h1>,
    // prevArrow: <h1>LOLOLO</h1>
  }

  return (
    <Slider {...settings}>
      {slides.map((slide) => (
        <div key={slide.id}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '480px',
            boxShadow: '1px'
          }}>
            <img src={slide.image} alt={slide.title}
              style={{
                height: '100%',
                width: '100vw',
                overflow: 'hidden',
                objectFit: 'cover',
                // oculta la parte visible de la imagen que sobresale
              }} />
          </div>
        </div>
      ))}
    </Slider>
  );
}


export default MyCarousel