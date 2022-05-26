import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";

import { toast } from "react-toastify";
import auth from "../../../firebase/firebase.init";
import { useForm } from "react-hook-form";

const AddBanner = () => {
  const [user] = useAuthState(auth);
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [updateProfile] = useUpdateProfile(auth);

  const navigate = useNavigate();

  const location = useLocation();
  const imageStorageKey = "547777b53a726388980a714cfc13077b";

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const image = data.image[0];

    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const img = result.data.url;
          const photoURL = {
            img: img,
          };
          // send to your database
          setPhotoURL(photoURL.img);
        }
      });

    //     handleUpdateProfile();
  };

  //   console.log(photoURL);

  const handleBannerUpload = (e) => {
    e.preventDefault();

    const banners = {
      img: photoURL,
    };

    // send to your database
    fetch("http://localhost:3005/banner", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `${user.email} ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(banners),
    })
      .then((res) => res.json())
      .then((inserted) => {
        if (inserted.insertedId) {
          toast.success("Banner successfully uploaded");

          navigate("/admin", { replace: true });
          reset();
        } else {
          toast.error("Failed to upload banner");
        }
      });

    reset();
  };

  return (
    <div>
      <div className="flex items-center justify-center bg-blue-400">
        <div className="px-8 py-6 mx-4 mt-4 text-left bg-white my-10">
          <h3 className="text-2xl font-bold text-teal-600 text-center">
            UPLOAD BANNER
          </h3>

          <form onSubmit={handleBannerUpload} action="">
            <div className="mt-4">
              {photoURL && (
                <div>
                  <label className="block" htmlFor="PhotoUrl">
                    photo
                  </label>
                  <input
                    value={photoURL}
                    type="text"
                    readOnly
                    name="photo"
                    placeholder="photourl"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              )}

              <div className="flex">
                {photoURL && (
                  <input
                    style={{ cursor: "pointer" }}
                    type="submit"
                    disabled={!photoURL}
                    className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    value="UPLOAD BANNER"
                  />
                )}
              </div>
            </div>
          </form>

          {!photoURL && (
            <form onSubmit={handleSubmit(onSubmit)} action="">
              <div className="mt-4">
                <div>
                  <label className="hidden" htmlFor="PhotoUrl">
                    photo
                  </label>
                  <input
                    onChange={(e) => setPhotoURL(photoURL)}
                    type="file"
                    name="photo"
                    placeholder="photourl"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    {...register("image", {
                      required: {
                        value: true,
                        message: "Image is Required",
                      },
                    })}
                  />
                </div>
                <div className="flex">
                  <input
                    style={{ cursor: "pointer" }}
                    type="submit"
                    className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                    value="Upload your image"
                  />
                </div>
              </div>
            </form>
          )}

          {/* <button
          onClick={handleboth}
          className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
        >
          Update
        </button> */}

          {/* <div className="mt-6 text-grey-dark">
          reset your password
          <Link
            to="/forgotpassword"
            className="text-blue-600 hover:underline mx-4"
            href="#"
          >
            Reset password
          </Link> */}

          <div className="mt-6 text-grey-dark"></div>
        </div>
      </div>
    </div>
  );
};

export default AddBanner;
