import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../../firebase/firebase.init";

const UserOrder = () => {
  const [user] = useAuthState(auth);

  const [order, setOrder] = useState([]);
  const [paymentinfo, setPaymentinfo] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(
      `https://calm-sierra-62921.herokuapp.com/adduserorder/${user?.email}`,
      {
        headers: {
          authorization: `${user?.email} ${localStorage.getItem(
            "accessToken"
          )}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
      });
  }, [loading]);

  useEffect(() => {
    fetch(`https://calm-sierra-62921.herokuapp.com/payment/${user?.email}`, {
      headers: {
        authorization: `${user?.email} ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPaymentinfo(data);
      });
  }, []);

  console.log(order);
  console.log(paymentinfo);
  const makepayment = (paymentinfo) => {
    //   console.log(paymentinfo);
    //   fetch(`https://calm-sierra-62921.herokuapp.com/payment`, {
    //     method: "PUT",
    //     headers: {
    //       "content-type": "application/json",
    //       authorization: `${user?.email} ${localStorage.getItem("accessToken")}`,
    //     },
    //     body: JSON.stringify(paymentinfo),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       if (data.modifiedCount > 0) {
    //         toast.success("Successfully made a payment");
    //       }
    //     });
  };
  const deleteOrder = (order) => {
    const procced = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (procced) {
      console.log(order._id);
      fetch(
        `https://calm-sierra-62921.herokuapp.com/deleteorder/${order._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `${user?.email} ${localStorage.getItem(
              "accessToken"
            )}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            setLoading(true);
            toast.success("Successfully deleted an order");
          }
        });
    }
  };
  return (
    <div className="p-2">
      <h2 className="text-2xl bg-primary p-2 text-white">
        My Orders with payment info
      </h2>
      <div className="overflow-x-auto bg-slate-300">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>ORDER QUANTIY</th>
              <th>TOTAL PRICE</th>
              <th>PAYMENT INFO</th>
              <th>DELETE PRODUCT</th>
            </tr>
          </thead>
          <tbody>
            {order?.map((order) => (
              <tr>
                <td>{order?.productname}</td>
                <td>{order?.mypurchasequantity}</td>
                <td>{order?.totalPrice}</td>
                <td>
                  {order?.paymentinfo === "false" && (
                    <button
                      onClick={() => makepayment()}
                      class="btn btn-xs text-white"
                    >
                      UNPAID
                    </button>
                  )}

                  {order?.paymentinfo === "true" && (
                    <button class="btn btn-xs text-white">PAID</button>
                  )}
                </td>

                <td>
                  <button
                    onClick={() => deleteOrder(order)}
                    class="btn btn-xs text-white"
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              {/* <td>NAME</td>

              email: "mdanamerasul@gmail.com"
image: "https://i.ibb.co/1fv5tRw/1581952049.png"
mypurchasequantity: "12"
paymentinfo: false
productname: "tire"
totalPrice: 1452
              <td>
                <button class="btn btn-xs text-white">Make Admin</button>
                <button class="btn btn-warning btn-xs">Remove Admin</button>
              </td>
              <td>
                <button class="btn btn-info btn-xs">Remove User</button>
              </td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserOrder;
