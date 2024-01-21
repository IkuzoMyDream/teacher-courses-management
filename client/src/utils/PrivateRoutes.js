import { Outlet, Navigate, useLocation } from "react-router-dom";
import useLocalState from "./useLocalStorage";

export default function PrivateRoutes({
  allowedRole,
  navbar: Navbar,
  dataprovider: DataProvider,
}) {
  const [auth, setAuth] = useLocalState(null, "auth");
  const location = useLocation();

  return auth?.role == allowedRole ? (
    <DataProvider>
      <Navbar />
      <Outlet />
    </DataProvider>
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
}
