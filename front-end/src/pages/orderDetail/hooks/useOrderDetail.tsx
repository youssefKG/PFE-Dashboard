import { useEffect, useState } from "react";
import Response from "@/interfaces/response";
import { OrderDetailI } from "@/types/orders.type";
import api from "@/api";
import { useParams } from "react-router-dom";

const useOrderDetail = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderDetail, setOrderDetail] = useState<OrderDetailI | null>(null);
  const { orderId } = useParams();

  const fetchOrderDetail = async () => {
    try {
      setIsLoading(true);
      const response = await api.get<Response<OrderDetailI | null>>(
        `/orders/${orderId}`,
      );
      setOrderDetail(response.data);
      console.log("order detail", response.data);
    } catch (error) {
      console.log("error order detail", error);
    } finally {
      console.log(orderId);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, []);

  return { isLoading, orderDetail };
};

export default useOrderDetail;
