import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../../../firebase/firebase.init";

const DashbardHome = () => {

    const [user] = useAuthState(auth);
    return (
  
      <div className="bg-base-100 py-10">
        <h2 className="text-2xl font-bold text-white py-6">
          Welcome TO DASHBOARD
        </h2>
        <div className="drawer w-full drawer-mobile bg-base-100">
          {/* <Outlet></Outlet> */}
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open Admin Dashboard
            </label>
  
            <Outlet></Outlet>
          </div>
  
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
  
            <ul className="menu p-4 overflow-y-auto w-80 bg-secondary  text-white">
              <li>
                <Link to="myorders">MY ORDERS</Link>
              </li>
              <li>
                <Link to="addreview">ADD REVIEW</Link>
              </li>
              <li>
                <Link to="myprofile">MY PROFILE</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

export default DashbardHome;
