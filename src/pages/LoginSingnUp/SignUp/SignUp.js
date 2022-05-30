import React, { useEffect, useState } from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase/firebase.init";
import UseToken from "../../../Hooks/UseToken";
import SocialLogin from "../SocialLogin/SocialLogin";

const SignUp = () => {
  const [displayName, setDisplayName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [name, setName] = useState("");

  const [verifysms, setVerifysms] = useState("");
  const [previousemail, setPreviousemail] = useState("");

  const navigate = useNavigate();

  const location = useLocation();

  // const [updateProfile] = useUpdateProfile(auth);

  const [updateProfile, updating] = useUpdateProfile(auth);

  const [createUserWithEmailAndPassword, user, loading, createerror] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

  const [alredeyuser] = useAuthState(auth);

  const [sendEmailVerification, sending, verifyerror] =
    useSendEmailVerification(auth);

  const [token] = UseToken(user);

  const handleCreateUser = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confrimpassword.value;

    if (!name) {
      setError("give your name");
      toast.error(error);
      return;
    }

    if (!email) {
      setError("give your email");
      toast.error(error);
      return;
    }

    if (!password) {
      setError("give your password");
      toast.error(error);
      return;
    }

    if (password.length < 8) {
      setError("password must be 8 charecter long");
      toast.error(error);
      return;
    }

    if (password !== confirmPassword) {
      setError("your password didnot match");
      toast.error(error);
      return;
    }

    if (!email && !password) {
      if (password !== confirmPassword) {
        return false;
      }
    }

    if (email === previousemail) {
      toast.error("user already exists");
      navigate("/login");
      return false;
    }
    await createUserWithEmailAndPassword(email, password);

    // verifingEmail();
    await updateProfile({ displayName: name });

    e.target.reset();
  };
  let from = location.state?.form?.pathname || "/";
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user]);

  console.log(alredeyuser?.email);

  useEffect(() => {
    setPreviousemail(alredeyuser?.email);
  }, [alredeyuser]);

  console.log(previousemail);

  console.log(email);

  if (alredeyuser) {
    const url = `https://calm-sierra-62921.herokuapp.com/login`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: alredeyuser.email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("accessToken", data.accessToken); // l

        navigate(from, { replace: true });
      });
  }

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  return (
    <div className="flex items-center justify-center bg-blue-400">
      <div className="px-8 py-6 mx-4 mt-4 text-left bg-white md:w-1/3 lg:w-1/3 sm:w-1/3 my-10 opacity-100">
        <h3 className="text-2xl font-bold text-teal-600 text-center">
          Create a user
        </h3>
        <form onSubmit={handleCreateUser} action="">
          <div className="mt-4">
            <div>
              <label className="block text-gray-900" htmlFor="Name">
                Name
              </label>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                type="text"
                name="name"
                placeholder="Name"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600"
              />
            </div>

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
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600"
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
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600"
              />
            </div>
            <div className="mt-4">
              <label className="block">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                name="confrimpassword"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600"
              />
            </div>
            <span className="text-xs text-red-800">{error}</span>
            <div className="flex">
              <input
                onClick={async () => {
                  if (!email) {
                    return;
                  }

                  if (!password) {
                    return;
                  }

                  if (password !== confirmPassword) {
                    return;
                  }

                  if (email === previousemail) {
                    return;
                  }
                  await sendEmailVerification();
                  toast.success("verification sent to your email");
                }}
                style={{ cursor: "pointer" }}
                type="submit"
                className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                value="Create Account"
              />
            </div>
            <div className="mt-6 text-dark">
              Already have an account?
              <Link
                to="/login"
                className="text-blue-600 hover:underline mx-4"
                href="#"
              >
                Log in
              </Link>
            </div>
          </div>
        </form>

        <div className="mt-4">
          <h2 className="text-center text-sm">
            Sign Up using your Social Account
          </h2>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
