import React, { useEffect, useState } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase/firebase.init";
import UseToken from "../../../Hooks/UseToken";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.form?.pathname || "/adminDashboard";

  const [authuser] = useAuthState(auth);

  const [token] = UseToken(user);

  console.log(authuser);
  const handleAdminSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("give email");
      return;
    }

    if (!password) {
      toast.error("give password");
      return;
    }
    if (error) {
      toast.error("user and password is not match");
    }
    signInWithEmailAndPassword(email, password);
  };

  // useEffect(() => {
  //   // setTimeout(() => {
  //   if (authuser) {
  //     navigate(from, { replace: true });
  //   }
  //   // }, 2);
  // }, [authuser, navigate, from]);

  // if (authuser) {
  //   const url = `https://calm-sierra-62921.herokuapp.com/login`;
  //   fetch(url, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       email: authuser.email,
  //     }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       localStorage.setItem("accessToken", data.accessToken); // l

  //       navigate(from, { replace: true });
  //     });
  // }

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  return (
    <div className="flex items-center justify-center bg-blue-400">
      <div className="px-8 py-6 mx-4 mt-4 text-left bg-white md:w-1/3 lg:w-1/3 sm:w-1/3 my-10">
        <h3 className="text-2xl text-teal-600 font-bold text-center">
          ADMIN LOGIN
        </h3>
        <form onSubmit={handleAdminSubmit} action="">
          <div className="mt-4">
            <div className="mt-4">
              <label className="block" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                name="email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="mt-4">
              <label className="block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="flex">
              <button
                type="submit"
                className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
              >
                ADMIN LOGIN
              </button>
            </div>
            <div className="mt-6 text-grey-dark">
              <Link
                to="/forgot"
                className="text-blue-600 hover:underline mx-4"
                href="#"
              >
                Reset your password
              </Link>

              <Link
                to="/signup"
                className="text-blue-600 hover:underline mx-4"
                href="#"
              >
                create an user account
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
