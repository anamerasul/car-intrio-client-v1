import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import auth from "../../firebase/firebase.init";

const PurchaseItems = () => {
  const itemsid = useParams();

  const [loading, setLoading] = useState(false);

  const [user] = useAuthState(auth);
  const { id } = itemsid;

  //   console.log(id);

  const [product, setProduct] = useState([]);
  const [myprice, setMyprice] = useState(0);
  const [paymentinfo, setPaymentinfo] = useState("false");

  const [stockquantity, setStockquantity] = useState(0);
  useEffect(() => {
    fetch(`http://localhost:3005/products/${id}`)
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

    fetch(`http://localhost:3005/products/${id}`, {
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

    fetch(`http://localhost:3005/adduserorder`, {
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

    fetch(`http://localhost:3005/payment`, {
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
          <h4 className="px-5 pt-5">Stock:{productquantity - stockquantity}</h4>

          <h4 className="px-5 pt-5">MinOrder:{minorderquantity}</h4>
        </div>

        <div>
          <form onSubmit={handleSubmit(onSubmitpurchase)} action="">
            <div className="mt-4">
              <div>
                <h1>Total price after purchase: ${myprice}</h1>
                <label className="block" htmlFor="question">
                  Puchasing items
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
