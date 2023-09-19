import
  {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/@/components/ui/form"
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/@/components/ui/card"
  import { Button } from "../@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/@/components/ui/radio-group"
import { Input } from "@/@/components/ui/input"

import { useForm } from "react-hook-form"
import { CheckboxWithTextInput } from "./CheckboxWithTextInput";
import RadioButtonItemInput from "./RadioButtonItemInput";
import { useState } from 'react'
const QuestionInput = ({ text = '', type = 0, possibleAnswers = [] }) =>
{
  const form = useForm()
  const [answers, setAnswer] = useState([]);
  const onSubmit = () =>
  {

  }
  const addAnswer=()=>{
    console.log('#','dafdaf',answers)
    
    setAnswer([...answers,''])
  }
  return (
<Card className="mb-5 border-[#0F172A55]">
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)}   className=" br border-black space-y-8  p-5 ">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <>
          
          <Input className="text-xl" placeholder="Your question..."  />
            {type === 'multipleChoice' ?

              <FormItem>
                <RadioGroup defaultValue="option-one">
                  {answers.map((item,index) =>
                  {
                    return (
                      <CheckboxWithTextInput index={index}  text={item}></CheckboxWithTextInput>
                    )
                  })}
                </RadioGroup>
              </FormItem>
              :
              (type === 'oneCorrect' ?

                <FormItem>
                  <RadioGroup defaultValue="option-one">
                    {answers.map((item,index) =>
                    {
                      return (
                        <RadioButtonItemInput index={index} item={item}></RadioButtonItemInput>
                      )
                    })}
                  </RadioGroup>
                </FormItem>
                :
                // basic input text
                <>
                  <FormControl>
                    <Input placeholder="Your answer..." {...field} />
                  </FormControl>
                  <FormMessage />
                </>
              )}
              </>
          )}
        />

        <Button onClick={addAnswer} >Add answer</Button>
      </form>
    </Form>
    </Card>
  );
};

export default QuestionInput;