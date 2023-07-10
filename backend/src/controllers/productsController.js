const { Products, Category, Subcategory, Review } = require("../db");
const { Op } = require("sequelize");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const updateProducts = async (id, newProduct) => {
  try {
    // Busca el producto existente en la base de datos
    const existingProduct = await Products.findByPk(id);

    if (!existingProduct) {
      throw new Error("No se encontró el producto");
    }
    //Sequelize actualizará automáticamente las propiedades del registro en la base de datos de acuerdo con los valores proporcionados en newProduct.
    await existingProduct.update(newProduct);

    return "Producto actualizado";
  } catch (error) {
    console.error("Error al actualizar el producto:", error); // Registra el error en la consola

    return {
      error: "Ocurrió un error al actualizar el producto",
    };
  }
};

const createProducts = async (req, res) => {
  // Buscar la categoría por su nombre en la base de datos
  let imgProduct = req.files.image;
  let result = {};

  try {
    const extension = imgProduct.mimetype.split("/")[1];

    const validExtensions = ["png", "jpg", "jpeg"];

    if (!validExtensions.includes(extension)) {
      return res.status(400).send("Not valid file extension");
    }

    const uploaded = await cloudinary.v2.uploader.upload(
      imgProduct.tempFilePath
    );

    const { secure_url } = uploaded;

    const existingCategory = await Category.findOne({
      where: { name: req.body.category },
    });

    if (!existingCategory) {
      // La categoría no existe, puedes manejar este caso de error según tus necesidades
      throw new Error(`Category ${req.body.category} not found.`);
    }

    const createdProduct = await Products.create({
      name: req.body.name,
      price: req.body.price,
      cost: req.body.cost,
      stock: req.body.stock,
      image: secure_url,
      description: req.body.description,
      visible: true,
      categoryId: existingCategory.id,
    });

    if (req.body.subcategory) {
      // Buscar la subcategoría por su nombre en la base de datos
      const existingSubcategory = await Subcategory.findOne({
        where: {
          name: {
            [Op.eq]: req.body.subcategory,
          },
        },
      });

      if (existingSubcategory) {
        createdProduct.addSubcategory(existingSubcategory);
      } else {
        throw new Error(`Subcategory ${req.body.subcategory} not found.`);
      }
    }

    result = createProducts;
  } catch (error) {
    console.log(error);
  }
  return result;
  //return createdProduct;
};

const deleteProducts = async (id) => {
  await Products.destroy({ where: { id } });
};

const getAllProducts = async () => {
  return await Products.findAll({
    include: [
      {
        model: Category,
        attributes: ["name"],
      },
      {
        model: Subcategory,
        attributes: ["name"],
      },
    ],
  });
};

const getProductsId = async (id) => {
  return await Products.findOne({
    where: { id: id },
    include: [
      {
        model: Category,
        attributes: ["name"],
      },
      {
        model: Subcategory,
        attributes: ["name"],
      },
      {
        model: Review,
        attributes: ["review", "calification"],
      }
    ],
  });
};


const disabledProducts = async (id) => {
  let result={}
  let dtaProduct = await Products.findOne({
    where: { id: id },
  });
  if (dtaProduct) {
    let visible = dtaProduct.dataValues.visible;
    if (visible) {
      visible=false;
    }else{
      visible=true;
    }
    let newProduct = await Products.update({visible:visible},{
      where: {
        id:{
          [Op.eq] : id
        }
      }
    });

    result.data = newProduct;
    return true
  }else{
    return result.error={message:"Producto no encontrado"};
  }
};



module.exports = {
  getAllProducts,
  getProductsId,
  createProducts,
  deleteProducts,
  updateProducts,
  disabledProducts
};
