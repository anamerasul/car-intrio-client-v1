import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase/firebase.init";
import { FaUsers, FaProductHunt, FaOpencart } from "react-icons/fa";
import { FcRating } from "react-icons/fc";

const BusinessSumary = () => {
  const [authuser] = useAuthState(auth);

  const [users, setUsers] = useState([]);

  const [products, setProducts] = useState([]);

  const [orders, setOrders] = useState([]);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3005/addreviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3005/adduserorder`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3005/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  //         useEffect()=>{
  // fetch(`http://localhost:3005/user`)
  //  .then((res)=>res.json())
  // .then((data)=>{ setUsers(data)},[])

  useEffect(() => {
    fetch(`http://localhost:3005/user`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      }, []);
  }, []);

  return (
    <div className="p-4 bg-green-400 ">
      <h1 className="text-4xl text-white">Business Sumary</h1>

      <div className="flex justify-around">
        <div className="p-4">
          <FaUsers className="text-6xl"></FaUsers>
          <h1 className="text-yellow-400 text-2xl"> USERS: {users?.length}</h1>
        </div>

        <div className="p-4">
          <FaProductHunt className="text-6xl"></FaProductHunt>
          <h1 className="text-yellow-400 text-2xl">
            {" "}
            TOTAL PRODUCTS: {products?.length}
          </h1>
        </div>

        <div className="p-4">
          <FaOpencart className="text-6xl"></FaOpencart>
          <h1 className="text-yellow-400 text-2xl">
            {" "}
            TOTAL ORDERS: {orders?.length}
          </h1>
        </div>

        <div className="p-4">
          <FcRating className="text-6xl"></FcRating>
          <h1 className="text-yellow-400 text-2xl">
            {" "}
            RATINGS: {reviews.length}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default BusinessSumary;
