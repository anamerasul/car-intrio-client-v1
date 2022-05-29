import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import auth from "../../../firebase/firebase.init";

const UserRow = ({
  user,
  loading,
  setLoading,
  adminloading,
  setAdminloading,
  remmoveadminloading,
  setRemmoveadminloading,
}) => {
  const { email, role } = user;

  setAdminloading(false);
  setRemmoveadminloading(false);

  const [authuser] = useAuthState(auth);

  console.log(email);
  console.log(authuser.email);

  const navigate = useNavigate();

  const makeAdmin = (cuser) => {
    console.log(cuser);
    fetch(`http://localhost:3005/user/admin/${email}`, {
      method: "PUT",
      headers: {
        authorization: `${authuser.email} ${localStorage.getItem(
          "accessToken"
        )}`,
      },
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error("Failed to Make an admin");
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          // setLoading(true);
          setAdminloading(true);
          // navigate("/admindashboard");
          toast.success(`Successfully made an admin`);
        }
      });
  };

  const removeAdmin = (cuser) => {
    console.log(cuser);
    fetch(`http://localhost:3005/user/removeadmin/${email}`, {
      method: "PUT",

      headers: {
        authorization: `${authuser.email} ${localStorage.getItem(
          "accessToken"
        )}`,
      },
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error("Failed to Make an admin");
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          // navigate("/admindashboard");

          setRemmoveadminloading(true);
          toast.success(`Successfully remove admin`);
        }
      });
  };

  const removeUser = (cuser) => {
    console.log(`http://localhost:3005/users/${cuser._id}`);
    const procced = window.confirm("Are you sure to delete?");

    if (procced) {
      // toast.success("successfully Delete");

      fetch(`http://localhost:3005/users/${cuser._id}`, {
        method: "Delete", // or 'PUT'
        headers: {
          authorization: `${authuser.email} ${localStorage.getItem(
            "accessToken"
          )}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {})
        .catch((error) => {});
      setLoading(true);
      toast.success("user successfully Delete");
    }
  };
  return (
    <tr>
      <td>{email}</td>
      <td>
        {role !== "admin" && (
          <button
            disabled={authuser.email === email}
            onClick={() => makeAdmin(email)}
            class="btn btn-xs text-white"
          >
            Make Admin
          </button>
        )}

        {role === "admin" && (
          <button
            disabled={authuser.email === email}
            onClick={() => removeAdmin(email)}
            class="btn btn-warning btn-xs"
          >
            Remove Admin
          </button>
        )}
      </td>
      <td>
        <button
          class="btn btn-info btn-xs"
          disabled={authuser.email === email}
          onClick={() => removeUser(user)}
        >
          Remove User
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
