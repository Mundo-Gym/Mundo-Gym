const { Router } = require("express");

const {
  addCategoryHandler,
  deleteCategoryHandler,
  getAllCategoryHandler,
} = require("../handlers/CategoryHandler");

const router = Router();

/**
 * @swagger
 * "/category/":
 *  "get":
 *      "summary": Obtener todas las categorias
 *      "description": usa esta peticion para obtener todas las categorias
 *      "produces":
 *        - application/json
 *      "responses":
 *        "200":
 *           "description": "categorias"
 *           "schema":
 *           "type": "json"
 */
router.get("/", getAllCategoryHandler);
/**
 * @swagger
 * "/category/":
 *  "post":
 *      "summary": Crear una nueva categoria
 *      "description": Usa este enpoint para crear una nueva categorias
 *      "parameters":
 *        - "in": body
 *          "name": name
 *          "description": nombre de la categorias
 *        - "in": body
 *          "name": description
 *          "description": descripcion de la categorias
 *        - "in": body
 *          "name": active
 *          "description": boolean para indicar si la categoria esta activa o no
 *      "produces":
 *        - application/json
 *      "responses":
 *        "200":
 *           "description": "categorias"
 *           "schema":
 *           "type": "json"
 *
 */
router.post("/", addCategoryHandler);
/**
 * @swagger
 * "/category/":
 *  "delete":
 *      "summary": Eliminar categorias
 *      "description": usa esta peticion para eliminar categorias
 *      "produces":
 *        - application/json
 *      "parameters":
 *        - "in": body
 *          "name": name
 *          "description": nombre de la categorias
 *      "responses":
 *        "200":
 *           "description": "categorias"
 *           "schema":
 *           "type": "json"
 */
router.delete("/:id", deleteCategoryHandler);

module.exports = router;
