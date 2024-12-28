import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/@/components/ui/card";

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useAtom } from "jotai";
import { singleTest } from "../../atoms";

const Results = ({}) => {
  const [tests, setTests] = useState([]);
  useEffect(() => {
    axios
      .post(`https://98.85.179.68/getRezults`, {
        username: localStorage.getItem("username"),
      })
      .then((response) => {
        setTests(response.data);
        console.log("resp", response.data);
      })
      .catch((error) => {
        console.log("error je", error);
      });
  }, []);

  return (
    <div
      className="flex-row justify-around flex mb-5"
      style={{ display: "block" }}
    >
      <h1>Rezultati testova</h1>
      {tests.map((test) => (
        <Card className="my-5">
          <CardHeader>
            <CardTitle>Naziv testa: {test.nazivtesta}</CardTitle>
          </CardHeader>

          <CardFooter>
            <p>Poeni: {test.points}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Results;
