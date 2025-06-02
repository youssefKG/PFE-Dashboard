import api from "@/api";
import { CategoryI } from "@/types/category";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Response from "@/interfaces/response";
import { useNotification } from "@/hooks/useContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectCategoryPropsI {
  handleChange: (value) => void;
}

// const SelectCategory: FC<SelectCategoryPropsI> = ({ handleChange }) => {
//   const [categoriesList, setCategoriesList] = useState<CategoryI[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const { showNotification } = useNotification();
//
//   useEffect(() => {
//     const fetchCategories = async () => {
//       setIsLoading(true);
//       try {
//         const response = await api.get<Response<CategoryI[]>>("/categories");
//         setCategoriesList(response.data);
//       } catch (error) {
//         showNotification("error", "Error: cannot fetch the the categories");
//         console.log(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//
//     fetchCategories();
//   }, []);
//
//   return (
//     <select
//       onChange={handleChange}
//       className="category bg-white p-1 px-2 rounded-md text-sm text-gray-500"
//     >
//       {isLoading ? (
//         <ClipLoader loading color="gray" size={18} />
//       ) : (
//         categoriesList.map((cat: CategoryI) => (
//           <option value={cat.id}>
//             <p className="text-gray-500 text-sm">{cat.name}</p>
//           </option>
//         ))
//       )}
//     </select>
//   );
// };

const SelectCategory: FC<SelectCategoryPropsI> = ({ handleChange }) => {
  const [categoriesList, setCategoriesList] = useState<CategoryI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await api.get<Response<CategoryI[]>>("/categories");
        setCategoriesList(response.data);
      } catch (error) {
        showNotification("error", "Error: cannot fetch the the categories");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);
  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="bg-white">
        <SelectValue placeholder="Product Category" />
      </SelectTrigger>
      <SelectContent>
        {categoriesList.map((cat: CategoryI) => (
          <SelectItem value={cat.id}>
            <div className="flex gap-2 items-center">
              <img src={cat.imageUrl} className="size-4 rounded-md" />
              <p>{cat.name}</p>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectCategory;
