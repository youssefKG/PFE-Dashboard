import { FC, ReactNode } from "react";
import { ClipLoader } from "react-spinners";

interface IButtonPorps {
  children?: ReactNode;
  handleClick?: <T>(params: T) => Promise<void>;
  isLoading?: boolean;
  className?: string;
  size?: number;
  spinnerColor?: string;
}

const Button: FC<IButtonPorps> = ({
  children,
  handleClick,
  className,
  isLoading,
  spinnerColor,
  size,
}) => {
  return (
    <button
      type="submit"
      className={className}
      onClick={handleClick ?? undefined}
      disabled={isLoading}
    >
      {isLoading ? (
        <ClipLoader
          loading
          color={spinnerColor ?? "#ffffff"}
          size={size ?? 18}
        />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
