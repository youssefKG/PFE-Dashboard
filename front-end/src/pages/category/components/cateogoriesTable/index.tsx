import { FC } from "react";
import { CategoryI } from "@/types/category";
import {
  TableCaption,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Table,
} from "@/components/ui/table";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

interface CategoriesTablePropsI {
  list: CategoryI[];
  isLoading: boolean;
  navigateToCategoryDetail: (id: string) => void;
}

const CategoriesTable: FC<CategoriesTablePropsI> = ({
  list,
  isLoading,
  navigateToCategoryDetail,
}) => {
  console.log("list", list);
  return (
    <div className="flex gap-4 bg-white justify-center flex-wrap">
      {isLoading ? (
        <ClipLoader size={30} />
      ) : (
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow className="font-bold cursor:pointer hover:opacity-80">
              <TableHead className=" font-bold text-black">Invoice</TableHead>
              <TableHead className="font-bold text-black">Status</TableHead>
              <TableHead className="font-bold text-black">Method</TableHead>
              <TableHead className="font-bold text-black self-end justify-self-end">
                Number of products
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((cat: CategoryI) => (
              <TableRow
                onClick={() => navigateToCategoryDetail(cat.id)}
                key={cat.id}
              >
                <TableCell className="font-medium">{cat.name}</TableCell>
                <TableCell>
                  <img className="size-12 rounded-md" src={cat.imageUrl} />
                </TableCell>
                <TableCell className="text-gray-400">
                  {cat.description}
                </TableCell>
                <TableCell className="text-right">300</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CategoriesTable;
