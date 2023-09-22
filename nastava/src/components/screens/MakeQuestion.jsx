import {Button} from "@/@/components/ui/button"
import QuestionInput from "../QuestionInput";
import {useEffect, useState} from "react"
import { Card} from "@/@/components/ui/card"
import { Provider, atom } from 'jotai'
import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/@/components/ui/accordion"

const MakeQuestion =({})=>{
 
const [grupe, setGrupe] = useState([]);
useEffect(() => {
    var username=localStorage.getItem('username')
   axios.get(`http://localhost:3000/getGroups`,{ params: { username: username} }).then((response) => {
     setGrupe(response.data);
   }).catch((error) => {
       console.log("error je", error);
   })
},[]);
return (
   
<div className="flex-row justify-around flex mb-5" style={{display: 'block'}}>
      <Accordion type="single" collapsible className="w-full">
       {
       grupe.map((item,index)=>
{ var questionType="muldaf";
return (
        <AccordionItem  value={item.groupname?? ' '}>
        <AccordionTrigger>{item.groupname??' '}</AccordionTrigger>
        <AccordionContent>
          <Card className="p-5">
            <>        
              <Button variant={questionType==='multipleChoice'?'outline':'primary'} onClick={()=>{
                 questionType='multipleChoice'}
              } style={{margin: '15px'}}>Multiple choice question</Button>
            <Button variant={questionType==='oneCorrect'?'outline':'primary'}   onClick={()=>{
                questionType='oneCorrect'
              }} style={{margin: '15px'}}>One correct question</Button>
            <Button onClick={
              ()=>{
questionType='sdfds'
            }
            } style={{margin: '15px'}}>Text question</Button>      
                <QuestionInput type={item.questionType}></QuestionInput>
    <Button  style={{margin: '20px'}}>Dodaj pitanje</Button> 
     </>
          </Card>
        </AccordionContent>
      </AccordionItem>)})
    }
    </Accordion>
   
     
</div>


)
};

export default MakeQuestion;