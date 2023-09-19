import * as React from "react"
import { useState } from 'react';

import {Button} from "@/@/components/ui/button"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/@/components/ui/form"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/@/components/ui/dropdown-menu"



import { Input } from "@/@/components/ui/input"

const Register = ({}) =>{
    const form = useForm()
    const [role, setRole] = useState('Izaberite svoju rolu');

    function promjeniProfesora() {
        setRole("Profesor");        
    }
    function promjeniStudent() {
        setRole("Student");        
    }

    return(
        <div className="flex-row justify-around flex mb-5">
             <Form {...form}>
                <FormLabel>Register</FormLabel>
                <form className="space-y-8">
                    <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input placeholder="" {...field} />
                        </FormControl>
                        <FormDescription>
                            u ovo polje upisite username
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input placeholder="" {...field} />
                        </FormControl>
                        <FormDescription>
                            u ovo polje upisite sifru 
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger>{role}</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Rola</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={promjeniProfesora}>Profesor</DropdownMenuItem>
                            <DropdownMenuItem onClick={promjeniStudent}>Student</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
} 

export default Register;