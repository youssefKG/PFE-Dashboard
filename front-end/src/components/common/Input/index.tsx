interface InputPropsI {
  className?: string;
  placeholder?: string;
  onChange: (event: any) => void;
}
const Input = ({ onChange, placeholder = "", className = "" }: InputPropsI) => {
  return (
    <input
      className={className}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
