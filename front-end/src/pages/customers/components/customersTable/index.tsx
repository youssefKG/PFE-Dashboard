import {
  TableCaption,
  TableHeader,
  TableCell,
  Table,
  TableRow,
} from "@/components/ui/table";
import { CustomerI } from "@/types/customers";
import { TableBody } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

interface CustomersTablePropsI {
  isLoading: boolean;
  customers: CustomerI[];
}
const CustomersTable: FC<CustomersTablePropsI> = ({ isLoading, customers }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      {isLoading ? (
        <div className="flex w-full my-40 items-center justify-center">
          <ClipLoader size={60} color="blue" />
        </div>
      ) : (
        <Table className="bg-white">
          <TableCaption>A list of customer</TableCaption>
          <TableHeader className="">
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell>Customer email</TableCell>
              <TableCell>Number of orders</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((cust) => (
              <TableRow
                onClick={() => navigate(`/customer-detail/${cust.id}`)}
                key={cust.id}
              >
                <TableCell>
                  <div className="flex gap-2 items-center">
                    <img
                      className="size-10 rounded-lg"
                      src="https://imgs.search.brave.com/FJNYHEexQFKkEd0boeUUCuL2bwINeXa5o3VzpOpydeA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvZGVmYXVsdC1h/dmF0YXItcHJvZmls/ZS1pY29uLXNvY2lh/bC1tZWRpYS11c2Vy/LWltYWdlLWdyYXkt/YXZhdGFyLWljb24t/YmxhbmstcHJvZmls/ZS1zaWxob3VldHRl/LXZlY3Rvci1pbGx1/c3RyYXRpb25fNTYx/MTU4LTMzODMuanBn/P3NlbXQ9YWlzX2h5/YnJpZCZ3PTc0MA"
                    />
                    <p>
                      {cust.firstName} {cust.lastName}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{cust.email}</TableCell>
                <TableCell>{cust.ordersCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CustomersTable;
