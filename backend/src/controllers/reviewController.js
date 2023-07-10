const { Review, Products, Users } = require("../db");
const { Op } = require("sequelize");

const newReview = async (req, res) => {
  try {
    const productId = req.params.id;
    const { userId, review, calification } = req.body;

    const product = await Products.findByPk(productId);
    const user = await Users.findByPk(userId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newReview = await Review.create({
      review: review,
      calification: calification,
    });

    await newReview.setUser(user);
    await newReview.setProduct(product);

    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const getReview = async (req, res) => {

// };

module.exports = {
  newReview
};

//       review: review,
//       calification: calification,
//       userId: userId,
//       productId: productId,
//     });
//     res.status(201).json(newReview);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error al crear el review" });
//   }
// };
