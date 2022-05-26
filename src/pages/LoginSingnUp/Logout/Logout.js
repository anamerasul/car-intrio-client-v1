import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import logo from "./../../../logo.svg";
import auth from "../../../firebase/firebase.init";

const Logout = () => {
  const [user] = useAuthState(auth);
  // console.log(user);

  let navigate = useNavigate();
  let location = useLocation();
  const from = location.state?.form?.pathname || "/";
  const handleLogout = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
    if (user) {
      window.location.href = from;
    }
  };

  //   useEffect(() => {
  //     if (!user) {
  //       navigate(from, { replace: true });
  //     }
  //   }, [user, navigate, from]);

  useEffect(() => {
    let from = location.state?.form?.pathname || "/logout";

    if (user) {
      navigate(from, { replace: true });
    }
  }, [user]);

  return (
    <div>
      <div className="flex items-center justify-center bg-blue-400 p-12">
        <div className="px-8 py-6 mx-4 mt-4 text-left bg-white md:w-1/3 lg:w-1/3 sm:w-1/3">
          <h3 className="text-2xl text-teal-600 font-bold text-center">
            Log out Account
          </h3>
          <div className="mx-auto flex justify-center">
            <div>
              {user?.photoURL ? (
                <img
                  className="h-[60px] w-[60px] "
                  style={{ borderRadius: "50%" }}
                  src={user?.photoURL}
                  alt=""
                />
              ) : (
                <img
                  className="h-[45px] w-[45px] "
                  style={{ borderRadius: "50%" }}
                  src={logo}
                  alt=""
                />
              )}
            </div>
            <div className="hidden">
              {user?.photoURL ? (
                <img
                  className="h-[60px] w-[60px] "
                  style={{ borderRadius: "50%" }}
                  src={user?.photoURL}
                  alt=""
                />
              ) : (
                <img
                  className="h-[45px] w-[45px] "
                  style={{ borderRadius: "50%" }}
                  src={logo}
                  alt=""
                />
              )}
            </div>
          </div>
          <div className="text-center">
            <div className="mt-4 ">
              <div>
                <label className="block" htmlFor="Name">
                  {user?.displayName}
                </label>
              </div>

              <div className="mt-4">
                <label className="block" htmlFor="email">
                  {user?.email}
                </label>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-900"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
