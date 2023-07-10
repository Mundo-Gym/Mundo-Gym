const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  // Verificar si el usuario existe en la base de datos
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    const secretKey = "mZ1IWqsOvcTD31fPsDLig8TZ7v8nkTTB";

    const token = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } else {
    res.status(401).send("Credenciales incorrectas");
  }
};

module.exports = {
  loginHandler,
};
