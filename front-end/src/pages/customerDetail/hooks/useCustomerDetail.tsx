import { useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { CustomerDetailI, CustomerI } from "@/types/customers";
import { useNotification } from "@/hooks/useContext";
import api from "@/api";
import Response from "@/interfaces/response";
import { Order } from "@/types/orders.type";

const useCustomerDetail = () => {
  const [customer, setCustomer] = useState<CustomerDetailI | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSavingChangesLoading, setIsSavingChangesLoading] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeletingCustomerLoading, setIsDeletingCustomerLoading] =
    useState<boolean>(false);
  const { showNotification } = useNotification();
  const [isCustomerOrdersLoading, setIsCustomerOrdersLoading] =
    useState<boolean>(false);
  const { customerId } = useParams();
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchCustomerDetail = async () => {
    try {
      setIsLoading(true);
      const response = await api.get<Response<CustomerDetailI | null>>(
        `/customers/${customerId}`,
      );
      console.log("customer", response.data);
      console.log("state", customer);
      setCustomer(response.data);
    } catch (error) {
      console.log("customer detail", error);
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = async () => {
    await fetchCustomerDetail();
    setIsEditing(false);
  };

  const saveChanges = async () => {
    try {
      setIsSavingChangesLoading(true);
      if (customer) {
        await api.put<Response<null>, CustomerDetailI>(
          `/customers/${customerId}`,
          customer,
        );

        await fetchCustomerDetail();
        showNotification(
          "success",
          "Customer new information saved succesffylly",
        );
      }
    } catch (error) {
      console.log(error);
      showNotification("error", "Save customer new information failed");
    } finally {
      setIsSavingChangesLoading(false);
    }
  };
  useEffect(() => {
    fetchCustomerDetail();
  }, []);

  const deleteCustomer = async () => {
    try {
      setIsDeletingCustomerLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeletingCustomerLoading(false);
    }
  };

  const fetchCustomerOrders = async () => {
    try {
      setIsCustomerOrdersLoading(true);
      const response = await api.get<Response<Order[]>>(
        `/orders/customer/${customerId}`,
      );
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsCustomerOrdersLoading(false);
    }
  };

  const handleInputChanges = (event: ChangeEvent<HTMLInputElement>) => {
    if (customer) {
      setCustomer({
        ...customer,
        [event.target.name]: event.target.value,
      });
    }
  };

  useEffect(() => {
    fetchCustomerOrders();
  }, []);

  return {
    customer,
    isEditing,
    isLoading,
    saveChanges,
    startEditing,
    cancelEditing,
    deleteCustomer,
    isSavingChangesLoading,
    isDeletingCustomerLoading,
    handleInputChanges,
    isCustomerOrdersLoading,
    orders,
  };
};

export default useCustomerDetail;
