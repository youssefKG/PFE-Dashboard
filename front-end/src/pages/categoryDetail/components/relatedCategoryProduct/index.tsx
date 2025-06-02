import { FC } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableCaption,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import { ProductI } from "@/types/product";
import { TableBody, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

interface RelatedCategoryProductsPropsI {
  isRelatedProductLoading: boolean;
  relatedProducts: ProductI[];
}

const RelatedCategoryProducts: FC<RelatedCategoryProductsPropsI> = ({
  isRelatedProductLoading,
  relatedProducts,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="font-bold text-xl">Related Products</h1>
      <Input placeholder="Search for product by name" />
      {isRelatedProductLoading ? (
        <ClipLoader className="text-center justify-self-center self-center" />
      ) : (
        <div className="bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {relatedProducts.map((product: ProductI) => (
                <TableRow
                  className="hover:opacity-85 transition cursor-pointer"
                  onClick={() => navigate(`/product-detail/${product.id}`)}
                >
                  <TableCell className="hover:opacity-85 transition-all">
                    <div className="flex gap-4 items-center">
                      <img
                        className="size-10 rounded-md"
                        src={
                          product.images.length > 0
                            ? product.images[0].imageUrl
                            : "https://imgs.search.brave.com/qa3D7S-V1de1p9GPk4pmfcCVhAIcntcn2gzOYIP6Cfg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzExLzIwLzQxLzU2/LzM2MF9GXzExMjA0/MTU2NjVfV0hrcXNw/VW90NmJiUlRzTGZV/RnBKcnhuMXFldFVa/VVkuanBn"
                        }
                      />
                      <p className="font-medium text-gray-800 ">
                        {product.name}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableCaption>A list of related categorys</TableCaption>
          </Table>
        </div>
      )}
    </div>
  );
};

export default RelatedCategoryProducts;
