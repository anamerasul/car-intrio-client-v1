import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../../../firebase/firebase.init";
import useAdmin from "../../../Hooks/useAdmin";
import Loading from "../../Loading/Loading";

const RequireAdmin = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user);
  const location = useLocation();

  if (loading || adminLoading) {
    return <Loading />;
  }

  if (!user || !admin) {
    signOut(auth);
    return <Navigate to="/admin" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default RequireAdmin;
