import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { Form, Formik, FormikProps } from "formik";
import { Backdrop, LinearProgress } from "@mui/material";
import api from "../../../api";
import { CreateProductI } from "../../../types/product";
import { createProductSchema } from "../../../lib/Validator";
import ImagesDropZone from "../../containers/ImagesDropZone";
import Response from "../../../interfaces/response";
import "react-quill/dist/quill.snow.css";
import { CategoryI } from "../../../types/category";

interface CreateProductBackDropPropsI {
  isOpen: boolean;
  handleClose: () => void;
  createProduct: (values: CreateProductI) => Promise<void>;
}

type ProductImageType = {
  url: string;
  name: string;
};

const createProductInitialValues = {
  name: "the name of product",
  description: "description of the product",
  regularPrice: 1000,
  salesPrice: 10,
  quantity: 0,
};

const CreateProductBackDrop: FC<CreateProductBackDropPropsI> = ({
  isOpen,
  handleClose,
  createProduct,
}) => {
  const [imagesUrl, setImagesUrl] = useState<ProductImageType[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [categories, setCategories] = useState<CategoryI[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const formRef = useRef<FormikProps<unknown>>(null);

  const onDrop = (imgFiles: File[]) => {
    const reader = new FileReader();
    imgFiles.forEach((img) => {
      console.log(imgFiles);
      reader.onload = (e) => {
        if (e.target)
          setImagesUrl((prev) => [
            ...prev,
            { url: e.target?.result as string, name: img.name },
          ]);

        setImages((prev) => [...prev, img]);
      };

      reader.readAsDataURL(img);
    });
  };

  const handleCreateProduct = async (values: unknown) => {
    await createProduct({
      ...(values as CreateProductI),
      images,
      categoryId: selectedCategoryId,
    });
  };

  const handleChangeCateogory = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategoryId(e.target.value);
  };

  const clearCreateProductDataForm = () => {
    setSelectedCategoryId("");
    formRef.current?.resetForm();
    handleClose();
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await api.get<Response<CategoryI[]>>("/categories");
      setCategories(response.data);
    };
    fetchCategories();
  }, []);
  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <Backdrop
      open={isOpen}
      className="relative z-40 flex overflow-x-scroll
    gap-2"
    >
      <Formik
        innerRef={formRef}
        initialValues={createProductInitialValues}
        onSubmit={handleCreateProduct}
        validationSchema={createProductSchema}
      >
        {({ errors, values, touched, handleChange, handleBlur }) => {
          return (
            <Form className="bg-white py-4 flex flex-col md:flex-nowrap justify-center px-5  gap-5 relative m-5 rounded-xl ">
              <div className="flex flex-wrap md:flex-nowrap  justify-center px-5 gap-5 relative ">
                <div className="flex flex-col gap-6 p-4 relative w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <h1 className="text-sm">Product Name</h1>
                    <div className="border-gray-400 border p-1 rounded-md">
                      <input
                        className="w-full border-none text-gray-900 text-xs
            outline-none focus:border-none focus:outline-none"
                        placeholder="Type product name here"
                        name="name"
                        onChange={handleChange}
                        value={values.name}
                        onBlur={handleBlur}
                      />
                    </div>
                    {touched.name && errors.name && (
                      <p className="text-red-500 text-xs">{errors.name}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="font-sans text-sm">Description</h1>
                    <div className="border-gray-400 border p-1 rounded-md">
                      <textarea
                        placeholder="Type description here"
                        value={values.description}
                        name="description"
                        className="w-full rounded-e border-none text-gray-900
                        text-xs outline-none focus:border-none
                        focus:outline-none"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex  flex-col gap-2">
                    <h1 className="text-sm">Category</h1>
                    <select
                      onChange={handleChangeCateogory}
                      value={selectedCategoryId}
                      className="border border-gray-400 p-2 text-xs bg-white rounded-md"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat: CategoryI) => (
                        <option value={cat.id} key={cat.id}>
                          <p className="text-xs">{cat.name}</p>
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-sm">Brand</h1>
                    <div className="border-gray-400 border p-1 rounded-md">
                      <input
                        className="w-full rounded-e border-none text-gray-900 text-xs
            outline-none focus:border-none focus:outline-none"
                        name="quantity"
                        type="number"
                        value={values.quantity}
                        placeholder="Type brand here"
                        onChange={handleChange}
                      />
                    </div>
                    {touched.quantity && errors.quantity && (
                      <p className="text-red-500 text-xs">
                        {" "}
                        {errors.quantity}{" "}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <div className="flex flex-1 flex-col gap-2">
                      <h1 className="font-medium text-sm">Regular Price</h1>
                      <div className="border-gray-400 border p-1 rounded-md">
                        <input
                          className="w-full rounded-e border-none text-gray-900 text-xs
            outline-none focus:border-none focus:outline-none"
                          placeholder="Type brand here"
                          name="regularPrice"
                          value={values.regularPrice}
                          onChange={handleChange}
                        />
                      </div>
                      {touched.regularPrice && errors.regularPrice && (
                        <p className="text-xs text-red-500">
                          {errors.regularPrice}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                      <h1 className="font-medium text-sm">Sales Price</h1>
                      <div className="border-gray-400 border p-1 rounded-md">
                        <input
                          className="w-full rounded-e border-none text-gray-900 text-xs
            outline-none focus:border-none focus:outline-none"
                          placeholder="Type brand here"
                          type="number"
                          name="salesPrice"
                          value={values.salesPrice}
                          onChange={handleChange}
                        />
                      </div>
                      {touched.salesPrice && errors.salesPrice && (
                        <p className="text-xs text-red-500">
                          {errors.salesPrice}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <ProductImages images={imagesUrl} onDrop={onDrop} />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={handleClose}
                  type="button"
                  className="px-4 p-1 rounded-xl  text-sm text-black border border-gray-400
          font-medium shadow hover:opacity-70 transition-all cursor-pointer"
                >
                  Discart
                </button>
                <button
                  type="submit"
                  className="px-4 p-1 rounded-xl bg-black text-sm text-white
          font-medium shadow hover:opacity-70 transition-all cursor-pointer"
                >
                  Create Product
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Backdrop>
  );
};

interface CreateProductImagesPropsI {
  images: ProductImageType[];
  onDrop: (images: File[]) => void;
}

const ProductImages = ({ onDrop, images }: CreateProductImagesPropsI) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {images.length > 0 && (
        <img className="w-full h-60 shadow-sm rounded-xl" src={images[0].url} />
      )}
      <ImagesDropZone onDrop={onDrop} />
      <ListImages images={images} />
    </div>
  );
};

interface ListImagesPropsI {
  images: ProductImageType[];
}

const ListImages: FC<ListImagesPropsI> = ({ images }) => {
  return (
    <div className="flex gap-2 max-h-44 overflow-y-scroll flex-col">
      {images.map((img: ProductImageType, id: number) => (
        <div
          key={id}
          className="flex  gap-2 items-center  p-2 shadow-sm w-full"
        >
          <img className="w-10 h-10" src={img.url} />
          <div className="flex g flex-col w-full gap-2">
            <p className="text-xs">{img.name}</p>
            <LinearProgress color="success" className="w-full " />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CreateProductBackDrop;
