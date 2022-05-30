import React, { useEffect, useState } from "react";
import Rating from "react-rating";
import { FcRating } from "react-icons/fc";
import { Link } from "react-router-dom";

const HomeReview = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://calm-sierra-62921.herokuapp.com/addreviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  console.log(reviews);

  return (
    <div className="py-6">
      <h2 className=" py-5 text-center text-4xl font-bold text-gray-700">
        User Review
      </h2>
      <p className="text-white pb-10">
        Some of our valuable custome left some review for us
      </p>
      <div className=" mx-auto grid gap-8 grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-5/6 pb-24">
        {reviews.slice(0, 3).map((review) => (
          <div
            key={review._id}
            className="mx-auto bg-gray-50 shadow-xl rounded-box py-8 w-full"
          >
            <img
              className="rounded-full h-20 mx-auto"
              src={review.image}
              alt=""
            />
            <h2 className="my-3 font-bold"> {review.name} </h2>

            <h2 className="my-3 w-4/6 mx-auto">
              Reviews: {review.description}{" "}
            </h2>

            <div className="mx-auto w-1/4">
              Rating
              <div className="flex">
                {review.ratings === "5" ? (
                  <div className="flex">
                    <FcRating className="text-6xl" color="red" size="30px" />
                    <FcRating className="text-6xl" color="red" size="30px" />
                    <FcRating className="text-6xl" color="red" size="30px" />
                    <FcRating className="text-6xl" color="red" size="30px" />
                    <FcRating className="text-6xl" color="red" size="30px" />
                  </div>
                ) : (
                  ""
                )}

                {review.ratings === "4" ? (
                  <div className="flex">
                    <FcRating className="text-6xl" color="red" size="30px" />
                    <FcRating className="text-6xl" color="red" size="30px" />
                    <FcRating className="text-6xl" color="red" size="30px" />
                    <FcRating className="text-6xl" color="red" size="30px" />
                  </div>
                ) : (
                  ""
                )}

                {review.ratings === "3" ? (
                  <div className="flex">
                    <FcRating className="text-6xl" color="red" size="30px" />
                    <FcRating className="text-6xl" color="red" size="30px" />
                    <FcRating className="text-6xl" color="red" size="30px" />
                  </div>
                ) : (
                  ""
                )}

                {review.ratings === "2" ? (
                  <div className="flex">
                    <FcRating className="text-6xl" color="red" size="30px" />
                    <FcRating className="text-6xl" color="red" size="30px" />
                  </div>
                ) : (
                  ""
                )}

                {review.ratings === "1" ? (
                  <div className="flex">
                    <FcRating className="text-6xl" color="red" size="30px" />
                  </div>
                ) : (
                  ""
                )}

                {review.ratings === "0" || !review.ratings ? (
                  <div className="flex">
                    <h1>No ratings</h1>
                  </div>
                ) : (
                  ""
                )}

                {/* <FcRating className="text-white"></FcRating>
                <FcRating></FcRating>
                <FcRating></FcRating>
                <FcRating></FcRating>
                <FcRating></FcRating> */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link
        className="bg-gray-800 text-white px-8 py-2 rounded"
        to="/clientsreview"
      >
        SEE ALL REVIEWS
      </Link>
    </div>
  );
};

export default HomeReview;
