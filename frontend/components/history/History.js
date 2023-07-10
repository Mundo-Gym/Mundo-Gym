import React, { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllHistory,
  getAllUserHistory,
} from "../../redux/actions/actionUsers";

import { getHistory } from "../../redux/features/orderItemsSlice";
import axios from "axios";

export default function History() {
  const inSession = useSelector((s) => s.user.value);
  const historyItems = useSelector((s) => s.orderItems.history);

  const columns = [
    "Numero de compra",
    "Producto",
    "Cantidad",
    "Precio",
    "Total",
  ];

  const dataClient =
    inSession.typeUser === "cliente" &&
    historyItems.map((historyItem) => {
      const { id, products, total } = historyItem;
      const productNames = products.map((product) => product.name).join(", ");
      const quantities = products
        .map((product) => product.CompraProduct.quantity)
        .join(", ");
      const prices = products.map((product) => product.price).join(", ");
      const totals = products
        .map((product) => product.CompraProduct.amount)
        .join(", ");

      return [id, productNames, quantities, prices, totals];
    });

  const options = {
    filterType: "checkbox",
    responsive: "standard",
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (inSession.typeUser === "cliente") {
      dispatch(getAllHistory(inSession.id));
    } else if (inSession.typeUser === "admin") {
      axios("http://localhost:3001/auth/compras")
        .then(({ data }) => {
          dispatch(getHistory({ data }));
        })
        .catch((error) => {
          console.error("Error fetching history:", error);
        });
    }
  }, [inSession.typeUser, dispatch]);

  return (
    <div>
      {inSession.typeUser === "cliente" && (
        <MUIDataTable
          title={"Compras Cliente"}
          columns={columns}
          data={dataClient}
          options={options}
        />
      )}
      {inSession.typeUser === "admin" && (
        <MUIDataTable
          title={"Compras"}
          columns={columns}
          data={dataAdmin}
          options={options}
        />
      )}
    </div>
  );
}
