const mercadopago = require("mercadopago");
const { ACCESS_TOKEN } = process.env;
const { Compra, Products, CompraProduct } = require("../db");

const createOrder = async (req, res) => {
  //ME LO MANDAN POR BODY, PUEDE SER QUE COMPRE UN PRODUCTO O MAS
  const items = req.body;
  //console.log(items)
  //console.log('----->',items.items[0])
  //console.log('----->',items.inSession.dni)

  if (!items.items) {
    return res
      .status(400)
      .json({ error: "El objeto de productos es inválido" });
  }

  mercadopago.configure({
    access_token: ACCESS_TOKEN,
  });

  try {
    const result = await mercadopago.preferences.create({
      items: items.items,
      //  notification_url: "https://09dd-2803-9800-ba00-805c-a448-89f8-855d-cd53.sa.ngrok.io/app/webhook",
      back_urls: {
        success: `http://localhost:3000/success`,
        // pending: "https://e720-190-237-16-208.sa.ngrok.io/pending",
        // failure: "https://e720-190-237-16-208.sa.ngrok.io/failure",
      },
    });
    res.json(result.body.init_point);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

const successOrder = async (req, res) => {
  const { items, userId, total } = req.body;

  try {
    const purchase = await Compra.create({
      userId,
      total,
    });

    for (const item of items) {
      const product = await Products.findByPk(item.id);

      if (!product) {
        // Manejar el caso en el que el producto no se encuentre en la base de datos
        return res
          .status(404)
          .json({ error: `Producto no encontrado: ${item.id}` });
      }

      const updatedStock = product.stock - item.quantity;

      if (updatedStock < 0) {
        // Manejar el caso en el que el stock disponible sea insuficiente
        return res.status(400).json({
          error: `Stock insuficiente para el producto: ${product.id}`,
        });
      }

      await product.update({ stock: updatedStock });

      await CompraProduct.create({
        CompraId: purchase.id,
        productId: product.id,
        quantity: item.quantity,
        amount: product.price,
      });
      // Otros detalles relevantes del producto comprado
    }

    res.status(200).json({ message: "Compra realizada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al procesar la compra" });
  }
};

const pendingOrder = (req, res) => {
  res.send("pending");
};
const failureOrder = (req, res) => {
  res.send("failure");
};

const webhookOrder = async (req, res) => {
  const payment = req.query;

  try {
    if (payment.type == "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log("------>>>>", data);
      //se puede guardar en la base de datos
    }
    res.status(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  successOrder,
  webhookOrder,
  pendingOrder,
  failureOrder,
};

// const mercadopago = require("mercadopago");
// const { ACCESS_TOKEN } = process.env;

// const createOrder = async (req, res) => {
//   const items = req.body;
//   console.log(items);
//   mercadopago.configure({
//     access_token: ACCESS_TOKEN,
//   });
//   let id = 0;
//   if (req.body.id) {
//     id = req.body.id;
//   }

//   let preference = {
//     back_urls: {
//       success: "https://frontend-1doq.onrender.com/app/success",
//       items: [
//         {
//           title: "Mi producto",
//           unit_price: 100,
//           quantity: 1,
//           current_id: "ARS",
//         },
//       ],
//     },

//     notification_url: `https://frontend-1doq.onrender.com//app/`,
//   };

//   mercadopago.preferences
//     .create(preference)
//     .then(function (response) {
//       console.log(response.body.init_point);

//       // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

// const successOrder = (req, res) => {
//   res.send("compra exitosa");
//   // res.redirect("http://localhost:3001/home");
// };

// const notificarOrder = async (req, res) => {
//   console.log("notificar");
//   const { query } = req;
//   const topic = query.topic;
//   console.log({ topic });
//   var merchantOrder;

//   switch (topic) {
//     case "payment":
//       const paymentId = query.id || query["data.id"];
//       console.log(topic, "generar pago", paymentId);

//       const payment = await mercadopago.payment.findById(paymentId);

//       console.log(topic, "generar order");

//       var { body } = await mercadopago.merchant_orders.findById(
//         payment.body.order.id
//       );

//       break;

//     case "merchant_order":
//       const orderId = query.id;

//       console.log(topic, "traer order", orderId);
//       var { body } = await mercadopago.merchant_orders.findById(orderId);

//       break;
//   }
//   console.log(body.payment);

//   let paidAmount = 0;

//   merchantOrder.body.payment.forEach((payment) => {
//     if (payment.status === "approved") {
//       paidAmount += payment.transaction_amount;
//     }
//   });

//   if (paidAmount >= body.total_amount) {
//     console.log("pago exitoso");
//   } else {
//     console.log("no se pudo realizar el pago");
//   }
//   res.send();
// };

// module.exports = {
//   successOrder,
//   notificarOrder,
//   createOrder,
// };
