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
const RadioButtonItem =({item})=>{
return (
    <FormItem className="flex items-center space-x-3 space-y-0">
    <FormControl>
      <RadioGroupItem value={item} />
    </FormControl>
    <FormLabel className="font-normal text-base">
      {item}
    </FormLabel>
  </FormItem>
);
};

export default RadioButtonItem;