import {Button} from "@/@/components/ui/button"
import QuestionInput from "../QuestionInput";
import { useAtom } from 'jotai'
import { teacherQuestions } from "../../atoms";


const MakeQuestion =({})=>{
const [questions, setQuestions] = useAtom(teacherQuestions)
const addMultiChoiceQuestion=()=>{
setQuestions([...questions,{type:'multipleChoice'}])
}

const addOneCorrectQuestion=()=>{
setQuestions([...questions,{type:'oneCorrect'}]);
}

const addQuestion=()=>{
setQuestions([...questions,{type:'nes',}]);
}

const submit=()=>{
    console.log('questions')
}

return (
    <>
    {
        questions.map((item,index)=>
        <QuestionInput key={index} index={index} type={item.type}></QuestionInput>
        )
    }
<div className="flex-row justify-around flex">
<Button onClick={addMultiChoiceQuestion}>Add multiple choice question</Button>
<Button onClick={addOneCorrectQuestion}>Add one correct question</Button>
<Button onClick={addQuestion}>Add text question</Button>
</div>
<Button onClick={submit}>Finish makeing test</Button>
</>
)
};

export default MakeQuestion;