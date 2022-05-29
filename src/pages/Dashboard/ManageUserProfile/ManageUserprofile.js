import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import auth from "../../../firebase/firebase.init";

const ManageUserprofile = () => {
  const itemsId = useParams();
  // console.log(itemsId);
  const { id } = itemsId;

  console.log(id);

  const updateurl = `http://localhost:3005/adduserprofile/${id}`;

  console.log(updateurl);

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

  const onSubmitPorfile = async (mydata) => {
    console.log(mydata.image[0]);

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
          const myProfileInfo = {
            name: mydata.name,
            email: mydata.email,
            image: image,
            location: mydata.location,
            phonenumber: mydata.phonenumber,
            LinkedInprofile: mydata.LinkedInprofile,
            education: mydata.education,
          };

          console.log(myProfileInfo);

          const data = myProfileInfo;

          console.log({ data });
          // send to your database
          //     fetch('https://secret-dusk-46242.herokuapp.com/doctor', {
          //         method: 'POST',
          //         headers: {
          //             'content-type': 'application/json',
          //             authorization: `Bearer ${localStorage.getItem('accessToken')}`
          //         },
          //         body: JSON.stringify(doctor)
          //     })
          //     .then(res =>res.json())
          //     .then(inserted =>{
          //         if(inserted.insertedId){
          //             toast.success('Doctor added successfully')
          //             reset();
          //         }
          //         else{
          //             toast.error('Failed to add the doctor');
          //         }
          //     })

          const addProfileInfo = { data, useremail: user?.email };
          fetch(updateurl, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
              authorization: `${user?.email} ${localStorage.getItem(
                "accessToken"
              )}`,
            },
            body: JSON.stringify(addProfileInfo),
          })
            .then((res) => res.json())
            .then((inserted) => {
              if (inserted) {
                toast.success("Profile update successfully");

                navigate("/dashboard/myprofile");
                reset();
              } else {
                toast.error("Failed to update the Profile");
              }
            });
        }
      });
    //     console.log(data, user?.email);
    //     console.log([user?.email]);
    //     const addProfileInfo = { data, useremail: user?.email };
    //     console.log(addProfileInfo);
    //     console.log(JSON.stringify(addProfileInfo));
    //     fetch("http://localhost:3005/addProfile", {
    //       method: "POST",
    //       headers: {
    //         "content-type": "application/json",
    //         authorization: `${user?.email} ${localStorage.getItem("accessToken")}`,
    //       },
    //       body: JSON.stringify(addProfileInfo),
    //     })
    //       .then((res) => res.json())
    //       .then((inserted) => {
    //         if (inserted.insertedId) {
    //           toast.success("Profile added successfully");
    //           reset();
    //         } else {
    //           toast.error("Failed to add the Profile");
    //         }
    //       });
  };

  return (
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

    <div className="px-8 py-12 w-4/5  mx-4 mt-4 text-left bg-white my-0 ">
      <h3 className="text-2xl  font-bold text-teal-600 text-center">
        UPDATE PROFILE
      </h3>

      <form onSubmit={handleSubmit(onSubmitPorfile)} action="">
        <div className="mt-4">
          <div>
            <label className="block" htmlFor="Name">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("name", {
                required: {
                  value: true,
                  message: "name is required",
                },
              })}
            />
          </div>

          <div>
            <label className="block" htmlFor="email">
              email
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("email", {
                required: {
                  value: true,
                  message: "email is required",
                  pattern:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                },
              })}
            />
          </div>

          <div>
            <label className="block" htmlFor="Education">
              Education
            </label>
            <textarea
              type="text"
              name="education"
              placeholder="Education"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("education", {
                required: {
                  value: true,
                  message: "education is required",
                },
              })}
            />
          </div>

          <div>
            <label className="block" htmlFor="location">
              Location
            </label>
            <textarea
              type="text"
              name="location"
              placeholder="location"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("location", {
                required: {
                  value: true,
                  message: "location is required",
                },
              })}
            />
          </div>

          <div>
            <label className="block" htmlFor="phonenumber">
              phone number
            </label>
            <input
              type="number"
              name="phonenumber"
              placeholder="phonenumber"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("phonenumber", {
                required: {
                  value: true,
                  message: "phonenumber is required",
                },
              })}
            />
          </div>

          <div>
            <label className="block" htmlFor="LinkedInprofile">
              LinkedIn profile
            </label>
            <input
              type="url"
              name="LinkedInprofile"
              placeholder="LinkedInprofile"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("LinkedInprofile", {
                required: {
                  value: true,
                  message: "Linkind profile is required",
                },
              })}
            />
          </div>
          <div>
            <label className="hidden" htmlFor="PhotoUrl">
              photo
            </label>
            <input
              type="file"
              name="photo"
              placeholder="photourl"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("image", {
                required: {
                  value: true,
                  message: "Image is Required",
                },
              })}
            />
          </div>
          <div className="flex">
            <input
              style={{ cursor: "pointer" }}
              type="submit"
              className="w-1/10 mx-auto px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
              value="UPDATE PROFILE"
            />
          </div>
        </div>
      </form>
      <div className="mt-6 text-grey-dark"></div>
    </div>
  );
};

export default ManageUserprofile;
