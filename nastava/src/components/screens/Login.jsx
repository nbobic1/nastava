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
import { useState } from "react"
import { Input } from "@/@/components/ui/input"
import axios from 'axios'
import { useAtom } from "jotai"
import { isLogedinState } from "../../atoms"
import Loading from "../Loading"
import { useNavigate } from "react-router-dom"
const Login =({})=>{
    const [isLogedin, setIsLogedin] = useAtom(isLogedinState);
    const [open, setOpen] = useState(false);
    const form = useForm()
    const navigate=useNavigate()
    const submit=()=>{
        setOpen(true)
        axios.post('http://localhost:3000/login', form.getValues(),{
            headers: {
              'Access-Control-Allow-Origin':'*',
              'Content-Type': 'application/json',
            }})
          .then(function (response) {
            console.log(response.data);
            setIsLogedin(response.data)
            setOpen(false)
            navigate('/makeTest')
          })
          .catch(function (error) {
            console.log(error);
            setOpen(false)
          });
    }
    return(
        <div className=" mb-5">
            <Loading open={open}></Loading>
            <Form {...form}>
                <FormLabel className="text-xl">Login</FormLabel>
                <form className="mx-auto space-y-8 mt-16 max-w-[300px]">
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
                    name="passwordhash"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="" {...field} />
                        </FormControl>
                        <FormDescription>
                            u ovo polje upisite sifru 
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </form>
            </Form>
                    <Button className="mt-16"  onClick={submit}>Login</Button>
        </div>
    )
}

export default Login;