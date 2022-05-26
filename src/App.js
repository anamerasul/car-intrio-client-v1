import "./App.css";
import Header from "./pages/Shared/Header/Header";
import Footer from "./pages/Shared/Footer/Footer";
import { Route, Routes } from "react-router";
import SignUp from "./pages/LoginSingnUp/SignUp/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./pages/LoginSingnUp/Logout/Logout";
import Login from "./pages/LoginSingnUp/Login/Login";
import ForgotPassword from "./pages/LoginSingnUp/ForgetPassword/ForgetPassword";
import UpdateProfile from "./pages/LoginSingnUp/UpdateProfile/UpdateProfile";
import AdminLogin from "./pages/LoginSingnUp/AdminLogin/AdminLogin";
import Home from "./pages/Home/Home";
import Blogs from "./pages/Blogs/Blogs";
import Myportfolio from "./pages/MyPortfolio/Myportfolio";
import Products from "./pages/Products/Products";
import ClientsReview from "./pages/ClientsReview/ClientsReview";
import DashbardHome from "./pages/Dashboard/DashboardHome/DashbardHome";
import AdminDashbardHome from "./pages/AdminDashBoard/AdminDashbardHome/AdminDashbardHome";
import Notfound from "./pages/NotFound/Notfound";
import { useAuthState } from "react-firebase-hooks/auth";

import AddBanner from "./pages/AdminDashBoard/AddBanner/AddBanner";
import AddBlogs from "./pages/AdminDashBoard/AddBlogs/AddBlogs";
import RequireAuth from "./pages/LoginSingnUp/RequireAuth/RequireAuth";
import AddPortfolio from "./pages/AdminDashBoard/AddPortfolio/Addportfolio";
import Addprofile from "./pages/AdminDashBoard/Addprofile/Addprofile";
import Myprofile from "./pages/AdminandUserDashboardShared/MyProfile/Myprofile";
import ManageProduct from "./pages/AdminDashBoard/ManageProduct/ManageProduct";
import ManageOrders from "./pages/AdminDashBoard/ManageOrders/ManageOrders";
import ManageReviews from "./pages/AdminDashBoard/ManageReviews/ManageReviews";
import ManageUser from "./pages/AdminDashBoard/ManageUser/ManageUser";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        {/* main route */}
        <Route path="/" element={<Home></Home>}></Route>

        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/blogs" element={<Blogs></Blogs>}></Route>
        <Route path="/Portfolio" element={<Myportfolio></Myportfolio>}></Route>

        <Route
          path="/products"
          element={
            <RequireAuth>
              <Products></Products>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/clientsreview"
          element={<ClientsReview></ClientsReview>}
        ></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route
          path="/forgot"
          element={<ForgotPassword></ForgotPassword>}
        ></Route>
        <Route
          path="/updateProfile"
          element={<UpdateProfile></UpdateProfile>}
        ></Route>
        <Route path="/logout" element={<Logout></Logout>}></Route>
        <Route path="/admin" element={<AdminLogin></AdminLogin>}></Route>

        {/* user dashboard route */}

        <Route
          path="/dashboard"
          element={<DashbardHome></DashbardHome>}
        ></Route>

        {/* admin Dashboard Route */}

        {/* <Route
          path="/admindashboard"
          element={<AdminDashbardHome></AdminDashbardHome>}
        ></Route> */}

        <Route path="admindashboard" element={<AdminDashbardHome />}>
          <Route index element={<AddBanner></AddBanner>}></Route>
          <Route path="addBanner" element={<AddBanner></AddBanner>}></Route>
          <Route path="addBlogs" element={<AddBlogs></AddBlogs>}></Route>
          <Route
            path="addportfolio"
            element={<AddPortfolio></AddPortfolio>}
          ></Route>
          <Route path="addprofile" element={<Addprofile></Addprofile>}></Route>
          <Route path="myprofile" element={<Myprofile></Myprofile>}></Route>
          <Route
            path="manageallproduct"
            element={<ManageProduct></ManageProduct>}
          ></Route>
          <Route
            path="manageallorder"
            element={<ManageOrders></ManageOrders>}
          ></Route>
          <Route
            path="managereview"
            element={<ManageReviews></ManageReviews>}
          ></Route>
          <Route path="manageuser" element={<ManageUser></ManageUser>}></Route>
        </Route>

        {/* not found page route */}

        <Route path="*" element={<Notfound></Notfound>}></Route>
      </Routes>

      <Footer></Footer>

      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
