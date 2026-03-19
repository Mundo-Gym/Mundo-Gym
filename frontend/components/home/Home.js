import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { getProd } from "../../redux/actions/actionProduct";
import { forceCurrent } from "../../redux/features/paginateSlice";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaDumbbell, FaArrowRight, FaLayerGroup, FaTrophy, FaBolt } from "react-icons/fa";
import Category from "../categorias/Categorias";
import Pagination from "../paginate/Paginate";
import ProductCard from "../ui/ProductCard";
import Carousel from "../ui/Carousel";

// Staggered animation container
const StaggeredGrid = ({ children, className }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Grid Item wrapper for stagger
const GridItem = ({ children }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const numPaginate = useSelector((s) => s.numPaginate.value);
  const products = useSelector((s) => s.products.value);
  let find = useSelector((s) => s.products.find);
  const dispatch = useDispatch();
  const { data: session } = useSession();

  let from = (numPaginate - 1) * 5;
  let to = numPaginate * 5;
  const current = products.slice(from, to);
  const currentFind = find.slice(from, to);

  // Memoize the displayed products to avoid re-renders
  const displayedProducts = useMemo(() => {
    return currentFind.length > 0 ? currentFind : current;
  }, [currentFind, current]);

  useEffect(() => {
    dispatch(forceCurrent(1));
  }, [products, dispatch]);

  // Ensure products are loaded when Home mounts
  useEffect(() => {
    dispatch(getProd());
  }, [dispatch]);

  // Debug: log products state to help diagnose mapping issues
  useEffect(() => {
    console.log("Home: products length", products.length, "sample:", products.slice(0, 5));
    console.log("Home: find length", find.length, "sample:", find.slice(0, 5));
    console.log("Home: displayedProducts length", displayedProducts.length, "sample:", displayedProducts.slice(0, 5));
  }, [products, find, displayedProducts]);

  useEffect(() => {
    dispatch(forceCurrent(1));
  }, [find, dispatch]);

  return (
    <div className="space-y-12">
      {/* Carousel Section */}
      <section aria-label="Promociones destacadas">
        <Carousel />
      </section>

      {/* Hero Section with Dynamic Background */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl overflow-hidden border border-border bg-surface-dark p-8 md:p-12 flex items-center justify-between group"
        aria-labelledby="hero-heading"
      >
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-700"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 mb-4">
             <FaBolt className="text-primary" />
             <span className="text-primary text-sm font-bold tracking-widest uppercase">Nueva Generación</span>
          </div>
          <h1 id="hero-heading" className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            Eleva tu <span className="text-primary text-shadow-neon">Potencial</span>
          </h1>
          <p className="text-gray-400 mb-8 text-lg leading-relaxed">
            Equipamiento de precisión industrial diseñado para atletas que exigen lo mejor. 
            Calidad profesional, durabilidad extrema.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/category" className="inline-flex items-center gap-2 bg-primary text-background font-bold px-8 py-4 rounded-lg hover:bg-primary/90 transition-all shadow-neon-cyan/50 hover:shadow-neon-cyan">
              Explorar Catalogo <FaArrowRight />
            </Link>
            <Link href="/team" className="inline-flex items-center gap-2 text-gray-300 hover:text-white font-medium px-6 py-4 rounded-lg border border-gray-700 hover:border-gray-500 transition-all">
              Conoce el Equipo
            </Link>
          </div>
        </div>
        
        {/* Hero Image/Icon Decoration */}
        <div className="hidden lg:block relative z-10 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
          <FaDumbbell size={300} className="text-primary transform -rotate-12" />
        </div>
      </motion.section>

      {/* Features Bar */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6" aria-label="Características de la tienda">
         {[
           { icon: FaLayerGroup, title: "Precisión Industrial", desc: "Diseño tolerancia milimétrica" },
           { icon: FaTrophy, title: "Calidad Pro", desc: "Estándares profesionales" },
           { icon: FaBolt, title: "Entrega Rápida", desc: "Envío en 24-48h" }
         ].map((feature, index) => (
           <motion.div 
             key={index}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: index * 0.1 }}
             className="flex items-center gap-4 p-4 bg-surface border border-border rounded-lg"
           >
             <div className="p-3 bg-primary/10 rounded-full text-primary">
               <feature.icon size={20} />
             </div>
             <div>
               <h3 className="font-heading font-bold text-white">{feature.title}</h3>
               <p className="text-xs text-gray-400">{feature.desc}</p>
             </div>
           </motion.div>
        ))}
      </section>

      {/* Filters & Grid */}
      <div className="space-y-8">
        {/* Category Component */}
        <Category />

        {/* Product Grid with Staggered Animation */}
        {displayedProducts.length > 0 ? (
          <StaggeredGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProducts.map((p) => (
              <GridItem key={p.id || p.name}>
                <ProductCard product={p} />
              </GridItem>
            ))}
          </StaggeredGrid>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        {find.length > 5 && (
           <div className="relative">
             <Pagination products={find} />
           </div>
        )}

        {find.length === 0 && products.length > 5 && (
          <div className="relative">
             <Pagination products={products} />
          </div>
        )}
      </div>
    </div>
  );
}
