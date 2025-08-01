// NOTES TO SELF: 

import { useRef, useState, useEffect } from 'react';

export default function DraggableDiv ({ children, dragHandleRef, maximize}) {
  // Initilization
  const dragRef = useRef(null);
  const [pos, setPos] = useState({ x: 400, y: 100 }); 
  const [size, setSize] = useState({ width: 800, height: 500 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });
  const [resizing, setResizing] = useState(null); // null or direction string

  const [previousState, setPreviousState] = useState(null);

  // Dragging Code Hook
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

  // Maximize Code Hook
  useEffect(() => {
    if (maximize) {
      setPreviousState({ pos, size });
      setPos({ x: 0, y: 0 });
      setSize({ width: window.innerWidth-9, height: "95vh" });
    } 
    // checks if prevsiousState exists 
    else if (previousState) {
      setPos(previousState.pos);
      setSize(previousState.size);
    }
  }, [maximize]);

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

  const resizeHandles = {
        top: { top: 0, left: 0, width: '100%', height: '10px', cursor: 'n-resize' },
        bottom: { bottom: 0, left: 0, width: '100%', height: '10px', cursor: 's-resize' },
        left: { top: 0, left: 0, width: '10px', height: '100%', cursor: 'w-resize' },
        right: { top: 0, right: 0, width: '10px', height: '100%', cursor: 'e-resize' },
        'top-left': { top: 0, left: 0, width: '10px', height: '10px', cursor: 'nw-resize' },
        'top-right': { top: 0, right: 0, width: '10px', height: '10px', cursor: 'ne-resize' },
        'bottom-left': { bottom: 0, left: 0, width: '10px', height: '10px', cursor: 'sw-resize' },
        'bottom-right': { bottom: 0, right: 0, width: '10px', height: '10px', cursor: 'se-resize' },
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
        boxShadow: '10px 10px 0 rgba(0,0,0,1)',
      }}
    >
      {children}

      {/* Resize handles */}

      {Object.entries(resizeHandles).map(([dir, style]) => (
        <div
          key={dir}
          onMouseDown={startResizing(dir)}
          style={{
            position: 'absolute',
            zIndex: 10,
            ...style,
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
