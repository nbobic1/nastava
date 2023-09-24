import { Checkbox } from "@/@/components/ui/checkbox"
 
export function CheckboxWithText({text,index,field}) {
  const id=index
  return (
    <div className="items-top flex space-x-2">
      <Checkbox  checked={field.value?.includes(id)}
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
                            }}  id={index} className="my-[auto]"/>
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
            {text}
        </label>
      </div>
    </div>
  )
}