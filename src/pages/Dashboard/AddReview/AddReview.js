import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import auth from "../../../firebase/firebase.init";

const AddReview = () => {
  const [user] = useAuthState(auth);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmitQuestion = (data) => {
    if (data.ratings > 5) {
      toast.error("Ratings should be less than 5");

      return;
    }

    console.log(data);

    const addreviews = {
      ratings: data.ratings,
      description: data.description,
      image: user?.photoURL,
      email: user?.email,
      name: user?.displayName,
    };

    console.log(addreviews);

    //     const adduserProfileInfo = { data, useremail: user?.email };
    //     console.log(adduserProfileInfo);

    //     console.log(JSON.stringify(adduserProfileInfo));

    fetch("http://localhost:3005/addreviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `${user?.email} ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(addreviews),
    })
      .then((res) => res.json())
      .then((inserted) => {
        if (inserted.insertedId) {
          toast.success("Review succesfuly added successfully");
          reset();
        } else {
          toast.error("Failed to add the Profile");
        }
      });

    fetch("http://localhost:3005/blogs", {
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
          toast.success("reviews added successfully");
          reset();
        } else {
          toast.error("Reviews to error");
        }
      });
  };
  return (
    <div className="px-8 py-6 w-3/4 mx-4 mt-4 text-left bg-white my-10">
      <h3 className="text-2xl  font-bold text-teal-600 text-center">
        ADD REVIEWS
      </h3>

      <form onSubmit={handleSubmit(onSubmitQuestion)} action="">
        <div className="mt-4">
          <div>
            <label className="block" htmlFor="question">
              Ratings
            </label>
            <input
              type="number"
              name="ratings"
              placeholder="ratings"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("ratings", {
                required: {
                  value: true,
                  maxLength: 5,
                  message: "ratings is required",
                },
              })}
            />
          </div>
          <div>
            <label className="block" htmlFor="answer">
              Description
            </label>
            <textarea
              type="text"
              name="description"
              placeholder="answer"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("description", {
                required: {
                  value: true,
                  message: "description is required",
                },
              })}
            />
          </div>
          <div className="flex">
            <input
              style={{ cursor: "pointer" }}
              type="submit"
              className="w-1/10 mx-auto px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
              value="ADD Review"
            />
          </div>
        </div>
      </form>
      <div className="mt-6 text-grey-dark"></div>
    </div>
  );
};

export default AddReview;
