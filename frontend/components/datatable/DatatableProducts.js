import { useSelector } from "react-redux";

export const columns = [
  "Nombre",
  "Precio",
  "Costo",
  "Stock",
  "Categoria",
  "Subcategoria",
  "Estado",
  "ID",
];

export const options = {
  filterType: "checkbox",
};

export function Database() {
  const products = useSelector((s) => s.products.value);
  const datas = products.map(
    ({ name, price, cost, stock, category, subcategories, visible, id }) => [
      name,
      price,
      cost,
      stock,
      category?.name,
      visible ? "activo" : "inactivo",
      id,
    ]
  );
  return datas;
}

// copia que anda bien:

// import { useSelector } from "react-redux";

// export const columns = ["Nombre", "Precio", "Costo", "Stock", "Categoria", "Subcategoria", "Estado", "ID"];

// export const options = { filterType: 'checkbox'};

// export default function Database() {
//     const products = useSelector((s) => s.products.value);

//     const datas = products.map(({ name, price, cost, stock, category, subcategories, visible, id }) => [
//     name, price, cost, stock, category.name, subcategories[0]?.name, visible ? "activo" : "inactivo", id
//     ])

//     return datas
// }
