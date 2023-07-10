const mercadopago = require("mercadopago");
const { ACCESS_TOKEN } = process.env;

let preference = {
  items: [
    {
      title: "Mi producto",
      unit_price: 100,
      quantity: 1,
    },
  ],
};

mercadopago.preferences
  .create(preference)
  .then(function (response) {
    console.log(response);
    // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
  })
  .catch(function (error) {
    console.log(error);
  });
