import Head from "next/head";
import Home from "../components/home/Home";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function HomePage({ initialProducts }) {
  return (
    <>
      <Head>
        <title>Tienda - MundoGym</title>
        <meta name="description" content="Catálogo de productos de MundoGym." />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="w-full">
        <Home initialProducts={initialProducts} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch(`${API}/api/products`);
    const data = await res.json();
    return {
      props: { initialProducts: data },
      revalidate: 60,
    };
  } catch (err) {
    return {
      props: { initialProducts: [] },
      revalidate: 60,
    };
  }
}
