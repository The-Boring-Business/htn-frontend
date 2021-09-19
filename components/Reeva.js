import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Popup from "reactjs-popup";
import firebase from "../firebase/clientApp";
import FadeIn from "react-fade-in";
const axios = require("axios");

const Reeva = ({ course }) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [isRegistered, setIsRegistered] = useState(null);
  const [reevaQuestion, setReevaQuestion] = useState("");
  const [reevaAnswer, setReevaAnswer] = useState("");
  const [index, setIndex] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://balanceed-db.azurewebsites.net/api/lesson/" +
          user.displayName +
          "/" +
          course
      )
      .then((res) => {
        const data = res.data;
        console.log(data);
        if (data == "Please register ") {
          setIsRegistered(false);
        } else {
          setIndex(data.status);
          setIsRegistered(true);
          setData(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user, course, isRegistered]);

  useEffect(() => {
    console.log(index);
    setReevaAnswer("");
    axios
      .post(
        "https://balanceed-db.azurewebsites.net/api/lesson/" +
          user.displayName +
          "/" +
          course,
        {
          Status: index,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [index]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://balanceed-db.azurewebsites.net/api/user/add/course", {
        username: user.displayName,
        name: course,
      })
      .then((res) => {
        setIsRegistered(true);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const askReeva = (e) => {
    e.preventDefault();
    axios
      .post("https://balanceed-db.azurewebsites.net/api/question", {
        question: reevaQuestion,
      })
      .then((res) => {
        console.log(res);
        const answer = res.data.answer;
        setReevaAnswer(answer);
      })
      .catch((err) => {
        console.log(err);
      });

  };

  if (!isRegistered) {
    return (
      <div className="mx-auto my-auto">
        <form onSubmit={handleSubmit}>
          <button
            className="bg-blue p-4 text-white rounded-lg font-semi-bold shadow-lg"
            type="submit"
          >
            Register for course
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="mx-auto">
        <div className="flex flex-col items-center p-20">
          <h1 className="text-2xl font-bold ">{data && data[index].line}</h1>
          <div className="flex flew-row gap-x-2 mt-10">
            {index !== 0 && (
              <button
                className="bg-blue text-white font-semi-bold p-4 rounded-lg shadow-xl-"
                onClick={() => setIndex(index - 1)}
              >
                ⏮ Previous
              </button>
            )}
            {data && index !== data.length - 1 && (
              <button
                className="bg-blue text-white font-semi-bold p-4 rounded-lg shadow-xl-"
                onClick={() => setIndex(index + 1)}
              >
                Next ⏭
              </button>
            )}
          </div>
          <div className="mt-5">
            <Popup
              trigger={
                <button className="bg-green-500 font-bold text-white rounded-lg shadow-xl p-4">
                  Ask Reeva!
                </button>
              }
              position="left center"
            >
              <div className="p-4 rounded-md bg-white shadow-xl">
                <form onSubmit={askReeva}>
                  <input
                    type="text"
                    placeholder="Ask Reeva a Question!"
                    className="mx-2"
                    onChange={(e) => setReevaQuestion(e.target.value)}
                  />
                  <input
                    type="submit"
                    className="p-2 bg-green-400 text-white rounded-lg shadow-xl cursor-pointer"
                  />
                </form>
              </div>
            </Popup>
          </div>
          <FadeIn visible={reevaAnswer !== ""} className="mt-6">
            <h2 className="mt-6 text-2xl font-bold">{reevaAnswer}</h2>
          </FadeIn>
        </div>
      </div>
    );
  }
};

export default Reeva;
