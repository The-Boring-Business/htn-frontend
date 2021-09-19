import firebase from "../firebase/clientApp";
import Income from "../components/Income";
import Expense from "../components/Expense";
import Reeva from "../components/Reeva";
import Profile from "../components/Profile";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ReactLoading from "react-loading";

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
      <div>
        <h1>Please Enter Date of Birth</h1>
        <form onSubmit={submitDobForm}>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  } else if (loggedIn == 1) {
    return (
      <div className="flex flex-row border-10 border-red">
        <div className="flex flex-col w-1/4 border-40 border-blue p-8">
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
    return (
      <>
        <ReactLoading height={667} width={375} />
      </>
    );
  }
};

export default dashboard;
