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
import axios from 'axios'

import { useForm } from "react-hook-form"
import { CheckboxWithTextInput } from "./CheckboxWithTextInput";
import RadioButtonItemInput from "./RadioButtonItemInput";
import { useState } from 'react'
import { useAtom } from "jotai"
import { teacherQuestions } from "../atoms"
import { groupName } from "../atoms"
const QuestionInput = ( { text = '',id=0, type = 0, possibleAnswers = [] }) =>
{
  const [groupname, setGroupName] = useAtom(groupName);
  const [questions,setQuestions]=useAtom(teacherQuestions)
  const form = useForm()
  const [answers, setAnswer] = useState([]);
  const onSubmit = () =>
  {
    console.log('erer',form.getValues())
  }
  const addAnswer=()=>{
    setAnswer([...answers,''])
  } 
 
  const removeQuestion=()=>{
    setQuestions(questions.filter(item=>item.id!==id))
  }
  return (
<Card className="mb-5 border-[#0F172A55] flex-row flex ">
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)}   className=" br border-black space-y-8  p-5 w-[90%]">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
          <Input className="text-xl" placeholder="Your question..." {...field} />)}/>
          <FormField
          control={form.control}
          name="points"
          render={({ field }) => (
          <Input className="text-xl" placeholder="Unesite bodove za pitanje" {...field} />)}/>
          <FormField
          control={form.control}
          name="negativepoints"
          render={({ field }) => (
          <Input className="text-xl" placeholder="Unesite negativne bodove za pitanje" {...field} />)}/>
            {type === 'multipleChoice' ?
           <FormField
           control={form.control}
           name="answer"
           render={({ field }) => (
              <FormItem>
               
                 { answers.map((item,index) =>
                  {
                    return (
                      <CheckboxWithTextInput  field={field} form={form} key={index}  id={index} index={index}  text={item}></CheckboxWithTextInput>
                    )
                  })}
              </FormItem>  
           )}/>
              :
              (type === 'oneCorrect' ?
             
                <FormItem>  
                     <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <RadioGroup  onValueChange={field.onChange}
                  defaultValue="option-one">
                    {answers.map((item,index) =>
                    {
                      return (
                        <RadioButtonItemInput key={index} id={id} index={index} item={item}></RadioButtonItemInput>
                      )
                    })}
                  </RadioGroup>
                )}/>
                </FormItem> 
                :
                // basic input text
                <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <>
                  <FormControl>
                    <Input placeholder="Your answer..." {...form} />
                  </FormControl>
                  <FormMessage />
                  </>
                  )}
                  />
              )}
        

        <Button onClick={addAnswer} >Add answer</Button>
      </form>
    </Form>
    
    <Button className="m-auto" variant="outline" onClick={removeQuestion} >X</Button>
    </Card>
  );
};

export default QuestionInput;