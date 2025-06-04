import { ProductI } from "@/types/product";
import { ChangeEvent, FC } from "react";
import SelectCategory from "../SelectCategory";
import { isSharedArrayBuffer } from "util/types";

interface EditProductInfoPropsI {
  product: ProductI;
  isEditing: boolean;
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
}

const EditProductInfo: FC<EditProductInfoPropsI> = ({
  isEditing,
  product,
  handleChange,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full rounded-xl p-4 shadow lg:max-w-2xl bg-white">
      <div className="flex flex-col gap-2">
        <label className="text-md font-medium tracking-wider underline">
          Product Name <span className="text-red-500 text-md">*</span>:
        </label>
        <input
          disabled={!isEditing}
          name="name"
          className="border border-gray-200 text-sm text-gray-500 rounded-md p-1 px-2 "
          onChange={handleChange}
          value={product.name}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-md font-medium tracking-wider underline">
          Description <span className="text-red-500 text-md">*</span>:
        </label>
        <textarea
          onChange={handleChange}
          className="border border-gray-200 text-gray-500 text-sm rounded-md p-1 px-2 "
          name="description"
          value={product.description}
          disabled={!isEditing}
        />
      </div>

      <div className="flex gap-2">
        <div className="flex flex-1 flex-col gap-2">
          <label className="text-md font-medium tracking-wider underline">
            Regular price <span className="text-red-500 text-md">*</span>:
          </label>
          <input
            className="border border-gray-200 text-sm  text-gray-500 rounded-md p-1 px-2 "
            onChange={handleChange}
            name="regularPrice"
            type="number"
            value={product.regularPrice}
            disabled={!isEditing}
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <label className="text-md font-medium tracking-wider underline">
            Sales price <span className="text-red-500 text-md">*</span>:
          </label>
          <input
            onChange={handleChange}
            className="border text-gray-500 text-sm border-gray-200 rounded-md p-1 px-2 "
            name="salesPrice"
            type="number"
            value={product.salesPrice}
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <label className="text-md underline font-medium tracking-wider">
          Quantity <span className="text-red-500 text-md">*</span>:
        </label>
        <input
          onChange={handleChange}
          className="border text-gray-500 text-sm border-gray-200 rounded-md p-1 px-2 "
          name="quantity"
          type="number"
          value={product.quantity}
          disabled={!isEditing}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium text-black underline">
          Category <span className="text-red-500">*</span> :
        </label>
        {isEditing ? (
          <SelectCategory handleChange={handleChange} />
        ) : (
          <p className="text-sm ml-4 text-gray-500">Category number 1</p>
        )}
      </div>
    </div>
  );
};

// <select
//   className="bg-white p-1 px-2 text-gray-500 text-sm border border-gray-200 rounded-md"
//   name="category"
// >
//   <option value="">
//     <p className="text-sm">Category number 1</p>
//   </option>
//
//
export default EditProductInfo;
