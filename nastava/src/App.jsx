import { useState } from 'react'
import './App.css'
import { Button } from './@/components/ui/button'
import {
  Form
} from "./@/components/ui/form"
import { Separator } from "./@/components/ui/separator"
import Question from './components/Question'
import MakeQuestion from './components/screens/MakeQuestion'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div class="w-[90%] m-[auto] mt-5 text-center">
   <div class='w-full flex-row justify-between flex m-0'>
    
<Button>Login</Button>
<Button>Teacher</Button>
<Button>Student</Button>
<Button>About</Button>
   </div>
   <Separator className="my-5 w-full"></Separator>

<h1 className='mb-5'>Pitanja</h1>
<div className="text-left">
<Question text='why are u dumb' type={'multipleChoice'} possibleAnswers={['nestojkl','nes sdfs','sdfsdf']}></Question>
<Question text='why are u dumb' type={'df'} possibleAnswers={['nestojkl','nes sdfs','sdfsdf']}></Question>
<Question text='why are u dumb' type={'oneCorrect'} possibleAnswers={['nestojkl','nes sdfs','sdfsdf']}></Question>
</div>
<MakeQuestion></MakeQuestion>
  </div>
  )
}

export default App
