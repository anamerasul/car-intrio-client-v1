import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase/firebase.init";
import ActiveLink from "../ActiveLink/ActiveLink";

const Header = () => {
  const [user] = useAuthState(auth);

  const menuItems = (
    <>
      <li>
        <ActiveLink to="/home">HOME</ActiveLink>
      </li>
      <li tabIndex="0">
        <ActiveLink to="/blogs">BLOGS</ActiveLink>
      </li>

      {user && (
        <li>
          <ActiveLink to="/dashboard">DASHBOARD</ActiveLink>
        </li>
      )}

      {!user && (
        <>
          <li>
            <ActiveLink to="/login">LOGIN</ActiveLink>
          </li>
          <li>
            <ActiveLink to="/signup">SIGN UP</ActiveLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div>
      <div className="navbar bg-sky-600">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex="0" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow  rounded-box w-52"
            >
              {menuItems}
            </ul>
          </div>
          <ActiveLink to="/" className="btn btn-ghost normal-case text-xl">
            Car- <span>Intrio</span>
          </ActiveLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">{menuItems}</ul>
        </div>

        <div className="navbar-end">
          {user && !user?.photoURL ? (
            <ActiveLink
              to="/updateProfile"
              className="block btn btn-lg btn-white bg-slate-200 mt-4 lg:inline-block lg:mt-0  hover:text-white mr-4 p-2"
            >
              {user?.displayName || user?.email}
            </ActiveLink>
          ) : (
            ""
          )}

          {user?.photoURL ? (
            <ActiveLink
              to="/updateProfile"
              className="block btn btn-lg btn-white bg-slate-200 mt-4 lg:inline-block lg:mt-0  hover:text-white mr-4 p-2"
            >
              <img
                className="h-[30px] w-[30px] "
                style={{ borderRadius: "50%" }}
                src={user?.photoURL}
                alt=""
              />
            </ActiveLink>
          ) : (
            ""
          )}
        </div>

        {user && (
          <div className="navbar-end">
            <ActiveLink to="/logout" className="btn">
              Logout
            </ActiveLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
