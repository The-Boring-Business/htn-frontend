import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Popup from "reactjs-popup";
import firebase from "../firebase/clientApp";
const axios = require("axios");

const Reeva = ({ course }) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [isRegistered, setIsRegistered] = useState(false);
  const [reevaQuestion, setReevaQuestion] = useState("");
  const [reevaAnswer, setReevaAnswer] = useState("");
  const [index, setIndex] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    return () => {
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
          console.log("res", res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }, []);

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
  }, [course]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://balanceed-db.azurewebsites.net/api/course/", {
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
      <form onSubmit={handleSubmit}>
        <button className="bg-blue" type="submit">
          Register for course
        </button>
      </form>
    );
  } else {
    return (
      <div>
        <h1>{data && data[index].line}</h1>
        <div className="flex flew-row gap-x-2">
          {index !== 0 && (
            <button className="bg-blue" onClick={() => setIndex(index - 1)}>
              Previous
            </button>
          )}
          <button className="bg-blue" onClick={() => setIndex(index + 1)}>
            Next
          </button>
        </div>
        <div>
          <Popup
            trigger={<button className="bg-blue">Ask Reeva!</button>}
            position="bottom center"
          >
            <form onSubmit={askReeva}>
              <input
                type="text"
                placeholder="Ask Reeva a Question!"
                onChange={(e) => setReevaQuestion(e.target.value)}
              />
              <input type="submit" />
            </form>
          </Popup>
          <h2>{reevaAnswer}</h2>
        </div>
      </div>
    );
  }
};

export default Reeva;
