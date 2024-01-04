import React from 'react';

interface PopUpProperty {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export const PopupValidation: React.FC<PopUpProperty> = ({ isOpen, onClose, message }) => (
  isOpen && (
    <div className="popup" style={{ border: '2px solid red', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <p>{message}</p>
    </div>
  )
);