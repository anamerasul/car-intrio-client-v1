import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import BlogsDiv from "./BlogsDiv";

const Blogs = () => {
  const [answers, setAnswers] = useState([]);

  // const [urL] = UrlConfig(``);

  useEffect(() => {
    fetch(`http://localhost:3005/blogs`)
      .then((res) => res.json())
      .then((data) => {
        setAnswers(data);
      });
  }, []);

  console.log(answers);

  return (
    <div>
      <div className="bg-base-100">
        {answers.length === 0 ? (
          <Loading></Loading>
        ) : (
          <section className="px-4 pt-20 pb-24 mx-auto max-w-5xl md:px-2">
            <div className="">
              <div>
                <h1 className="mb-6 text-2xl  text-primary md:text-4xl font-bold">
                  Frequently asked question
                </h1>
                {answers.map((data) => (
                  <BlogsDiv key={data._id} data={data}></BlogsDiv>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Blogs;
