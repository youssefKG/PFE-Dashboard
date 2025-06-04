import { useEffect, useState } from "react";
import api from "@/api";
import Response from "@/interfaces/response";
import { Order, Status } from "@/types/orders.type";
import useDebounce from "@/hooks/useDebounce";

const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isOrdersLoading, setIsOrderLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 400);
  const [statusFilter, setStatusFilter] = useState<Status[]>([]);

  const fetchOrders = async () => {
    try {
      setIsOrderLoading(true);
      let query = "?search=";
      if (debouncedSearchTerm.length > 2) {
        query += `&name=${encodeURIComponent(debouncedSearchTerm)}`;
      }

      const response = await api.get<Response<Order[]>>(`/orders${query}`);
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsOrderLoading(false);
    }
  };

  const handleStatusChange = (option: Status, checked: boolean) => {
    if (checked) {
      setStatusFilter([...statusFilter, option]);
    } else {
      setStatusFilter(statusFilter.filter((status) => status !== option));
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [debouncedSearchTerm]);

  return {
    orders,
    isOrdersLoading,
    searchTerm,
    handleStatusChange,
  };
};

export default useOrders;
