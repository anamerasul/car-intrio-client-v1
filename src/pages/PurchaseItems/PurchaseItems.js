import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { set, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import auth from "../../firebase/firebase.init";

const PurchaseItems = () => {
  const itemsid = useParams();

  const [loading, setLoading] = useState(false);

  const [user] = useAuthState(auth);
  const { id } = itemsid;
  const [error, setError] = useState("");

  //   console.log(id);

  const [product, setProduct] = useState([]);
  const [myprice, setMyprice] = useState(0);
  const [paymentinfo, setPaymentinfo] = useState("false");

  const [stockquantity, setStockquantity] = useState(0);
  useEffect(() => {
    fetch(`https://calm-sierra-62921.herokuapp.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, [loading]);

  //   console.log(product);

  let {
    image,
    minorderquantity,
    productdescription,
    productname,
    productprice,
    productquantity,
  } = product;

  console.log(+minorderquantity);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmitpurchase = (mydata) => {
    setLoading(false);
    setPaymentinfo("false");
    //     console.log(mydata);

    if (mydata.mypurchasequantity < +minorderquantity) {
      toast.error("Minimum order quantity is " + minorderquantity);
      setMyprice(myprice);
      setError("Minimum order quantity is " + minorderquantity);

      return;
    }

    setMyprice(mydata.mypurchasequantity * productprice);

    const totalPrice = mydata.mypurchasequantity * productprice;

    setStockquantity(mydata.mypurchasequantity);

    const { mypurchasequantity } = mydata;

    const email = user?.email;

    const order = {
      email,
      mypurchasequantity,
      totalPrice,
      productname,
      image,
      paymentinfo,
    };

    const payment = {
      email,
      mypurchasequantity,
      totalPrice,
      productname,
      image,
      paymentinfo,
    };

    console.log(order);

    console.log({
      email,
      mypurchasequantity,
      myprice,
      productname,
      image,
      paymentinfo,
    });

    const previousproductquantity = productquantity;

    console.log(previousproductquantity);

    const newproductquantity = previousproductquantity - mypurchasequantity;

    //     const productquantity=productquantity-mypurchasequantity;

    productquantity = newproductquantity;

    const data = {
      image,
      minorderquantity,
      productdescription,
      productname,
      productprice,
      productquantity,
    };

    console.log(JSON.stringify(data));

    //     updateProductQuantity(mydata.mypurchasequantity);

    fetch(`https://calm-sierra-62921.herokuapp.com/products/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `${user?.email} ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((inserted) => {
        if (inserted) {
          setLoading(true);
          toast.success("Product update successfully");
        } else {
          toast.error("Failed to update the Profile");
        }
      });

    fetch(`https://calm-sierra-62921.herokuapp.com/adduserorder`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `${user.email} ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((inserted) => {
        if (inserted.insertedId) {
          toast.success("product add to user successfully");
        } else {
          toast.error("Failed to add the product to user");
        }
      });

    fetch(`https://calm-sierra-62921.herokuapp.com/payment`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `${user.email} ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(payment),
    })
      .then((res) => res.json())
      .then((inserted) => {
        if (inserted.insertedId) {
          toast.success("payment info to user successfully");
        } else {
          toast.error("Failed to add the product to user");
        }
      });

    reset();
  };

  return (
    <div className="bg-base-100 p-10">
      <h2 className="text-4xl py-4 font-bold">Purchase Items</h2>
      <div className="py-5">
        {/* <label htmlFor="my-modal-6" className="btn modal-button">
          USER INFORMATION
        </label>
        <input type="checkbox" id="my-modal-6" class="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">NAME:{user?.displayName}</h3>
            <p className="py-4">email:{user?.email}</p>
            <img
              className="h-[60px] w-[60px] "
              style={{ borderRadius: "50%" }}
              src={user?.photoURL}
              alt=""
            />

            <div className="modal-action">
              <label htmlFor="my-modal-6" class="btn btn-info">
                close
              </label>
            </div>
          </div>
        </div> */}
      </div>
      <div className="transform bg-teal-300  hover:-translate-y-3 to-hover hover:bg-green-800 text-center secondary-bg transition duration-300 rounded w-full sm:w-1/2 shadow-lg mx-auto p-4">
        <div>
          <img
            className="mx-auto py-10 w-1/4 h-1/4  rounded-t"
            src={image}
            alt=""
          />
          <h1 className="px-5 pt-5 text-2xl font-bold hover:text-blue-100">
            NAME :{productname}
          </h1>
          <p className="px-5 pt-5">Description : {productdescription}</p>
          <p className="px-5 pt-5">Price $ :{productprice}</p>
          <h4 className="px-5 pt-5">
            Available:{productquantity - stockquantity} piece
          </h4>

          <h4 className="px-5 pt-5">MinOrder: {minorderquantity} piece</h4>
        </div>

        <h1 className="text-4xl py-4">ORDER FROM</h1>

        <div className="border border-blue-900 p-4">
          <form onSubmit={handleSubmit(onSubmitpurchase)} action="">
            <div className="mt-4">
              <div>
                <label className="block" htmlFor="question">
                  NAME:
                </label>
                <input
                  type="text"
                  readOnly
                  value={user?.displayName}
                  name="name"
                  placeholder="name"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "mypurchasequantity is required",
                    },
                  })}
                />
              </div>
              <div>
                <label className="block" htmlFor="question">
                  Email:
                </label>
                <input
                  type="email"
                  readOnly
                  value={user?.email}
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "email is required",
                    },
                  })}
                />
              </div>
              <div>
                <div>
                  <label className="block" htmlFor="question">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="address"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    {...register("address", {
                      required: {
                        value: true,
                        message: "address is required",
                      },
                    })}
                  />
                </div>
                <div>
                  <label className="block" htmlFor="question">
                    Phone:
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="phone"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    {...register("phone", {
                      required: {
                        value: true,
                        message: "phone is required",
                      },
                    })}
                  />
                </div>
                <label className="block" htmlFor="question">
                  Quantity:
                </label>
                <input
                  type="number"
                  name="mypurchasequantity"
                  placeholder="mypurchasequantity"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  {...register("mypurchasequantity", {
                    required: {
                      value: true,
                      message: "mypurchasequantity is required",
                    },
                  })}
                />
              </div>
              {myprice !== 0 && (
                <p className="px-5 pt-5">Total Price $ :{myprice}</p>
              )}
              <p className="text-red-700 text-md">{error}</p>
              <div className="flex">
                <input
                  style={{ cursor: "pointer" }}
                  type="submit"
                  className="w-1/10 mx-auto px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                  value="PURCHASE"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="mr-4"></div>
        <div className="mr-4"></div>
      </div>
    </div>
  );
};

export default PurchaseItems;
