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
import { RadioGroup, RadioGroupItem } from "@/@/components/ui/radio-group"
import { Input } from "@/@/components/ui/input"

import { useForm } from "react-hook-form"
import { CheckboxWithText } from "./CheckboxWithText";
import RadioButtonItem from "./RadioButtonItem";
import { useAtom } from 'jotai'
const Question = ({ item}) =>
{
  
  console.log('adfda',item,item.answer)
  var type=checkAnswerType(item.answers)
  console.log('type',type)
  const form = useForm()
  const onSubmit = () =>
  {

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
            <FormLabel className="text-xl">{item.question}</FormLabel>
            {type === 'multipleChoice' ?

              <FormItem>
                <RadioGroup defaultValue="option-one">
                  {item.qtext.split(',').map((item,index) =>
                  {
                    return (
                      <CheckboxWithText key={index} text={item}></CheckboxWithText>
                    )
                  })}
                </RadioGroup>
              </FormItem>
              :
              (type === 'oneCorrect' ?

                <FormItem>
                  <RadioGroup defaultValue="option-one">
                    {item.qtext.split(',').map((item,index) =>
                    {
                      return (
                        <RadioButtonItem key={index} item={item}></RadioButtonItem>
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

        <button type="submit">Submit</button>
      </form>
    </Form>
    </Card>
  );
};
function checkAnswerType(answer) {
  console.log('dfaa=',answer)
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