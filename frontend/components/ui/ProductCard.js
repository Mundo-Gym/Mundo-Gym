import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaHeart, FaShoppingCart, FaCheck, FaArrowRight } from "react-icons/fa";
import {
  addFavorite,
  removeFavorite,
} from "../../redux/features/favoriteSlice";
import {
  addCarProduct,
  removeCarProduct,
} from "../../redux/features/carStackSlice";
import Badge from "./Badge";

export default function ProductCard({ product, className = "" }) {
  const favorites = useSelector((s) => s.favorites.value);
  const stack = useSelector((s) => s.stack.value);
  const inSession = useSelector((s) => s.user.value);
  const dispatch = useDispatch();

  const [isFav, setIsFav] = useState(false);
  const [isStack, setIsStack] = useState(false);

  const { name, image, price, Category, id, description, stock, category } = product;

  const categories = useSelector((s) => s.categories.value);
  // Resolve category name from store when backend returns an id
  const resolvedCategoryName =
    categories?.find((c) => c._id === category || c.id === category)?.name ||
    Category ||
    "Equipment";

  const imageSrc = image || "/assets/upload.png";
  const [imgSrc, setImgSrc] = useState(imageSrc);

  const selectFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isFav) {
      setIsFav(true);
      dispatch(addFavorite(product));
    } else {
      setIsFav(false);
      dispatch(removeFavorite(id));
    }
  };

  const selectStack = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isStack) {
      setIsStack(true);
      dispatch(addCarProduct(product));
    } else {
      setIsStack(false);
      dispatch(removeCarProduct(id));
    }
  };

  useEffect(() => {
    const found = favorites.some((fav) => fav.id === id);
    setIsFav(found);
  }, [favorites, id]);

  useEffect(() => {
    const inStack = stack.find((p) => p.id === id);
    setIsStack(!!inStack);
  }, [stack, id]);

  if (stock < 1 || !product.visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`group relative bg-surface-light rounded-xl overflow-hidden border border-border hover:border-primary/50 shadow-lg transition-all duration-300 ${className}`}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-background-dark">
        <Link href={`/product/${id}`} className="block w-full h-full">
          <img
            src={imgSrc}
            alt={name}
            onError={() => setImgSrc('/assets/upload.png')}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 cursor-pointer"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 pointer-events-none" />
        
        {/* Badges & Actions */}
        <div className="absolute top-3 left-3 z-10">
           <Badge variant="primary" size="sm">
             {resolvedCategoryName}
           </Badge>
        </div>

        <div className="absolute top-3 right-3 z-10 flex gap-2">
            {/* Favorite Button */}
            <button
              onClick={selectFav}
              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
              className={`p-2 rounded-full bg-surface/80 backdrop-blur-sm border transition-all ${
                isFav ? 'text-secondary border-secondary' : 'text-gray-400 border-gray-600 hover:text-white'
              }`}
            >
              <FaHeart size={14} className={isFav ? "fill-current" : "stroke-current"} />
            </button>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-black/20">
            <span className="bg-primary/20 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-primary/30 flex items-center gap-2">
                Quick View <FaArrowRight size={10} />
            </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
          <Link href={`/product/${id}`}>
          <h3 className="text-lg font-heading font-bold text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors cursor-pointer">
            {name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-400 mb-4 line-clamp-2 h-10">
          {description ? description.slice(0, 60) + "..." : "No description"}
        </p>

        <div className="flex justify-between items-center mt-auto">
            <span className="text-xl font-bold text-white">
            ${price?.toLocaleString()}
          </span>
          
          {/* Cart Action */}
          {inSession?.typeUser !== "admin" && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={selectStack}
              aria-label={isStack ? "Remove from cart" : "Add to cart"}
              className={`p-2 rounded-lg transition-all ${
                isStack 
                  ? 'bg-secondary text-white shadow-neon-magenta' 
                  : 'bg-gray-800 text-gray-300 hover:bg-primary hover:text-background'
              }`}
            >
              {isStack ? <FaCheck size={16} /> : <FaShoppingCart size={16} />}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
