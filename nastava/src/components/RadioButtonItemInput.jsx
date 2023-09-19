import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/@/components/ui/radio-group"
import { Input } from "@/@/components/ui/input";
const RadioButtonItemInput =({item,index})=>{
return (
    <FormItem className="flex items-center space-x-3 space-y-0">
    <FormControl>
      <RadioGroupItem value={index} />
    </FormControl>
    <FormControl>
        <Input placeholder="One of the answers..."></Input>
    </FormControl>
  </FormItem>
);
};

export default RadioButtonItemInput;