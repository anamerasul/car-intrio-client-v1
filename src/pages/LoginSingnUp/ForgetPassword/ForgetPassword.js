import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  useAuthState,
  useSendPasswordResetEmail,
} from "react-firebase-hooks/auth";

import { toast } from "react-toastify";
import auth from "../../../firebase/firebase.init";

const ForgotPassword = () => {
  const [user] = useAuthState(auth);

  const [email, setEmail] = useState("");
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.form?.pathname || "/";
  const handleResetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(email);
    //     const from = location.state?.form?.pathname || "/";
    setTimeout(() => {
      if (user) {
        navigate(from, { replace: true });
      }
    }, 2000);

    toast.success("A password reset email sent");
    navigate("/login");
  };
  return (
    <div className="flex items-center justify-center bg-blue-400">
      <div className="px-8 py-6 mx-4 mt-4 text-left bg-white md:w-1/3 lg:w-1/3 sm:w-1/3 my-10">
        <h3 className="text-2xl font-bold text-teal-600 text-center">
          Reset password
        </h3>
        <form onSubmit={handleResetPassword} action="">
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="Email">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                placeholder="email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="flex">
              <input
                onClick={async () => {
                  await sendPasswordResetEmail(email);
                }}
                style={{ cursor: "pointer" }}
                type="submit"
                className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                value="Reset"
              />
            </div>
          </div>
        </form>
        <div className="mt-6 text-grey-dark">
          <div className="mt-6 text-grey-dark">
            back to home
            <Link
              to="/"
              className="text-blue-600 hover:underline mx-4"
              href="#"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
