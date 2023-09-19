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
const QuestionInput = ( { text = '',id=0, type = 0, possibleAnswers = [] }) =>
{
  const form = useForm()
  const [answers, setAnswer] = useState([]);
  const onSubmit = () =>
  {
    console.log('erer',form.getValues())
  }
  const addAnswer=()=>{
    setAnswer([...answers,''])
  } 
  const removeAnswer=()=>{
    setAnswer(answers.filter(item=>item.id!==id))
  }
  return (
<Card className="mb-5 border-[#0F172A55] flex-row">
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)}   className=" br border-black space-y-8  p-5 ">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <>
          
          <Input className="text-xl" placeholder="Your question..." {...field} />
            {type === 'multipleChoice' ?

              <FormItem>
                <RadioGroup defaultValue="option-one">
                  {answers.map((item,index) =>
                  {
                    return (
                      <CheckboxWithTextInput field={field} key={index}  id={id} index={index}  text={item}></CheckboxWithTextInput>
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
                        <RadioButtonItemInput key={index} id={id} index={index} item={item}></RadioButtonItemInput>
                      )
                    })}
                  </RadioGroup>
                </FormItem>
                :
                // basic input text
                <>
                  <FormControl>
                    <Input placeholder="Your answer..." {...form} />
                  </FormControl>
                  <FormMessage />
                </>
              )}
              </>
          )}
        />

        <Button onClick={addAnswer} >Add answer</Button>
        <Button type="submit">Add dsfd</Button>
      </form>
    </Form>
    
    <Button onClick={removeAnswer} >X</Button>
    </Card>
  );
};

export default QuestionInput;