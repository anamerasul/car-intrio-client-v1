import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import auth from "../../../firebase/firebase.init";

const Addprofile = () => {
  const [user] = useAuthState(auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName(user?.displayName);
    setEmail(user?.email);
  }, []);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmitPorfile = (data) => {
    console.log(data, user?.email);

    console.log([user?.email]);

    const addProfileInfo = { data, useremail: user?.email };
    console.log(addProfileInfo);

    console.log(JSON.stringify(addProfileInfo));

    fetch("http://localhost:3005/addProfile", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `${user?.email} ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(addProfileInfo),
    })
      .then((res) => res.json())
      .then((inserted) => {
        if (inserted.insertedId) {
          toast.success("Profile added successfully");
          reset();
        } else {
          toast.error("Failed to add the Profile");
        }
      });
  };
  return (
    <div className="px-8 py-12 w-4/5  mx-4 mt-4 text-left bg-white my-0 ">
      <h3 className="text-2xl  font-bold text-teal-600 text-center">
        ADD PROFILE DETAILS
      </h3>

      <form onSubmit={handleSubmit(onSubmitPorfile)} action="">
        <div className="mt-4">
          <div>
            <label className="block" htmlFor="Name">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("name", {
                required: {
                  value: true,
                  message: "name is required",
                },
              })}
            />
          </div>

          <div>
            <label className="block" htmlFor="email">
              email
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("email", {
                required: {
                  value: true,
                  message: "email is required",
                  pattern:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                },
              })}
            />
          </div>

          <div>
            <label className="block" htmlFor="Education">
              Education
            </label>
            <textarea
              type="text"
              name="education"
              placeholder="Education"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("education", {
                required: {
                  value: true,
                  message: "education is required",
                },
              })}
            />
          </div>

          <div>
            <label className="block" htmlFor="location">
              Location
            </label>
            <textarea
              type="text"
              name="location"
              placeholder="location"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("location", {
                required: {
                  value: true,
                  message: "location is required",
                },
              })}
            />
          </div>

          <div>
            <label className="block" htmlFor="phonenumber">
              phone number
            </label>
            <input
              type="number"
              name="phonenumber"
              placeholder="phonenumber"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("phonenumber", {
                required: {
                  value: true,
                  message: "phonenumber is required",
                },
              })}
            />
          </div>

          <div>
            <label className="block" htmlFor="LinkedInprofile">
              LinkedIn profile
            </label>
            <input
              type="url"
              name="LinkedInprofile"
              placeholder="LinkedInprofile"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("LinkedInprofile", {
                required: {
                  value: true,
                  message: "SecondProjectLink is required",
                },
              })}
            />
          </div>
          <div className="flex">
            <input
              style={{ cursor: "pointer" }}
              type="submit"
              className="w-1/10 mx-auto px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
              value="ADD PROFILE"
            />
          </div>
        </div>
      </form>
      <div className="mt-6 text-grey-dark"></div>
    </div>
  );
};

export default Addprofile;
