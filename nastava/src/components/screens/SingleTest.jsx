import { useActionData, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Question from "../Question";
import { useAtom } from "jotai";
import { singleTest } from "../../atoms";
import { useNavigate } from "react-router-dom";

import { Button } from "@/@/components/ui/button";

const SingleTest = ({}) => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  let { id } = useParams();
  const [item, setItem] = useAtom(singleTest);
  const [pitanja, setPitanja] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const handleNextQuestion = () => {
    // Check if there are more questions to display
    if (currentQuestionIndex < pitanja.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const vratiNazad = () => {
    navigate({
      pathname: `/studentScreen`,
    });
  };
  useEffect(() => {
    setPitanja([]);
    var arr = [];
    for (var i of item.question) {
      arr.push(
        new Promise((resolve, reject) => {
          axios
            .post(`https://54.198.79.143/getQuestion`, {
              id: i.id,
              num: i.numq,
            })
            .then((response) => resolve(response.data));
        })
      );
    }
    Promise.all(arr).then((nes) => {
      setPitanja(nes.flat());
    });
  }, []);

  useEffect(() => {
    if (pitanja.length > 0 && currentQuestionIndex === pitanja.length)
      axios
        .post(
          "https://54.198.79.143/addPoints",
          {
            username: localStorage.getItem("username"),
            idtesta: item.id,
            nazivTesta: item.title,
            points: points,
          },
          {
            withCredentials: true,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {})
        .catch(function (error) {});
  }, [points]);
  return (
    <div>
      {pitanja.length > 0 && (
        <div>
          {currentQuestionIndex !== pitanja.length ? (
            <Question
              points={[points, setPoints]}
              item={pitanja[currentQuestionIndex]}
              next={handleNextQuestion}
              tren={currentQuestionIndex}
              duz={pitanja.length}
            />
          ) : (
            <h1>Kraj</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleTest;
