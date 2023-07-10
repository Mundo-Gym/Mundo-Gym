import React, { useEffect, useState } from "react";
import CarCard from "../carCard/CarCard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  addStorageProducts,
  updateTotal,
} from "../../redux/features/carStackSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { cleanStack } from "../../redux/features/carStackSlice";
import axios from "axios";

import { getOrderItem } from "../../redux/features/orderItemsSlice";

export default function Car() {
  const [orderItems, setOrderItems] = useState({
    userId: "",
    items: [],
    total: 0,
  });
  const { data: session } = useSession();
  const items = useSelector((s) => s.stack.value);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [aux, setAux] = useState(0);

  const stock = useSelector((s) => s.stack.value);
  const totalS = useSelector((s) => s.stack.total);
  const inSession = useSelector((s) => s.user.value);

  useEffect(() => {
    const item = localStorage.getItem("car");
    const stocks = JSON.parse(item);
    if (stocks) {
      dispatch(addStorageProducts(stocks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("car", JSON.stringify(stock));
    dispatch(updateTotal(0));
    let aux = 0;
    stock.forEach((p) => {
      aux = aux + p.price * p.quantity;
    });
    dispatch(updateTotal(aux));
  }, [stock]);

  useEffect(() => {
    let aux2 = [];
    items.forEach((p) => {
      aux2.push(p);
      setAux(aux + p.price * p.quantity);
    });
    setOrderItems({
      ...orderItems,
      items: items,
      total: totalS,
      userId: inSession.id,
    });
  }, [items]);

  const handlerShow = () => {
    if (!show) setShow(true);
    if (show) setShow(false);
  };

  const checkout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/app/create-order",
        { items, inSession }
      );
      const data = await response.data;
      console.log(data);
      window.location.href = data;
      if (response.ok) {
        window.location.href = data;
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlerCheckout = async () => {
    setOrderItems({
      userId: inSession && inSession.id,
      items: items && items,
      total: totalS && totalS,
    });

    if ((session && session.user.name) || inSession?.name) {
      localStorage.setItem("orderItems", JSON.stringify(orderItems));

      const item = localStorage.getItem("orderItems");
      const user = JSON.parse(item);
      if (user) {
        dispatch(getOrderItem(user));
      }

      dispatch(cleanStack());
      checkout();
      console.log("no llega aqui");
    } else {
      alert("Debes loguearte Primero!!");
    }
  };

  return (
    <div>
      {inSession.typeUser !== "admin" ? (
        <div className="fixed right-[20px] bottom-[50px] p-[20px]">
          <div
            onClick={() => handlerShow()}
            className="relative shadow-[1px_1px_10px_rgba(0,0,0)] font-bold text-blue-950 bg-white p-[10px] rounded-full hover:text-base hover:p-[11px] hover:shadow-[1px_1px_15px_rgba(0,0,0)]"
          >
            {!stock.length ? null : (
              <div className="text-white text-base p-[12px] w-[3px] h-[2px] bg-[#ff0000] flex justify-center items-center rounded-full absolute top-[-0.5rem] right-[-0.5rem] shadow-[1px_1px_15px_rgba(255,0,0)]">
                {stock.length < 10 ? stock.length : "9+"}
              </div>
            )}

            <ShoppingCartIcon />
          </div>

          {!show || !stock.length ? null : (
            <div className="text-white text-base p-[10px] w-[50px] h-[50px] bg-[#ffffff] flex justify-center items-center absolute bottom-[4.3rem] right-[1.9rem] rounded-[0_10px] rotate-45"></div>
          )}

          {!show || !stock.length ? null : (
            <div
              className="overflow-y-scroll overflow-hiden px-[5px] pt-[10px] h-[400px] w-[400px] bg-[#ffffff] flex-col justify-start items-center rounded-[15px_0_15px_15px] absolute top-[-25rem] right-[-1rem]  w-[20
            px] fixed right-[20px] bottom-[50px]"
            >
              {stock.map((p) => (
                <CarCard
                  key={p.id}
                  name={p.name}
                  price={p.price}
                  image={p.image}
                  id={p.id}
                  description={p.description}
                />
              ))}
              <hr className="w-[95%] mt-[10px]" />
              <span>{`Total: ${totalS}`}</span>
              <button
                onClick={() => handlerCheckout()}
                className="bg-[rgba(000,225,00)] mt-[10px] text-[#fff] font-bold p-[5px] w-[95%] rounded-[15px] shadow-[4px_4px_5px_rgba(000,225,000,0.5)]"
              >
                COMPRAR AHORA!
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
