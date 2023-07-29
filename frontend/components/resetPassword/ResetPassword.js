import axios from "axios";
import { useState } from "react";
import s from "./ResetPassword.module.css";

const ResetPassword = ({ email }) => {
  const [formData, setFormData] = useState({
    email: email,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api-mundo-gym.onrender.com/reset",
        formData
      );
      console.log(formData);
      const { data } = response;
      if (data.error) {
        setErrorMessage(data.error.message);
      } else {
        window.location.href = "/login";
      }
    } catch (error) {
      console.log(error);
      window.location.href = "/login";
    }
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Recuperar contraseña</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form className={s.form} onSubmit={handleSubmit}>
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
};

export default ResetPassword;
