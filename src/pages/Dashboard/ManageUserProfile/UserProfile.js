import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../../firebase/firebase.init";

const UserProfile = () => {
  const [myProfile, setMyProfile] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    const url = `https://calm-sierra-62921.herokuapp.com/adduserprofile/${user?.email}`;
    fetch(url, {
      headers: {
        authorization: `${user?.email} ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((profiledata) => setMyProfile(profiledata[0]));
  }, []);

  const data = myProfile;

  console.log(myProfile);

  const navigateToDetails = ({ _id }) => {
    console.log(_id);

    navigate(`${_id}`);
  };

  if (!myProfile) {
    navigate("/dashboard/adduserprofile");
  }
  // useEffect(() => {
  //   const { data } = myProfile;
  // }, []);
  // console.log(data?.name);
  return (
    <div className="px-8 py-6 w-4/5 mx-4 mt-4 text-left bg-white my-0 p-14">
      <h3 className="text-2xl  font-bold text-teal-600 text-center">
        MY PROFILE
      </h3>

      <img
        width="300px"
        src={data?.image || user?.photoURL}
        alt="profile"
        className="w-1/4 h-1/4  mx-auto mt-4"
      />
      <div className="mt-4 text-center ">
        <div className="text-2xl text-yellow-800">Name: {data?.name}</div>
        <div className="text-2xl text-yellow-800">Email: {data?.email}</div>
        <div className="text-2xl text-yellow-800">City: {data?.location}</div>
        <div className="text-2xl text-yellow-800">
          Education: {data?.education}
        </div>
        <div className="text-2xl text-yellow-800">
          Phone:{data?.phonenumber}
        </div>
        <div className="text-2xl text-yellow-800">
          linkedin :
          <a
            className="bg-gray-900 text-white px-2 rounded-full mt-2"
            href={data?.LinkedInprofile}
          >
            VISIT Linkedin
          </a>
        </div>
        <div className="mt-6 text-grey-dark"></div>
      </div>

      <button
        onClick={() => navigateToDetails(myProfile)}
        style={{ cursor: "pointer" }}
        type="submit"
        className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
        value="Upload your image"
      >
        Edit profile
      </button>
    </div>
  );
};

export default UserProfile;

// const Myprofile = () => {

// export default Myprofile;
