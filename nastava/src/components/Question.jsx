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
const Question = ({ text = '', type = 0, possibleAnswers = [] }) =>
{
  const form = useForm()
  const onSubmit = () =>
  {

  }
  return (
<Card className="mb-5">
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)}   className=" br border-black space-y-8  p-5 ">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <>
            <FormLabel className="text-xl">{text}</FormLabel>
            {type === 'multipleChoice' ?

              <FormItem>
                <RadioGroup defaultValue="option-one">
                  {possibleAnswers.map(item =>
                  {
                    return (
                      <CheckboxWithText text={item}></CheckboxWithText>
                    )
                  })}
                </RadioGroup>
              </FormItem>
              :
              (type === 'oneCorrect' ?

                <FormItem>
                  <RadioGroup defaultValue="option-one">
                    {possibleAnswers.map(item =>
                    {
                      return (
                        <RadioButtonItem item={item}></RadioButtonItem>
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
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
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

export default Question;