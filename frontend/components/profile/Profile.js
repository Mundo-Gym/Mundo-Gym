import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Container from "../container/Container";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import uploadImage from "../../public/assets/upload.png";
import s from "./Profile.module.css";
import Favorites from "../favorites/Favorites";
import Card from "../card/Card";
import UpdateUser from "../updateUser/UpdateUser";
import MUIDataTable from "mui-datatables";
import { Database, columns, options } from "../datatable/DatatableProducts";
import DatabaseUsers, {
  columnsUsers,
  optionsUsers,
} from "../datatable/DatatableUsers";
import { switchProduct, getProd } from "../../redux/actions/actionProduct";
import { useEffect } from "react";
import { useRouter } from "next/router";
import FormCreateProduct from "../formCreateProduct/FormCreateProduct";
import FormCreateCategory from "../formCrateCategory/FormCreateCategory";
import { getUser } from "../../redux/features/userSlice";
import { getUsers } from "../../redux/actions/actionUsers";
import History from "../history/History";

export default function Profile() {
  const router = useRouter();
  const userDetail = useSelector((s) => s.user.value);
  const allUsers = useSelector((s) => s.user.allUsers);
  const stack = useSelector((s) => s.stack.value);
  const [inSession, setInSession] = useState("updateProfile");
  const products = useSelector((s) => s.products.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProd());
  }, [products]);

  const data = Database();
  const dataUsers = DatabaseUsers();

  const handleDelete = (rowIndex) => {
    const productId = data[rowIndex][7];
    if (data[rowIndex][3] !== 0) {
      dispatch(switchProduct(productId));
    } else {
      null;
    }
  };

  return (
    <div>
      <Container>
        <Head>
          <title>Perfil</title>
        </Head>

        <div className="relative flex justify-around h-[100vh] w-[100vw]">
          <div className="absolute top-0 bg-[#fff] w-[100%] h-[100%]">
            <div className="ml-[250px] h-[6vh] flex">
              {/* {userDetail.typeUser === "admin" ? null : (
                <button
                  onClick={() => setInSession("favoritos")}
                  className={s.seccion_button}
                >
                  Favoritos
                </button>
              )} */}
              {userDetail.typeUser === "cliente" ? (
                <button
                  onClick={() => setInSession("compras")}
                  className={s.seccion_button}
                >
                  Compras
                </button>
              ) : null}
              {userDetail.typeUser === "admin" ? (
                <button
                  onClick={() => setInSession("Publicaciones")}
                  className={s.seccion_button}
                >
                  Publicaciones
                </button>
              ) : null}
              {userDetail.typeUser === "admin" ? (
                <button
                  onClick={() => setInSession("crearProd")}
                  className={s.seccion_button}
                >
                  Crear Productos
                </button>
              ) : null}
              {userDetail.typeUser === "admin" ? (
                <button
                  onClick={() => setInSession("crearCat")}
                  className={s.seccion_button}
                >
                  Crear Categorias
                </button>
              ) : null}
              {userDetail.typeUser === "admin" ? (
                <button
                  onClick={() => setInSession("Usuarios")}
                  className={s.seccion_button}
                >
                  Usuarios
                </button>
              ) : null}
            </div>

            <div className="absolute top-[6vh] ml-0 left-[300px] bg-[#fff] w-[78vw] h-[94vh] overflow-scroll p-[10px]">
              {inSession === "favoritos" && userDetail.typeUser !== "admin" ? (
                <Favorites />
              ) : null}

              {inSession === "compras" ? <History /> : null}

              {inSession === "historial" ? <h1>Historial</h1> : null}

              {inSession === "Publicaciones" ? (
                <MUIDataTable
                  title={""}
                  data={data}
                  columns={[
                    ...columns,
                    {
                      name: "Visibilidad",
                      options: {
                        customBodyRender: (value, tableMeta, updateValue) => (
                          <button
                            onClick={() => handleDelete(tableMeta.rowIndex)}
                            className={s.button}
                          >
                            ⏯︎
                          </button>
                        ),
                      },
                    },
                  ]}
                  options={options}
                />
              ) : null}

              {inSession === "crearProd" ? <FormCreateProduct /> : null}

              {inSession === "crearCat" ? <FormCreateCategory /> : null}

              {inSession === "Usuarios" ? (
                <MUIDataTable
                  title={""}
                  data={dataUsers}
                  columns={columnsUsers}
                  options={optionsUsers}
                />
              ) : null}

              {/* {inSession === 'UpdatePassword'
              ?<div className=" bg-[#fff] w-[75vw] h-[94vh] overflow-scroll">
                <h2 className={s.titulo}>Editar Usuario</h2>
                <UpdateUser />
              </div>:null} */}

              {inSession === "Usuarios" && userDetail.typeUser === "admin" ? (
                <MUIDataTable
                  title={""}
                  data={dataUsers}
                  columns={columnsUsers}
                  options={optionsUsers}
                />
              ) : null}

              {inSession === "updateProfile" ? (
                <div className=" bg-[#fff] w-[75vw] h-[94vh] overflow-scroll">
                  <UpdateUser />
                </div>
              ) : null}
            </div>
          </div>
          ///Barra lateral
          <div className="absolute font-bold left-[0%] top-[0%] h-[100%] p-[15px_5px_10px_30px] rounded-[0_15%_0_0] w-[300px] flex flex-col items-start bg-[rgba(28,41,71,1)]">
            <div className="w-[250px] mb-[20px] rounded-full">
              <Image
                className="w-[250px] mb-[20px] rounded-full"
                src={userDetail.photo || uploadImage}
                alt={`${userDetail.name} foto`}
              />
            </div>
            <h1 className="text-[#E6EDF3] text-[20px] font-bold">{`${userDetail.name} ${userDetail.lastname}`}</h1>
            <h2 className="text-[#E6EDF3] text-[18px] font-thin">
              {userDetail.username}
            </h2>
            <h2 className="text-[#E6EDF3] text-[18px] font-thin">
              {userDetail.email}
            </h2>
            <h2 className="text-[#E6EDF3] text-[18px] font-thin">
              {`DNI: ${userDetail.dni || "Dato necesario"}`}
            </h2>
            <h2 className="text-[#E6EDF3] text-[18px] font-thin">
              {`Genero: ${userDetail.gender || "Dato necesario"}`}
            </h2>

            <button
              onClick={() => setInSession("updateProfile")}
              className="w-[205px] h-[30px] bg-[rgba(218,231,261)] hover:bg-[#fff] rounded-[20px] "
            >
              Editar Perfil
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}

{
  /* <div class="relative flex flex-col left-[18%] p-[15px] w-[40rem]">
<table class="border-separate border border-spacing-8 shadow-[1px_1px_10px_rgba(0,0,0)] rounded-[6px]">
  <caption class="caption-top text-lg font-bold mb-[1rem]">
    Mis Compras
  </caption>
  <thead>
    <tr>
      <th>Cantidad</th>
      <th>Producto</th>
      <th>Total</th>
      <th>Estado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>Pesas</td>
      <td>$1200</td>
      <td>Entregado</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Kit 1</td>
      <td>$5500</td>
      <td>En espera</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Suplemento</td>
      <td>$2500</td>
      <td>Procesando</td>
    </tr>
  </tbody>
</table>
</div>
 */
}
