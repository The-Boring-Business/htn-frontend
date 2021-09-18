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
    <div className="bg-landing-page bg-auto h-screen">
      <div className="p-14 pl-20 w-1/3">
        {/* <img className="h-10 mb-14" src="/logo.svg" alt="logo" /> */}

        <h1 className="text-6xl font-bold mt-10">
          Learn about Fintech with best in class
          <span className="text-blue"> AI Mentor</span>
        </h1>

        <div className="flex flex-row mt-10">
          {user ? (
            <div className="flex flex-col">
              <Link href="/dashboard">
                <a className="bg-gray p-4 rounded-lg text-white font-semi-bold hover:bg-blue">
                  Go To Dashboard
                </a>
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
