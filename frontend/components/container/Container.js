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
import axios from "axios";

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
        const response = await axios.post(
          "http://localhost:3001/auth/login",
          {
            email: session?.user.email,
            password: "19568514Lj.",
          }
        );

        let data = await response.data;

        dispatch(getUser(data));
        localStorage.setItem("sessionActive", JSON.stringify(data));

        if (!data.username) {
          const response2 = await axios.post(
            "http://localhost:3001/auth/register",
            {
              name: session?.user.name.split(" ")[0],
              lastname: session?.user.name.split(" ")[1] || "",
              username: session?.user.email.split("@")[0],
              email: session?.user.email,
              password: "19568514Lj.",
            }
          );
          //window.location.href = '/home';
          !inSession.name &&
            session?.user.name &&
            (await axios
              .post("http://localhost:3001/auth/login", {
                email: session?.user.email,
                password: "19568514Lj.",
              })
              .then(({ data }) => {
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
    <div className="overflow-x-hidden	">
      <Head>
        <title>Mundo Gym</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div>
        <Nav />
        {props.children}
        <Footer />
      </div>
    </div>
  );
};

export default Container;
