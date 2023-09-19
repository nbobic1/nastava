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

import { Input } from "@/@/components/ui/input"
import axios from 'axios'
const Login =({})=>{
    const form = useForm()
    const submit=()=>{
        axios.post('http://localhost:3000/login', form.getValues(),{
            headers: {
              'Access-Control-Allow-Origin':'*',
              'Content-Type': 'application/json',
            }})
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    return(
        <div className="flex-row justify-around flex mb-5">
            <Form {...form}>
                <FormLabel>Login</FormLabel>
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
                    <Button onClick={submit}>Login</Button>
        </div>
    )
}

export default Login;