import React, { useState } from "react";
import s from "../components/updatePassword/UpdatePassword.module.css";
import axios from "axios";

export default function reset() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handlePassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/reset",
        formData
      );

      const { data } = response;

      if (data.error) {
        setErrorMessage(data.error.message);
      }
    } catch (error) {
      console.log(error);
    }
    window.location.href = "/home";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Cambiar contraseña</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form className={s.form} onSubmit={handlePassword}>
        <label className={s.label}>E-mail:</label>
        <input
          className={s.input}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <button className={s.button} type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}
