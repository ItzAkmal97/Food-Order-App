import React from 'react'
import { useRef, useEffect } from 'react'
import { createPortal } from 'react-dom';
export default function Modal({ children, onClose, open, className = '' }) {
  const dialogRef = useRef();

  useEffect(() => {
    const modal = dialogRef.current;
    if (open) {
      modal.showModal();
    } 
    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialogRef} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}
