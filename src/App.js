import logo from "./logo.svg";
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

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
      <Routes>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
      </Routes>
      <Routes>
        <Route
          path="/forgot"
          element={<ForgotPassword></ForgotPassword>}
        ></Route>
      </Routes>
      <Routes>
        <Route path="/logout" element={<Logout></Logout>}></Route>
      </Routes>
      <Footer></Footer>

      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
