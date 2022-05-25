import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../../firebase/firebase.init";

const Header = () => {
  const [user] = useAuthState(auth);

  const menuItems = (
    <>
      <li>
        <Link to="/home">HOME</Link>
      </li>
      <li tabIndex="0">
        <Link to="/blogs">BLOGS</Link>
      </li>

      {user && (
        <li>
          <Link to="/dashboard">DASHBOARD</Link>
        </li>
      )}

      {!user && (
        <>
          <li>
            <Link to="/login">LOGIN</Link>
          </li>
          <li>
            <Link to="/signup">SIGN UP</Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100">
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
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            Car- <span>Intrio</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">{menuItems}</ul>
        </div>

        <div className="navbar-end">
          {user && !user.photoURL ? (
            <Link
              to="/updateProfile"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-100 hover:text-white mr-4"
            >
              {user?.displayName || user?.email}
            </Link>
          ) : (
            ""
          )}

          {user?.photoURL ? (
            <Link
              to="/updateProfile"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-100 hover:text-white mr-4"
            >
              <img
                className="h-[30px] w-[30px] "
                style={{ borderRadius: "50%" }}
                src={user?.photoURL}
                alt=""
              />
            </Link>
          ) : (
            ""
          )}
        </div>

        {user && (
          <div className="navbar-end">
            <Link to="/logout" className="btn">
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
