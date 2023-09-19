import { Checkbox } from "@/@/components/ui/checkbox"
 
export function CheckboxWithText({text}) {
  return (
    <div className="items-top flex space-x-2">
      <Checkbox id={text} className="my-[auto]"/>
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