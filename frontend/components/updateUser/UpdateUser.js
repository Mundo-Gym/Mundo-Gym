import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./UpdateUser.module.css";
import axios from "axios";

export default function UpdateUser() {
  const dispatch = useDispatch();
  const inUser = useSelector((s) => s.user.value);
  const [dataUser, setDataUser] = useState(inUser);

  const handlerInput = (e) => {
    e.preventDefault();
    console.log(dataUser);
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault;
    localStorage.setItem("sessionActive", JSON.stringify(dataUser));
    axios.put("https://api-mundo-gym.onrender.com/auth/update", dataUser);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="ml-[25%] mt-0 flex flex-col w-[400px] h-[550px] shadow-[4px_4px_15px_rgba(0,0,0,0.5)] rounded-[20px] p-[10px]"
    >
      <label className={s.label}>Nombre:</label>
      <div className={s.container}>
        <input
          onChange={handlerInput}
          name="name"
          className="outline-none"
          placeholder={inUser.name || "campo requerido"}
          type="text"
        />
      </div>
      <label className={s.label}>Apellido:</label>
      <div className={s.container}>
        <input
          onChange={handlerInput}
          name="lastname"
          className="outline-none"
          placeholder={inUser.lastname || "campo requerido"}
          type="text"
        />
      </div>
      <label className={s.label}>Correo:</label>
      <div className={s.container}>
        <input
          onChange={handlerInput}
          name="email"
          className="outline-none"
          placeholder={inUser.email || "campo requerido"}
          type="text"
        />
      </div>
      <label className={s.label}>Nombre de Usuario:</label>
      <div className={s.container}>
        <input
          onChange={handlerInput}
          name="username"
          className="outline-none"
          placeholder={inUser.username || "campo requerido"}
          type="text"
        />
      </div>
      <label className={s.label}>Genero:</label>
      <div className={s.container}>
        <input
          onChange={handlerInput}
          name="gender"
          className="outline-none"
          placeholder={inUser.gender || "campo requerido"}
          type="text"
        />
      </div>
      <label className={s.label}>DNI:</label>
      <div className={s.container}>
        <input
          onChange={handlerInput}
          name="dni"
          className="outline-none"
          placeholder={inUser.dni || "campo requerido"}
          type="text"
        />
      </div>
      <button className={s.button} type="submit">
        ACTUALIZAR
      </button>
    </form>
  );
}
