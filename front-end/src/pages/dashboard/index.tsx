import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../..//components/ui/badge";
import { format } from "date-fns";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { DollarSign, ShoppingCart, Users, Activity } from "lucide-react";
import Breadcrumb from "../../components/common/breadcrumbs";
import SalesPerformance from "../../components/containers/SalesPerformance";
import TopSellingProducts from "../../components/containers/TopSellingProducts";
import DashboardStats from "@/components/containers/dashboardStats";

interface Order {
  id: string;
  orderNumber: string;
  client: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  product: {
    id: string;
    name: string;
    image: string;
  };
  status: "pending" | "processing" | "completed" | "cancelled";
  totalAmount: number;
  createdAt: string;
}

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    description: "+20.1% from last month",
    icon: DollarSign,
  },
  {
    title: "Total Orders",
    value: "2,345",
    description: "+12.5% from last month",
    icon: ShoppingCart,
  },
  {
    title: "Active Users",
    value: "1,234",
    description: "+8.2% from last month",
    icon: Users,
  },
  {
    title: "Active Products",
    value: "567",
    description: "+15.3% from last month",
    icon: Activity,
  },
];

const Dashboard = () => {
  // Mock data - replace with actual API call
  const orders: Order[] = [
    {
      id: "1",
      orderNumber: "ORD-001",
      client: {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      },
      product: {
        id: "1",
        name: "iPhone 14 Pro",
        image: "https://picsum.photos/200",
      },
      status: "completed",
      totalAmount: 999.99,
      createdAt: "2024-03-15T10:00:00Z",
    },
    // Add more mock orders here
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex flex-col h-screen gap-2 p-2 py-6 mb-4">
      <div className="flex flex-col gap-2 ">
        <div>
          <h1 className="font-extrabold text-2xl">Dashboard</h1>
        </div>
        <Breadcrumb links={[{ value: "Dashboard", to: "/" }]} />
      </div>
      <DashboardStats />
      <div className="md:grid flex flex-col md:grid-cols-6 gap-4 p-2">
        <SalesPerformance />
        <TopSellingProducts />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    #{order.orderNumber}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={order.client.avatar} />
                        <AvatarFallback>
                          {order.client.firstName[0]}
                          {order.client.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span>
                        {order.client.firstName} {order.client.lastName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={order.product.image} />
                        <AvatarFallback>{order.product.name[0]}</AvatarFallback>
                      </Avatar>
                      <span>{order.product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={order.status as any}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    {format(new Date(order.createdAt), "MMM d, yyyy")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
