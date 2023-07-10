const { Users, User_type, Person_data } = require("../db");
const { hash } = require("bcrypt");

exports.authGoogleHandler = async (req, res) => {
  if (req.method === "POST") {
    if (!req.body)
      return res.status(404).json({ error: "Dont have from data" });
    const { email, password } = req.body;

    // verificar users duplicados

    const checkexisting = await Users.findOne({ email });

    //Verificar Password

    Users.create(
      { email, password: await hash(password, 12) },
      function (err, data) {
        if (err) return res.status(404).json({ err });
        res.status(201).json({ status: true, user: data });
      }
    );

    if (checkexisting) {
      return res.status(422).json({ message: "El usuario ya existe" });
    }

    try {
      const hashedPassword = await hash(password, 12);
      const newUser = new Users({ email, password: hashedPassword });
      const savedUser = await newUser.save();

      res.status(201).json({ status: true, user: savedUser });
    } catch (error) {
      res.status(500).json({ error: "Error al crear el usuario" });
    }
  } else {
    res.status(405).json({ message: "Método HTTP no válido" });
  }
};
