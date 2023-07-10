import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";
import styles from "../styles/form.module.css";
import Image from "next/image";
import Swal from "sweetalert2";
import {
  HiAtSymbol,
  HiFingerPrint,
  HiUser,
  HiOutlineIdentification,
} from "react-icons/hi";
import { useState } from "react";
import { useRouter } from "next/router";
import validateField from "../lib/validation/validationForms";
import axios from "axios";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/register",
        formData
      );
      console.log(formData);
      const { data } = response;
      if (data.error) {
        // window.location.href = "/login";
        setErrorMessage(data.error.message);
      } else {
        await axios
          .post("http://localhost:3001/users/signup", formData)
          .then(router.push("/login"));
      }
    } catch (error) {
      console.log(error);
      window.location.href = "/login";
    }
  };

  // .then(router.push("/login"));
  // .then(
  //   Swal.fire({
  //     position: "top",
  //     icon: "success",
  //     title: "Usuario registrado con exito",
  //     showConfirmButton: false,
  //     timer: 2000,
  //   })
  // );
  //router.push("/login");
  //   }
  // } catch (error) {
  //   console.log(error);
  // setErrorMessage("Error al registrar el usuario");
  // Swal.fire({
  //   position: "top",
  //   icon: "error",
  //   title: "Error!!",
  //   showConfirmButton: false,
  //   timer: 2000,
  // });
  //   }
  // };

  const [errors, setErrors] = useState({});

  const handleValidation = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  return (
    <Layout>
      <Head>
        <title>Registrarse</title>
      </Head>

      <section className="mx-auto flex flex-col gap-50 ">
        <div className="title">
          <Image
            src={"/assets/Icon.png"}
            width="230"
            height={40}
            className="mx-auto my-auto"
            alt="Icon.png"
            style={{ marginTop: "-30px", padding: "15px" }}
          />
        </div>

        {/* form */}

        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
          <div
            className={`${styles.inputGroup}  ${
              errors.name ? "border-rose-600" : ""
            }`}
          >
            {" "}
            <input
              style={{ outline: "none" }}
              className="w-full pl-2 border-none bg-transparent"
              type="text"
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleValidation}
              required
            />
            <span className={`${styles.icon} flex-items-center px-4`}>
              <HiOutlineIdentification size={25} />
            </span>
            <div className="text-red-600 absolute z-50 translate-y-10 w-full max-w-[450px]">
              {errors && errors.name && <p name="error">{errors.name}</p>}
            </div>
          </div>
          <div
            className={`${styles.inputGroup} ${
              errors.lastname ? "border-rose-600" : ""
            }`}
          >
            <input
              style={{ outline: "none" }}
              className="w-full pl-2 border-none bg-transparent"
              type="text"
              name="lastname"
              placeholder="Apellido"
              value={formData.lastname}
              onChange={handleChange}
              onBlur={handleValidation}
              required
            />

            <span className={`${styles.icon} flex-items-center px-4`}>
              <HiOutlineIdentification size={25} />
            </span>

            <div className="text-red-600 absolute z-50 translate-y-10 w-full max-w-[450px]">
              {errors && errors.lastname && (
                <p name="error">{errors.lastname}</p>
              )}
            </div>
          </div>
          <div
            className={`${styles.inputGroup} ${
              errors.username ? "border-rose-600" : ""
            }`}
          >
            <input
              style={{ outline: "none" }}
              className="w-full pl-2 border-none bg-transparent"
              type="text"
              name="username"
              placeholder="Nombre de usuario"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleValidation}
              required
            />
            <span className={`${styles.icon} flex-items-center px-4`}>
              <HiUser size={25} />
            </span>
            <div className="text-red-600 absolute z-50 translate-y-10 w-full max-w-[450px]">
              {errors && errors.username && (
                <p name="error">{errors.username}</p>
              )}
            </div>
          </div>

          <div
            className={`${styles.inputGroup} ${
              errors.email ? "border-rose-600" : ""
            }`}
          >
            <input
              style={{ outline: "none" }}
              className="w-full pl-2 border-none bg-transparent"
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleValidation}
              required
            />

            <span className={`${styles.icon} flex-items-center px-4`}>
              <HiAtSymbol size={25} />
            </span>
            <div className="text-red-600 absolute z-50 translate-y-10 w-full max-w-[450px]">
              {errors && errors.email && <p name="error">{errors.email}</p>}
            </div>
          </div>
          <div
            className={`${styles.inputGroup} ${
              errors.password ? "border-rose-600" : ""
            }`}
          >
            <input
              style={{ outline: "none" }}
              className="w-full pl-2 border-none bg-transparent"
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleValidation}
              required
            />

            <span className={`${styles.icon} flex-items-center px-4`}>
              <HiFingerPrint size={25} />
            </span>
            <div className="text-red-600 absolute z-50 translate-y-10 w-full max-w-[450px]">
              {errors && errors.password && (
                <p className="text-red-600" name="error">
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          {/* login buttons */}
          <div className="input-button mt-8">
            <button type="submit" className={styles.button}>
              Inscribirse
            </button>
          </div>
        </form>

        {/* button */}
        <p className="text-center text-gray-400 mt-5">
          Ya tienes una cuenta?
          <Link href={"/login"}>
            <span className="text-blue-700"> Inicia sesión</span>
          </Link>
        </p>
      </section>
    </Layout>
  );
};

export default Register;
