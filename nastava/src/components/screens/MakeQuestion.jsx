import {Button} from "@/@/components/ui/button"
import QuestionInput from "../QuestionInput";
import { useAtom } from 'jotai'
import { teacherQuestions } from "../../atoms";


const MakeQuestion =({})=>{
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

return (
    <>
    {
        questions.map((item,index)=>
        <QuestionInput key={index} id={item.id} index={index} type={item.type}></QuestionInput>
        )
    }
<div className="flex-row justify-around flex mb-5">
<Button onClick={addMultiChoiceQuestion}>Add multiple choice question</Button>
<Button onClick={addOneCorrectQuestion}>Add one correct question</Button>
<Button onClick={addQuestion}>Add text question</Button>
</div>

</>
)
};

export default MakeQuestion;