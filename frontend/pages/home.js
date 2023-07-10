//import Link from "next/link";
import { useSession } from "next-auth/react";
import Home from "../components/home/Home";
import styles from "../styles/Home.module.css";
//import fetch from "isomorphic-fetch";

export default function Auth() {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      {session ? <User session={session} /> : <Guest />}
    </div>
  );
}

// Guest
function Guest() {
  return <Home />;
}

// Authorized User
function User({ session }) {
  return <Home />;
}
