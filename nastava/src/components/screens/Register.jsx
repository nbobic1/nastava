import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/@/components/ui/form";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/@/components/ui/dropdown-menu";

import { redirect } from "react-router-dom";

import { Input } from "@/@/components/ui/input";
import Loading from "../Loading";

const Register = ({}) => {
  const form = useForm();
  const navigate = useNavigate();
  const [role, setRole] = useState("Student");

  function promjeniProfesora() {
    setRole("Profesor");
  }
  function promjeniStudent() {
    setRole("Student");
  }

  const register = () => {
    setOpen(true);
    axios
      .post(
        "https://98.85.179.68/register",
        { ...form.getValues(), userRole: role },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        if (response.status >= 200 && response.status < 300) {
          // The response is OK
          console.log(response.data);
          navigate("/login");
          setOpen(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setOpen(false);
      });
  };
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-5">
      <Loading open={open}></Loading>
      <Form {...form}>
        <FormLabel className="text-xl">Register</FormLabel>
        <form className="space-y-8 mt-16 mx-auto max-w-[300px]">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>u ovo polje upisite username</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordhash"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>u ovo polje upisite sifru</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>Selected role: {role}</div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="p-2 border-[1px] rounded-[4px] border-black">
                Change your role
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Rola</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={promjeniProfesora}>
                Profesor
              </DropdownMenuItem>
              <DropdownMenuItem onClick={promjeniStudent}>
                Student
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </form>
      </Form>
      <Button className="mt-16" onClick={register}>
        Register
      </Button>
    </div>
  );
};

export default Register;
