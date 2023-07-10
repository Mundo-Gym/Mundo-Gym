import Link from "next/link";
import Head from "next/head";

const landing = () => {
  return (
    <div>
      <Head>
        <title>Mundo Gym</title>
        <link rel="icon" href="/favicon.png" />
        <script src="sweetalert2.all.min.js"></script>
        <link rel="stylesheet" href="sweetalert2.min.css"></link>
      </Head>

      <div className="absolute w-full h-full bg-black z-10">
        <main className="flex flex-col justify-center align-middle h-full w-ful">
          <section className="fixed inset-0 z-10 w-full h-full flex flex-col text-white -translate-x-80 translate-y-72 bg-opacity-100">
            <article className="flex flex-col self-center justify-center w-1/2 gap-4">
              <h1 className="whitespace-pre-line font-extrabold text-opacity-100 text-[58px]">
                Sueña sin miedo,{"\n"}entrena sin limites
              </h1>
              <h2 className="whitespace-pre-line text-opacity-100 text-[24px]">
                Adquiere los mejores productos, suministros,{"\n"} y materiales
                para poder tener la salud física que siempre quisiste.
              </h2>

              <Link
                href="/home"
                className="bg-blue-500 hover:bg-blue-700 text-white text-base font-bold py-3 px-11 rounded-lg w-40"
              >
                Empezar
              </Link>
            </article>
          </section>
          <video
            className="fixed inset-0 z-0 object-cover opacity-70 brightness-90"
            muted
            key={Date.now()}
            autoPlay
            loop
          >
            <source src="/assets/pexels.mp4" type="video/mp4" />
          </video>
        </main>
      </div>
    </div>
  );
};
export default landing;

// import Head from "next/head";
// //import Link from "next/link";
// import { useSession } from "next-auth/react";
// import Home from "../components/home/Home";

// export default function Auth() {
//   const { data: session } = useSession();

//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Auth</title>
//         <link rel="icon" href="/favicon.png" />
//       </Head>

//       {session ? <User session={session} /> : <Guest />}
//     </div>
//   );
// }

// // Guest
// function Guest() {
//   return (
//     <Home />
//   );
// }

// // Authorized User
// function User({ session }) {
//   return (
//     <Home session={session}/>
//   );
// }
