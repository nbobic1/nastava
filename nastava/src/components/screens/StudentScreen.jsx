import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/@/components/ui/card"

import { useState} from "react"
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

import { useAtom } from "jotai";
import { singleTest } from "../../atoms";



const StudentScreen = ({}) => {

    const navigate=useNavigate() 
    const [item,setItem]=useAtom(singleTest)
    const getInTest = (id,item) => {
       axios.post('http://localhost:3000/startedTest', {username: localStorage.getItem('username'), startedTest: 1, testId: id},
        {
        withCredentials: true,
            headers: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json',
            }})
            .then(function (response) {      
                
            })
            .catch(function (error) {
            console.log('neki error',error,JSON.stringify(error));
        });
        console.log('item dfaf',item)
       setItem(item) 
        navigate({
            pathname: `/singleTest/${id}`,
            state: { postId: id}
        });
    }

    const [tests, setTests] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3000/getTestsForStudent`).then((response) => {
            setTests(response.data);
          }).catch((error) => {
                console.log("error je", error);
          })
    },[])

    return(
        <div className="flex-row justify-around flex mb-5" style={{display: 'block'}}>
            <h1>Dostupni testovi za rad</h1>
            {
                tests.map((test) => (
                    <Card className="my-5"  onClick = {() => getInTest(test.id,test)}> 
                        <CardHeader>
                            <CardTitle>Naziv testa: {test.title}</CardTitle>
                        </CardHeader>

                        <CardFooter>
                            <p>Pocetak testa: {test.testdate}</p>
                            <p style={{marginLeft: '20px'}}>Trajanje testa: {test.minutes} minute</p>
                        </CardFooter>
                    </Card>
                ))
            }
           
      </div>
    )
}

export default StudentScreen;