import Card from "../card/Card";
import Carrusel from "../carrusel/Carrusel";
import Container from "../container/Container";
import { useSelector, useDispatch } from "react-redux";
import Category from "../categorias/Categorias";
import Pagination from "../paginate/Paginate";
import { useEffect } from "react";
import { forceCurrent } from "../../redux/features/paginateSlice";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const numPaginate = useSelector((s) => s.numPaginate.value);
  const products = useSelector((s) => s.products.value);
  let find = useSelector((s) => s.products.find);
  const dispatch = useDispatch();
  const { data: session } = useSession();

  let from = (numPaginate - 1) * 5;
  let to = numPaginate * 5;
  const current = products.slice(from, to);
  const currentFind = find.slice(from, to);

  useEffect(() => {
    dispatch(forceCurrent(1));
  }, [products]);

  useEffect(() => {
    dispatch(forceCurrent(1));
  }, [find]);

  return (
    <Container>
      <div className="">
        <Carrusel />
      </div>
      <br />

      <div className="mb-5 flex flex-wrap justify-center items-center content-center">
        <Category />
      </div>
      <div className="mb-5 flex flex-wrap justify-center items-center">
        {!currentFind.length
          ? current.map((p) => (
              p.stock<1 || !p.visible?null:<Card
                key={p.name}
                id={p.id}
                name={p.name}
                image={p.image}
                price={p.price}
                description={p.description}
                Category={p.category?.name}
              />
            ))
          : currentFind.map((p) => (
            p.stock<1 || !p.visible?null:<Card
                key={p.name}
                id={p.id}
                name={p.name}
                image={p.image}
                price={p.price}
                description={p.description}
                Category={p.category?.name}
              />
            ))}
      </div>
      {find !== [] && find.length > 5 ? (
        <div className="relative h-[50px] w-[100%]">
          <Pagination products={find} />
        </div>
      ) : null}

      {find.length === 0 && products.length > 5 ? (
        <div className="relative h-[50px] w-[100vw]">
          <Pagination products={products} />
        </div>
      ) : null}

      <br />
    </Container>
  );
}
