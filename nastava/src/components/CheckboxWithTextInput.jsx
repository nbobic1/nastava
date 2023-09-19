import { Checkbox } from "@/@/components/ui/checkbox"
import { Input } from "@/@/components/ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/@/components/ui/form"
export function CheckboxWithTextInput({item,index,field,form,id}) {
   return (
    <div className="items-top flex space-x-2 ">
        
      <Checkbox   checked={field.value?.includes(id)}
                            onCheckedChange={(checked) => {
                              if(checked)
                            {
                                if(!field.value)
                                        field.onChange([id])
                                    else
                                    field.onChange([...field.value, id])
                            }
                            else field.onChange(field.value?.filter(
                                      (value) => value !== id
                                    ))
                                return checked;
                            }} id={id} className="my-[auto]"/>
     
      <div className="grid gap-1.5 leading-none">
      <FormField
          control={form.control}
          name={"text"+index}
          render={({ field }) => (
          <Input {...field} placeholder="One of the answers..."></Input>
          )}
          />
      </div>
    </div>
  )
}