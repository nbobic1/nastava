import {Button} from "@/@/components/ui/button"
import QuestionInput from "../QuestionInput";
import { useAtom } from 'jotai'
import { teacherQuestions } from "../../atoms";
import { groupName } from "../../atoms";
import { Input } from "@/@/components/ui/input"
import { useState} from "react"
import { Card} from "@/@/components/ui/card"
import { Provider, atom } from 'jotai'
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

const addMultiChoiceQuestion=()=>{
setQuestions([...questions,{type:'multipleChoice',id:largestId+1}])
}

const addOneCorrectQuestion=()=>{
setQuestions([...questions,{type:'oneCorrect',id:largestId+1}]);
}

const addQuestion=()=>{
setQuestions([...questions,{type:'nes',id:largestId+1}]);
}

const submit=()=>{
    console.log('questions')
}

const setGroupNameFunction = (item) =>{
  console.log("Item mi ovdje izadje kod naziva: " + item);
  setGroupName(item);
}

const [nazivGrupe, setNazivGrupe] = useState('');
const [grupe, setGrupe] = useState([]);
const dodajGrupu=()=>{
  setGrupe((a)=>[...a,nazivGrupe])
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
       grupe.map(item=>
        
        <AccordionItem  value={item}>
        <AccordionTrigger>{item}</AccordionTrigger>
        <AccordionContent>
          <Card className="p-5">
            <>{
              
               questions.map((item,index)=>
               <QuestionInput key={index} id={item.id} index={index} type={item.type}></QuestionInput>
               )
            }
            <Button onClick={ event => {addMultiChoiceQuestion(), setGroupNameFunction(item)}} style={{margin: '15px'}}>Add multiple choice question</Button>
            <Button onClick={event => {addOneCorrectQuestion(), setGroupNameFunction(item)}} style={{margin: '15px'}}>Add one correct question</Button>
            <Button onClick={event => {addQuestion(), setGroupNameFunction(item)}} style={{margin: '15px'}}>Add text question</Button>
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