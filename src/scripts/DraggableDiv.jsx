import React, { useRef, useState } from 'react';

const DraggableDiv = ({ children }) => {
  const dragRef = useRef(null);
  const [pos, setPos] = useState({ x: 500, y: 500 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    const rect = dragRef.current.getBoundingClientRect();
    setDragging(true);
    setRel({
      x: e.pageX - rect.left,
      y: e.pageY - rect.top,
    });
    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  const onMouseMove = (e) => {
    if (!dragging) return;
    setPos({
      x: e.pageX - rel.x,
      y: e.pageY - rel.y,
    });
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div
      ref={dragRef}
      onMouseDown={onMouseDown}
      style={{
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        cursor: 'move',
      }}
    >
      {children}
      {dragging && (
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
          }}
        />
      )}
    </div>
  );
};

export default DraggableDiv;
