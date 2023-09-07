import { createContext, useContext, useMemo, useState, ReactNode } from 'react';

interface ToastContextValue {
  toast: {
    status: string;
    message: string;
    openPopup: boolean;
  };
  setToast: React.Dispatch<
    React.SetStateAction<{
      status: string;
      message: string;
      openPopup: boolean;
    }>
  >;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState({
    status: '',
    message: '',
    openPopup: false,
  });

  const valueContext = useMemo(
    () => ({
      toast,
      setToast,
    }),
    [toast]
  );

  return <ToastContext.Provider value={valueContext}>{children}</ToastContext.Provider>;
};

export { useToast, ToastProvider };
