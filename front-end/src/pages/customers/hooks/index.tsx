import api from "@/api";
import { useNotification } from "@/hooks/useContext";
import useDebounce from "@/hooks/useDebounce";
import Response from "@/interfaces/response";
import { CustomerI } from "@/types/customers";
import { useEffect, useState, ChangeEvent } from "react";

const useCustomers = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customers, setCustomers] = useState<CustomerI[]>([]);
  // const { showNotification } = useNotification();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchItem = useDebounce<string>(searchTerm, 400);
  const [filter, setFilter] = useState<"order_counts" | "recent" | null>(null);

  const fetchCustomers = async () => {
    try {
      let query: string = "?search=";
      if (debouncedSearchItem.length > 2) {
        query += `&name=${encodeURIComponent(debouncedSearchItem)}`;
      }
      if (filter != null) {
        query += `&order=${encodeURIComponent(filter)}`;
      }

      setIsLoading(true);
      const response = await api.get<Response<CustomerI[]>>(
        `/customers/${query}`,
      );
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeSearchTerm = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    fetchCustomers();
  }, [debouncedSearchItem]);

  useEffect(() => {
    fetchCustomers();
  }, []);
  return { isLoading, customers, searchTerm, handleChangeSearchTerm };
};

export default useCustomers;
