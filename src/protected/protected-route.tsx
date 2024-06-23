import { useSelector } from "react-redux";
import { Outlet,  Navigate } from "react-router-dom";
import { RootState } from "../redux/store";

const ProtectedRoute = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <>
      {token ? (
        <>
          <Outlet />
        </>
      ) : (
        <Navigate to={"/"} replace/>
      )}
    </>
  );
};

export default ProtectedRoute;
