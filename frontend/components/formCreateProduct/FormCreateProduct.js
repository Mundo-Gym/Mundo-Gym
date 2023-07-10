import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { saveImageFile } from "../../redux/features/saveImageSlice";
import { getCat } from "../../redux/actions/actionsCategories";
import { getSubCats } from "../../redux/actions/actionsSubCats";
import { createProd } from "../../redux/actions/actionProduct";
import Swal from "sweetalert2";

const FormCreateProduct = () => {
  const categ = useSelector((state) => state.categories.value);
  const subcategories = useSelector((state) => state.subCategories.value);
  const imageFile = useSelector((s) => s.imageFile.value);

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    image: [],
    category: "",
    subcategory: "",
    price: "",
    cost: "",
    stock: "",
    description: "",
  });

  const [flagSelectCat, setFlagSelectCat] = useState(false);

  const [flagSelectSub, setFlagSelectSub] = useState(false);

  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (categ.length < 1) {
      dispatch(getCat());
    }
    if (subcategories.length < 1) {
      dispatch(getSubCats());
    }
  }, [categ]);

  const handlerSubmit = async (e) => {
    e.preventDefault();

    if (
      Object.values(errors).some((error) => error !== "") ||
      Object.values(form).some((value) => value === "")
    ) {
      Swal.fire({
        position: "top",
        icon: "warning",
        title: "Falta campos por completar o hay errores!",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    console.log(form);
    dispatch(createProd(form));
    window.location.reload();
    Swal.fire({
      position: "top",
      icon: "success",
      title: "Producto creado con éxito!",
      showConfirmButton: false,
      timer: 2000,
    });
    // if (errors === "") {
    //   console.log(form)
    //   //const data = new formData()
    //   //data.append("file",file)
    //   //data.append("tags",`codeinfuse, medium, gist`)
    //   dispatch(createProd(form));
    //   window.location.reload()
    //   Swal.fire({
    //     position: 'top',
    //     icon: 'success',
    //     title: 'Producto creado con exito!',
    //     showConfirmButton: false,
    //     timer: 2000
    //   })

    // } else {
    //   Swal.fire({
    //     position: 'top',
    //     icon: 'warning',
    //     title: 'Falta campos por completar!',
    //     showConfirmButton: false,
    //     timer: 2000
    //   })
    // }
  };

  const handlerInput = (e) => {
    setErrors("");
    if (e.target.id === "Image") setForm({ ...form, image: e.target.value });
    if (e.target.id === "name") setForm({ ...form, name: e.target.value });
    if (e.target.id === "category") {
      setForm({ ...form, category: e.target.value });
    }

    if (e.target.id === "price") setForm({ ...form, price: e.target.value });
    if (e.target.id === "cost") setForm({ ...form, cost: e.target.value });
    if (e.target.id === "stock") setForm({ ...form, stock: e.target.value });

    if (e.target.id === "description")
      setForm({ ...form, description: e.target.value });
    // ERRORES
    if (form.name.trim() === "" || form.name.length < 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Debe completar el nombre",
      }));
    }
    // else if (form.image.trim() === "") setErrors("Debe completar una imagen");
    else if (form.category.trim() === "")
      setErrors("Debe completar la categoria");
    // else if (form.subcategory.length === 0)
    //   setErrors("Debe completar la subcategoria");
    else if (form.price === "") setErrors("Debe ser superior a cero");
    else if (form.cost === "") setErrors("Debe ser superior a cero");
    else if (form.stock === "") setErrors("Debe ser superior a cero");
    else if (form.description === "")
      setErrors("Debe llenar el campo descripción");
    else {
      setErrors("");
    }
  };

  const handlerDeleteImage = (e) => {
    e.preventDefault();
    setForm({ ...form, image: "" });
  };

  const handlerCategory = (e) => {
    e.preventDefault();

    setForm({ ...form, category: e.target.value });
    setFlagSelectCat(false);
  };

  // const handlerSubcategory = (e) => {
  //   setFlagSelectSub(false);
  //   e.preventDefault();
  //   if (e.target.value !== "allSubcategories") {
  //     setErrors("");
  //     setForm({ ...form, subcategory: [...form.subcategory, e.target.value] });
  //   }
  // };

  //*************************************************** */
  const [fileImage, setFileImage] = useState({ array: {} });
  const uploadImage = async (file) => {
    setForm({
      ...form,
      image: file.target.files[0],
    });
  };
  //*************************************************** */

  return (
    <div>
      <div className="relative flex justify-aroundn h-[100vh] w-[100vw]">
        <div></div>
        <div className="absolute left-[5%] top-[10%] overflow-y-scroll overflow-hiden rounded-[20px] shadow-[1px_1px_10px_rgba(0,0,0)] h-[35rem] p-[20px] flex flex-col justify-center items-center">
          <form method="post" encType="multipart/form-data">
            <div className="border-0 p-[5px_10px] mb-[10px] flex  rounded-[10px] w-[100%] shadow-[1px_1px_10px_rgba(0,0,0,0.3)] font-bold">
              <label>Nombre: </label>
              <input
                className="outline-0"
                id="name"
                defaultValue={form.name}
                onChange={(e) => handlerInput(e)}
                type="text"
                name="nombre"
              />
            </div>
            {errors && <span>{errors.name}</span>}
            <div className="border-0 p-[5px_0px_5px_10px] mb-[10px] flex  rounded-[10px] w-[100%] shadow-[1px_1px_10px_rgba(0,0,0,0.3)] font-bold">
              <label htmlFor="Image">Imagen: </label>
              <input
                placeholder="URL de imagen"
                id="Image"
                defaultValue={form.image}
                type="file"
                className="outline-0"
                onChange={uploadImage}
              />
            </div>
            <div className="border-0 p-[5px_10px] mb-[10px] flex  rounded-[10px] w-[100%] shadow-[1px_1px_10px_rgba(0,0,0,0.3)] relative font-bold">
              <label>Categoria:</label>

              <div className="relative">
                {!flagSelectCat ? (
                  <button
                    className="p-[2px_10px] border-0 rounded-full bg-[#2ba8fb] font-[#fff] font-bold duration-500 ml-[1rem] hover:bg-[#6fc5ff] hover:shadow-[0_0_20px_#6fc5ff50] hover:scale-[1.1] active:bg-[#3d94cf] active:duration-200 active:shadow-0 active:scale-95  text-[#fff]"
                    value={"allCategories"}
                    onClick={() => setFlagSelectCat(true)}
                  >
                    {form.category ? form.category : "-Seleccionar"}
                  </button>
                ) : null}
                {flagSelectCat ? (
                  <div className="bg-[#fff] border shadow-[1px_1px_10px_rgba(0,0,0)] rounded-[10px] absolute w-[200px] left-[0.1rem] h-[200px] flex flex-col overflow-scroll">
                    {categ.map((category, index) => {
                      return (
                        <div
                          key={index}
                          id="category"
                          className="mb-[2px] border-b-[1px] border-black-500 text-center font-bold"
                        >
                          {!category ? null : (
                            <button
                              value={category.name}
                              onClick={(e) => handlerCategory(e)}
                            >
                              {category.name}
                            </button>
                          )}
                          <button
                            className="text-[#fff] bg-rose-500 rounded-[20px] absolute w-[20px] right-1" //aqui va la funcion borrar con category.id
                          ></button>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
            {/* <div className="border-0 p-[5px_10px] mb-[10px] flex  rounded-[10px] w-[100%] shadow-[1px_1px_10px_rgba(0,0,0,0.3)] font-bold">
              <label>Subcategoria: </label>
              <div className="">
                {!flagSelectSub ? (
                  <button
                    className="p-[2px_10px] border-0 rounded-full bg-[#2ba8fb] font-[#fff] font-bold duration-500 ml-[1rem] hover:bg-[#6fc5ff] hover:shadow-[0_0_20px_#6fc5ff50] hover:scale-[1.1] active:bg-[#3d94cf] active:duration-200 active:shadow-0 active:scale-95  text-[#fff]"
                    value={"allSubcategories"}
                    onClick={() => setFlagSelectSub(true)}
                  >
                    {form.subcategory ? form.subcategory : "-Seleccionar"}
                  </button>
                ) : null}

                {flagSelectSub ? (
                  <div className="bg-[#fff] border shadow-[1px_1px_10px_rgba(0,0,0)] rounded-[10px] absolute w-[200px] m-[0_0_0_15px] h-[200px] flex flex-col overflow-scroll">
                    {subcategories.map((subcategory, index) => {
                      return (
                        <div
                          key={index}
                          id="subcategory"
                          className="mb-[2px] border-b-[1px] border-black-500 text-center font-bold"
                        >
                          <button
                            value={subcategory.name}
                            onClick={(e) => handlerSubcategory(e)}
                          >
                            {subcategory.name}
                          </button>
                          <button className="text-[#fff] bg-rose-500 rounded-[20px] absolute w-[20px] right-1"></button>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div> */}

            <div className="border-0 p-[5px_10px] mb-[10px] flex   rounded-[10px] w-[100%] shadow-[1px_1px_10px_rgba(0,0,0,0.3)]  font-bold">
              <label htmlFor="price">Precio:</label>
              <input
                name="price"
                className="outline-0 w-[80%] right-1 ml-[5px]"
                id="price"
                defaultValue={form.price}
                type="number"
                onChange={(e) => handlerInput(e)}
              />
            </div>
            <div className="border-0 p-[5px_10px] mb-[10px] flex  rounded-[10px] w-[100%] shadow-[1px_1px_10px_rgba(0,0,0,0.3)]  font-bold">
              <label htmlFor="cost">Costo:</label>
              <input
                name="cost"
                className="outline-0 w-[80%] right-1  ml-[5px]"
                id="cost"
                defaultValue={form.cost}
                type="number"
                onChange={(e) => handlerInput(e)}
              />
            </div>
            <div className="border-0 p-[5px_10px] mb-[10px] flex  rounded-[10px] w-[100%] shadow-[1px_1px_10px_rgba(0,0,0,0.3)]  font-bold">
              <label htmlFor="stock">Stock:</label>
              <input
                name="stock"
                className="outline-0 w-[80%] right-1  ml-[5px]"
                id="stock"
                defaultValue={form.stock}
                type="number"
                onChange={(e) => handlerInput(e)}
              />
            </div>
            {/*
            <div className="border-0 p-[5px_10px] mb-[10px] flex  rounded-[10px] w-[100%] shadow-[1px_1px_10px_rgba(0,0,0,0.3)]  font-bold">
              <label htmlFor="supplier">Proveedor: </label>
              <input
                type="text"
                className="outline-0"
                defaultValue={form.supplier}
                name="supplier"
                id="supplier"
                onChange={(e) => handlerInput(e)}
              />
            </div> */}
            <div className="border-0 p-[5px_10px] mb-[10px] flex  rounded-[10px] w-[100%] shadow-[1px_1px_10px_rgba(0,0,0,0.3)] font-bold">
              <label htmlFor="description">Descripcion: </label>
              <textarea
                defaultValue={form.description}
                className="outline-0 px-[10px] w-[80%]"
                id="description"
                name="description"
                onChange={(e) => handlerInput(e)}
              />
            </div>
          </form>

          <div className="flex justify-center ml-[-15px] w-[100%]">
            <button
              className="w-[90%] p-[2px_10px] border-0 rounded-full bg-[#2ba8fb] font-[#fff] font-bold duration-500 ml-[1rem] hover:bg-[#6fc5ff] hover:shadow-[0_0_20px_#6fc5ff50] hover:scale-[1.1] active:bg-[#3d94cf] active:duration-200 active:shadow-0 active:scale-95 text-[#fff]"
              type="submit"
              value={"crear"}
              onClick={(e) => handlerSubmit(e)}
            >
              Crear Producto
            </button>
          </div>
        </div>

        {/* <div className="absolute right-[5%] top-[10%] w-[40%] overflow-y-scroll overflow-hiden rounded-[20px] shadow-[1px_1px_10px_rgba(0,0,0)] h-[30rem] p-[20px] mt-[50px] flex justify-around items-center">
          <div className="relative w-[100%] h-[100%]">
            <div className="text-red-500">{errors}</div>
            <div>
              {" "}
              {form.image !== "" ? (
                <div className="absolute top-[10%] right-[-10px] w-[250px] rounded-[10px] shadow-[1px_1px_10px_rgba(0,0,0)]">
                  <img
                    src={form.image}
                    className="w-[100%] h-[100%] rounded-[10px]"
                    alt={form.image}
                  ></img>
                  <button
                    onClick={(e) => handlerDeleteImage(e)}
                    className="absolute right-0 text-[#fff] bg-rose-500 rounded-[10px_0_10px_10px] hover:rounded-[50%] hover:w-[25px] w-[20px] border-0"
                  >
                    x
                  </button>
                </div>
              ) : null}
            </div>

            <div className="relative flex m-2 flex-col justify-center items-start gap-4">
              <h1 className="font-bold text-base text-gray-900 py-[5px] text-[32px] text-black truncate w-[90%]">
                Nombre:{form.name}
              </h1>
              <h4 className="font-bold text-base text-black">
                Precio: {form.price}
              </h4>
              <h4 className="font-bold text-base text-black">
                Costo: {form.cost}
              </h4>
              <h4 className="font-bold text-base text-black">
                Proveedor: {form.supplier}
              </h4>
              <span className="font-bold text-base text-black truncate w-[200px]">
                Descripcion: {form.description}
              </span>
              <div className="flex flex-wrap flex-col font-bold text-base text-black  ">
                Categoria/s:
                {form.category}
              </div>
              <div className="flex flex-wrap flex-col font-bold text-base text-black">
                Subcategoria/s:
                {form.subcategory}
                <button className="text-[#fff] bg-rose-500 rounded-[20px] w-[20px] border-0"></button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default FormCreateProduct;
