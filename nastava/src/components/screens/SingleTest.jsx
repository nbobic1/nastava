import { useActionData, useParams } from "react-router-dom";
import { useState} from "react"
import { useEffect } from "react";
import axios from "axios";
import Question from "../Question";
import { useAtom } from "jotai";
import { singleTest } from "../../atoms";

import {Button} from "@/@/components/ui/button"



const SingleTest = ({}) => {
    let { id } = useParams();
    const [item,setItem]=useAtom(singleTest)
    const [pitanja, setPitanja] = useState([])

    useEffect(() => {
        
        setPitanja([])
        
        for(var i of item.question)
        {
            console.log('#',i)
            
            axios.post(`http://localhost:3000/getQuestion`,  { id : i.id,num:i.numq}).then((response) => {
                setPitanja([...pitanja,response.data]);

                console.log("repsonse ovdje " + JSON.stringify(response.data))
              }).catch((error) => {
                  console.log("error je", error);
              })
        }
       
    }, [])

    
  
    

    return(
        <div className="flex-row justify-around flex mb-5" style={{display: 'block'}}>
         {  pitanja.map((item) => (
                    <Question text={item[0].question} type='oneCorrect' possibleAnswers={item[0].qtext[0]} />
                ))
         }
         <Button className="mt-16">Predaj test</Button>
         </div>
    )
}

export default SingleTest;