import React, { useEffect } from "react";
import {
  useAuthState,
  useSignInWithGoogle,
  useSignInWithGithub,
} from "react-firebase-hooks/auth";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../../../firebase/firebase.init";
import UseToken from "../../../Hooks/UseToken";

const SocialLogin = () => {
  const [signInWithGoogle, googleuser, googleloading, googleerror] =
    useSignInWithGoogle(auth);

  const [signInWithGithub, githubuser, githubloading, githuberror] =
    useSignInWithGithub(auth);
  const [user, loading, error] = useAuthState(auth);
  console.log(googleuser);
  if (googleuser) {
    console.dir(googleuser);
  }

  let navigate = useNavigate();
  let location = useLocation();
  const from = location.state?.form?.pathname || "/";
  const handlegoogleSign = () => {
    signInWithGoogle();
  };

  const handlegithubSign = () => {
    //     console.log("github");
    signInWithGithub();
  };

  //   if (user) {
  //     const url = `https://fruitshub-server.onrender.com/login`;

  //     fetch(url, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         email: user.email,
  //       }),
  //       headers: {
  //         "Content-type": "application/json; charset=UTF-8",
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         localStorage.setItem("accessToken", data.accessToken); // l
  //       });

  //     setTimeout(() => {
  //       if (user) {
  //         navigate(from, { replace: true });
  //       }
  //     }, 2);
  //     // navigate(from, { replace: true })
  //   }

  //   useEffect(() => {
  //     if (user) {
  //       navigate(from, { replace: true });
  //     }
  //   }, [user, navigate, from]);

  if (user) {
    const url = `https://calm-sierra-62921.herokuapp.com/login`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: user.email,
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
  const [token] = UseToken(googleuser || githubuser);

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  return (
    <div className="flex justify-center mt-4">
      <div className="mr-4">
        <button onClick={handlegoogleSign}>
          <FcGoogle className="text-2xl"></FcGoogle>
        </button>
      </div>

      <div>
        <button onClick={handlegithubSign}>
          <BsGithub className="text-2xl"></BsGithub>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
