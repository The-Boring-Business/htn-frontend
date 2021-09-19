import firebase from "../firebase/clientApp";
import Income from "../components/Income";
import Expense from "../components/Expense";
import Reeva from "../components/Reeva";
import Analytics from "../components/Analytics";
import Profile from "../components/Profile";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const axios = require("axios");

const dashboard = () => {
  const router = useRouter();
  const [dob, setDob] = useState("");
  const [loggedIn, setLoggedIn] = useState(null);
  const [user, loading, error] = useAuthState(firebase.auth());

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/");
      }
    }
  }, [user, loading]);

  const [page, setPage] = useState("profile");

  useEffect(() => {
    if (user) {
      axios
        .get(
          "https://balanceed-db.azurewebsites.net/api/check/mail" + user.email
        )
        .then((res) => {
          setLoggedIn(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  const submitDobForm = (e) => {
    axios
      .post("https://balanceed-db.azurewebsites.net/api/auth/signup", {
        username: user.displayName,
        dob: dob,
        email: user.email,
      })
      .then(
        (response) => {
          console.log(response);
          setLoggedIn(1);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const renderComponent = () => {
    switch (page) {
      case "analytics":
        return <Analytics />;
      case "income":
        return <Income />;
      case "expenses":
        return <Expense />;
      case "profile":
        return <Profile />;
      case "budgeting":
        return <Reeva course="Budget" />;
      case "taxes":
        return <Reeva course="Taxes" />;
      case "cashflow":
        return <Reeva course="CashFlow" />;
      case "creditscore":
        return <Reeva course="CreditScore" />;
    }
  };

  if (loggedIn == 0) {
    return (
      <div className=" flex flex-col place-items-center place-content-center mt-40">
        <h1 className="font-bold text-4xl mb-4">One last step!</h1>
        <h1 className="font-semi-bold text-2xl mb-6">Enter your Birthday</h1>
        <form onSubmit={submitDobForm}>
          <div className="flex flex-col">
            <div>
              <input
                className="border-2 p-2 rounded-md w-full"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div>
              <button
                className="bg-blue p-4 text-white font-bold rounded-lg place-self-stretch w-full mt-5 text-xl "
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  } else if (loggedIn == 1) {
    return (
      <div className="flex flex-row border-10 border-red">
        <div className="flex flex-col w-1/4 border-40 border-blue p-8">
          <div
            onClick={() => setPage("analytics")}
            className={`flex w-60 py-2.5 px-5 mb-4 text-l ${
              page == "analytics" && "bg-blue text-white"
            } rounded-lg cursor-pointer bg-none  font-semi-bold hover:text-white hover:bg-blue`}
          >
            <div className="mr-5">
              <i class="ri-line-chart-fill"></i>
            </div>
            <h2>Analytics</h2>
          </div>

          <div
            onClick={() => setPage("budgeting")}
            className={`flex w-60 py-2.5 px-5 mb-4 text-l ${
              page == "budgeting" && "bg-blue text-white"
            } rounded-lg cursor-pointer bg-none  font-semi-bold hover:text-white hover:bg-blue`}
          >
            <div className="mr-5">
              <i class="ri-book-2-line"></i>
            </div>
            <h2>Introduction to Budgeting</h2>
          </div>

          <div
            onClick={() => setPage("taxes")}
            className={`flex w-60 py-2.5 px-5 mb-4 text-l ${
              page == "taxes" && "bg-blue text-white"
            } rounded-lg cursor-pointer bg-none font-semi-bold hover:text-white  hover:bg-blue`}
          >
            <div className="mr-5">
              <i class="ri-book-2-line"></i>
            </div>
            <h2>Learn All About Taxes</h2>
          </div>

          <div
            onClick={() => setPage("cashflow")}
            className={`flex w-60 py-2.5 px-5 mb-4 text-l ${
              page == "cashflow" && "bg-blue text-white"
            } rounded-lg cursor-pointer bg-none font-semi-bold hover:text-white  hover:bg-blue`}
          >
            <div className="mr-5">
              <i class="ri-book-2-line"></i>
            </div>
            <h2>Cash Flow and How to Manage It</h2>
          </div>

          <div
            onClick={() => setPage("creditscore")}
            className={`flex w-60 py-2.5 px-5 mb-4 text-l ${
              page == "creditscore" && "bg-blue text-white"
            } rounded-lg cursor-pointer bg-none  font-semi-bold hover:text-white  hover:bg-blue`}
          >
            <div className="mr-5">
              <i class="ri-book-2-line"></i>
            </div>
            <h2>What is Credit Score?</h2>
          </div>

          <div
            onClick={() => setPage("income")}
            className={`flex w-60 py-2.5 px-5 mb-4 text-l ${
              page == "income" && "bg-blue text-white"
            } rounded-lg cursor-pointer bg-none  font-semi-bold hover:text-white  hover:bg-blue`}
          >
            <div className="mr-5">
              <i class="ri-wallet-line"></i>
            </div>
            <h2>Income</h2>
          </div>

          <div
            onClick={() => setPage("expenses")}
            className={`flex w-60 py-2.5 px-5 mb-4 text-l ${
              page == "expenses" && "bg-blue text-white"
            } rounded-lg cursor-pointer bg-none  font-semi-bold hover:text-white  hover:bg-blue`}
          >
            <div className="mr-5">
              <i class="ri-wallet-line"></i>
            </div>
            <h2>Expenses</h2>
          </div>

          <div
            onClick={() => setPage("profile")}
            className={`flex w-60 py-2.5 px-5 mb-4 text-l ${
              page == "profile" && "bg-blue text-white"
            } rounded-lg cursor-pointer bg-none  font-semi-bold hover:text-white  hover:bg-blue`}
          >
            <div className="mr-5">
              <i class="ri-user-line"></i>
            </div>
            <h2>Profile</h2>
          </div>
          {/* <h2>{loggedIn}</h2> */}
        </div>
        <div className="flex flex-col w-3/4 bg-background">
          {renderComponent()}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default dashboard;
