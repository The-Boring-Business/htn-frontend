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
    <div className="rounded-md shadow-lg p-10">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div>
            <img
              className="h-14 rounded-lg"
              src={user.photoURL}
              alt="profile-pic"
            />
          </div>
          <div className="flex flex-col">
            <h1>{user.displayName}</h1>
            <p>Student</p>
          </div>
          <div>
            <button
              className="bg-red-600 p-4 rounded-lg drop-shadow-md text-white font-bold hover:bg-red-500"
              onClick={signOut}
            >
              Logout
            </button>
          </div>
        </div>
        <div>
          <h1>Select Your Goal</h1>
          <div className="flex flex-row">
            <GoalInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
