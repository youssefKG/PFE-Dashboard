import { PopperChildrenProps } from "@mui/material/Popper/BasePopper.types";
import { createContext, FC, ReactNode } from "react";

interface ConfirmationContextI {
  handleClose: (callback: () => Promise<void>) => Promise<void>;
  handleConfirmation: (callback: () => Promise<void>) => Promise<void>;
}

const ConfirmationContext = createContext<ConfirmationContextI>(
  {} as ConfirmationContextI,
);

interface ConfirmationContextProviderPropsI extends PopperChildrenProps {
  children: ReactNode;
}
const ConfirmationContextProvider: FC<ConfirmationContextProviderPropsI> = ({
  children,
}) => {
  const handleClose = async (callback: () => Promise<void>): Promise<void> => {
    await callback();
  };

  const handleConfirmation = async (
    callback: () => Promise<void>,
  ): Promise<void> => {
    await callback();
  };

  return (
    <ConfirmationContext.Provider value={{ handleClose, handleConfirmation }}>
      {children}
    </ConfirmationContext.Provider>
  );
};

export default ConfirmationContextProvider;
