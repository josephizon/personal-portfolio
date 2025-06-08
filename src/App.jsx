import './App.css'
import TaskBar from './components/TaskBar'
import Icons from './components/Icons'
import WindowLayout from './components/WindowLayout'

import DraggableDiv from './scripts/DraggableDiv'


function App() {
  return (
    <>
    <div className='grid grid-cols-6 gap-4 h-screen'> 
      {/* Icons Grid */}
      <div className="grid grid-cols-2 gap-4 h-fit bg-yellow-500"> 
        <div className='bg-green-500'> <Icons icon_name="portfolio"/> </div>
        <div className='bg-green-500'> <Icons icon_name="readme"/> </div>
        <div className='bg-green-500'> <Icons icon_name="resume"/> </div>
      </div>
      
      {/* Window Space div */}
      <div className='col-span-5 bg-yellow-500'> 
        <DraggableDiv><WindowLayout className="content-center"/> </DraggableDiv>
        
      </div>

    </div>
      <TaskBar> </TaskBar>
    </>
  )
}

export default App
