import {Button} from "@/@/components/ui/button"
import QuestionInput from "../QuestionInput";
import { useAtom } from 'jotai'
import { teacherQuestions } from "../../atoms";
import { groupName } from "../../atoms";
import { Input } from "@/@/components/ui/input"
import { useState} from "react"
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
const [groupname, setGroupName] = useAtom(groupName);
const [questions, setQuestions] = useAtom(teacherQuestions)
const largestId =questions.length>0?questions.reduce((maxObject, currentObject) => {
    if (currentObject.id > maxObject.id) {
      return currentObject;
    } else {
      return maxObject;
    }
  }).id:0;

const setGroupNameFunction = (item) =>{
  setGroupName(item);
}
const addQuestion1 =() =>{
  console.log('sealjem')
axios.post('http://localhost:3000/makeGroup', {},
{
  withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    }})
    .then(function (response) {
      console.log('neki restponse',response.data,JSON.stringify(response));
    })
    .catch(function (error) {
      console.log('neki error',error,JSON.stringify(error));
    }); 
}
const [nazivGrupe, setNazivGrupe] = useState('');
const [grupe, setGrupe] = useState([]);
const dodajGrupu=()=>{
  setGrupe((a)=>[...a,{title:nazivGrupe,questionType:'dasf'}])
  setNazivGrupe('')
}
return (
   
<div className="flex-row justify-around flex mb-5" style={{display: 'block'}}>
      <Input 
      placeholder="" 
      className="mt-10" 
      value={nazivGrupe} onChange={(e)=>{setNazivGrupe(e.target.value)}} />
      <Button 
      onClick={dodajGrupu} 
      className="my-5">Dodaj grupu</Button>
      <Accordion type="single" collapsible className="w-full">
       {
       grupe.map((item,index)=>
        
        <AccordionItem  value={item.title}>
        <AccordionTrigger>{item.title}</AccordionTrigger>
        <AccordionContent>
          <Card className="p-5">
            <>        
              <Button onClick={()=>{
                  grupe[index]={...grupe[index],questionType:'multipleChoice'}
              }} style={{margin: '15px'}}>Add multiple choice question</Button>
            <Button onClick={()=>{
                  grupe[index]={...grupe[index],questionType:'oneCorrect'}
              }} style={{margin: '15px'}}>Add one correct question</Button>
            <Button onClick={
              ()=>{
                grupe[index]={...grupe[index],questionType:'sdfds'}
            }
            } style={{margin: '15px'}}>Add text question</Button>      
                <QuestionInput type={item.questionType}></QuestionInput>
    <Button onClick={addQuestion1} style={{margin: '20px'}}>Dodaj pitanje</Button> 
     </>
          </Card>
        </AccordionContent>
      </AccordionItem>)
    }
    </Accordion>
   
     
</div>


)
};

export default MakeQuestion;