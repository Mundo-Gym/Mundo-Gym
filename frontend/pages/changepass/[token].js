import UpdatePassword from "../../components/updatePassword/UpdatePassword";
import { useRouter } from "next/router";
export default function changepass() {
  const router = useRouter();
  const { token } = router.query;
  console.log(token);
  return <UpdatePassword token={token} />;
}
