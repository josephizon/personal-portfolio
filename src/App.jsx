import { useState } from 'react';

import './App.css'
import TaskBar from './components/TaskBar'
import Icons from './components/Icons'
import WindowResume from './components/WindowResume'




function App() {
  // initialization
  const [windowState, isWindowOpen] = useState(false);

  // onclick handler 
  const handleClickOpen = () => {
    isWindowOpen(true); // this updates the state
  };

  const handleClickClose = () => {
    isWindowOpen(false); // this updates the state
  };

  return (
    <>
    <div className='grid grid-cols-6 gap-4 h-screen'> 
      {/* Icons Grid */}
      <div className="grid grid-cols-2 gap-4 h-fit bg-yellow-500"> 
        <div className='bg-green-500'> <Icons icon_name="portfolio"/> </div>
        <div className='bg-green-500'> <Icons icon_name="readme"/> </div>
        <div className='bg-green-500'> <Icons icon_name="resume" clickReference={handleClickOpen}/> </div>
      </div>
      
      {/* Window Space div */}
      <div className='col-span-5 bg-yellow-500'> 
        {windowState && <WindowResume clickClose={handleClickClose} />}
        
      </div>

    </div>
      <TaskBar> </TaskBar>
    </>
  )
}

export default App
