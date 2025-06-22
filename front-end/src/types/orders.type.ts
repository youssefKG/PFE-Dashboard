interface Order {
  id: string;
  total: string;
  status: Status;
  firstName: string;
  lastName: string;
  email: string;
  date: number;
  countItems: number;
}

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  productId: string;
  unitPrice: string;
  subtotal: string;
  productName: string;
  description: string;
  quantity: number;
  imageUrl: string;
  createdAt: string;
};

interface OrderDetailI {
  id: string;
  user: User;
  status: string;
  orderItems: OrderItem[];
  createdAt: string;
  shippingAdress: string;
}

type OrdersStatsType = {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  ordersThisMonth: number;
  revenueThisMonth: number;
};

type Status = "pending" | "completed" | "cancelled" | "processing";
export type { Order, Status, OrderDetailI, OrdersStatsType };
