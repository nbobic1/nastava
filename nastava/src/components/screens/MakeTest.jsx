import * as z from "zod"
import { useForm } from "react-hook-form"
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/@/components/ui/calendar"
import { cn } from "@/@/lib/utils"
import { useState} from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/@/components/ui/accordion"
import {Button} from "@/@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/@/components/ui/form"
import {Popover,PopoverContent,PopoverTrigger} from "@/@/components/ui/popover"
import { Input } from "@/@/components/ui/input"
import { Card} from "@/@/components/ui/card"
import MakeQuestion from "./MakeQuestion"

  const MakeTest =({})=>{
    const [date, setDate] = React.useState('')
    const form = useForm()
    const [grupe, setGrupe] = useState([]);
    const [nazivGrupe, setNazivGrupe] = useState('');
    const dodajGrupu=()=>{
      setGrupe((a)=>[...a,nazivGrupe])
      setNazivGrupe('')
    }
    return(
        <div className="mb-5 ">
            <Form {...form}>
      <form className="space-y-8 mx-auto max-w-[300px]">
        <FormField
          control={form.control}
          name="nazivTesta"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Naziv Testa</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                u ovo polje upisite naziv testa
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="brojGrupa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Broj grupa testa</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                u ovo polje upiste broj grupa testa
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="trajanjeTesta"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trajanje testa</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                u ovo polje upiste koliko ce trajati test u minutama
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Odaberite datum odrzavanja ispita</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </form>
    </Form>
    <Input placeholder="" className="mt-10" value={nazivGrupe} onChange={(e)=>{setNazivGrupe(e.target.value)}} />   
        <Button onClick={dodajGrupu} className="my-5">Izaberi grupu</Button>
    <Accordion type="single" collapsible className="w-full">
       {
       grupe.map(item=>
        <AccordionItem value={item}>
        <AccordionTrigger>{item}</AccordionTrigger>
        <AccordionContent>
          <Card className="p-5">
          <MakeQuestion key={item}></MakeQuestion>
        </Card>
        </AccordionContent>
      </AccordionItem>)
    }
    </Accordion>
   
        <Button className="mt-16">Submit</Button>
        </div>
    )
  }

  export default MakeTest;