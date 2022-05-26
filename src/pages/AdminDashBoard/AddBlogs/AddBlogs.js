import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddBlogs = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmitQuestion = (data) => {
    fetch("http://localhost:3005/blogs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((inserted) => {
        if (inserted.insertedId) {
          toast.success("Question added successfully");
          reset();
        } else {
          toast.error("Failed to add the Question and answer");
        }
      });
  };
  return (
    // <div className="flex items-center justify-center w-full bg-blue-400">
    <div className="px-8 py-6 w-3/4 mx-4 mt-4 text-left bg-white my-10">
      <h3 className="text-2xl  font-bold text-teal-600 text-center">
        ADD BLOGS
      </h3>

      <form onSubmit={handleSubmit(onSubmitQuestion)} action="">
        <div className="mt-4">
          <div>
            <label className="block" htmlFor="question">
              Question
            </label>
            <input
              type="text"
              name="question"
              placeholder="question"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("question", {
                required: {
                  value: true,
                  message: "question is required",
                },
              })}
            />
          </div>
          <div>
            <label className="block" htmlFor="answer">
              Answer
            </label>
            <textarea
              type="text"
              name="question"
              placeholder="answer"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("answer", {
                required: {
                  value: true,
                  message: "answer is required",
                },
              })}
            />
          </div>
          <div className="flex">
            <input
              style={{ cursor: "pointer" }}
              type="submit"
              className="w-1/10 mx-auto px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
              value="ADD BLOGS"
            />
          </div>
        </div>
      </form>
      <div className="mt-6 text-grey-dark"></div>
    </div>
    // </div>
  );
};

export default AddBlogs;
