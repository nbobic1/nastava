import { useState } from 'react'
import './App.css'
import { Button } from './@/components/ui/button'
import
  {
    Form
  } from "./@/components/ui/form"
import { Separator } from "./@/components/ui/separator"
import Question from './components/Question'
import MakeQuestion from './components/screens/MakeQuestion'
import MakeTest from './components/screens/MakeTest'
import Login from './components/screens/Login'
import Register from './components/screens/Register'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import { useAtom } from 'jotai'
import { isLogedinState } from './atoms'
import ProtectedRoute from './components/ProtectedRoute'
function App()
{
  const [isLogedin, setIsLogedin] = useAtom(isLogedinState)
  console.log('isLg',isLogedin)
  return (

    <div className="w-[90%] m-[auto] mt-5 text-center">
      <BrowserRouter>
      <div className='w-full flex-row justify-between flex m-0'>
        {isLogedin===false ?
          <>
           <Link to="/login"> <Button>Login</Button></Link>
            <Link to={'/register'}><Button>Register</Button></Link>
          </>
          :
          <>
          <Link to="/makeQuestion"><Button>Make question</Button></Link>
          <Link to="/makeTest"><Button >Make test</Button> </Link>
           <Link to="/login"><Button onClick={() => { setIsLogedin(false); }}>Logout</Button></Link>
          </>
       }
        
      </div>
      <Separator className="my-5 w-full"></Separator>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/makeQuestion' element={<ProtectedRoute><MakeQuestion /></ProtectedRoute>} />
          <Route path='/makeTest' element={<ProtectedRoute><MakeTest /></ProtectedRoute>} />
          <Route path='/test' element={<div className="text-left">
            <Question text='why are u dumb' type={'multipleChoice'} possibleAnswers={['nestojkl', 'nes sdfs', 'sdfsdf']}></Question>
            <Question text='why are u dumb' type={'df'} possibleAnswers={['nestojkl', 'nes sdfs', 'sdfsdf']}></Question>
            <Question text='why are u dumb' type={'oneCorrect'} possibleAnswers={['nestojkl', 'nes sdfs', 'sdfsdf']}></Question>
          </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
