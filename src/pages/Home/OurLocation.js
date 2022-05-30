import React from "react";

const OurLocation = () => {
  return (
    <div className="bg-base-100  py-10">
      <h2 className="text-2xl md:text-4xl font-black my-4 py-5">
        OUR LOCATION
      </h2>

      <section className="text-gray-400 bg-gray-900 body-font relative">
        <div className="absolute inset-0 bg-gray-900">
          <iframe
            title="map"
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            scrolling="no"
            src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
          ></iframe>
        </div>
        <div className="py-24 mx-auto  flex">
          <div className="lg:w-1/3 md:w-1/2 bg-teal-200 shadow-md rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10">
            <h2 className="text-lg mb-1 font-medium text-gray-900 title-font">
              Contact
            </h2>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full  rounded border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="message"
                className="leading-7 text-sm text-gray-900"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full rounded border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
            <button className="text-White transition duration-300 btn btn-primary border-0 py-2 px-6 focus:outline-none hover:bg-blue-800 rounded text-lg">
              SEND US EMAIL
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurLocation;
