import { useState } from "react";
import Breadcrumb from "@/components/common/breadcrumbs";
import Button from "@/components/common/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { Formik } from "formik";
import api from "@/api";
import { createProductSchema } from "@/lib/Validator";
import { useNotification } from "@/hooks/useContext";
import { CreateProductI } from "@/types/product";
import { v4 as uuidv4 } from "uuid";
import ImagesDropZone from "@/components/containers/ImagesDropZone";
import { TrashIcon } from "@heroicons/react/24/outline";
import Response from "@/interfaces/response";
import SelectCategory from "@/components/containers/SelectCategory";

const initialProductFormData: CreateProductI = {
  name: "",
  description: "",
  quantity: 0,
  salesPrice: 0,
  regularPrice: 0,
  categoryId: "",
  images: [],
};

type ProductImage = {
  id: string;
  file: File;
  url: string;
};

const CreateProduct = () => {
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productImages, setProductImages] = useState<ProductImage[]>([]);

  const onDropImages = (fileImages: File[]) => {
    const reader = new FileReader();
    fileImages.forEach((img: File) => {
      reader.onload = (event) => {
        if (event.target) {
          setProductImages((prevProductImags: ProductImage[]) => {
            return [
              ...prevProductImags,
              { url: event.target?.result as string, file: img, id: uuidv4() },
            ];
          });
        }
      };
      reader.readAsDataURL(img);
    });
  };

  const deleteImage = (id: string) => {
    setProductImages(productImages.filter((img) => img.id !== id));
  };

  const handleCategoryChange = (value: string) => {
    setFieldValue("categoryId", value);
  };
  const createProduct = async (values: CreateProductI) => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("regularPrice", values.regularPrice.toString());
      formData.append("salesPrice", values.salesPrice.toString());
      formData.append("quantity", values.quantity.toString());
      formData.append("categoryId", values.categoryId);

      productImages.forEach((img: ProductImage) => {
        formData.append("images[]", img.file);
      });

      await api.post<Response<null>, FormData>("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showNotification("success", "The product is created successffully");
    } catch (error) {
      console.log(error);
      showNotification("error", "The product creation failed try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 md:p-6 p-2">
      <div className="flex flex-col gap-2">
        <div>
          <h1 className="font-extrabold text-2xl">Create Product</h1>
        </div>
        <Breadcrumb links={[{ value: "Create product", to: "/" }]} />
      </div>

      <Formik
        onSubmit={createProduct}
        initialValues={initialProductFormData}
        validationSchema={createProductSchema}
      >
        {({
          errors,
          handleSubmit,
          touched,
          handleChange,
          values,
          setFieldValue,
        }) => (
          <div className="flex flex-col w-full gap-6 mt-12">
            <Button
              isLoading={isLoading}
              handleClick={handleSubmit}
              className="bg-black text-white w-32 p-1 px-2 self-end text-sm
        rounded-md"
            >
              <p>Create product</p>
            </Button>

            <div className="flex flex-row gap-2 w-full">
              {/* product general information} */}
              <div className="flex flex-col gap-4 flex-1  max-w-5xl">
                <h1 className="text-xl font-bold">General Information</h1>
                <div className="grid w-full items-center gap-1.5">
                  <Label
                    htmlFor="product name"
                    className="font-medium tracking-wider"
                  >
                    Product Name <span className="text-red-600">*</span> :
                  </Label>
                  <Input
                    className="placeholder:text-gray-400 placeholder:text-xs"
                    id="picture"
                    type="text"
                    name="name"
                    placeholder="Enter product name"
                    onChange={handleChange}
                    value={values.name}
                  />
                  {errors.name && touched.name && (
                    <p className="text-red-400 text-xs">{errors.name}</p>
                  )}
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label
                    htmlFor="product description"
                    className="font-medium tracking-wider"
                  >
                    Product Description
                    <span className="text-red-600 text-sm"> *</span> :
                  </Label>
                  <Textarea
                    className="placeholder:text-gray-400 placeholder:text-xs"
                    id="picture"
                    name="description"
                    onChange={handleChange}
                    placeholder="Enter category description"
                    value={values.description}
                  />
                  {errors.description && touched.description && (
                    <p className="text-red-400 text-sm">{errors.description}</p>
                  )}
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label
                    htmlFor="product name"
                    className="font-medium tracking-wider"
                  >
                    Product Quantity <span className="text-red-600">*</span> :
                  </Label>
                  <Input
                    className="placeholder:text-gray-400 placeholder:text-xs"
                    id="picture"
                    type="number"
                    name="quantity"
                    placeholder="Enter product quantity"
                    onChange={handleChange}
                    value={values.quantity}
                  />
                  {errors.quantity && touched.quantity && (
                    <p className="text-red-400 text-xs">{errors.quantity}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="grid w-full items-center gap-1.5">
                    <Label
                      htmlFor="product name"
                      className="font-medium tracking-wider"
                    >
                      Regular Price <span className="text-red-600">*</span> :
                    </Label>
                    <Input
                      className="placeholder:text-gray-400 placeholder:text-xs"
                      id="picture"
                      type="number"
                      name="regularPrice"
                      placeholder="Enter product regular price"
                      onChange={handleChange}
                      value={values.regularPrice}
                    />
                    {errors.regularPrice && touched.regularPrice && (
                      <p className="text-red-400 text-xs">
                        {errors.regularPrice}
                      </p>
                    )}
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label
                      htmlFor="sales price"
                      className="font-medium tracking-wider"
                    >
                      Sales Price <span className="text-red-600">*</span> :
                    </Label>
                    <Input
                      className="placeholder:text-gray-400 placeholder:text-xs"
                      type="number"
                      name="salesPrice"
                      placeholder="Enter product sales price"
                      onChange={handleChange}
                      value={values.salesPrice}
                    />
                    {errors.salesPrice && touched.salesPrice && (
                      <p className="text-red-400 text-xs">
                        {errors.salesPrice}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid gap-1.5 w-full items-center">
                  <Label
                    htmlFor="sales price"
                    className="font-medium tracking-wider"
                  >
                    Prduct Category <span className="text-red-600">*</span> :
                  </Label>
                  <SelectCategory
                    handleChange={(categoryId: string) => {
                      setFieldValue("categoryId", categoryId);
                    }}
                  />
                </div>
                {errors.categoryId && touched.categoryId && (
                  <p className="text-red-400 text-xs">{errors.categoryId}</p>
                )}
              </div>

              {/* the product media */}
              <div className="flex flex-col flex-1 gap-4">
                <h1 className="font-bold text-xl">Media</h1>
                <div className="flex flex-wrap gap-2">
                  {productImages.map((img) => (
                    <div
                      key={img.id}
                      className="relative rounded hover:opacity-60 transition-all"
                    >
                      <button
                        onClick={() => deleteImage(img.id)}
                        className="absolute top-2 right-2"
                      >
                        <TrashIcon className="size-5 text-gray-600 hover:text-black transition-all" />
                      </button>
                      <img className="size-48 rounded-xl" src={img.url} />
                    </div>
                  ))}
                </div>
                <div className="bg-white">
                  <ImagesDropZone onDrop={onDropImages} />
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default CreateProduct;
