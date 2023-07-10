import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
} from "../../redux/features/favoriteSlice";
import {
  addCarProduct,
  removeCarProduct,
} from "../../redux/features/carStackSlice";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddTaskIcon from "@mui/icons-material/AddTask";

export default function Card(props) {
  const favorites = useSelector((s) => s.favorites.value);
  const stack = useSelector((s) => s.stack.value);
  const inSession = useSelector((s) => s.user.value);

  const { name, image, price, Category, id } = props;

  const dispatch = useDispatch();

  const [isFav, setIsFav] = useState(false);

  const [isStack, setIsStack] = useState(false);

  const selectFav = () => {
    if (!isFav) {
      setIsFav(true);
      dispatch(addFavorite(props));
    }
    if (isFav) {
      setIsFav(false);
      dispatch(removeFavorite(id));
    }
  };

  const selectStack = () => {
    if (!isStack) {
      setIsStack(true);
      dispatch(addCarProduct(props));
    }
    if (isStack) {
      setIsStack(false);
      dispatch(removeCarProduct(id));
    }
  };

  useEffect(() => {
    favorites.forEach((fav) => {
      if (fav.id === id) {
        setIsFav(true);
      }
    });
  }, [favorites]);

  useEffect(() => {
    const inStack = stack.find((p) => p.id === id);
    if (!inStack) {
      setIsStack(false);
    } else {
      setIsStack(true);
    }
  }, [stack]);

  return (
    <div
      key={price}
      className="flex flex-col justify-center items-center h-full max-w-[230px] min-w-[200px] m-2 p-1 border-none shadow-[4px_4px_10px_rgba(0,0,0,0.5)] hover:shadow-[1px_1px_20px_rgba(0,0,0,0.5)] rounded-lg gap-4"
    >
      <Link href={`/product/${id}`}>
        <div className="flex flex-col justify-center items-center">
          <img src={image} alt={name} className="w-[220px] h-[200px] gap-4" />
        </div>
      </Link>

      <br />

      <div className="relative flex m-2 flex-col justify-center items-start gap-4 w-[90%]">
        <span className="p-[5px] m-[-40px_0_-5px_-10px] w-[220px] rounded-[5px_0_5px_0] text-[#fff] font-bold bg-[rgba(28,41,71,1)]">
          {Category}
        </span>
        <Link href={`/product/${id}`}>
          <h3 className="font-bold text-base text-gray-900 w-[100%]">{name}</h3>
          <h4 className="flex justify-start items-center font-bold text-base text-black w-[100%]">
            <AttachMoneyIcon className="text-[#11650b]" />
            {price}
          </h4>
          {/* { !description
        ?
        null:
          <span className='font-bold text-base text-gray-800'>{description.slice(0,33)+'...'}</span>} */}
        </Link>
        {/* {
          isFav
          && inSession.typeUser === 'cliente'
          && <button className='bg-[#fff] shadow-[4px_4px_5px_rgba(0,0,0,0.5)] absolute right-[40px] top-[-80px] text-lg p-1 rounded-full hover:[1px_1px_15px_rgba(28,41,71)]' onClick={selectFav}>❤️</button>
        }
        {
          !isFav
          && inSession.typeUser === 'cliente'
          && <button className='bg-[#fff] shadow-[4px_4px_5px_rgba(0,0,0,0.5)] absolute right-[40px] top-[-80px] text-base p-1 rounded-full hover:shadow-[1px_1px_5px_rgba(28,41,71)]' onClick={selectFav}>🤍</button>
        } */}

        {isStack && inSession.typeUser !== "admin" && (
          <button
            className="bg-[#fff] shadow-[4px_4px_5px_rgba(0,0,0,0.5)] absolute right-0 top-[-80px] text-[rgba(28,41,71,1)] p-1 rounded-full font-bold hover:shadow-[1px_1px_20px_rgba(28,41,71)]"
            onClick={selectStack}
          >
            <AddTaskIcon />
          </button>
        )}
        {!isStack && inSession.typeUser !== "admin" && (
          <button
            className="bg-[#fff] shadow-[4px_4px_5px_rgba(0,0,0,0.5)] absolute right-0 top-[-80px] text-[rgba(28,41,71,1)] p-1 rounded-full font-bold hover:shadow-[1px_1px_20px_rgba(28,41,71)]"
            onClick={selectStack}
          >
            <AddShoppingCartIcon />
          </button>
        )}
      </div>
    </div>
  );
}
