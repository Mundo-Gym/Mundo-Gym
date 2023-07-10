const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const { Users, Person_data } = require("../db");
require("dotenv").config();
const crypto = require("crypto");

const { EMAIL, PASSWORD } = process.env;

const sendEmail = async (email, subject, htmlContent) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });

    const message = {
      from: EMAIL,
      to: email,
      subject,
      html: htmlContent,
    };

    await transporter.sendMail(message);
  } catch (error) {
    throw new Error(error.message);
  }
};

const signup = async (req, res) => {
  try {
    const { email, name } = req.body;

    const htmlContent = `
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .greeting {
          font-size: 24px;
          margin-bottom: 10px;
        }
        .message {
          margin-bottom: 20px;
          font-size: 16px;
          line-height: 1.5;
          color: #333333;
        }
        .signature {
          font-style: italic;
          margin-top: 40px;
          text-align: right;
          color: #666666;
        }
        .logo {
          text-align: center;
          margin-bottom: 20px;
        }
        .logo img {
          width: 150px;
        }
        .cta {
          text-align: center;
          margin-top: 30px;
        }
        .cta a {
          display: inline-block;
          padding: 10px 20px;
          background-color: #ff6600;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
      
        </div>
        <p class="greeting">¡Hola ${name}!</p>
        <p class="message">Te has registrado exitosamente en Mundo Gym.</p>
        <p class="message">Gracias por preferirnos.</p>
        <div class="cta">
      
        </div>
        <p class="signature">Equipo de Mundo Gym</p>
      </div>
    </body>
    </html>
  `;

    await sendEmail(email, "Registro exitoso", htmlContent);

    return res.status(201).json({
      msg: "Deberías recibir un correo electrónico",
    });
  } catch (error) {}
};

const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Verificar si el usuario existe en la base de datos
    const user = await Users.findOne({
      include: [
        {
          model: Person_data,
          where: {
            email: email,
          },
        },
      ],
    });

    if (user) {
      // Generar un token de restablecimiento de contraseña
      const token = crypto.randomBytes(20).toString("hex");

      // Guardar el token en la base de datos asociado al usuario correspondiente
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000;

      await user.save();

      // Crear el enlace para restablecer la contraseña con el token
      const resetLink = `https://frontend-1doq.onrender.com/changepass/${token}`;

      const mailGenerator = new Mailgen({
        theme: "default",
        product: {
          name: "Mundo Gym",
          link: "http://www.mundogym.com",
          logo: "https://example.com/logo.png",
        },
      });

      const emailContent = {
        body: {
          name: user.person_datum.name,
          intro: "Has solicitado restablecer tu contraseña.",
          outro:
            "Haz clic en el siguiente enlace para restablecer tu contraseña:",
          action: {
            instructions: "Restablecer contraseña",
            button: {
              color: "#007bff",
              text: "Restablecer contraseña",
              link: resetLink,
            },
          },
        },
      };

      const emailTemplate = mailGenerator.generate(emailContent);

      await sendEmail(
        user.person_datum.email,
        "Restablecimiento de contraseña",
        emailTemplate
      );

      return {
        msg: "Se ha enviado un correo electrónico para restablecer la contraseña",
      };
    } else {
      throw new Error("El usuario no está registrado");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const facture = async (req, res) => {
  try {
    const { userEmail } = req.body;

    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Mundo Gym",
        link: "http://www.mundogym.com",
        logo: "https://example.com/logo.png",
      },
    });

    const emailContent = {
      body: {
        name: "Kevin",
        intro: "¡Tu factura ha llegado!",
        table: {
          data: [
            {
              item: "Kit Boxeo",
              description:
                "Bolsa Boxeo Kickboxing Lona 90cm + Guantines + Soga",
              price: "$5000",
            },
          ],
        },
        outro: "Gracias por preferirnos",
      },
    };

    const emailTemplate = mailGenerator.generate(emailContent);

    await sendEmail(userEmail, "Factura", emailTemplate);

    return res.status(201).json({
      msg: "Deberías recibir un correo electrónico",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signup,
  resetPassword,
  facture,
};
