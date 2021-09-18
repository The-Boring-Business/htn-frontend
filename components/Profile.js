import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/clientApp";
import GoalInput from "../components/GoalInput";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(firebase.auth());

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        router.push("/");
      });
  };

  return (
    <div className="m-6  py-4 px-6 bg-white rounded-lg drop-shadow-xl">
      <div className="flex flex-col">
        <div className="flex flex-row mb-10 items-center justify-between">
          <div>
            <img
              className="h-30 rounded-lg"
              src={user.photoURL}
              alt="profile-pic"
            />
          </div>
          <div className="flex flex-col mr-96">
            <h1 className="font-bold text-4xl">{user.displayName}</h1>
            <p className="font-medium text-gray text-lg">Student</p>
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
        <div>
          <h1 className="font-bold text-3xl mb-6">Select Your Goal</h1>
          <div className="flex flex-row">
            <GoalInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
