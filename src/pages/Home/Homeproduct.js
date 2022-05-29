import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Homeproduct = () => {
  const navigate = useNavigate();
  const [products, setProduct] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3005/products")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, []);

  console.log(products[0]);

  //   {
  //     image: "https://i.ibb.co/jWmgf5Z/1581952049.png";
  //     minorderquantity: "12153154";
  //     productdescription: "r0769487p";
  //     productname: "hhwhh";
  //     productprice: "59758657";
  //     productquantity: "372537";
  //     _id: "629260fddcc67b04e94e842f";
  //   }

  const navigatpurchase = (p) => {
    console.log(p);
    navigate("/products/" + p);
    //     /products/:id
  };
  return (
    <div className="py-5 ">
      <h2 className="text-4xl  font-bold">PARTS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-6 container ">
        {products.slice(0, 6).map((product) => (
          <div
            key={product._id}
            className="transform bg-teal-600  hover:-translate-y-3 to-hover hover:bg-accent text-center secondary-bg transition duration-300 rounded w-4/5 shadow-lg mx-auto p-6"
          >
            <div>
              <img
                className="mx-auto py-10 w-1/4 h-1/4   rounded-t"
                src={product?.image}
                alt=""
              />
              <h1 className="px-5 pt-5 text-2xl font-bold">
                NAME :{product?.productname}
              </h1>
              <p className="px-5 pt-5">
                Description : {product?.productdescription}
              </p>
              <p className="px-5 pt-5">price :{product?.productprice}</p>
              {/* <h4 className="px-5 pt-5">Deliverd:{DeliverdQuantiy}</h4> */}
            </div>

            <div className="mr-4">
              <button
                onClick={() => navigatpurchase(product._id)}
                id="btn"
                className=" w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-800"
              >
                See details for purchase
              </button>
            </div>
          </div>
        ))}
      </div>

      <Link className="bg-gray-800 text-white px-8 py-2 rounded" to="/products">
        SEE ALL PARTS
      </Link>
    </div>
  );
};

export default Homeproduct;
