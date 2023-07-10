import React from "react";
//import Link from 'next/link'
import {
  FaIndustry,
  FaCapsules,
  FaDumbbell,
  FaBinoculars,
} from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";
import { getProdsByCat } from "../../redux/actions/actionProduct";
import { useDispatch } from "react-redux";
import { Filters } from "../filtros/filtros";
import { setFlag, clearFind } from "../../redux/features/productsSlice";

const categories = [
  //{ name: 'Elasticos', icon: <FaDumbbell size={100} style={{ cursor: "pointer" }} />, color: '#0B3D91' },
  {
    name: "Musculacion",
    icon: <FaCapsules size={100} style={{ cursor: "pointer" }} />,
    color: "#0B3D91",
  },
  {
    name: "Fitness",
    icon: <GiWeightLiftingUp size={100} style={{ cursor: "pointer" }} />,
    color: "#0B3D91",
  },
  {
    name: "Kits",
    icon: <FaBinoculars size={100} style={{ cursor: "pointer" }} />,
    color: "#0B3D91",
  },
];

function Category() {
  const handlerFlag = (value) => {
    dispatch(setFlag(value));
    dispatch(getProdsByCat(value));
    dispatch(clearFind([]));
  };

  const dispatch = useDispatch();
  return (
    <div>
      <div className="categories flex justify-center items-center my-4">
        {categories.map((category, index) => (
          <div
            className="category flex flex-col items-center mx-4"
            key={index}
            style={{
              padding: "50px",
              marginRight: index !== categories.length - 1 ? "20px" : "0",
            }}
          >
            {/* <Link href={`/category/${category.name}`}> */}
            <div
              onClick={() => handlerFlag(category.name)}
              className="icon-wrapper flex justify-center items-center bg-white rounded-full shadow-lg"
              style={{
                width: "150px",
                height: "150px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  color: category.color,
                  fontSize: "60px",
                  marginBottom: "10px",
                }}
              >
                {category.icon}
              </div>
            </div>
            {/* </Link> */}
            <span className="text-lg">{category.name}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mb-[10px] mt-[-10px] px-[100px] h-[50px] bg-[rgb(28,41,71,1)] w-[97vw] shadow-[4px_4px_5px_rgb(28,41,71,1)] rounded-[10px]">
        <Filters />
      </div>
    </div>
  );
}

export default Category;
