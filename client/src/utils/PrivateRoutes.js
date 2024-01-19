import { Outlet, Navigate, useLocation } from "react-router-dom";
import useLocalState from "./useLocalStorage";

export default function PrivateRoutes({ allowedRole }) {
  const [auth, setAuth] = useLocalState(null, "auth");
  const location = useLocation();

  return auth?.role == allowedRole ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
}
