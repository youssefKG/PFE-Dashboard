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

type Status = "pending" | "completed" | "canceled" | "processing";
export type { Order, Status };
