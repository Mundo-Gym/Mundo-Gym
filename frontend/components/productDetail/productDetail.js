// import Link from "next/link";
import React, { useState } from "react";
import Container from "../container/Container";
import { getProductById } from "../../redux/actions/actionProduct";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  addCarProduct,
  removeCarProduct,
} from "../../redux/features/carStackSlice";
// import handlerCheckout from "../car/Car"
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import Review from "../ReviewForm/Reseñas";
import { FaStar } from "react-icons/fa";

export default function ProductDetail({ id }) {
  const productById = useSelector((state) => state.products.productById);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const inSession = useSelector((s) => s.user.value);
  useEffect(() => {
    if (!id) {
      return;
    } else {
      dispatch(getProductById(id));
    }
    // return () => dispatch(cleanProductById());
  }, [id, dispatch]);

  const checkout = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/app/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productById),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        window.location.href = `${data}`;
      } else {
        console.log(data); // Mostrar el mensaje de error en la consola
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlerCheckout = () => {
    if ((session && session.user.name) || inSession?.name) {
      checkout();
    } else {
      Swal.fire({
        position: "top",
        icon: "warning",
        title: "Debes loguearte Primero!!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const [isStack, setIsStack] = useState(false); // esta en el carrito? en principio no.
  const Stack = useSelector((s) => s.stack.value); // lo que viene en el carrito.

  const selectStack = () => {
    const coincidentes = Stack.map((item) => {
      const key = Object.keys(item)[0];
      const { id } = item[key];
      if (id === productById.id) {
        return { key, id };
      }
      return null;
    }).filter((item) => item !== null);
    console.log(coincidentes);
    // if(coincidentes[0].id === productById.id) setIsStack(true)

    /////////////////////////
    // const array = [
    //   { 0: { name: "carlos", apellido: "perez" } },
    //   { 1: { name: "maxi", apellido: "cassol" } },
    //   { 3: { name: "gaby", apellido: "viera" } }];
    // const apellidoBuscado = "cassol";

    // const coincidetes = array.map((item) => {
    //   const key = Object.keys(item)[0];
    //   const { name, apellido } = item[key];
    //   if (apellido === apellidoBuscado) {
    //     return { key, name, apellido };
    //   }
    //   return null;
    // }).filter((item) => item !== null);

    // console.log(coincidentes);
    // coincidentes[0].id
    // coincidentes = [{ 1: { name: "maxi", id: "cassol" } }]   === productById.id

    //  [{0:{name:"carlos",apellido:"perez"}}, {1:{name:"maxi",apellido:"cassol"}}, {3:{name:"gaby",apellido:"viera"}}]
    /////////////////////////////////////
    if (!isStack) {
      setIsStack(true);
      dispatch(addCarProduct(productById));
    }

    if (isStack) {
      setIsStack(false);
      dispatch(removeCarProduct(id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Container>
        <div className="flex-center items-center bg-white">
          {productById ? (
            <div className="p-8 flex items-center justify-center h-full">
              <div className="flex gap-20">
                <div className="ml-[20%] w-[30%]">
                  <img src={productById.image} alt={productById.name} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-4">
                    {productById.name}
                  </h1>
                  <p className="text-lg mb-4">{productById.description}</p>

                  <div className="flex mb-4">
                    <div className="mr-4">
                      <span className="font-bold">Precio:</span>
                    </div>
                    <div>${productById.price}</div>
                  </div>
                  <div className="flex mb-4">
                    <div className="mr-4">
                      <span className="font-bold">Stock:</span>
                    </div>
                    <div>{productById.stock}</div>
                  </div>

                  <div className="mr-4 flex">
                    <span className="font-bold mr-[10px]">Categoria:</span>
                    <div>
                      <h3>
                        {productById.description && productById.category.name}
                      </h3>
                    </div>
                  </div>
                  <div className="mr-4 flex">
                    {/* <span className="font-bold mr-[10px]">Sub Categoria:</span>
                    <div>
                      {productById.description &&
                        productById.subcategories.map((s) => <h3>{s.name}</h3>)}
                    </div> */}
                  </div>

                  {/* <button
                    className="bg-blue-500 hover:bg-blue-700 w-[166px] text-white font-bold py-2 px-4 rounded mt-[20px]"
                    onClick={() => handlerCheckout()}
                  >
                    Comprar
                  </button> */}
                  <br />
                  {!isStack ? (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-[20px] "
                      onClick={() => selectStack()}
                    >
                      Agregar al Carrito
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-[20px]"
                      onClick={() => selectStack()}
                    >
                      Sacar del Carrito
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p>Producto no encontrado</p>
          )}
        </div>
        <div className="w-full">
          <div className="mt-20 mb-10">
            <hr className="w-3/4 mx-auto my-4 border-gray-300" />
          </div>
          <Review
            productId={productById.id}
            userId={inSession.id}
            key={inSession.id}
          />
          <div className="flex flex-wrap justify-start ml-16">
            {productById &&
              productById.Reviews &&
              productById.Reviews.map((review, index) => (
                <div
                  key={productById.id + index}
                  className="p-4 bg-white shadow-md rounded-lg mb-8 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 ml-6"
                >
                  <p className="flex items-center font-semibold text-lg mb-2">
                    {Array(review.calification).fill(
                      <FaStar className="text-2xl text-yellow-500" />
                    )}
                  </p>
                  <p className="text-lg font-bold">{review && review.review}</p>
                </div>
              ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
