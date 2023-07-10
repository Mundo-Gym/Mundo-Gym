export default async function handler(res, req) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed" }));

  //users aceptados
  if (req.method === "POST") {
    if (!req.body)
      return res.status(404).json({ error: "Dont have from data" });
    const { username, email, password } = req.body;

    // verificar users duplicados

    const checkexisting = await Users.findOne({ email });

    //Verificar Password

    Users.create(
      { username, email, password: await hash(password, 12) },
      function (err, data) {
        if (err) return res.status(404).json({ err });
        res.status(201).json({ status: true, user: data });
      }
    );

    if (checkexisting) {
      return res.status(422).json({ message: "El usuario ya existe" });
    }
  } else {
    res.status(500).json({ message: "Http method not valid " });
  }
}
