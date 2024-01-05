import React from 'react';
import './popup.css';

interface PopUpProperty {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export const PopupValidation: React.FC<PopUpProperty> = ({
  isOpen,
  onClose,
  message,
}) =>
  isOpen && (
    <div className="popup">
      <p>{message}</p>
    </div>
  );
