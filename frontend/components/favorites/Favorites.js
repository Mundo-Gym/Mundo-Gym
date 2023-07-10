import { useSelector } from "react-redux";
import Card from "../card/Card";

export default function Favorites() {
  const fav = useSelector((s) => s.favorites.value);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {fav.length === 0 ? (
        <p className="text-2xl text-gray-500 mb-8">No has añadido ningun producto a favoritos</p>
      ) : (
        <ul className="flex flex-wrap">
          <br />
          {fav.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
                isFavorite={true}
                price={item.price}
                description={item.description}
              />
          ))}
        </ul>
      )}
    </div>
  );
}