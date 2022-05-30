import React, { useEffect, useState } from "react";

const Myportfolio = () => {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    fetch(`https://calm-sierra-62921.herokuapp.com/portfolio`)
      .then((res) => res.json())
      .then((data) => {
        setPortfolio(data[0]);
      });
  }, []);

  console.log(portfolio);

  const {
    name,
    myskills,
    education,
    email,
    firstProjectLink,
    secondProjectLink,
    thirdProjectLink,
  } = portfolio;

  return (
    <div>
      <div className="bg-base-100">
        {/* {answers.length === 0 ? ( */}
        {/* <Loading></Loading>
      ) : ( */}
        <section className="px-4 pt-20 pb-24 mx-auto max-w-5xl md:px-2">
          <div className="">
            <div>
              <h1 className="mb-6 text-4xl  text-primary md:text-6xl font-bold">
                PORTFOLIO
              </h1>
              {/* {answers.map((data) => (
                <BlogsDiv key={data._id} data={data}></BlogsDiv>
              ))} */}

              <div className="text-left ">
                <h1 className="text-2xl text-white py-8 ">
                  NAME: <span className="text-accent-content">{name}</span>
                </h1>

                <h1 className="text-2xl text-white py-8 ">
                  EMAIL: <span className="text-accent-content">{email}</span>
                </h1>

                <h1 className="text-2xl text-white py-8 ">
                  EDUCATION:{" "}
                  <span className="text-accent-content">{education}</span>
                </h1>

                <h1 className="text-2xl text-white py-8 ">
                  SKILLS:{" "}
                  <span className="text-accent-content">{myskills}</span>
                </h1>

                <h1 className="text-2xl text-white py-8 ">MY PROJECTS</h1>

                <div className="flex justify-center gap-4 flex-grow-1">
                  <div className="text-sm px-5 text-white py-2 bg-primary rounded-box">
                    <a href={firstProjectLink}>PROJECT ONE</a>
                  </div>

                  <div className="text-sm px-5 text-white py-2 bg-primary rounded-box">
                    <a href={secondProjectLink}>PROJECT TWO</a>
                  </div>

                  <div className="text-sm px-5 text-white py-2 bg-primary rounded-box">
                    <a href={thirdProjectLink}>PROJECT THREE</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* )} */}
      </div>
    </div>
  );
};

export default Myportfolio;
