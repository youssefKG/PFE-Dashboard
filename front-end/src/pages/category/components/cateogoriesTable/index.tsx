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
            <TableHead className=" font-bold text-black">name</TableHead>
            <TableHead className="font-bold text-black">description</TableHead>
            <TableHead className="font-bold text-black">
              Product number
            </TableHead>
          </TableHeader>
          <TableBody>
            {list.map((cat: CategoryI) => (
              <TableRow
                onClick={() => navigateToCategoryDetail(cat.id)}
                key={cat.id}
                className="bg-gray-100"
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img src={cat.imageUrl} className="size-8 rounded-lg" />
                    <p>{cat.name}</p>
                  </div>
                </TableCell>
                <TableCell className="text-gray-400">
                  {cat.description}
                </TableCell>
                <TableCell className="">300</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CategoriesTable;
