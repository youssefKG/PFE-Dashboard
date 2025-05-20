import { FC } from "react";
import { CategoryI } from "../../../types/category";
import CategoryCard from "../categoryCard";

interface CategoryListPropsI {
  list: CategoryI[];
}
const CategoryList: FC<CategoryListPropsI> = ({ list }) => {
  return (
    <div className="flex gap-4 flex-wrap">
      {list.map((item: CategoryI) => (
        <CategoryCard
          id={item.id}
          key={item.id}
          name={item.name}
          description={item.description}
          imgUrl={item.imageUrl}
        />
      ))}
    </div>
  );
};

export default CategoryList;
