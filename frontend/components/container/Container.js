import Head from "next/head";
//import products from '../../data/products.json'
import Nav from "../nav/Nav";
import { useEffect } from "react";
import Footer from "../footer/Footer";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getProd } from "../../redux/actions/actionProduct";
import { cleanProductsByCategory } from "../../redux/features/productsByCategorySlice";
import { getProdsByCat } from "../../redux/actions/actionProduct";
import { getCat } from "../../redux/actions/actionsCategories";
import { getSubCats } from "../../redux/actions/actionsSubCats";
import { cleanProductById } from "../../redux/features/productsSlice";
import { getUser } from "../../redux/features/userSlice";
import { signIn, useSession } from "next-auth/react";
import axios from "../../lib/api";
import { cleanStack, addStorageProducts } from "../../redux/features/carStackSlice";

const Container = (props) => {
  const { data: session } = useSession();

  const router = useRouter();
  const cat = router.query.name;
  const dispatch = useDispatch();

  const cats = useSelector((s) => s.categories.value);
  const subCats = useSelector((s) => s.subCategories.value);
  const catProducts = useSelector((s) => s.productsByCategory.value);
  const inSession = useSelector((s) => s.user.value);

  useEffect(() => {
    if (!inSession.name && session?.user.name) {
      (async () => {
        const response = await axios.post("/api/auth/login", {
          email: session?.user.email,
          password: "19568514Lj.",
        });

        let data = await response.data;

        dispatch(getUser(data));
        localStorage.setItem("sessionActive", JSON.stringify(data));

        // After obtaining user data, attempt to merge local cart into server cart
        try {
          const localCar = localStorage.getItem("car");
          const parsed = localCar ? JSON.parse(localCar) : null;
          if (parsed && Array.isArray(parsed) && parsed.length > 0) {
            // POST to server merge endpoint (use /api prefix)
            const mergeResp = await axios.post("/api/carts/merge", { items: parsed });

            // Try to obtain the merged cart from the response
            let serverCartItems = [];
            const merged = mergeResp?.data?.cart;
            if (merged && merged.items) {
              serverCartItems = merged.items.map((it) => {
                const product = it.product || {};
                return {
                  id: product._id || product.id || it.productId || product._id,
                  name: product.name || product.title || "",
                  price: product.price || it.price || 0,
                  quantity: it.quantity || 1,
                  description: product.description || "",
                  unit_price: product.price || it.price || 0,
                  currency_id: product.currency || "ARS",
                  title: product.name || product.title || "",
                };
              });
            } else {
              // Fallback: request carts list and try to find user's cart
              try {
                const cartsResp = await axios.get("/api/carts");
                const carts = cartsResp.data;
                const userId = data?.id || data?._id || data?.userId;
                const userCart = Array.isArray(carts)
                  ? carts.find((c) => String(c.userId || c.user) === String(userId))
                  : carts;
                if (userCart && userCart.items) {
                  serverCartItems = userCart.items.map((it) => ({
                    id: it.productId || it.product?._id || it.product,
                    name: it.product?.name || "",
                    price: it.unitPrice || it.price || it.product?.price || 0,
                    quantity: it.quantity || 1,
                    description: it.product?.description || "",
                    unit_price: it.unitPrice || it.unit_price || it.price || 0,
                    currency_id: "ARS",
                    title: it.product?.name || "",
                  }));
                }
              } catch (e) {
                console.warn("failed to fetch carts after merge", e?.response?.data || e.message || e);
              }
            }

            if (serverCartItems.length > 0) {
              dispatch(addStorageProducts(serverCartItems));
            }

            // clear local cart and redux stack to avoid duplicates
            localStorage.removeItem("car");
            dispatch(cleanStack());
          }
        } catch (err) {
          console.warn("cart merge failed:", err?.response?.data || err.message || err);
        }

        if (!data.username) {
          const response2 = await axios.post("/api/auth/register", {
            name: session?.user.name.split(" ")[0],
            lastname: session?.user.name.split(" ")[1] || "",
            username: session?.user.email.split("@")[0],
            email: session?.user.email,
            password: "19568514Lj.",
          });
          //window.location.href = '/home';
          !inSession.name &&
            session?.user.name &&
            (await axios.post("/api/auth/login", {
              email: session?.user.email,
              password: "19568514Lj.",
            }).then(({ data }) => {
              if (data.name) {
                dispatch(getUser(data));
                localStorage.setItem("sessionActive", JSON.stringify(data));
              }
            }));
        }
      })();
    }
  }, []);

  useEffect(() => {
    const item = localStorage.getItem("sessionActive");
    const user = JSON.parse(item);
    if (user) {
      dispatch(getUser(user));
    }
  }, []);

  useEffect(() => {
    dispatch(getProd());
    dispatch(cleanProductsByCategory());
  }, [cats]);

  if (catProducts.length < 1 && cat) {
    dispatch(getProdsByCat(cat));
  }
  if (router.pathname === "/FormCreateProduct" && cats.length < 1) {
    dispatch(getCat());
  }
  if (router.pathname === "/FormCreateProduct" && subCats.length < 1) {
    dispatch(getSubCats());
  }
  // if(router.query.id){
  //   return dispatch(cleanProductById())
  // }

  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>Mundo Gym</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div>
        {/* Nav and Footer are now handled by the global Layout component in _app.js */}
        {/* <Nav /> */}
        {props.children}
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Container;
