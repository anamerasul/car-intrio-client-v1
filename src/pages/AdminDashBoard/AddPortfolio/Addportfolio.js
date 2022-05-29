import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import auth from "../../../firebase/firebase.init";

const Addportfolio = () => {
  const [user] = useAuthState(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmitPortfolio = (data) => {
    console.log(data);

    fetch("http://localhost:3005/portfolio", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `${user.email} ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((inserted) => {
        if (inserted.insertedId) {
          toast.success("portfolio added successfully");
          reset();
        } else {
          toast.error("Failed to add the portfolio");
        }
      });
  };
  return (
    <div className="px-8 py-12 w-4/5 mx-4 mt-4 text-left bg-white my-0 ">
      <h3 className="text-2xl  font-bold text-teal-600 text-center">
        ADD PORTFOLIO
      </h3>

      <form onSubmit={handleSubmit(onSubmitPortfolio)} action="">
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
            <label className="block" htmlFor="Skills">
              Skills
            </label>
            <textarea
              type="text"
              name="skills"
              placeholder="skills"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("myskills", {
                required: {
                  value: true,
                  message: "skills is required",
                },
              })}
            />
          </div>

          <div>
            <label className="block" htmlFor="firstProjectLink">
              First project Link
            </label>
            <input
              type="url"
              name="firstProjectLink"
              placeholder="firstProjectLink"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("firstProjectLink", {
                required: {
                  value: true,
                  message: "firstProjectLink is required",
                },
              })}
            />
          </div>

          <div>
            <label className="block" htmlFor="secondProjectLink">
              Second project Link
            </label>
            <input
              type="url"
              name="secondProjectLink"
              placeholder="secondProjectLink"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("secondProjectLink", {
                required: {
                  value: true,
                  message: "SecondProjectLink is required",
                },
              })}
            />
          </div>

          <div>
            <label className="block" htmlFor="thirdProjectLink">
              Third project Link
            </label>
            <input
              type="url"
              name="thirdProjectLink"
              placeholder="thirdProjectLink"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("thirdProjectLink", {
                required: {
                  value: true,
                  message: "thirdProjectLink is required",
                },
              })}
            />
          </div>

          <div className="flex">
            <input
              style={{ cursor: "pointer" }}
              type="submit"
              className="w-1/10 mx-auto px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
              value="ADD PORTFOLIO"
            />
          </div>
        </div>
      </form>
      <div className="mt-6 text-grey-dark"></div>
    </div>
  );
};

export default Addportfolio;
