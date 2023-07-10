import Layout from "../layout/layout";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/form.module.css";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        formData
      );

      console.log(response.data);
      const data = response.data;

      if (data.name) {
        localStorage.setItem("sessionActive", JSON.stringify(data));
        window.location.href = "/home";
      } else {
        Swal.fire({
          position: "top",
          icon: "warning",
          title: "Credenciales incorrectas",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", {
      callbackUrl: "/home",
    });
  };

  return (
    <Layout>
      <Head>
        <title>Iniciar Sesión</title>
      </Head>
      <section className="mx-auto flex flex-col gap-50">
        <div className="title">
          <Image
            src={"/assets/Icon.png"}
            width="210"
            height={40}
            className="mx-auto my-auto"
            alt=""
            style={{ marginTop: "-40px", padding: "15px" }}
          />

          <p
            className="w-3/5 mx-auto text-gray-400"
            style={{ marginBottom: "10px" }}
          >
            Productos de calidad
          </p>
        </div>

        {/* form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className={`${styles.inputGroup}`}>
            <input
              type="email"
              name="email"
              placeholder="Correo"
              className={styles.inputText}
              onChange={handleChange}
              value={formData.email}
            />
            <span className={`${styles.icon} flex-items-center px-5`}>
              <HiAtSymbol size={25} />
            </span>
          </div>

          <div className={`${styles.inputGroup}`}>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className={styles.inputText}
              onChange={handleChange}
              value={formData.password}
            />
            <span className={`${styles.icon} flex-items-center px-6`}>
              <HiFingerPrint size={25} />
            </span>
          </div>

          {/* login buttons */}
          <div className="input-button">
            <button
              type="submit"
              className={styles.button}
              disabled={Object.values(formData).some(
                (value) => value.trim() === ""
              )}
            >
              Acceder
            </button>
          </div>

          <div className="input-button">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className={styles.button_custom}
            >
              Acceder con Google{" "}
              <Image src={"/assets/google.svg"} width="20" height={20} />
            </button>
          </div>
        </form>

        {/* button */}
        <p className="text-center text-gray-400 mt-3">
          ¿Aún no tienes cuenta?{" "}
          <Link href="/register" passHref>
            <span className="text-blue-700">Inscribirse</span>
          </Link>
        </p>

        <p className="text-center text-gray-400 mt-2">
          <Link href="/reset" passHref>
            <span className="text-blue-700">¿Has olvidado la contraseña?</span>
          </Link>
        </p>
      </section>
    </Layout>
  );
}
