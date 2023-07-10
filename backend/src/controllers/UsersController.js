const {
  Compra,
  Users,
  User_type,
  Person_data,
  Favorite_product,
  Products,
} = require("../db");
const { Op } = require("sequelize");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { signup } = require("../controllers/notificationController");
const secretKey = process.env.SECRETKEY;
const Sequelize = require("sequelize");

const create = async (data) => {
  try {
    let result;
    let dataPerson = null;
    let dataUserType = await User_type.findOne({
      where: {
        name: {
          [Op.eq]: "cliente",
        },
      },
    });
    if (dataUserType) {
      let verificarData = await Person_data.findOne({
        where: {
          email: {
            [Op.eq]: data.email,
          },
        },
      });
      if (verificarData) {
        dataPerson = verificarData;
      } else {
        dataPerson = await Person_data.create({
          name: data.name,
          lastname: data.lastname,
          email: data.email,
        });
      }
      if (dataPerson) {
        const md5 = crypto.createHash("md5");
        md5.update(data.password);
        let hashedPassword = md5.digest("hex");
        let UserData = await Users.create({
          password: hashedPassword,
          username: data.username,
          personDatumId: dataPerson.dataValues.id,
          userTypeId: dataUserType.dataValues.id,
          active: true,
        });
        if (UserData) {
          result = "Usuario registrado con éxito";
          await signup(data);
        } else {
          throw new Error("Error al intentar registrar el usuario");
        }
      } else {
        throw new Error("Error al intentar registrar el usuario");
      }
    } else {
      throw new Error("Tipo de usuario no disponible");
    }
    return result;
  } catch (error) {
    throw error;
  }
};

