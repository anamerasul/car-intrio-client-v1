import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css";
import "./Banner.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3005/banners")
      .then((res) => res.json())
      .then((data) => {
        setBanners(data);
        setLoading(false);
      });
  }, []);
  return (
    <div className="relative bg-base-100 p-5">
      {banners.length === 0 ? (
        <Loading></Loading>
      ) : (
        <div className="h-[80vh] sm:h-[95vh] bg-teal-200 ">
          <Swiper className="mySwiper">
            {banners.map((banner) => (
              <SwiperSlide key={banner._id} className="bg-teal-300">
                <img className="w-25 bg-teal-300" src={banner.img} alt="" />

                {/* <h2 className="text-4xl bg-yellow-200 sm:text-6xl font-black text-green-700 z-50">
                            Welcome to fruits hub
                          </h2> */}

                <div className="h-[20vh] sm:h-[30vh] absolute top-5 left-10 mt-10 sm:top-16 sm:left-20 z-50 sm:mt-24 flex flex-col justify-between items-between">
                  <div>
                    <h2 className="text-4xl sm:text-6xl font-black text-white">
                      Welcome to car intrio
                    </h2>
                  </div>

                  <div></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <div className=" h-[20vh] sm:h-[30vh] absolute top-5 left-10 mt-10 sm:top-16 sm:left-20 z-50 sm:mt-24 flex flex-col justify-between items-between">
        <div>
          {/* <h2 className="text-4xl sm:text-6xl font-black text-green-700">
                      Welcome to fruits hub
                    </h2> */}
        </div>

        <div>
          {/* <Link
                      to="/manageinventory"
                      className=" w-full px-6 py-2 mt-4 text-white bg-orange-600 rounded-md hover:bg-orange-800"
                    >
                      Manage inventory
                    </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Banner;
