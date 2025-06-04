interface CustomerI {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  ordersCount: number;
}

interface CustomerDetailI extends CustomerI {
  orders: number;
  phoneNumber: number;
}

export type { CustomerI, CustomerDetailI };
