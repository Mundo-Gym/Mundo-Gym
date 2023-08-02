import axios from "axios";
import { useState } from "react";
import s from "./UpdatePassword.module.css";

const UpdatePassword = ({ token }) => {
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
    confPass: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handlePassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://api-mundo-gym.onrender.com/auth/changepass/${token}`,
        formData
      );

      const { data } = response;
      console.log(data);

      if (data.error) {
        localStorage.setItem("sessionActive", JSON.stringify(data));
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
        <label className={s.label}>Nueva contraseña:</label>
        <input
          className={s.input}
          type="password"
          name="pass"
          value={formData.pass}
          onChange={handleChange}
        />
        <label className={s.label}>Confirmar contraseña:</label>
        <input
          className={s.input}
          type="password"
          name="confPass"
          value={formData.confPass}
          onChange={handleChange}
        />
        <button className={s.button} type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
