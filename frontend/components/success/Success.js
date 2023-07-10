import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import s from "./success.module.css";
import { getOrderItem } from "../../redux/features/orderItemsSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Success() {
  const router = useRouter();
  const dispatch = useDispatch();
  const orderBuy = useSelector((s) => s.orderItems.value);

  useEffect(() => {
    // Perform localStorage action
    const orderS = localStorage.getItem("orderItems");
    const stocksS = JSON.parse(orderS);
    dispatch(getOrderItem(stocksS));
    // return setTimeout(postOrder, 3000);
  }, []);

  const postOrder = async () => {
    try {
      localStorage.removeItem("orderItems");
      const order = localStorage.getItem("orderItems");
      const stocks = JSON.parse(order);
      await axios
        .post("http://localhost:3001/app/success", orderBuy)
        .then(router.push("/home"));
    } catch (error) {
      window.location.href = "/home";
    }
  };

  return (
    <div className={s.container}>
      <div className={s.containerUp}>
        <h2 className={s.title}>COMPRA EXITOSA!</h2>
        <h2 className={s.titles}>Pagaste ${orderBuy.total}</h2>
      </div>
      <div className={s.cardContainer}>
        <div className={s.card}>
          {orderBuy.items &&
            orderBuy.items.map((p) => (
              <div className=" w-[370px] shadow-[1px_1px_20px_rgba(0,0,0,0.2)] rounded-md relative p-[10px] justify-start items-center mb-[5px] flex">
                <img
                  className="w-[70px] rounded-full mr-[20px]"
                  src={p.image}
                  alt={p.name}
                />
                <div className="text-bold w-full font-bold">
                  <h2>{p.name}</h2>
                  <div className="flex justify-between">
                    <h3>{p.price}</h3>
                    <div className="flex justify-between w-[25%]">
                      <h3>{p.quantity}</h3>
                      <h3>{p.quantity * p.price}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <button className={s.button} onClick={() => postOrder()}>
        Volver a Mi tienda
      </button>
    </div>
  );
}
