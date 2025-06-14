// NOTES TO SELF: 
// Add another prop in Draggable which toggles the size of the window in a state format 
// try changing this state based on passing a value from windowlayout to draggable then apps to windowlayout

import React, { useRef, useState, useEffect } from 'react';

export default function DraggableDiv ({ children, dragHandleRef }) {
  // Initilization
  const dragRef = useRef(null);
  const [pos, setPos] = useState({ x: 400, y: 400 }); 
  const [size, setSize] = useState({ width: 240, height: 240 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });
  const [resizing, setResizing] = useState(null); // null or direction string

  // Dragging Code
  // useEffect allows for side effects to happen
  // side effects as in when the [dependencies] change, then it runs 
  // what's inside the array
  useEffect(() => {
    const handleMouseDown = (e) => {
      // left click only
      if (e.button !== 0) return;
      const rect = dragRef.current.getBoundingClientRect();
      setDragging(true);
      setRel({
        x: e.pageX - rect.left,
        y: e.pageY - rect.top,
      });
      e.stopPropagation(); // prevent parent event handlers from happening 
      e.preventDefault(); // prevent default events from happening (ex. clicking links)
    };

    const handle = dragHandleRef?.current;
    if (handle) {
      handle.addEventListener('mousedown', handleMouseDown);
    }

    // clean-up function
    // when not in use, automatically removes what's happening here
    // runs before it gets removed or the component runs again
    return () => {
      if (handle) {
        handle.removeEventListener('mousedown', handleMouseDown);
      }
    };
  }, [dragHandleRef]); // end of useEffect

  // more events that are referenced as props
  // event when mouse is not pressed
  const onMouseUp = () => {
    setDragging(false);
    setResizing(null);
  };

  // event on mouse movement
  const onMouseMove = (e) => {
    if (dragging) {
      setPos({
        x: e.pageX - rel.x,
        y: e.pageY - rel.y,
      });
    }

    if (resizing) {
      const { x, y } = pos;
      const { width, height } = size;
      const dx = e.pageX - x;
      const dy = e.pageY - y;

      let newSize = { ...size };
      let newPos = { ...pos };

      if (resizing.includes('right')) {
        newSize.width = dx;
      }
      if (resizing.includes('bottom')) {
        newSize.height = dy;
      }
      if (resizing.includes('left')) {
        newSize.width = width - (e.pageX - x);
        newPos.x = e.pageX;
      }
      if (resizing.includes('top')) {
        newSize.height = height - (e.pageY - y);
        newPos.y = e.pageY;
      }

      if (newSize.width >= 100 && newSize.height >= 100) {
        setSize(newSize);
        setPos(newPos);
      }
    }

    e.stopPropagation();
    e.preventDefault();
  };

  // event on resizing the div
  const startResizing = (dir) => (e) => {
    setResizing(dir);
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div
      ref={dragRef}
      style={{
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        width: size.width,
        height: size.height,
        background: 'white',
        boxShadow: '0 0 5px rgba(0,0,0,0.2)',
      }}
    >
      {children}

      {/* Resize handles */}
      {['top', 'right', 'bottom', 'left', 'top-left', 'top-right', 'bottom-left', 'bottom-right'].map((dir) => (
        <div
          key={dir}
          onMouseDown={startResizing(dir)}
          style={{
            position: 'absolute',
            [dir.includes('top') ? 'top' : 'bottom']: 0,
            [dir.includes('left') ? 'left' : dir.includes('right') ? 'right' : 'left']: dir.includes('left') ? 0 : dir.includes('right') ? 0 : '50%',
            width: dir.includes('left') || dir.includes('right') ? '10px' : '100%',
            height: dir.includes('top') || dir.includes('bottom') ? '10px' : '100%',
            cursor: {
              top: 'n-resize',
              bottom: 's-resize',
              left: 'w-resize',
              right: 'e-resize',
              'top-left': 'nw-resize',
              'top-right': 'ne-resize',
              'bottom-left': 'sw-resize',
              'bottom-right': 'se-resize',
            }[dir],
            zIndex: 10
          }}
        />
      ))}

      {/* transparent div that gets rendered when dragging or resizing */}
      {(dragging || resizing) && (
        <div
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999,
            // background: 'rgba(255, 0, 0, 0.2)', // debugging
          }}
        />
      )}
    </div>
  );
};
