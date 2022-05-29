import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
// import { useQuery } from "react-query";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import auth from "../../../firebase/firebase.init";

import ConfirmModal from "./Confrim";
import Loading from "../../Loading/Loading";
const queryClient = new QueryClient();

const ManageProduct = (p) => {
  const [user] = useAuthState(auth);

  const [yes, setYes] = useState(false);
  const [deleteitem, setDeleteitem] = useState(false);

  const handleSubmit = (p) => {
    // setValue("deleted");
  };

  const handleYes = (p) => {
    // setDeleteitem(true);
    // if (deleteitem) {
    //   console.log("deleteitem");
    //   // setDeleteitem(true );
    // }
    // console.log(p);
  };
  const handleNo = () => {
    // setYes(false);
  };

  // console.log(deleteitem);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName(user?.displayName);
    setEmail(user?.email);
  }, []);

  const handleEdit = (p) => {
    // setYes(true);

    console.log(p._id);

    const procced = window.confirm("Are you sure to delete?");

    if (procced) {
      // toast.success("successfully Delete");

      console.log(`http://localhost:3005/products/${p._id}`);

      fetch(`http://localhost:3005/products/${p._id}`, {
        method: "Delete", // or 'PUT'
        headers: {
          authorization: `${user.email} ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          //     setnewquantity(newquantity + 1);
        })
        .catch((error) => {
          // console.error("Error:", error);
        });

      navigate("/admindashboard");

      toast.success("successfully Delete");
    }

    // if (proceed) {
    // fetch(`http://localhost:3005/products/${p._id}`, {
    //   method: "Delete", // or 'PUT'
    //   headers: {
    //     authorization: `${user.email} ${localStorage.getItem(
    //       "accessToken"
    //     )}`,
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     //     setnewquantity(newquantity + 1);
    //   })
    //   .catch((error) => {
    //     // console.error("Error:", error);
    //   });

    // }
  };

  const handleDelete = (p) => {
    // if (!yes) {
    //   console.log(p);
    // }

    if (yes) {
      console.log("delete");
    }
  };

  const [products, setProducts] = useState([]);

  // const { data: services, isLoading } = useQuery("services", () =>
  //   fetch("http://localhost:3005/products").then((res) => res.json())
  // );

  // console.log(services);

  // useEffect((p) => {

  //   if(deleteitem){

  //     fetch(`http://localhost:3005/products${p._id}`, {
  //       method: "Delete", // or 'PUT'
  //       headers: {
  //         authorization: `${user.email} ${localStorage.getItem(
  //           "accessToken"
  //         )}`,
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         //     setnewquantity(newquantity + 1);
  //       })
  //       .catch((error) => {
  //         // console.error("Error:", error);
  //       });

  //     toast.success("successfully Delete");

  //   }
  //   setYes(false)
  // }, [deleteitem]);
  const Example = () => {
    const { isLoading, error, data } = useQuery("repoData", () =>
      fetch("http://localhost:3005/products").then((res) => res.json())
    );
    setProducts(data);
    console.log(products);
    if (isLoading) return <Loading></Loading>;

    if (error) return "An error has occurred: " + error.message;

    return (
      <div className="relative overflow-x-auto w-[60vw] shadow-md sm:rounded-lg mt-6">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                product quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Product price
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {products?.map((product) => (
              <tr
                product={product}
                key={product._id}
                className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {product?.productname}
                </th>
                <td className="px-6 py-4">{product?.productquantity}</td>
                <td className="px-6 py-4">${product?.productprice}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleEdit(product)}
                    className="btn btn-danger  font-medium text-red-900 dark:text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const addproduct = () => {
    navigate("addproduct");
  };
  return (
    <div>
      <div className="px-8 py-12 w-full  mx-4 mt-4 text-left bg-white my-4 ">
        <h3 className="text-2xl  font-bold text-teal-600 text-center">
          MANAGE PRODUCTS
        </h3>

        {/* <div className="flex">
          <button
            onClick={addproduct}
            style={{ cursor: "pointer" }}
            type="submit"
            className="w-1/10 mx-auto px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
            value="ADD PROFILE"
          >
            {" "}
            ADD A PRODUCT
          </button>
        </div> */}
        <QueryClientProvider client={queryClient}>
          <Example />
        </QueryClientProvider>
      </div>
    </div>
  );
};

export default ManageProduct;

{
  /* <button class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" data-modal-toggle="defaultModal">
Toggle modal
</button> */
}
