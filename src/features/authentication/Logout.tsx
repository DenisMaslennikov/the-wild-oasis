import ButtonIcon from "../../ui/ButtonIcon.tsx";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import useLogout from "./hooks/useLogout.ts";
import SpinnerMini from "../../ui/SpinnerMini.tsx";

function Logout() {
  const { isLoginOut, logout } = useLogout();
  return (
    <ButtonIcon disabled={isLoginOut} onClick={() => logout()}>
      {!isLoginOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
