import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/clientApp";
import GoalInput from "../components/GoalInput";
import CourseCard from "./CourseCard";
import { useRouter } from "next/router";
const axios = require("axios");
const Profile = () => {
  const router = useRouter();
  const [myCourses, setMyCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [user, loading, error] = useAuthState(firebase.auth());

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        router.push("/");
      });
  };

  const getMyCourses = () => {
    axios
      .get(
        "https://balanceed-db.azurewebsites.net/api/" +
          user.displayName +
          "/lessons"
      )
      .then((res) => {
        console.log(res.data);
        setMyCourses(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAvailableCourses = () => {
    axios
      .get("https://balanceed-db.azurewebsites.net/api/course")
      .then((res) => {
        console.log(res.data);
        setAvailableCourses(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMyCourses();
    getAvailableCourses();
  }, [user]);

  return (
    <div className="m-6  py-4 px-6 bg-white rounded-lg drop-shadow-xl">
      <div className="flex flex-col">
        <div className="flex flex-row mb-10 items-center justify-between">
          <div className=" flex items-center gap-4">
            <img
              className="h-30 rounded-lg"
              src={user.photoURL}
              alt="profile-pic"
            />

            <div className="flex flex-col mr-96 justify-self-start">
              <h1 className="font-bold text-5xl">{user.displayName}</h1>
              <p className="font-medium text-gray text-2xl">Student</p>
            </div>
          </div>
          <div className="flex">
            <button
              className="bg-red p-4 flex items-center justify-self-end rounded-lg drop-shadow-md text-white font-bold hover:bg-red"
              onClick={signOut}
            >
              <i className="ri-logout-box-line mr-2"></i> Logout
            </button>
          </div>
        </div>
        <div className="mb-8">
          <h1 className="font-bold text-3xl mb-6">Select Your Goal</h1>
          <div className="flex flex-row">
            <GoalInput />
          </div>
        </div>
        <div className="my-2 mb-8">
          <h1 className="font-bold text-3xl mb-6">Your Courses</h1>
          <div className="h-full flex overflow-x-auto gap-4">
            {myCourses.map((course) => (
              <CourseCard
                title={course.title}
                name={course.name}
                level={course.level}
              />
            ))}
          </div>
        </div>
        <div className="my-2">
          <h1 className="font-bold text-3xl mb-6">Available Courses</h1>
          <div className="h-full flex overflow-x-auto gap-4">
            {availableCourses.map((course) => (
              <CourseCard
                title={course.title}
                name={course.name}
                level={course.level}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
