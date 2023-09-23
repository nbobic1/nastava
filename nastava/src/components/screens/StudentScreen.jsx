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
import { response } from "express";



const StudentScreen = ({}) => {

    const navigate=useNavigate()
    
    const getInTest = (id) => {
        axios.post('http://localhost:3000/startedTestt', {username: localStorage.getItem('username'), startedTest: 1},
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

        navigate({
            pathname: `/singleTest/${id}`,
            state: { postId: id }
        });
    }

    const [tests, setTests] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3000/getTests`).then((response) => {
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
                    <Card onClick = {() => getInTest(test.id)}>
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