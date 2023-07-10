import { useDispatch, useSelector } from "react-redux";
import {
  getOrderAlphabeticAZ,
  getOrderAlphabeticZA,
  getOrderPriceMm,
  getOrderPricemM,
  getOrderPriceCategorymM,
  getOrderPriceCategoryMm,
  getOrderCategoryAlphabeticAZ,
  getOrderSubCategoryAlphabeticAZ,
  getOrderSubCategoryAlphabeticZA,
  getOrderCategoryAlphabeticZA,
  getOrderNameAlphabeticAZ,
  getOrderNameAlphabeticZA,
  getOrderPriceNameMm,
  getOrderPriceNamemM,
} from "../../redux/actions/actionsOrder";
import { getCat } from "../../redux/actions/actionsCategories";
import { useEffect } from "react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { setFlag, clearFind } from "../../redux/features/productsSlice";
import {
  getProd,
  getProdsByCat,
  getProdsBySubCat,
} from "../../redux/actions/actionProduct";
import { getSubCats } from "../../redux/actions/actionsSubCats";
import SearchBar from "../searchBar/SearchBar";

export const Filters = () => {
  const subCategory = useSelector((s) => s.subCategories.value);
  const category = useSelector((s) => s.categories.value);
  const flag = useSelector((s) => s.products.flag);
  const categories = useSelector((s) => s.categories.value);
  const currency = categories.find((p) => p.name === flag);
  const subCurrency = flag && subCategory.find((p) => p.name === flag.slice(4));

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const router = useRouter();

  const dispatch = useDispatch();
  const orderAlphabetic = (e) => {
    if (e.target.value === "asc") {
      dispatch(getOrderAlphabeticAZ());
    } else {
      dispatch(getOrderAlphabeticZA());
    }
  };

  const orderPrice = (e) => {
    if (e.target.value === "Mm") {
      dispatch(getOrderPriceMm());
    } else {
      dispatch(getOrderPricemM());
    }
  };

  const orderCategoryAlphabetic = (e) => {
    if (e.target.value === "asc") {
      dispatch(getOrderCategoryAlphabeticAZ(currency.id));
    } else {
      dispatch(getOrderCategoryAlphabeticZA(currency.id));
    }
  };

  const orderPriceCategory = (e) => {
    if (e.target.value === "Mm") {
      dispatch(getOrderPriceCategoryMm(currency.id));
    } else {
      dispatch(getOrderPriceCategorymM(currency.id));
    }
  };

  const orderNameAlphabetic = (e) => {
    if (e.target.value === "asc") {
      dispatch(getOrderNameAlphabeticAZ(flag.slice(7)));
    } else {
      dispatch(getOrderNameAlphabeticZA(flag.slice(7)));
    }
  };
  const orderPriceName = (e) => {
    if (e.target.value === "Mm") {
      dispatch(getOrderPriceNameMm(flag.slice(7)));
    } else {
      dispatch(getOrderPriceNamemM(flag.slice(7)));
    }
  };

  const handlerFlag = (e) => {
    dispatch(setFlag(e.target.value));
    dispatch(getProdsByCat(e.target.value));
    dispatch(clearFind([]));
    setSelectedCategory(e.target.value);
    setSelectedSubCategory("");
  };
  const handlerSubFlag = (e) => {
    dispatch(setFlag(`sub/${e.target.value}`));
    dispatch(getProdsBySubCat(e.target.value));
    dispatch(clearFind([]));
    setSelectedSubCategory(e.target.value);
  };

  const getAllProducts = () => {
    setSelectedCategory("");
    setSelectedSubCategory("");
    dispatch(getProd());
    dispatch(clearFind([]));
    dispatch(setFlag(false));
  };

  useEffect(() => {
    if (!category.length) {
      dispatch(getCat());
      dispatch(getSubCats());
    }
  }, []);

  // const orderSubCategoryAlphabetic = (e) => {
  //   if (e.target.value === 'asc') {
  //     dispatch(getOrderSubCategoryAlphabeticAZ(subCurrency.name))
  //   } else {
  //     dispatch(getOrderSubCategoryAlphabeticZA(subCurrency.name))
  //   }
  // };

  // const orderPriceSubCategory = (e) => {
  //   if (e.target.value === 'Mm') {
  //     dispatch(getOrderPriceSubCategoryMm(currency.id))
  //   } else {
  //     dispatch(getOrderPriceSubCategorymM(currency.id))
  //   }
  // }

  return (
    <div className="filtersContainer h-[100%] flex justify-center w-[250px] items-center space-x-4 py-4">
      <p
        onClick={getAllProducts}
        className="w-[200px] p-2 border-none rounded-md focus:outline-none bg-[rgb(28,41,71,1)] text-[#fff] font-bold cursor-pointer box-shadow-xl"
      >
        Todo
      </p>

      <select
        value={selectedCategory}
        onChange={handlerFlag}
        className="p-2 border-none rounded-md focus:outline-none bg-[rgb(28,41,71,1)] text-[#fff] font-bold  cursor-pointer box-shadow-xl"
      >
        <option default selected>
          Categorias
        </option>
        {categories.map((c) => (
          <option key={c.name}>{c.name}</option>
        ))}
      </select>
      {/* 
      <select 
      value={selectedSubCategory}
      onChange={handlerSubFlag} 
      className='p-2 border-none rounded-md focus:outline-none bg-[rgb(28,41,71,1)] text-[#fff] font-bold  cursor-pointer box-shadow-xl'>
        <option default selected>Sub Categorias</option>
        {subCategory.map((c) =>
          <option key={c.name}>{c.name}</option>
        )}
      </select> */}

      {!flag ? (
        <select
          onChange={orderAlphabetic}
          className="p-2 border-none rounded-md focus:outline-none bg-[rgb(28,41,71,1)] text-[#fff] font-bold cursor-pointer box-shadow-xl"
        >
          <option disabled selected>
            Orden
          </option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      ) : null}

      {!flag ? (
        <select
          onChange={orderPrice}
          className="p-2 border-none rounded-md focus:outline-none bg-[rgb(28,41,71,1)] text-[#fff] font-bold  cursor-pointer box-shadow-xl"
        >
          <option disabled selected>
            Precio
          </option>
          <option value="mM">Menor - Mayor</option>
          <option value="Mm">Mayor - Menor</option>
        </select>
      ) : null}

      {flag && flag.slice(0, 7) !== "search/" && flag.slice(0, 4) !== "sub/" ? (
        <select
          onChange={orderCategoryAlphabetic}
          className="p-2 border-none rounded-md focus:outline-none bg-[rgb(28,41,71,1)] text-[#fff] font-bold cursor-pointer box-shadow-xl"
        >
          <option disabled selected>
            Orden
          </option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      ) : null}

      {flag && flag.slice(0, 7) !== "search/" && flag.slice(0, 4) !== "sub/" ? (
        <select
          onChange={orderPriceCategory}
          className="p-2 border-none rounded-md focus:outline-none bg-[rgb(28,41,71,1)] text-[#fff] font-bold  cursor-pointer box-shadow-xl"
        >
          <option disabled selected>
            Precio
          </option>
          <option value="mM">Menor - Mayor</option>
          <option value="Mm">Mayor - Menor</option>
        </select>
      ) : null}

      {flag && flag.slice(0, 7) === "search/" ? (
        <select
          onChange={orderNameAlphabetic}
          className="p-2 border-none rounded-md focus:outline-none bg-[rgb(28,41,71,1)] text-[#fff] font-bold cursor-pointer box-shadow-xl"
        >
          <option disabled selected>
            Orden
          </option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      ) : null}

      {flag && flag.slice(0, 7) === "search/" ? (
        <select
          onChange={orderPriceName}
          className="p-2 border-none rounded-md focus:outline-none bg-[rgb(28,41,71,1)] text-[#fff] font-bold  cursor-pointer box-shadow-xl"
        >
          <option disabled selected>
            Precio
          </option>
          <option value="mM">Menor - Mayor</option>
          <option value="Mm">Mayor - Menor</option>
        </select>
      ) : null}
      {/* {flag && flag.slice(0,4) === 'sub/'?<select onChange={orderSubCategoryAlphabetic} className='p-2 border-none rounded-md focus:outline-none bg-[rgb(28,41,71,1)] text-[#fff] font-bold cursor-pointer box-shadow-xl'>
        <option  disabled selected>
        
        Orden
        </option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>:null} */}

      {/* {flag && flag.slice(0,4) === 'sub/'?<select onChange={orderPriceSubCategory} className='p-2 border-none rounded-md focus:outline-none bg-[rgb(28,41,71,1)] text-[#fff] font-bold  cursor-pointer box-shadow-xl'>
        <option  disabled selected>
        Precio
        </option>
        <option value="mM">Menor - Mayor</option>
        <option value="Mm">Mayor - Menor</option>
      </select>:null} */}

      <div className="absolute right-[5px] w-[300px]">
        <SearchBar />
      </div>
    </div>
  );
};
