const { resetPassword } = require("../controllers/notificationController");

const resetPasswordHandler = async (req, res, next) => {
  try {
    const result = await resetPassword(req, res);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error(error); // Imprime el mensaje de error completo en la consola
    res.status(500).json({ error: { message: "Error al enviar el correo" } });
  }
};

module.exports = { resetPasswordHandler };
