export default function validateField(name, value) {
  if (name === "username" || name === "name" || name === "lastname") {
    if (value.trim() === "") {
      return "Campo requerido";
    }
  }

  if (name === "email") {
    if (value.trim() === "") {
      return "Campo requerido";
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      return "Email inválido";
    }
  }
  if (name === "password") {
    if (value.trim() === "") {
      return "Campo requerido";
    } else {
      var regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/;
      if (!regex.test(value)) {
        return "Una mayuscula,un numero y un caracter especial.";
      }
    }
  }
}
