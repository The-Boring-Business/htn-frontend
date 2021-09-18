import BudgetElement from "./BudgetElement";
import { useState } from "react";
import ReactLoading from 'react-loading';
import Popup from "reactjs-popup";
const axios = require("axios");

const Expense = () => {
  const [income, setIncome] = useState(0);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [transactions, setTransactions] = useState(null);

  const submitIncome = (e) => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("id");
      axios
        .post("https://balanceed-db.azurewebsites.net/api/transaction", {
          Tdate: date,
          amount: income,
          category: category,
          description: title,
          type: "Expense",
          currency: "$",
          username: id,
        })
        .then(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };

  if (typeof window !== "undefined") {
    const id = localStorage.getItem("id");

    axios
      .post("https://balanceed-db.azurewebsites.net/api/user/transaction", {
        username: "test",
      })
      .then((response) => {
        console.log("response", response.data);
        const data = response.data.filter((transaction) => {
          return transaction.type === "Expense";
        });
        setTransactions(data);
      });
  }

  return (
    <div
      className="flex flex-col m-6  py-4 px-6 bg-white rounded-lg drop-shadow-xl"
      style={{ height: "36.5rem" }}
    >
      <h1 className="font-bold text-3xl">Expenses</h1>
      <div className="overflow-y-auto flex-row space-y-3 mb-4 h-full">
        {transactions ? transactions.map((transaction) => {
          return (
            <BudgetElement
              key={transaction.id}
              name={transaction.description}
              amount={transaction.amount}
              date={transaction.date}
              type={transaction.category}
            />
          );
        }) : <h1>Loading</h1>}
      </div>

      <div align="right">
        <Popup
          trigger={
            <button className="flex drop-shadow-3xl  items-center bg-blue-500  hover:bg-red px-3 py-2 text-white font-medium rounded-lg mt-5 w-max ">
              <i className="ri-add-line mr-2 text-2xl"></i>
              <div className>Add Expense</div>
            </button>
          }
          position="top center"
        >
          <div className=" flex flex-col bg-white p-4 rounded-xl drop-shadow-xl ">
            <div className="font-bold text-xl place-self-center mb-4">
              Add a Record
            </div>
            <form onSubmit={submitIncome}>
              <div className=" mb-2  ">
                <input
                  className="border-2 p-2 rounded-md"
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className=" mb-2 ">
                <input
                  className="border-2 p-2 rounded-md"
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className=" mb-2 ">
                <input
                  className="border-2 p-2 rounded-md"
                  type="number"
                  placeholder="Amount"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  className="border-2 p-2 rounded-md w-full"
                  type="date"
                  placeholder="Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 w-full text-white font-bold py-2 px-4 rounded-md"
              >
                Add
              </button>
            </form>
          </div>
        </Popup>
      </div>
    </div>
  );
};

export default Expense;
