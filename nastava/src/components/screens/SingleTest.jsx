import { useParams } from "react-router-dom";
import { useState} from "react"
import { useEffect } from "react";
import axios from "axios";
import Question from "../Question";



const SingleTest = ({}) => {
    let { id } = useParams();
    const [pitanja, setPitanja] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/getQuestions`, { params: { id : id} }).then((response) => {
            setPitanja(response.data);
            console.log("repsonse ovdje " + JSON.stringify(response.data))
            console.log("PItanja izlaze " + JSON.stringify(pitanja[0]));
          }).catch((error) => {
              console.log("error je", error);
          })
    }, [])

    
  useEffect(() => {
    // Log the data after it has been updated
    console.log('Pitanja izlaze:', JSON.stringify(pitanja[0]));
  }, [pitanja]);

    return(
        <div>
            {
                /*pitanja.map((item) => (
                    <Question text={item[0].question} type='oneCorrect' possibleAnswers={item[0].qtext[0]} />
                ))*/
            }
            <Question text={'item[0].question'} type='oneCorrect' possibleAnswers={['item[0].qtext[0]']} />
            
        </div>
    )
}

export default SingleTest;