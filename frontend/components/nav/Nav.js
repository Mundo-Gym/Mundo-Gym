import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import SearchBar from "../searchBar/SearchBar";
import { useRouter } from "next/router";
import { FaHome, FaUser, FaSignOutAlt, FaSearch, FaDumbbell, FaBars, FaTimes } from "react-icons/fa";
import { logoutUser } from "../../redux/features/userSlice";
import Logo from "../../public/assets/Icon.png";
import uploadImage from "../../public/assets/upload.png";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";

export default function Nav() {
  const router = useRouter();
  const [profileMenu, setProfileMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const inSession = useSelector((s) => s.user.value);
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const handlerLogOut = async () => {
    dispatch(logoutUser());
    localStorage.removeItem("sessionActive");
    setProfileMenu(false);
    await signOut();
    router.push("/home");
  };

  const handlerButton = () => {
    setProfileMenu(!profileMenu);
  };

  const isActive = (path) => {
    return router.pathname === path;
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-lg border-b border-border shadow-lg">
        <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
          {/* Logo Section */}
          <Link href={"/home"} className="flex items-center gap-3 group">
            <div className="relative">
               <Image 
                  src={Logo} 
                  alt="Mundo Gym Logo" 
                  width={150} 
                  height={40} 
                  className="h-12 w-auto object-contain filter invert opacity-80 group-hover:opacity-100 transition-opacity"
               />
            </div>
            <span className="text-primary font-heading font-bold text-xl tracking-wider hidden md:block">
               MU<span className="text-white">NDO</span>GYM
            </span>
          </Link>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-2">
              <Link href="/home">
                <button 
                  aria-current={isActive('/home') ? 'page' : undefined}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${isActive('/home') ? 'bg-primary/10 text-primary border border-primary/30 shadow-[0_0_10px_rgba(0,242,255,0.2)]' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                >
                  <FaHome size={16} />
                  <span className="text-sm font-medium tracking-wide">INICIO</span>
                </button>
              </Link>
              
              <Link href="/category">
                <button 
                  aria-current={isActive('/category') ? 'page' : undefined}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${isActive('/category') ? 'bg-primary/10 text-primary border border-primary/30 shadow-[0_0_10px_rgba(0,242,255,0.2)]' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                >
                  <FaDumbbell size={16} />
                  <span className="text-sm font-medium tracking-wide">PRODUCTOS</span>
                </button>
              </Link>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:block flex-1 max-w-md mx-8">
             <SearchBar />
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {!session && !inSession?.name ? (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Acceder</Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">Regístrate</Button>
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button 
                  onClick={handlerButton}
                  className="flex items-center gap-3 group focus:outline-none"
                >
                  <div className={`w-10 h-10 rounded-full border-2 overflow-hidden transition-all duration-300 ${profileMenu ? 'border-primary shadow-neon-cyan' : 'border-gray-600 group-hover:border-primary'}`}>
                    <Image
                      src={uploadImage}
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {profileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-12 w-56 bg-surface border border-border rounded-xl shadow-2xl py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-border mb-2">
                        <p className="text-xs text-gray-500">Conectado como</p>
                        <p className="text-sm text-white truncate font-medium">{inSession?.name || session?.user?.name}</p>
                      </div>
                      
                      <Link href="/profile">
                        <button 
                          onClick={() => setProfileMenu(false)}
                          className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 transition-colors ${isActive('/profile') ? 'text-primary bg-primary/5' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                        >
                          <FaUser size={14} />
                          Perfil
                        </button>
                      </Link>
                      
                      <button 
                        onClick={handlerLogOut}
                        className="w-full text-left px-4 py-2 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-900/20 flex items-center gap-3 transition-colors"
                      >
                        <FaSignOutAlt size={14} />
                        Cerrar Sesión
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              <FaBars size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar/Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
              onClick={() => setMobileMenu(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 right-0 h-full w-64 bg-surface border-l border-border z-50 md:hidden p-6"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-primary font-heading font-bold text-xl">MENU</span>
                <button onClick={() => setMobileMenu(false)} className="text-gray-400 hover:text-white">
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <Link href="/home" onClick={() => setMobileMenu(false)} className="text-gray-300 hover:text-primary py-2 border-b border-border">
                  Inicio
                </Link>
                <Link href="/category" onClick={() => setMobileMenu(false)} className="text-gray-300 hover:text-primary py-2 border-b border-border">
                  Productos
                </Link>
                {!session && !inSession?.name && (
                  <>
                    <Link href="/login" onClick={() => setMobileMenu(false)} className="text-gray-300 hover:text-primary py-2 border-b border-border">
                      Acceder
                    </Link>
                    <Link href="/register" onClick={() => setMobileMenu(false)} className="text-gray-300 hover:text-primary py-2 border-b border-border">
                      Registrarse
                    </Link>
                  </>
                )}
              </div>
              
              <div className="absolute bottom-6 left-6 right-6">
                 <SearchBar />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
