import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../../../firebase/firebase.init";

const AdminDashbardHome = () => {
  const [user] = useAuthState(auth);
  return (
    // <div>
    //   <div className="drawer bg-base-100">
    //     <div class="drawer-side">
    //       <h1>ADMIN</h1>
    //       <label htmlFor="my-drawer" className="drawer-overlay"></label>
    //       <ul className="menu p-4 pt-12 overflow-y-auto w-80 bg-secondary  text-white">
    //         <li>
    //           <Link to="/addBanner">ADD BANNER</Link>
    //         </li>
    //         <li>
    //           <Link to="/addBlogs">ADD BLOGS</Link>
    //         </li>
    //         <li>
    //           <Link to="/addportfolio">ADD PORTFOLIO</Link>
    //         </li>
    //         <li>
    //           <Link to="/addprofile">ADD PROFILE</Link>
    //         </li>
    //         <li>
    //           <Link to="/myprofile">MY PROFILE</Link>
    //         </li>
    //         <li>
    //           <Link to="/manageallproduct">MANAGE PRODUCT</Link>
    //         </li>
    //         <li>
    //           <Link to="/manageallorder">MANAGE ORDER</Link>
    //         </li>
    //         <li>
    //           <Link to="/manageuser">MANAGE USER</Link>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>
    // <div>
    //   <div class="drawer drawer-mobile">
    //     <input id="dashboard-sidebar" type="checkbox" class="drawer-toggle" />
    //     <div class="drawer-content">
    //       <h2 className="text-2xl font-bold text-purple-500">
    //         Welcome to your Dashboard
    //       </h2>
    //       <Outlet></Outlet>
    //     </div>
    //     <div class="drawer-side">
    //       <label for="dashboard-sidebar" class="drawer-overlay"></label>
    //       <ul class="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">
    //         {/* <!-- Sidebar content here --> */}
    //         <li>
    //           <Link to="/dashboard">My Appointments</Link>
    //         </li>
    //         <li>
    //           <Link to="/dashboard/review">My Reviews</Link>
    //         </li>
    //         <li>
    //           <Link to="/dashboard/history">My History</Link>
    //         </li>
    //         {user && (
    //           <>
    //             <li>
    //               <Link to="/dashboard/users">All Users</Link>
    //             </li>
    //             <li>
    //               <Link to="/dashboard/addDoctor">Add a Doctor</Link>
    //             </li>
    //             <li>
    //               <Link to="/dashboard/manageDoctor">Manage Doctors</Link>
    //             </li>
    //           </>
    //         )}
    //       </ul>
    //     </div>
    //   </div>
    // </div>

    <div className="bg-base-100 py-10">
      <h2 className="text-2xl font-bold text-white py-6">
        Welcome to ADMIN DASHBOARD
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
              <Link to="addBanner">ADD BANNER</Link>
            </li>
            <li>
              <Link to="addBlogs">ADD BLOGS</Link>
            </li>
            <li>
              <Link to="addportfolio">ADD PORTFOLIO</Link>
            </li>
            <li>
              <Link to="addprofile">ADD PROFILE</Link>
            </li>
            <li>
              <Link to="myprofile">MY PROFILE</Link>
            </li>
            <li>
              <Link to="manageallproduct">MANAGE ALL PRODUCT</Link>
            </li>
            <li>
              <Link to="manageallorder">MANAGE All ORDER</Link>
            </li>
            <li>
              <Link to="managereview">MANAGE CUSTOMER REVIEW</Link>
            </li>
            <li>
              <Link to="manageuser">MANAGE USER</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashbardHome;
