import React, { useEffect, useState } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase/firebase.init";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.form?.pathname || "/";

  const [authuser] = useAuthState(auth);

  console.log(authuser);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("give email");
      return;
    }

    // if (!password) {
    //   toast.error("give password");
    // }
    if (error) {
      toast.error("user and password is not match");
    }
    signInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    // setTimeout(() => {
    if (authuser) {
      navigate(from, { replace: true });
    }
    // }, 2);
  }, [authuser, navigate, from]);

  // if (error) {
  //   toast.error(error.message);
  //   // return (
  //   //   <div>
  //   //     <p>Error: {error.message}</p>
  //   //   </div>
  //   // );
  // }
  // if (loading) {
  //   return <Spinner></Spinner>;
  // }
  // if (authuser) {
  //   navigate(from, { replace: true });
  //   window.location.href = from;
  // }

  return (
    <div className="flex items-center justify-center bg-blue-400">
      <div className="px-8 py-6 mx-4 mt-4 text-left bg-white md:w-1/3 lg:w-1/3 sm:w-1/3 my-10">
        <h3 className="text-2xl text-teal-600 font-bold text-center">Login</h3>
        <form onSubmit={handleLoginSubmit} action="">
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
                Login
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
                create an account
              </Link>
            </div>
          </div>
        </form>
        <div className="mt-4">
          <h2 className="text-center text-sm">
            Login using your Social Account
          </h2>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;
