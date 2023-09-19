import {Button} from "@/@/components/ui/button"
import { useState } from 'react'
import QuestionInput from "../QuestionInput";
const MakeQuestion =({})=>{
const [questions, setQuestions] = useState([]);
const addMultiChoiceQuestion=()=>{
setQuestions([...questions,{type:'multipleChoice'}])
}

const addOneCorrectQuestion=()=>{
setQuestions([...questions,{type:'oneCorrect'}]);
}

const addQuestion=()=>{
setQuestions([...questions,{type:'nes'}]);
}


return (
    <>
    {
        questions.map(item =><QuestionInput type={item.type}></QuestionInput>
        )
    }
<div className="flex-row justify-around flex">
<Button onClick={addMultiChoiceQuestion}>Add multiple choice question</Button>
<Button onClick={addOneCorrectQuestion}>Add one correct question</Button>
<Button onClick={addQuestion}>Add text question</Button>
</div>
</>
)
};

export default MakeQuestion;