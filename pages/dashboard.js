import firebase from "../firebase/clientApp";
import Income from "../components/Income";
import Expense from "../components/Expense";
import Profile from "../components/Profile";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
const axios = require("axios");

const dashboard = () => {
  const router = useRouter();
  const [dob, setDob] = useState("");
  const [user, loading, error] = useAuthState(firebase.auth());

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/");
      }
    }
  }, []);

  const [page, setPage] = useState("analytics");

  const submitDobForm = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      axios
        .post("https://balanceed-db.azurewebsites.net/api/auth/signup", {
          username: user.displayName,
          dob: dob,
          email: user.email,
        })
        .then(
          (response) => {
            console.log(response);
            localStorage.setItem("id", user.displayName);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };

  const renderComponent = () => {
    switch (page) {
      case "income":
        return <Income />;
      case "expenses":
        return <Expense />;
      case "profile":
        return <Profile />;
    }
  };

  // if (typeof window !== "undefined") {
  //   const id = localStorage.getItem("id");
  //   if (!id) {
  //     return (
  //       <div>
  //         <h1>Please Enter Date of Birth</h1>
  //         <form onSubmit={submitDobForm}>
  //           <input
  //             type="date"
  //             value={dob}
  //             onChange={(e) => setDob(e.target.value)}
  //           />
  //           <button type="submit">Submit</button>
  //         </form>
  //       </div>
  //     );
  //   }
  // }

  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-1/4">
        <div
          onClick={() => setPage("analytics")}
          className={`flex w-60 py-2.5 px-5 mb-4 text-l ${
            page == "analytics" && "bg-blue-500 text-white"
          } rounded-lg cursor-pointer bg-none text-gray font-semi-bold hover:text-white  hover:bg-blue-500`}
        >
          <div className="mr-5">
            <i className="ri-line-chart-line"></i>
          </div>
          <h2>Analytics</h2>
        </div>

        <div
          onClick={() => setPage("budgeting")}
          className={`flex w-60 py-2.5 px-5 mb-4 text-l ${
            page == "budgeting" && "bg-blue-500 text-white"
          } rounded-lg cursor-pointer bg-none text-gray font-semi-bold hover:text-white hover:bg-blue-500`}
        >
          <div className="mr-5">
            <i class="ri-book-2-line"></i>
          </div>
          <h2>Budgeting Basics</h2>
        </div>

        <div
          onClick={() => setPage("investment")}
          className={`flex w-60 py-2.5 px-5 mb-4 text-l ${
            page == "investment" && "bg-blue-500 text-white"
          } rounded-lg cursor-pointer bg-none text-gray font-semi-bold hover:text-white  hover:bg-blue-500`}
        >
          <div className="mr-5">
            <i class="ri-book-2-line"></i>
          </div>
          <h2>Investment 101</h2>
        </div>

        <div
          onClick={() => setPage("income")}
          className={`flex w-60 py-2.5 px-5 mb-4 text-l ${
            page == "income" && "bg-blue-500 text-white"
          } rounded-lg cursor-pointer bg-none text-gray font-semi-bold hover:text-white  hover:bg-blue-500`}
        >
          <div className="mr-5">
            <i class="ri-wallet-line"></i>
          </div>
          <h2>Income</h2>
        </div>

        <div
          onClick={() => setPage("expenses")}
          className={`flex w-60 py-2.5 px-5 mb-4 text-l ${
            page == "expenses" && "bg-blue-500 text-white"
          } rounded-lg cursor-pointer bg-none text-gray font-semi-bold hover:text-white  hover:bg-blue-500`}
        >
          <div className="mr-5">
            <i class="ri-wallet-line"></i>
          </div>
          <h2>Expenses</h2>
        </div>

        <div
          onClick={() => setPage("profile")}
          className={`flex w-60 py-2.5 px-5 mb-4 text-l ${
            page == "profile" && "bg-blue-500 text-white"
          } rounded-lg cursor-pointer bg-none text-gray font-semi-bold hover:text-white  hover:bg-blue-500`}
        >
          <div className="mr-5">
            <i class="ri-user-line"></i>
          </div>
          <h2>Profile</h2>
        </div>
      </div>
      <div className="flex flex-col w-3/4">{renderComponent()}</div>
    </div>
  );
};

export default dashboard;
