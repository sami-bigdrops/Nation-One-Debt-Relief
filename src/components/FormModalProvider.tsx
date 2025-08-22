'use client';

import React, { createContext, useContext, useState } from 'react';
import FormModal from './FormModal';

interface FormModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const FormModalContext = createContext<FormModalContextType | undefined>(undefined);

export const useFormModal = () => {
  const context = useContext(FormModalContext);
  if (!context) {
    throw new Error('useFormModal must be used within a FormModalProvider');
  }
  return context;
};

interface FormModalProviderProps {
  children: React.ReactNode;
}

export default function FormModalProvider({ children }: FormModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const value: FormModalContextType = {
    isOpen,
    openModal,
    closeModal,
  };

  return (
    <FormModalContext.Provider value={value}>
      {children}
      <FormModal isOpen={isOpen} onClose={closeModal} />
    </FormModalContext.Provider>
  );
}
