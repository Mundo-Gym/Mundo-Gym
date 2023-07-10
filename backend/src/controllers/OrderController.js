const axios = require("axios");
const { Users, Products } = require("../db");

//-------------------------------------------------------------------------AUXILIARES--------------------------

// Funcion auxiliar que me trae los productos
const allProducts = async () => {
  let all = await Products.findAll();
  return all;
};

//---------------------------------------------------------------------ORDENAMIENTO PRECIO-----------------------------

// Ordena un array de objetos segun la propiedad price

const getPriceMayorMenor = async () => {
  let all = await allProducts();
  let arrayProducts = all.sort((a, b) => b.price - a.price);
  return arrayProducts;
};

const getPriceMenorMayor = async () => {
  let all = await allProducts();
  let arrayProducts = all.sort((a, b) => a.price - b.price);
  return arrayProducts;
};

//---------------------------------------------------------------------ORDENAMIENTO ALFABETICAMENTE-------------------

const getAlphabeticZA = async () => {
  let all = await allProducts();
  let az = all.sort((a, b) => b.name.localeCompare(a.name));
  return az;
};
const getAlphabeticAZ = async () => {
  let all = await allProducts();
  let za = all.sort((a, b) => a.name.localeCompare(b.name));
  return za;
};
//----------------------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------VAN AL HANDLER---------------------------------------------------------------

// Funcion que depende el value "AZ" O "ZA" llama a una funcion u a otra
// Agrupa las dos funciones de ordenamiento alfabeticamente

const getAlphabetic = async (value) => {
  if (value === "AZ") {
    let a = await getAlphabeticAZ();
    return a;
  } else {
    let b = await getAlphabeticZA();
    return b;
  }
};

// Funcion que depende el value "Mm" O "mM" llama a una funcion u a otra
const getPrice = async (value) => {
  if (value === "Mm") {
    let a = await getPriceMayorMenor();
    return a;
  } else {
    let a = await getPriceMenorMayor();
    return a;
  }
};

module.exports = {
  getAlphabetic,
  getPrice,
};
