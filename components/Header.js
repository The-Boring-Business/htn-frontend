import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/clientApp";
import {useRouter} from 'next/router'

const Header = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(firebase.auth());
  return (
    <div className="flex flex-row justify-between py-3 px-6 items-center">
      <img className="h-8 cursor-pointer" src="/logo.svg" alt="logo" onClick={()=>router.push("/")} />

      <div className="flex items-center">
        {user && (
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
        )}
      </div>
    </div>
  );
};

export default Header;
