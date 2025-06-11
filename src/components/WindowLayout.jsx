import { useRef } from 'react';
import DraggableDiv from '../scripts/DraggableDiv';

export default function WindowLayout({clickReference}) {
  const headerRef = useRef(null);

  return (
    <DraggableDiv dragHandleRef={headerRef}>
      {/* main div: the whole white thing */}
      <div className="w-full h-full bg-white shadow-md overflow-hidden"> 
        <div className='grid grid-cols-[1fr_auto_auto]'> 
          <div
            ref={headerRef}
            className="px-2 py-1 bg-gray-800 text-white cursor-move"
          >
            Window Name
          </div>

          <div onClick={clickReference} className="w-10 h-8 text-center content-center bg-gray-800 hover:bg-gray-600 transition-colors">&#xf2d1;</div>
          <div onClick={clickReference} className="w-10 h-8 text-center content-center bg-gray-800 hover:bg-red-500 transition-colors">X</div>
        </div>

        <div className="p-2 text-black">
          Resizable and Draggable content!
        </div>

      </div>
    </DraggableDiv>
  );
}
