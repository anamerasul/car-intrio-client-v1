import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import auth from "../../../firebase/firebase.init";

const Addproduct = () => {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();
  const imageStorageKey = "547777b53a726388980a714cfc13077b";

  useEffect(() => {}, []);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onAddProduct = async (mydata) => {
    console.log(mydata.image[0]);

    console.log(mydata.productprice);

    console.log(mydata);

    const image = mydata.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const image = result.data.url;
          const product = {
            image: image,
            minorderquantity: mydata.minorderquantity,
            productdescription: mydata.productdescription,
            productname: mydata.productname,
            productprice: mydata.productprice,
            productquantity: mydata.productquantity,
          };

          console.log(product);

          // send to your database
          fetch("http://localhost:3005/products", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `${user?.email} ${localStorage.getItem(
                "accessToken"
              )}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((inserted) => {
              if (inserted.insertedId) {
                toast.success("product added successfully");
                reset();
              } else {
                toast.error("Failed to add the product");
              }
            });
navigate('/admindashboard/manageallproduct')
          // console.log(JSON.stringify(addProfileInfo));
        }
      });
  };

  //     <div>
  //       {yes && (
  //         <div className="bg-white w-1/2 mt-24 mr-48 md:mr-0 md:w-1/4 mx-auto  absolute top-20 md:mt-20 left-50 p-12">
  //           <h2>SURE TO Delete</h2>
  //           <button className="btn btn-danger" onClick={handleYes}>
  //             Yes
  //           </button>
  //           <button className="btn btn-primary" onClick={handleNo}>
  //             NO
  //           </button>
  //         </div>
  //       )}

  //       {!yes && <button onClick={handleDelete}>DELETE</button>}
  //     </div>
  return (
    <div className="px-8 py-12 w-4/5  mx-4 mt-4 text-left bg-white my-0 ">
      <h3 className="text-2xl  font-bold text-teal-600 text-center">
        ADD PRODUCT
      </h3>

      <form onSubmit={handleSubmit(onAddProduct)} action="">
        <div className="mt-4">
          <div>
            <label className="block" htmlFor="Name">
              Product Name
            </label>
            <input
              type="text"
              name="productname"
              placeholder="productname"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("productname", {
                required: {
                  value: true,
                  message: "productname is required",
                },
              })}
            />

            <label className="block" htmlFor="Name">
              Product Description
            </label>
            <textarea
              type="text"
              name="productdescription"
              placeholder="productdescription"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("productdescription", {
                required: {
                  value: true,
                  message: "productdescription is required",
                },
              })}
            />

            <label className="hidden" htmlFor="productimage">
              Product Image
            </label>
            <input
              type="file"
              name="photo"
              placeholder="photourl"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("image", {
                required: {
                  value: true,
                  message: "productimage is Required",
                },
              })}
            />

            <label className="block" htmlFor="Name">
              Product price
            </label>
            <input
              type="number"
              name="productprice"
              placeholder="productprice"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("productprice", {
                required: {
                  value: true,
                  message: "productname is required",
                },
              })}
            />

            <label className="block" htmlFor="Name">
              Product quantity
            </label>
            <input
              type="number"
              name="productquantity"
              placeholder="productquantity"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("productquantity", {
                required: {
                  value: true,
                  message: "productquantity is required",
                },
              })}
            />

            <label className="block" htmlFor="Name">
              Min order quantity
            </label>
            <input
              type="number"
              name="minorderquantity"
              placeholder="minorderquantity"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("minorderquantity", {
                required: {
                  value: true,
                  message: "minorderquantity is required",
                },
              })}
            />
          </div>
          <div className="flex">
            <input
              style={{ cursor: "pointer" }}
              type="submit"
              className="w-1/10 mx-auto px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
              value="ADD PRODUCT"
            />
          </div>
        </div>
      </form>
      <div className="mt-6 text-grey-dark"></div>
    </div>
  );
};

export default Addproduct;
