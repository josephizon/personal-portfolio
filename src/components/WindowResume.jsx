import { useRef, useState } from 'react';
import DraggableDiv from '../scripts/DraggableDiv';

export default function WindowResume({clickClose}) {
  const headerRef = useRef(null);
  const [isMaximized, setMaximize] = useState(false);

  const clickMaximize = () => {
    setMaximize((prev) => !prev); // toggle
  };

  return (
    <DraggableDiv dragHandleRef={headerRef} maximize={isMaximized}>
      {/* main div: the whole white thing */}
      <div className={`w-full h-full bg-white border-2 border-black overflow-hidden`}>
        {/* div for header bar */}
        <div className='grid grid-cols-[1fr_auto_auto] '> 
          <div
            ref={headerRef}
            className="px-2 py-1 bg-gray-800 text-white border-black border-b-2 cursor-grab"
          >
            [insert icon] Resume
          </div>

          <div onClick={clickMaximize} className="py-1 w-10 text-center content-center bg-gray-800 hover:bg-gray-600 transition-colors border-black border-b-2 cursor-default">&#xf2d1;</div>
          <div onClick={clickClose} className="py-1 w-10 text-center content-center bg-gray-800 hover:bg-red-500 transition-colors border-black border-b-2 cursor-default">X</div>
        </div>
        
        

        <div className="p-2 text-black">
          Resizable and Draggable content!
        </div>
      </div>
    </DraggableDiv>
  );
}
