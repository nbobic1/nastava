import { Checkbox } from "@/@/components/ui/checkbox"
import { Input } from "@/@/components/ui/input";

export function CheckboxWithTextInput({item,index,field}) {
  return (
    <div className="items-top flex space-x-2 ">
      <Checkbox {...field} id={index} className="my-[auto]"/>
      <div className="grid gap-1.5 leading-none">
        <Input {...field} placeholder="One of the answers..."></Input>
      </div>
    </div>
  )
}