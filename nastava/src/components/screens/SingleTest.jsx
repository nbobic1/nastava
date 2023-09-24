import { useActionData, useParams } from "react-router-dom";
import { useState} from "react"
import { useEffect } from "react";
import axios from "axios";
import Question from "../Question";
import { useAtom } from "jotai";
import { singleTest } from "../../atoms";
import { useNavigate } from "react-router-dom";

import {Button} from "@/@/components/ui/button"



const SingleTest = ({}) => {
    const navigate = useNavigate();
    let { id } = useParams();
    const [item,setItem]=useAtom(singleTest)
    const [pitanja, setPitanja] = useState([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleNextQuestion = () => {
        // Check if there are more questions to display
        if (currentQuestionIndex < pitanja.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      };

    const vratiNazad = () => {
        navigate({
            pathname: `/studentScreen`,
        });
    }
    
    useEffect(() => {
        
        setPitanja([])
        
        for(var i of item.question)
        {
            console.log('#',i)
            
            axios.post(`http://localhost:3000/getQuestion`,  { id : i.id,num:i.numq}).then((response) => {
                setPitanja([...pitanja,...response.data]);

                console.log("repsonse ovdje " + JSON.stringify(response.data))
              }).catch((error) => {
                  console.log("error je", error);
              })
        }
       
    }, [])

    return(
        <div>
   
        {pitanja.length > 0 && (
        <div>
          <Question item={pitanja[currentQuestionIndex]} next = {handleNextQuestion} tren = {currentQuestionIndex} duz= {pitanja.length} />
          
        </div>
      )}
         <Button onCLick = {vratiNazad} className="mt-16">Predaj test</Button>
         </div>
    )
}

export default SingleTest;