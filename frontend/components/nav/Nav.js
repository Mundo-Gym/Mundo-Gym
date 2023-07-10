import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import SearchBar from "../searchBar/SearchBar";
import { useRouter } from "next/router";
import HomeIcon from "@mui/icons-material/Home";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { logoutUser } from "../../redux/features/userSlice";
import Logo from "../../public/assets/Icon.png";
import uploadImage from "../../public/assets/upload.png";
import { useEffect, useState } from "react";

export default function Nav() {
  const router = useRouter();
  const inDetail = router.pathname.slice(0, 13);
  const inForm = router.pathname.slice(0, 18);
  const [profileMenu, setProfileMenu] = useState(false);

  const stack = useSelector((s) => s.stack.value);
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
    if (profileMenu) {
      setProfileMenu(false);
    } else {
      setProfileMenu(true);
    }
  };

  return (
    <div>
      <div className="h-25 flex justify-between items-center w-full shadow-[inset_0px_-4px_20px_rgba(0,0,0,0.2)] rounded-md">
        <Link href={"/home"}>
          <Image src={Logo} alt="" className="ml-[20px] h-24 w-[150px] my-4" />
        </Link>
        <div className="flex justify-center items-center">
          <Link href="/home">
            <button className="p-2 mx-2.5 rounded shadow-md hover:bg-[rgba(28,41,71,1)] hover:text-[#fff] text-[rgba(28,41,71,1)]">
              <HomeIcon />
            </button>
          </Link>

          {!session && !inSession?.name ? (
            <Link href="/login">
              <button className="p-2 mx-2.5 rounded shadow-md mr-[50px]">
                👤 Entrar
              </button>
            </Link>
          ) : (
            <div className="relative rounded-full w-[50px] mr-[50px]">
              <Image
                src={uploadImage}
                alt="login"
                onClick={() => handlerButton()}
                priority="false"
                className="rounded-full w-[40px] hover:shadow-[1px_1px_10px_rgba(0,0,0,0.5)]"
              />
              {!profileMenu ? null : (
                <div className="bg-[#ffffff] w-[30px] rotate-45 h-[30px] shadow-[4px_4px_5px_rgba(0,0,0,0.5)] absolute top-[20px] right-[57px]"></div>
              )}
              {!profileMenu ? null : (
                <div className="flex flex-col absolute bg-[#fff] w-[120px] p-[5px] rounded-[10px] shadow-[-4px_4px_5px_rgba(0,0,0,0.5)] left-[-280%] top-[1px]">
                  <Link
                    href="/profile"
                    className="hover:bg-[rgba(28,41,71,1)] rounded-[10px] hover:text-[#fff] border-b-[1px] border-[rgba(0,0,0,0.2)]"
                  >
                    <span>{`👤Perfil`}</span>
                  </Link>
                  {session || inSession?.name ? (
                    <span
                      className="hover:bg-[rgba(28,41,71,1)] rounded-[10px] hover:text-[#fff] border-b-[1px] border-[rgba(0,0,0,0.2)] cursor-pointer"
                      onClick={() => handlerLogOut()}
                    >
                      ⛔ Salir
                    </span>
                  ) : null}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
