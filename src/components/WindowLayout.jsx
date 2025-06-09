import { useRef } from 'react';
import DraggableDiv from '../scripts/DraggableDiv';

export default function WindowLayout() {
  const headerRef = useRef(null);

  return (
    <DraggableDiv dragHandleRef={headerRef}>
      <div className="w-full h-full bg-white shadow-md overflow-hidden">
        <div
          ref={headerRef}
          className="px-2 py-1 bg-gray-800 text-white cursor-move"
        >
          My Window
        </div>
        <div className="p-2">
          Resizable and Draggable content!
        </div>
      </div>
    </DraggableDiv>
  );
}
