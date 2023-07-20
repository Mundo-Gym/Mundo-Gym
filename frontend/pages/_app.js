import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Providers } from "../redux/providers";
import Car from "../components/car/Car";
import { useRouter } from "next/router";
import { CssBaseline } from "@mui/material";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const inLogin = router.pathname.slice(0, 5);

  return (
    <SessionProvider session={pageProps.session}>
      <Providers>
        <>
          <CssBaseline />
          <Component {...pageProps} />
          {inLogin !== "/logi" && inLogin !== "/succ" && inLogin !== "/team"?<Car /> : null}
        </>
      </Providers>
    </SessionProvider>
  );
}

export default MyApp;
