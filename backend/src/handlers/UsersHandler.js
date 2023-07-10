const { Users } = require("../db");
const {
  create,
  findOne,
  //disableUser,
  getAll,
  deleteUser,
  update,
  changePass,
  changePassToken,
  productFavorite,
  deleteFavorite,
  getFavorite,
} = require("../controllers/UsersController");

const registerUserHandler = async (req, res) => {
  try {
    const { name, lastname, username, email, password } = req.body;

    // Verificar si el nombre de usuario ya existe en la base de datos
    const existingUser = await Users.findOne({ where: { username } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: { message: "El nombre de usuario ya está en uso." } });
    }

    // Crear el usuario si el nombre de usuario es único
    const createdUser = await create({
      name,
      lastname,
      username,
      email,
      password,
    });

    return res.status(201).json(createdUser);
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    return res
      .status(500)
      .json({ error: { message: "Error al registrar el usuario." } });
  }
};

const loginUserHandler = async (req, res) => {
  if (req.body.email && req.body.password) {
    let DataUser = await findOne(req.body);
    res.status(200).json(DataUser);
  } else {
    res.status(400).json({ error: { message: "Usuario incorrecto" } });
  }
};

const getUserHandler = async (req, res) => {
  try {
    // if (req.body.name || (req.body.email && req.body.password)) {
    let allUser = await getAll(req.body);
    res.status(200).json(allUser);
    // }
  } catch (error) {
    res.status(400).json({ error: { message: "no hay una monda" } });
  }
};

const updateUserHandler = async (req, res) => {
  try {
    if (req.body.email && req.body.username) {
      const updateUsers = await update(req.body);
      return res.status(200).json(updateUsers);
    }
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// exports.disabledUser = async (req, res) => {
//   if (req.body.id) {
//     let DataUser = await disableUser(req.body);
//     res.status(200).json(DataUser);
//   } else {
//     res.status(400).json({ error: { message: "Faltan campos" } });
//   }
// };

const changePassHandler = async (req, res) => {
  const token = req.params.token; // Obtener el token de la URL

  // Verificar el token y validar los campos requeridos
  if (token && req.body.email && req.body.pass && req.body.confPass) {
    try {
      const result = await changePass(req.body);
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      console.error(error); // Imprime el mensaje de error completo en la consola
      res
        .status(500)
        .json({ error: { message: "Error al cambiar la contraseña" } });
    }
  } else {
    res
      .status(400)
      .json({ error: { message: "Faltan campos o token inválido" } });
  }
};

const changePassTokenHandler = async (req, res) => {
  if (req.body.token && req.body.pass && req.body.confPass) {
    try {
      const result = await changePassToken(req.body);
      res.status(200).json(result);
    } catch (error) {
      console.error(error); // Imprime el mensaje de error completo en la consola
      res
        .status(500)
        .json({ error: { message: "Error al cambiar la contraseña" } });
    }
  } else {
    res.status(400).json({ error: { message: "Faltan campos" } });
  }
};

const deleteUsersHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteUser({ id }); // Pasar el objeto { id }
    res.json(response);
  } catch (error) {
    res.status(500).send({ message: "Error al borrar el usuario" });
  }
};
const deleteFavoriteHandler = async (req, res) => {
  if (req.body.id) {
    let result = await deleteFavorite(req.body);
    res.status(200).json(result);
  } else {
    res.status(400).json({ error: { message: "Faltan campos" } });
  }
};
const productFavoriteHandler = async (req, res) => {
  if (req.body.idUser && req.body.idProduct) {
    let result = await productFavorite(req.body);
    res.status(200).json(result);
  } else {
    res.status(400).json({ error: { message: "Faltan campos" } });
  }
};

const getFavoriteHandler = async (req, res) => {
  if (req.body.idUser) {
    let result = await getFavorite(req.body);
    res.status(200).json(result);
  } else {
    res.status(400).json({ error: { message: "Faltan campos" } });
  }
};

module.exports = {
  registerUserHandler,
  loginUserHandler,
  getUserHandler,
  deleteUsersHandler,
  updateUserHandler,
  changePassHandler,
  changePassTokenHandler,
  deleteFavoriteHandler,
  productFavoriteHandler,
  getFavoriteHandler,
};
