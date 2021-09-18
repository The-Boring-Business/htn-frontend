import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/clientApp";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";


const Header = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  return (
    <div className="flex flex-row justify-between bg-background py-3 px-6 items-center">
      <div className="font-bold text-3xl">Dashboard</div>

      <div className="flex items-center">
        {user ? (
          <>
            <div className="flex flex-col mr-3">
              <div className="font-bold text-lg">{user.displayName}</div>
              <div className="font-medium text-gray text-sm self-end">
                Student
              </div>
            </div>

            <div>
              <img
                className="h-14 rounded-lg"
                src={user.photoURL}
                alt="profile-pic"
              />
            </div>
          </>
        ) : (
          <h1>Log In!</h1>
        )}
      </div>
    </div>
  );
};

export default Header;
