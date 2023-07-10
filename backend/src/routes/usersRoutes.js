const { Router } = require("express");
const router = Router();
const {
  registerUserHandler,
  loginUserHandler,
  getUserHandler,
  updateUserHandler,
  //disabledUser,
  changePassHandler,
  changePassTokenHandler,
  deleteFavoriteHandler,
  productFavoriteHandler,
  getFavoriteHandler,
  deleteUsersHandler,
} = require("../handlers/UsersHandler");
const { Users, Compra, Products, CompraProduct } = require("../db");

router.post("/login", loginUserHandler);
router.post("/register", registerUserHandler);

router.get("/users", getUserHandler);
router.delete("/:id", deleteUsersHandler);
router.put("/update", updateUserHandler);
//router.put("/admin/disabledUser", disabledUser);

router.delete("/deleteFavorite", deleteFavoriteHandler);
router.post("/changepass/:token", changePassHandler);
router.post("/changepassToken", changePassTokenHandler);
router.post("/addfavorite", productFavoriteHandler);
router.post("/getfavorite", getFavoriteHandler);

router.get('/users/:userId/compras', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Buscar el usuario por su ID
    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Obtener las compras del usuario con los detalles de los productos
    const compras = await Compra.findAll({
      where: { userId },
      include: [
        {
          model: Products,
          through: { model: CompraProduct },
        },
      ],
    });

    res.json(compras);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las compras del usuario' });
  }
});

router.get('/compras', async (req, res) => {
  try {
    // Obtener todas las compras con los detalles de los productos
    const compras = await Compra.findAll({
      include: [
        {
          model: Users,
          attributes: ['username'],
        },
        {
          model: Products,
          through: { model: CompraProduct },
        },
      ],
    });

    res.json(compras);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las compras de los usuarios' });
  }
});



module.exports = router;
