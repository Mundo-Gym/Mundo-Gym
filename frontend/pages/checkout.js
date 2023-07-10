import { useEffect } from "react";
//import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";

export default function MPButton() {

  const session = useSelector((s) => s.user.value);
  const item = useSelector((s) => s.stack.value);

  const items = {
    items:item,
    email:email
  }

  useEffect(() => {
    const fetchCheckout = async () => {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items,
          email: 'harcodeo@maxi.com'
        }),
      });

      if (res.ok) {
        const data = await res.json();

        const mp = new window.MercadoPago(
          process.env.NEXT_PUBLIC_MP_PUBLIC_KEY,
          {
            locale: "es-AR",
          }
        );

        mp.checkout({
          preference: {
            id: data.global,
          },
          render: {
            container: ".cho-container",
            label: "Pagar",
          },
        });
      } else {
        // Handle error response from the API
      }
    };

    fetchCheckout();
  }, [items, session]);

  return <div className="cho-container"></div>;
}
