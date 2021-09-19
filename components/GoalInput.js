import Popup from "reactjs-popup";
import firebase from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
const axios = require("axios");

const GoalInput = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    axios
      .post("https://balanceed-db.azurewebsites.net/api/goal", {
        username: user.displayName,
        goal_amount: amount,
        goal_end_date: date,
        goal_name: "Savings",
        goal_description: "Save for your future",
        goal_status: "20",
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div className="bg-purple p-4 w-48 rounded-lg text-white h-48">
      <Popup
        trigger={
          <button className="flex drop-shadow-3xl  items-center bg-orange  hover:bg-red px-3 py-1 text-white font-medium rounded-md  w-max ">
            <div className="tracking-widest">SELECT</div>
          </button>
        }
        position="right center"
      >
        <div className=" flex flex-col bg-white p-4 rounded-xl drop-shadow-xl ">
          <div className="font-bold text-xl place-self-center mb-4">
            Set Goal
          </div>
          <form onSubmit={handleSubmit}>
            <div className=" mb-2 ">
              <div className="text-bold">Goal Amount</div>
              <input
                className="border-2 p-2 rounded-md"
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <div className="text-bold">Goal Duration</div>
              <input
                className="border-2 p-2 rounded-md w-full"
                type="date"
                value={date}
                placeholder="Date"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-blue w-full text-white font-bold py-2 px-4 rounded-md"
            >
              Set Goal
            </button>
          </form>
        </div>
      </Popup>
      <h1 className="font-semi-bold text-xl mt-8">
        <i className="ri-wallet-3-fill text-4xl font-medium"></i> <br />
        Learn to Budget your expenses
      </h1>
    </div>
  );
};

export default GoalInput;
