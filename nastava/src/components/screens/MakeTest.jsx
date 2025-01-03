import * as z from "zod";
import { useForm } from "react-hook-form";
import * as React from "react";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  ConciergeBell,
  CopySlash,
} from "lucide-react";
import { Calendar } from "@/@/components/ui/calendar";
import { useEffect } from "react";
import { cn } from "@/@/lib/utils";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/@/components/ui/accordion";
import { Button } from "@/@/components/ui/button";
import { Slider } from "@/@/components/ui/slider";
import axios from "axios";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/@/components/ui/tooltip";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/@/components/ui/popover";
import { Input } from "@/@/components/ui/input";
import Loading from "../Loading";

const MakeTest = ({}) => {
  const [data, setData] = useState([]);
  const [sliderChange, setSliderChange] = useState([]);
  const [date, setDate] = React.useState("");
  const [open, setOpen] = useState(false);
  const form = useForm();
  const submit = () => {
    setOpen(true);
    axios
      .post(
        "https://98.85.179.68/makeTest",
        {
          username: localStorage.getItem("username"),
          answers: JSON.stringify(sliderChange),
          question: JSON.stringify(data),
          ...form.getValues(),
          date: JSON.stringify(date),
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        setOpen(false);
        setSliderChange(new Array(sliderChange.length).fill(0));
      })
      .catch(function (error) {
        setOpen(false);
        console.log("neki error", error, JSON.stringify(error));
      });
  };
  useEffect(() => {
    if (!open) {
      var username = localStorage.getItem("username");
      axios
        .get(`https://98.85.179.68/getGroups`, {
          params: { username: username },
        })
        .then((response) => {
          setData(response.data);
          setSliderChange(new Array(response.data.length).fill(0));
        })
        .catch((error) => {
          console.log("error je", error);
        });
    }
  }, []);

  return (
    <div className="mb-5 ">
      <Loading open={open}></Loading>
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
            name="trajanjeTesta"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trajanje testa</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="" {...field} />
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
                {date ? (
                  format(date, "PPP")
                ) : (
                  <span>Odaberite datum odrzavanja ispita</span>
                )}
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
      <h1 style={{ marginTop: "40px" }}>Izaberite broj pitanja po grupi</h1>
      <Accordion type="single" collapsible className="w-full">
        {data.map((item, index) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>{item.groupname}</AccordionTrigger>
            <AccordionContent style={{ innerHeight: "70px" }}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <p>
                      {sliderChange[index]} out of {item.numq}
                    </p>
                    <Slider
                      style={{ width: "350px" }}
                      defaultValue={[sliderChange[index]]}
                      max={item.numq}
                      step={1}
                      onValueChange={(e1) => {
                        var t = [...sliderChange];
                        t[index] = e1[0];
                        setSliderChange(t);
                      }}
                    ></Slider>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Button onClick={submit} className="mt-16">
        Submit
      </Button>
    </div>
  );
};

export default MakeTest;
