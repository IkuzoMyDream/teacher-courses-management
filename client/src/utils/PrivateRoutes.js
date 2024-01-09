import { Outlet, Navigate } from "react-router-dom";
import useLocalState from "../useLocalStorage";

export default function PrivateRoutes() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  return jwt ? <Outlet /> : <Navigate to={"/login"} />;
}
