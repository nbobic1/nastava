import { useState } from 'react'
import './App.css'
import { Button } from './@/components/ui/button'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "./@/components/ui/menubar"
import { Separator } from "./@/components/ui/separator"

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

<h1>KONTENTTT</h1>
  </div>
  )
}

export default App
