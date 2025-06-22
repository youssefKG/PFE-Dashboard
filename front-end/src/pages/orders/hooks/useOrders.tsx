import { ChangeEvent, useEffect, useState } from "react";
import api from "@/api";
import Response from "@/interfaces/response";
import { Order, OrdersStatsType, Status } from "@/types/orders.type";
import useDebounce from "@/hooks/useDebounce";

const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isOrdersLoading, setIsOrderLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 400);
  const [statusFilter, setStatusFilter] = useState<Status[]>([]);
  const [ordersStats, setOrdersStats] = useState<OrdersStatsType>(
    {} as OrdersStatsType,
  );
  const [isOrdersStatsLoading, setIsOrdersStatsLoading] =
    useState<boolean>(false);

  const fetchOrders = async () => {
    try {
      setIsOrderLoading(true);
      let query = "?search=";
      if (debouncedSearchTerm.length > 2) {
        query += `&name=${encodeURIComponent(debouncedSearchTerm)}`;
      }

      statusFilter.forEach((status: Status) => {
        query += `&${status}=true`;
      });

      const response = await api.get<Response<Order[]>>(`/orders${query}`);
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsOrderLoading(false);
    }
  };

  const handleStatusFilterChange = (option: Status, checked: boolean) => {
    if (checked) {
      setStatusFilter([...statusFilter, option]);
    } else {
      setStatusFilter(statusFilter.filter((status) => status !== option));
    }
  };

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    console.log(statusFilter);
  }, [statusFilter]);

  useEffect(() => {
    fetchOrders();
  }, [debouncedSearchTerm, statusFilter]);

  const fetchOrdersStats = async () => {
    try {
      setIsOrdersStatsLoading(true);
      const response =
        await api.get<Response<OrdersStatsType>>("/orders/statistics");
      setOrdersStats(response.data);
      console.log("orders stats", response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsOrdersStatsLoading(false);
    }
  };
  useEffect(() => {
    fetchOrdersStats();
  }, []);

  return {
    orders,
    isOrdersLoading,
    searchTerm,
    handleStatusFilterChange,
    handleSearchTermChange,
    statusFilter,
    isOrdersStatsLoading,
    ordersStats,
  };
};

export default useOrders;
