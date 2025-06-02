import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const ProductNotFound = () => {
  return (
    <div className="flex items-center justify-center">
      <ExclamationCircleIcon className="size-10 text-gray-400" />
      <h1 className="text-gray-300">
        The product that your looking for not found
      </h1>
    </div>
  );
};

export default ProductNotFound;
