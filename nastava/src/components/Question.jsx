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
  import {Button} from "@/@/components/ui/button"
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/@/components/ui/radio-group"
import { Input } from "@/@/components/ui/input"

import { useForm } from "react-hook-form"
import { CheckboxWithText } from "./CheckboxWithText";
import RadioButtonItem from "./RadioButtonItem";
import { useAtom } from 'jotai'
function arraysAreEqual(arr1, arr2) {
  try{
    if (arr1.length !== arr2.length) return false;
  arr1.sort();
  arr2.sort();
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;

  }
  catch(e){
    return false
  }
}
const Question = ({ points,next,item}) =>
{
  const [bodovi,setBodovi]=points
  var type=checkAnswerType(item.answers)
  const form = useForm()
  const submit = () =>
  {
    var isOk=false
    if(type==='multipleChoice')
    {
      var t=item.answers.split(',')
      var k=t.map(item=>parseInt(item))
      isOk=arraysAreEqual(k,form.getValues().answer)
    }
    else if(type==='text')
    {
      isOk=form.getValues().textanswer===item.answers
    }
    if(isOk)
    {
      console.log('tacno odgovoreno pitanje')
      setBodovi(bodovi+item.points)
    }
    else
    setBodovi(bodovi-item.negativepoints)
    next()
  }
  return (
<Card className="mb-5 border-[#0F172A55]">
    <Form {...form} >
      <form   className=" br border-black space-y-8  p-5 ">
        <FormField
          control={form.control}
          name="textanswer"
          render={({ field }) => (
            <>
            <FormLabel className="text-xl">{item.question}</FormLabel>
            {type === 'multipleChoice' ?

              <FormItem>
                <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <RadioGroup defaultValue="option-one">
                  {item.qtext.split(',').map((item,index) =>
                  {
                    return (
                      <CheckboxWithText key={index} index={index} field={field} text={item}></CheckboxWithText>
                    )
                  })}
                </RadioGroup>
                )}/>
              </FormItem>
              :
              (type === 'oneCorrect' ?

                <FormItem>
                  <RadioGroup defaultValue="option-one">
                    {item.qtext.split(',').map((item,index) =>
                    {
                      return (
                        <RadioButtonItem form={form} key={index} item={item}></RadioButtonItem>
                      )
                    })}
                  </RadioGroup>
                </FormItem>

                :
                // basic input text
                <>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </>
              )}
              </>
          )}
        />

      </form>
    </Form>
        <Button className="mb-5"  onClick={submit} >Submit</Button>
    </Card>
  );
};
function checkAnswerType(answer) {
  if (/^\d+$/.test(answer)) {
    // Check if the answer is a single number (e.g., '1')
    return 'oneCorrect';
  } else if (/^\d+(,\d+)+$/.test(answer)) {
    // Check if the answer is a comma-separated string of numbers (e.g., '1,2,3')
    return 'multipleChoice';
  } else if (typeof answer === 'string') {
    // Check if the answer is a string
    return 'text';
  } else {
    // Handle other cases if needed
    return 'unknown'; // You can return an appropriate value for unknown types
  }
}
export default Question;