const findOne = async (data) => {
  let result = {};
  try {
    const md5 = crypto.createHash("md5");
    md5.update(data.password);
    let pass = md5.digest("hex");
    const user = await Users.findOne({
      include: [
        {
          model: Person_data,
          where: {
            email: {
              [Op.eq]: data.email,
            },
          },
        },
        {
          model: User_type,
        },
        {
          model: Compra,
        },
      ],
    });

    if (user !== null) {
      if (pass === user.dataValues.password) {
        let completarData = false;
        let dataPersona = user.dataValues.person_datum.dataValues;
        for (let element in dataPersona) {
          if (dataPersona[element] === null) {
            completarData = true;
          }
          if (element !== "id") {
            result[element] = dataPersona[element];
          }
        }

        const token = jwt.sign({ username: user.username }, secretKey, {
          expiresIn: "1h",
        });
        result.token = token;
        result.username = user.username;
        result.typeUser = user.dataValues.user_type.dataValues.name;
        result.completeData = completarData;

        result.id = user.id;
      } else {
        result.error = {
          message: "Contraseña incorrecta",
        };
      }
    } else {
      result.error = {
        message: "Usuario no registrado",
      };
    }
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (data) => {
  try {
    let result = {};

    // Buscar el usuario a eliminar por su ID
    const user = await Users.findOne({
      where: {
        id: {
          [Op.eq]: data.id,
        },
      },
    });

    if (user) {
      // Eliminar los datos personales del usuario
      const personData = await Person_data.findOne({
        where: {
          id: {
            [Op.eq]: user.personDatumId,
          },
        },
      });
      await personData.destroy();

      // Eliminar el usuario
      await user.destroy();

      result.message = "Usuario eliminado con éxito";
    } else {
      result.error = {
        message: "Usuario no encontrado",
      };
    }

    return result;
  } catch (error) {
    throw error;
  }
};
const update = async (data) => {
  const { email, name, username, lastname, gender, date_born, dni } = data;
  try {
    const user = await Users.findOne({
      include: [
        {
          model: Person_data,
          where: { email: { [Op.eq]: email } },
        },
        {
          model: User_type,
        },
      ],
    });

    const personalData = await Person_data.findOne({
      where: { email: { [Op.eq]: email } },
    });

    await personalData.update({
      dni,
      name,
      lastname,
      email,
      gender,
      date_born,
    });

    await user.update({ username });

    return { ...user.dataValues };
  } catch (error) {
    throw error;
  }
};
const getAll = async () => {
  return await Users.findAll({
    include: [
      {
        model: Person_data,
        attributes: ["email"],
      },
    ],
  });
};

const changePass = async (body) => {
  let result = {};

  const user = await Users.findOne({
    include: [
      {
        model: Person_data,
        where: { email: { [Op.eq]: body.email } },
      },
      {
        model: User_type,
      },
    ],
  });

  console.log(user);

  if (user.password) {
    if (body.pass == body.confPass) {
      const md5 = crypto.createHash("md5");
      md5.update(body.pass);
      let hashedPassword = md5.digest("hex");

      user.password = hashedPassword;
      user.save();

      return "Usuario actualizado con éxito";
    } else {
      result.error = {
        message: "las contraseña no coinciden",
      };
    }
  } else {
    result.error = {
      message: "Datos no encontrados",
    };
  }
  if (!result) {
    return console.log("no llega una monda");
  }
  return result;
};

const changePassToken = async (body) => {
  let result = {};
  let dataUser = await Users.findOne({
    where: {
      resetPasswordToken: {
        [Op.eq]: body.token,
      },
    },
  });
  if (dataUser) {
    if (body.pass == body.confPass) {
      const md5 = crypto.createHash("md5");
      md5.update(body.pass);
      let hashedPassword = md5.digest("hex");

      let DataUpdate = await Users.update(
        { password: hashedPassword },
        {
          where: {
            resetPasswordToken: {
              [Op.eq]: body.token,
            },
          },
        }
      );
      if (DataUpdate) {
        result.message = "Operacion realizada con exito";
      } else {
        result.error = {
          message: "Error al procesar su solicitud",
        };
      }
    } else {
      result.error = {
        message: "las contraseña no coinciden",
      };
    }
  } else {
    result.error = {
      message: "Datos no encontrados",
    };
  }
  return result;
};

const deleteFavorite = async (data) => {
  let result = {};
  if (data.id) {
    let DataFav = await Favorite_product.findOne({
      where: {
        id: {
          [Op.eq]: data.id,
        },
      },
    });
    if (DataFav) {
      let dltFav = await DataFav.destroy({
        where: {
          id: {
            [Op.eq]: data.id,
          },
        },
      });
      if (dltFav) {
        result.data = dltFav;
        result.message = "Datos eliminados con exito";
      } else {
        result.error = {
          message: "Error al realizar la operacion",
        };
      }
    } else {
      result.error = {
        message: "Datos no encontrados",
      };
    }
  }
  return result;
};

const getFavorite = async (data) => {
  let result = {};
  if (data.idUser) {
    let datafav = await Favorite_product.findAll({
      where: {
        userId: {
          [Op.eq]: data.idUser,
        },
      },
      include: {
        model: Products,
        where: {
          state: Sequelize.col("favorite_product.productId"),
        },
      },
    });
    if (datafav) {
      console.log(datafav);
      result.data = datafav;
      result.message = "Operacion realiza con exito";
    } else {
      result.error = {
        message: "Datos no encontrados",
      };
    }
  } else {
    result.error = {
      message: "Campos faltantes",
    };
  }
  return result;
};
const productFavorite = async (data) => {
  let result = {};
  if (data.idUser && data.idProduct) {
    let DataUser = await Users.findOne({
      where: {
        id: {
          [Op.eq]: data.idUser,
        },
      },
    });
    let DataProduct = await Products.findOne({
      where: {
        id: {
          [Op.eq]: data.idProduct,
        },
      },
    });

    if (DataUser) {
      if (DataProduct) {
        let newFavorito = await Favorite_product.create({
          userId: DataUser.dataValues.id,
          productId: DataProduct.dataValues.id,
        });
        if (newFavorito) {
          result.data = newFavorito;
          result.message = "Datos registrado con exito";
        }
      } else {
        result.error = {
          message: "Datos del producto no encontrados",
        };
      }
    } else {
      result.error = {
        message: "Datos del usuario no encontrados",
      };
    }
  } else {
    result.error = {
      message: "Faltan datos",
    };
  }
  return result;
};

module.exports = {
  create,
  findOne,
  update,
  getAll,
  deleteUser,
  changePass,
  changePassToken,
  deleteFavorite,
  getFavorite,
  productFavorite,
};
