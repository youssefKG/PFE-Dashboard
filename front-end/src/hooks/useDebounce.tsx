import { useState, useEffect } from "react";

function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value]);

  return debouncedValue;
}

export default useDebounce;
