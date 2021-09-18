import firebase from "../firebase/clientApp";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";

const uiConfig = {
  // signInSuccessUrl: "/dashboard",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  signInSuccessUrl: "/dashboard",
};

const LandingPage = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  return (
    <div className="bg-landing-page bg-contain h-screen w-screen">
      <div className="p-14 pl-20 w-1/3">

        <h1 className="text-6xl font-bold">
          Learn about Fintech with best in class
          <span className="text-blue-500"> AI Mentor</span>
        </h1>

        <div className="flex flex-row">
          {user ? (
            <div className="flex flex-col">
              <Link href="/dashboard">
                <a className="hover:bg-blue-500">Go To Dashboard</a>
              </Link>
            </div>
          ) : (
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;