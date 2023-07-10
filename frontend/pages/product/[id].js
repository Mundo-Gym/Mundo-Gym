import ProductDetail from "../../components/productDetail/productDetail";
import { useRouter } from "next/router";

const productDetails = () => {
  const router = useRouter();
  const {id} = router.query;

  return (
      <ProductDetail id={id}/>
  );
};

export default productDetails;
