import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import auth from "../../../firebase/firebase.init";
import UserRow from "./UserRow";

const ManageUser = () => {
  // const {
  //   data: users,
  //   isLoading,
  //   refetch,
  // } = useQuery("users", () =>
  //   fetch("http://localhost:3005/user", {
  //     method: "GET",
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //     },
  //   }).then((res) => res.json())
  // );
  // if (isLoading) {
  //   // return <Loading></Loading>
  // }

  const [users, setusers] = useState([]);

  const [authuser] = useAuthState(auth);

  const [adminloading, setAdminloading] = useState(false);
  const [remmoveadminloading, setRemmoveadminloading] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3005/user", {
      method: "GET",
      headers: {
        authorization: `${authuser.email} ${localStorage.getItem(
          "accessToken"
        )}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setusers(data);
      });
  }, [adminloading, remmoveadminloading, loading]);

  console.log(users);
  return (
    <div>
      <h2 className="text-2xl">All Users: {users.length}</h2>
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>ROLE</th>
              <th>Remove user</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <UserRow
                key={user._id}
                loading={loading}
                setLoading={setLoading}
                adminloading={adminloading}
                setAdminloading={setAdminloading}
                remmoveadminloading={remmoveadminloading}
                setRemmoveadminloading={setRemmoveadminloading}
                user={user}
              ></UserRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
