import { Button } from "@/@/components/ui/button";
import QuestionInput from "../QuestionInput";
import { useEffect, useState } from "react";
import { Card } from "@/@/components/ui/card";
import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/@/components/ui/accordion";
import Loading from "../Loading";

const MakeQuestion = ({}) => {
  const [open, setOpen] = useState(false);
  const [grupe, setGrupe] = useState([]);
  useEffect(() => {
    var username = localStorage.getItem("username");
    axios
      .get(`https://98.85.179.68/getGroups`, {
        params: { username: username },
      })
      .then((response) => {
        setGrupe(response.data);
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
      <Loading open={open}></Loading>
      <Accordion type="single" collapsible className="w-full">
        {grupe.map((item, index) => {
          return <Item item={item} setOpen={setOpen}></Item>;
        })}
      </Accordion>
    </div>
  );
};
const Item = ({ item, setOpen }) => {
  const [questionType, setQ] = useState("multipleChoice");
  const var1 = questionType === "multipleChoice" ? "outline" : "default";
  const var2 = questionType === "oneCorrect" ? "outline" : "default";
  const var3 = questionType === "text" ? "outline" : "default";

  return (
    <>
      <AccordionItem value={item.groupname ?? " "}>
        <AccordionTrigger>{item.groupname ?? " "}</AccordionTrigger>
        <AccordionContent>
          <Card className="p-5">
            <>
              <div className="w-full justify-around  flex pb-5">
                <Button
                  variant={var1}
                  onClick={() => {
                    setQ("multipleChoice");
                  }}
                >
                  Multiple choice question
                </Button>
                <Button
                  variant={var2}
                  onClick={() => {
                    setQ("oneCorrect");
                  }}
                >
                  One correct question
                </Button>
                <Button
                  variant={var3}
                  onClick={() => {
                    setQ("text");
                  }}
                >
                  Text question
                </Button>
              </div>
              <QuestionInput
                item={item}
                setOpen={setOpen}
                type={questionType}
              ></QuestionInput>
            </>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </>
  );
};

export default MakeQuestion;
