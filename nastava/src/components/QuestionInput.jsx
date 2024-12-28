import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/@/components/ui/form";
import { Card } from "@/@/components/ui/card";
import { Button } from "../@/components/ui/button";
import { RadioGroup } from "@/@/components/ui/radio-group";
import { Input } from "@/@/components/ui/input";
import axios from "axios";

import { useForm } from "react-hook-form";
import { CheckboxWithTextInput } from "./CheckboxWithTextInput";
import RadioButtonItemInput from "./RadioButtonItemInput";
import { useState } from "react";
const QuestionInput = ({ setOpen, type = 0, item }) => {
  const [selectedAnswer, setSelectedAnswer] = useState("option-one");
  const form = useForm();
  const { reset } = form;
  const [answers, setAnswer] = useState([]);
  const onSubmit = () => {
    var data = formateDate(form.getValues());
    setOpen(true);
    console.log("#data", data);

    axios
      .post(
        "https://98.85.179.68/addQuestions",
        {
          group_id: item.id,
          points: data.points,
          negativepoints: data.negativepoints,
          qtext: data.text,
          answers: type === "text" ? data.textanswer : data.answer,
          question: data.question,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        setOpen(false);
        reset({
          question: "",
          textanswer: "",
          points: 0,
          negativepoints: 0,
          answer: "",
        });
        setAnswer([]);
      })
      .catch(function (error) {
        setOpen(false);
        console.log("neki error", error, JSON.stringify(error));
      });
  };
  const addAnswer = () => {
    setAnswer([...answers, ""]);
  };

  return (
    <Card className="mb-5 border-[#0F172A55] pb-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" br border-black space-y-8 w-full  p-5 pb-3 "
        >
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormControl>
                <Input
                  className="text-xl"
                  placeholder="Your question..."
                  {...field}
                />
              </FormControl>
            )}
          />
          <FormField
            control={form.control}
            name="points"
            render={({ field }) => (
              <FormControl>
                <Input
                  className="text-xl"
                  type="number"
                  placeholder="Unesite bodove za pitanje"
                  {...field}
                />
              </FormControl>
            )}
          />

          <FormField
            control={form.control}
            name="negativepoints"
            render={({ field }) => (
              <FormControl>
                <Input
                  className="text-xl"
                  type="number"
                  placeholder="Unesite negativne bodove za pitanje"
                  {...field}
                />
              </FormControl>
            )}
          />
          {type === "multipleChoice" ? (
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  {answers.map((item, index) => {
                    return (
                      <CheckboxWithTextInput
                        field={field}
                        form={form}
                        key={index}
                        id={index}
                        index={index}
                        text={item}
                      ></CheckboxWithTextInput>
                    );
                  })}
                </FormItem>
              )}
            />
          ) : type === "oneCorrect" ? (
            <FormItem>
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue="option-one"
                  >
                    {answers.map((item, index) => {
                      return (
                        <RadioButtonItemInput
                          key={index}
                          index={index}
                          form={form}
                          item={item}
                        ></RadioButtonItemInput>
                      );
                    })}
                  </RadioGroup>
                )}
              />
            </FormItem>
          ) : (
            // basic input text
            <FormField
              control={form.control}
              name="textanswer"
              render={({ field }) => (
                <>
                  <FormControl>
                    <Input placeholder="Your answer..." {...field} />
                  </FormControl>
                  <FormMessage />
                </>
              )}
            />
          )}
        </form>
      </Form>

      {(type === "oneCorrect" || type === "multipleChoice") && (
        <Button onClick={addAnswer}>Add answer</Button>
      )}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Button onClick={onSubmit}>Dodaj pitanje</Button>
    </Card>
  );
};

const formateDate = (inputObject) => {
  console.log("input object", inputObject);
  const outputObject = {
    ...inputObject, // Copy other properties from the input object
    text: [],
  };

  // Collect text properties into an array
  let index = 0;
  while (inputObject.hasOwnProperty(`text${index}`)) {
    outputObject.text.push(inputObject[`text${index}`]);
    delete outputObject[`text${index}`]; // Optionally remove the property if needed
    index++;
  }
  console.log("outputOb", outputObject);
  return outputObject;
};
export default QuestionInput;
